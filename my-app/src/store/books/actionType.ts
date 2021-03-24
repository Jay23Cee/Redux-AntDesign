import {Books} from "../books/books"




//action string 
export const EDIT_BOOK = "EDIT_BOOK";
export const NEW_BOOK ="NEW_BOOK";
export const FETCH_BOOK="FETCH_BOOK";
export const DELETE_BOOK="DELETE_BOOK";

export interface DeleteBookAction{
    type: typeof DELETE_BOOK
    books: Books;
}


export interface FetchBookAction{
    type: typeof FETCH_BOOK
    books: Books[];
}

export interface EditBookAction{
    type: typeof EDIT_BOOK
    books: Books;
}

export interface NewBookAction{
    type: typeof NEW_BOOK
    books: Books;
}


export type BookActionTypes = |DeleteBookAction
| FetchBookAction
| EditBookAction
| NewBookAction;

export type AppAction = BookActionTypes;