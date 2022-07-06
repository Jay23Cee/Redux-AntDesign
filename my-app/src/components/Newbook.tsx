import { Form, Input, Menu, Breadcrumb, Button, Select, message } from 'antd';
import React, { useState,  Component } from 'react';
import { timeStamp } from 'node:console';
import { kMaxLength } from 'node:buffer';
import {Book} from '../store/books/books';
import {AppState} from "../store/store";
import { connect} from 'react-redux';
import {AppAction } from "../store/books/actionType";
import { ThunkDispatch  } from "redux-thunk";
import * as action from "../store/books/bookAction";
import { bindActionCreators } from 'redux';
import { bookReducer } from '../store/books/bookReducer';

import { Redirect } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import {Link, Route} from "react-router-dom"
import axios from 'axios';
import { useForm } from "react-hook-form";



const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

interface BookTableProps{
  title: string;
  author: string;
  date: string;
  key: string;
}

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

 <Menu.Item key="1">Menu</Menu.Item>


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


interface BookTableState {}

type Props = BookTableProps & LinkStateProps & LinkDispatchProps;

interface LinkStateProps {
  originData: Book[];
  }
  
  interface LinkDispatchProps{
    startNewBook: (book : Book) => void;
    
  }
  
    const mapDispatchToProps = (
    dispatch : ThunkDispatch<any,any,AppAction>,
    ownProps: BookTableProps
  ): LinkDispatchProps => ({
    startNewBook: bindActionCreators(action.startNewBook, dispatch),
    
  })
  
  const mapStateToProps = (
    state: AppState,
    ownProps: BookTableProps
  ): LinkStateProps => ({
  originData: state.books
  
  });
  
;

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
// end of Class NewBook




export default connect(mapStateToProps, mapDispatchToProps) ( NewBook);