import React, { useState,  Component, useEffect } from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, Typography } from 'antd';

import {Book} from '../store/books/books';

//import {AppState} from "../store/store";
import { connect} from 'react-redux';
import {AppAction } from "../store/books/actionType";
//import { ThunkDispatch  } from "redux-thunk";
import * as action from "../store/books/bookAction";
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { getbooks } from '../store/books/bookReducer';
;



export interface BookTableProps{
  Title: string;
  Author: string;
  Date: string;
  Id: string;
  Key:string;
  
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


export const BookTable: React.FC<Props> = () =>{
 const  originData: Book[] =[];
    
    const EditableTable = () => {
      const [form] = Form.useForm();
      const [data, setData] = useState(originData);
      const [editingKey, setEditingKey] = useState('');
      
    

     useEffect(function effectFunction() {
        async function fetchBooks() {
           var data = await getbooks()
           setData(data);    
        }
        fetchBooks();
    }, []);
      
  

    
      const isEditing = (record: Book) => record.ID === editingKey;
      const isDeleting  = (record: Book) => record.ID === editingKey;
    
  
      const onEdit = (record: Partial<Book> & { ID: React.Key }) => {
        form.setFieldsValue({ Title: '', Author: '', Date: '', ...record });
        setEditingKey(record.ID);
       
      };
    
    
    
      const onDelete =async (record: Partial<Book> & { ID: React.Key }) => {
        setEditingKey(record.ID);
        console.log()
        try {
          const row = (await form.validateFields()) as Book;
    
          const newData = [...data];
          const index = newData.findIndex(item =>record.ID === item.ID);
          console.log("NEW DATA ", record.ID, " : INDEX", index)
          if (index > -1) {
            const item = newData[index];
           const condition= newData.splice(index, 1, {
              ...item,
              ...row,
            });
            console.log(condition)
            const temp_book = {"book": newData[index]}
            const JSON_string = JSON.stringify(temp_book)
            
            console.log(JSON_string)
            const headers = {
              'Content-Type': 'text/plain'
            };

           const res= axios.post(`http://localhost:3333/delete`,JSON_string,{headers}).then(response=>{
            console.log("Sucess ========>,", response.data)

           

           }).catch(error=>{
            console.log("Error ========>", error)
           });

           
           const update= await getbooks()
           setData(update)
            
          // action.startEditBook(newData[index]);
           setEditingKey('');
            
          } else {
            newData.push(row);

           
       
            const update= await getbooks()
           setData(update)
            setEditingKey('');
           
          }
        } catch (errInfo) {
          console.log('Validate Failed:', errInfo);
        }
       // action.startDeleteBook(record.ID)
     

         
      };
    
     
    
      const cancel = () => {
        setEditingKey('');
      };
    
    
    
      const save = async (id: React.Key) => {
        try {
          const row = (await form.validateFields()) as Book;
    
          const newData = [...data];
          const index = newData.findIndex(item => id === item.ID);
          console.log("NEW DATA ", id, " : INDEX", index)
          if (index > -1) {
            const item = newData[index];
            newData.splice(index, 1, {
              ...item,
              ...row,
            });
            const temp_book = {"book": newData[index]}
            const JSON_string = JSON.stringify(temp_book)
            
            console.log(JSON_string)
            const headers = {
              'Content-Type': 'text/plain'
            };

           const res= axios.post(`http://localhost:3333/edit`,JSON_string,{headers}).then(response=>{
            console.log("Sucess ========>,", response.data)
           }).catch(error=>{
            console.log("Error ========>", error)
           });


            setData(newData);
            console.log(newData[index]);
        // action.startEditBook(newData[index]);
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
          title: 'Title',
          dataIndex: 'Title',
          width: '45%',
          editable: true,
          
        },
        {
          title: 'Author',
          dataIndex: 'Author',
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
                <a href="javascript:;" onClick={() => save(record.ID)} style={{ marginRight: 8 }}>
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
      console.log(data)
      return (
        <Form form={form} component={false} >
          <Table
          rowKey={record => record.ID}
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







interface LinkStateProps {
originData: Book[];
}

interface LinkDispatchProps{
  startEditBook: (book : Book) => void;
  startDeleteBook: (id:string) => void;
}



// const mapStateToProps = (
//   state: AppState,
//   ownProps: BookTableProps
// ): LinkStateProps => ({
// originData: state.books

// });


// const mapDispatchToProps = (
//   dispatch : ThunkDispatch<any,any,AppAction>,
//   ownProps: BookTableProps
// ): LinkDispatchProps => ({
//   startEditBook: bindActionCreators(action.startEditBook, dispatch),
//   startDeleteBook: bindActionCreators(action.startDeleteBook, dispatch),
// })


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



//export default connect(mapStateToProps, mapDispatchToProps) (BookTable);

export default BookTable
