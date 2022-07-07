import { Book } from "../books/books" ;

//action strings
export const EDIT_BOOK = "EDIT_BOOK";
export const NEW_BOOK = "NEW_BOOK";
export const FETCH_BOOK = "FETCH_BOOK";
export const DELETE_BOOK = "DELETE_BOOK";


export interface DeleteBookAction {
    type: typeof DELETE_BOOK;
   id:string;
}

export interface EditBookAction {
    type: typeof EDIT_BOOK;
    book: Book;
}

export interface FetchBookAction {
    type: typeof FETCH_BOOK;
    book: Book[];
}

export interface NewBookAction {
    type: typeof NEW_BOOK;
    book: Book;
}


export type BookActionTypes =
    | DeleteBookAction
    | EditBookAction
    | FetchBookAction
    | NewBookAction


export type AppAction = BookActionTypes;