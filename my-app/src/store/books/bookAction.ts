import {
    FETCH_BOOK,
    EDIT_BOOK,
    DELETE_BOOK,
    NEW_BOOK,
  } from "../books/actionType"

  import {AppAction} from "../books/actionType";
  import {Books} from "../books/books";

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


