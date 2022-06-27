import { v4 as uuidv4} from 'uuid';
import {
  FETCH_BOOK,
  EDIT_BOOK,
  DELETE_BOOK,
  NEW_BOOK,
} from "../books/actionType"

import { AppAction } from "../books/actionType";
import { Book } from "../books/books";
import { Dispatch } from "redux";
import AppState from "../store";
import { BookTable } from '../../components/BookTable';




// Simplified 
export const startEditBook = (book: Book) => {
  return (dispatch: Dispatch<AppAction>, getState: () => typeof AppState) => {
    dispatch({ type: EDIT_BOOK,
      book:book});
  };
}

export const startNewBook = (book:Book) => {
  return (dispatch: Dispatch<AppAction>, getState: () => typeof AppState) => {
  
  //  const books = { title, author, date, key};
    return dispatch(
     {
      type: NEW_BOOK ,
      book: book
     }
    );
  };
};


export const startFetchBook = (books: Book[]) => {
  return (dispatch: Dispatch<AppAction>, getState: () => typeof AppState) => {
    dispatch({  type: FETCH_BOOK,
      book:books,});
  };
};

export const startDeleteBook = (id:string) => {
  return(dispatch: Dispatch<AppAction>, getState: () => typeof AppState ) => {
    dispatch({
      type: DELETE_BOOK,
      id:id,
    });
  };
}