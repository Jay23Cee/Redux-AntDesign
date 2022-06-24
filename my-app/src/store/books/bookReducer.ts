import { Book } from "../books/books"
import {v4 as uuidv4} from 'uuid';
import {BookActionTypes} from "../books/actionType"
import {
    FETCH_BOOK,
    EDIT_BOOK,
    DELETE_BOOK,
    NEW_BOOK,
    
} from  "../books/actionType"

import { open } from 'sqlite'
import SQLite from "react-native-sqlite-storage";
import "setimmediate"

import sqlite from 'sqlite';
import sqlite3 from 'sqlite3';
import axios from "axios";
import { response } from "express";



/**************************
 ******* LOCAL DATABASE ***
 **************************/
 async function getbooks(){
    const BookRedeucerDefaultState: Book[]  = [];
    let found = false;
    let link = `http://localhost:3333/read`;
    const { data } = await axios.get(link);
     console.log(data)
     var len =  Object.keys(data).length
     console.log(len)
     for (let i = 0; i < len; i++) {
        console.log( data[i])
        BookRedeucerDefaultState.push(
            data[i]
         );
       }
    return   BookRedeucerDefaultState; 
  }



  const BookRedeucerDefaultState: Book[] =[];





/************************
 ******* BOOKREDUCER ****
 ************************/
const bookReducer =(state = BookRedeucerDefaultState, action: BookActionTypes): Book[] =>{
    switch(action.type){
        case FETCH_BOOK:
            return { ...state, ...action.book}
        case EDIT_BOOK:   
            return state.map(books => {
                if (books.key === action.book.key){
                    return {
                        ...books,
                        ...action.book
                    };

                }else{
                    return books;
                }
            })
        case DELETE_BOOK:
            return state.filter(({ key}) => key !== action.key);
        case NEW_BOOK:
            return [...state, action.book]

        default:
            return state;


    }

}




export {bookReducer}