import { Form, Input, Menu, Breadcrumb, Button, message } from 'antd';
import React from 'react';

import {Book} from '../store/books/books';


import {Link} from "react-router-dom"
import axios from 'axios';


const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export const NewItem = () =>{

  return(
    <div>
        <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>New</Breadcrumb.Item>
        <Breadcrumb.Item>Library</Breadcrumb.Item>
        <Breadcrumb.Item>Book</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  )
}


export const NewMenu=() =>{

  return(
  <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
  <Menu.Item key="1">Home</Menu.Item>
  <Link to="/new"><Menu.Item key="2">New</Menu.Item></Link>

</Menu>

)
  }

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};


const NewBook=()=>{

     const [form] = Form.useForm()

      const onFinish = (values: Book) => {        console.log(values);
        const JSON_string = JSON.stringify(values)
        // this.props.startNewBook(values)
        console.log(JSON_string)
        const headers = {
          'Content-Type': 'text/plain'
        };
       const res= axios.post(`http://localhost:3333/add`,values,{headers}).then(response=>{
         console.log("Sucess ========>,", response.data)
         message.success('Book has been added', 10);
       }).catch(error=>{
        console.log("Error ========>", error)
       });
        
        console.log(res)
        form.resetFields();
       
      }


    return (

      <div>
          <Form {...layout} form={form} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
          <Form.Item name={['book', 'title']} label="Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name={['book', 'author']} label="Author" rules={[{ required: true}]}>
            <Input />
          </Form.Item>
          
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  } 

export default NewBook