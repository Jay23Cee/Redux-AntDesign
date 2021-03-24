import {Books} from "../books/books"


import {BookActionTypes} from"../books/actionType" 
import {
  FETCH_BOOK,
  EDIT_BOOK,
  DELETE_BOOK,
  NEW_BOOK,
} from "../books/actionType"
import { action } from "typesafe-actions";
import ActionButton from "antd/lib/modal/ActionButton";


const bookReducerDefaultState: Books[] =[]

const bookReducer =(state =bookReducerDefaultState, action: BookActionTypes): Books[] =>{
  switch (action.type){
    case FETCH_BOOK:
      return action.books;
    
    case EDIT_BOOK:
      return state.map(books => {
        if(books.title === action.books.title){
          return{
            ...books,
            ...action.books
          };
        }else{
          return books;
        }
      })

      case DELETE_BOOK:
        return state.filter(({title}) => title !== action.books.title)

      case NEW_BOOK:
        return state;

      default:
        return state;

      
  }

}