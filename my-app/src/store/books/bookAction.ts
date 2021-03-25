import { Dispatch } from "react";
import {
    FETCH_BOOK,
    EDIT_BOOK,
    DELETE_BOOK,
    NEW_BOOK,
  } from "../books/actionType"

  import {AppAction} from "../books/actionType";
  import {Books} from "../books/books";
  import AppState from "../store"

  export const FetchBook = (books: Books[]):AppAction=>({
      type: FETCH_BOOK,
      books,
  })

  export const EditBook = (books: Books):AppAction=>({
    type: EDIT_BOOK,
    books,
})

export const DeleteBook = (books: Books):AppAction=>({
    type: DELETE_BOOK,
    books,
})


export const NewBook = (books: Books):AppAction=>({
    type: NEW_BOOK,
    books,
})
export const startEditBook= (book:Books) => {
    return ( dispatch: Dispatch<AppAction>, getState:() => typeof AppState) => {
        dispatch(EditBook(book));
    }
}

export const startNewBook =(book:Books) =>{
    return ( dispatch: Dispatch<AppAction>, getState:() => typeof AppState) =>{
        dispatch(NewBook(book));
    }
}

export const startFetchBook=(book:Books) =>{
    return( dispatch: Dispatch<AppAction>, getState:()=> typeof AppState) => {
        dispatch(NewBook(book))
    }
}



