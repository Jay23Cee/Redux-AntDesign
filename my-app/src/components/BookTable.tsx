import React, { useState,  Component } from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, Typography } from 'antd';
import { timeStamp } from 'node:console';
import { kMaxLength } from 'node:buffer';

import {Book} from '../store/books/books';

import {AppState} from "../store/store";
import { connect} from 'react-redux';
import {AppAction } from "../store/books/actionType";
import { ThunkDispatch  } from "redux-thunk";
import * as action from "../store/books/bookAction";
import { bindActionCreators } from 'redux';
import axios from 'axios';



export interface BookTableProps{
  title: string;
  author: string;
  date: string;
  key: string;
}

interface BookTableState {}

type Props = BookTableProps & LinkStateProps & LinkDispatchProps;
const url = "https://api.deezer.com/chart";
const config = {
   url,
   headers: {
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    }
}


export class BookTable extends React.Component<Props, BookTableState> {

  state = {
    title:'',
    author:''
  }

  componentDidMount() {
    axios.get(`http://localhost:3333/read`)
      .then(res => {
        const persons =res.data;
        this.setState({ persons });
        console.log({persons})

        console.log( persons)
      })
  }
  // onRemove = (id: string) => {
  //   this.props.startRemoveExpense(id);
  // };


  render() {

    const { originData} = this.props;
    
    const EditableTable = () => {
      const [form] = Form.useForm();
      const [data, setData] = useState(originData);
      const [editingKey, setEditingKey] = useState('');
    
      const isEditing = (record: Book) => record.key === editingKey;
      const isDeleting  = (record: Book) => record.key === editingKey;
    
  
      const onEdit = (record: Partial<Book> & { key: React.Key }) => {
        form.setFieldsValue({ title: '', author: '', date: '', address: '', ...record });
        setEditingKey(record.key);
       
      };
    
    
    
      const onDelete = (record: Partial<Book> & { key: React.Key }) => {
        setEditingKey(record.key);
        this.props.startDeleteBook(record.key)
     

         
      };
    
     
    
      const cancel = () => {
        setEditingKey('');
      };
    
    
    
      const save = async (key: React.Key) => {
        try {
          const row = (await form.validateFields()) as Book;
    
          const newData = [...data];
          const index = newData.findIndex(item => key === item.key);
          if (index > -1) {
            const item = newData[index];
            newData.splice(index, 1, {
              ...item,
              ...row,
            });
            setData(newData);
            console.log(newData[index]);
          this.props.startEditBook(newData[index]);
            setEditingKey('');
          
          } else {
            newData.push(row);
            setData(newData);
            setEditingKey('');
          }
        } catch (errInfo) {
          console.log('Validate Failed:', errInfo);
        }
      };
    
      /**************************
       ******* Columns **********
       ******** of the *********
       ********* Table *********/
      const columns = [
        {
          title: 'title',
          dataIndex: 'title',
          width: '45%',
          editable: true,
        },
        {
          title: 'author',
          dataIndex: 'author',
          width: '25%',
          editable: true,
        },
        {
          title: 'date',
          dataIndex: 'date',
          width: '15%',
          editable: false,
        },
        {
          title: 'action',
          dataIndex: 'action',
          render: (_: any, record: Book) => {
            const editable = isEditing(record) || isDeleting(record);
            return editable ? (
              <span>
                <a href="javascript:;" onClick={() => save(record.key)} style={{ marginRight: 8 }}>
                  Save
                </a>
                <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                  <a>Cancel</a>
                </Popconfirm>
              </span>
              
            ) : (
              <Typography.Link >
                <Typography.Link disabled={editingKey !== ''} onClick={() =>onEdit(record)}>
                 Edit
                </Typography.Link>
                <br></br>
                <Typography.Link disabled={editingKey !== ''} onClick={() => onDelete(record)}>
                 Delete
              </Typography.Link>
    
              
    
              </Typography.Link>
    
              
            );
          },
        },
    
      ];
    
      const mergedColumns = columns.map(col => {
        if (!col.editable) {
          return col;
        }
        return {
          ...col,
          onCell: (record: Book) => ({
            record,
            inputType: col.dataIndex === 'date' ? 'number' : 'text',
            dataIndex: col.dataIndex,
            title: col.title,
            editing: isEditing(record),
            deleting: isDeleting(record),
          }),
        };
      });
    
      return (
        <Form form={form} component={false}>
          <Table
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            bordered
            dataSource={data}
            columns={mergedColumns}
            rowClassName="editable-row"
            pagination={{
              onChange: cancel,
            }}
          />
        </Form>
      );
    };
    

    return (
      <div>
        <EditableTable/>    
      </div>
    );
  }
}






interface LinkStateProps {
originData: Book[];
}

interface LinkDispatchProps{
  startEditBook: (book : Book) => void;
  startDeleteBook: (id:string) => void;
}



const mapStateToProps = (
  state: AppState,
  ownProps: BookTableProps
): LinkStateProps => ({
originData: state.books

});


const mapDispatchToProps = (
  dispatch : ThunkDispatch<any,any,AppAction>,
  ownProps: BookTableProps
): LinkDispatchProps => ({
  startEditBook: bindActionCreators(action.startEditBook, dispatch),
  startDeleteBook: bindActionCreators(action.startDeleteBook, dispatch),
})


///////////////////////////////////////////
/////BELOW IS THE Ant Design Table////////
///////////////////////////////////////////



interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  deleting: boolean;
  dataIndex: string;
  title: string;
  author:string;
  inputType: 'number' | 'text';
  record: Book;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  deleting,
  dataIndex,
  title,
  author,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};



export default connect(mapStateToProps, mapDispatchToProps) (BookTable);