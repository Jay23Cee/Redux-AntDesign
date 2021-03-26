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
import { bookReducer } from "./bookReducer";

 

export const startEditBook= (book:Books) => {
    return ( dispatch: Dispatch<AppAction>, getState:() => typeof AppState) => {
        dispatch({
            type: EDIT_BOOK,
            books:book});
    }
}

export const startNewBook =(book:Books) =>{
    return ( dispatch: Dispatch<AppAction>, getState:() => typeof AppState) => {
        dispatch({
            type: NEW_BOOK,
            books:book});
    }
}

// export const startNewBook=(book:Books) =>{
//     return ( dispatch: Dispatch<AppAction>, getState:() => typeof AppState) => {
//         dispatch({
//             type: NEW_BOOK,
//             books:book});
//     }
    
// }



