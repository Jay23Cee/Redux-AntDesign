import React, { useState } from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, Typography } from 'antd';
import {Books} from '../store/books/books'
import {AppState} from '../store/store';
import {connect} from 'react-redux';
import {AppAction} from '../store/books/actionType';
import {ThunkDispatch} from "redux-thunk";
import * as action from "../store/books/bookAction";
import {bindActionCreators} from 'redux';
import { ProgressPlugin } from 'webpack';


interface BookTableProps{
  title?: string;
  author?: string;
  date?:string;
}

interface BookTableState {}

type Props = BookTableProps & LinkStateProps & LinkDispatchProps;


export class BookTable extends React.Component<Props, BookTableState>{
  onEdit = (book: Books) => {
    this.props.startEditBook(book);
  };



  render(){
    const {booking} = this.props
    return(
      <div>
        <h1>Books Page</h1>
        <div>
          {booking.map(book => (
            <div>
              <p>{book.title}</p>
              <p>{book.author}</p>
              <p>{book.date}</p>
            </div>
          ))}


      </div>
      </div>

    );
  }

}


interface LinkStateProps {
  booking:Books[];
}

interface LinkDispatchProps{
  startEditBook: (book : Books) => void;
}

const mapStateToProps = (
  state: AppState,
  ownProps: BookTableProps,

): LinkStateProps => ({
  booking: state.books
})


const mapDispatchToProps=(
  dispatch : ThunkDispatch<any,any,AppAction>,
  ownprops: BookTableProps
): LinkDispatchProps => ({
  startEditBook:  bindActionCreators(action.startEditBook, dispatch),
})




///////////////////////////////////////////////
/////////////BELOW THIS LINE IS ANT DESIGN/////
///////////////////////////////////////////////

const originData: Books[] = [];
for (let i = 0; i < 100; i++) {
  originData.push({
    key: i.toString(),
    title: `Earth ${i}`,
    author: "",
    date: '${i}',
  });
}
interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
  record: Books;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
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

const EditableTable = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record: Books) => record.key === editingKey;

  const edit = (record: Partial<Books> & { key: React.Key }) => {
    form.setFieldsValue({ name: '', age: '', address: '', ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Books;
      const newData = [...data];
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const Books = newData[index];
        newData.splice(index, 1, {
          ...Books,
          ...row,
        });
        setData(newData);
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

  const columns = [
    {
      title: 'name',
      dataIndex: 'name',
      width: '25%',
      editable: true,
    },
    {
      title: 'age',
      dataIndex: 'age',
      width: '15%',
      editable: true,
    },
    {
      title: 'address',
      dataIndex: 'address',
      width: '40%',
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_: any, record: Books) => {
        const editable = isEditing(record);
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
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
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
      onCell: (record: Books) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
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


export default connect(mapStateToProps, mapDispatchToProps) (BookTable)