import { Book } from "../books/books"
import {v4 as uuidv4} from 'uuid';
import {BookActionTypes} from "../books/actionType"
import {
    FETCH_BOOK,
    EDIT_BOOK,
    DELETE_BOOK,
    NEW_BOOK,

} from  "../books/actionType"
import "setimmediate"
import axios from "axios";



/**************************
 ******* Connect DATABASE ***
 **************************/
 export async function getbooks(){

    const BookRedeucerDefaultState: Book[]  = [];
   let port = process.env.PORT as String
   if (port === ""|| port == undefined){
    port = "8080"
   }

    let link =  process.env.baseURL || "http://localhost:"+port
    try {
       
        const { data } = await axios.get(link+"/read");
        var len =  Object.keys(data).length
       
        for (let i = 0; i < len; i++) {
          
           BookRedeucerDefaultState.push(
               data[i]
            );
          }
        
    } catch (error) {
        console.log(error)
    }
  
    return   Promise.resolve(BookRedeucerDefaultState);
  }


  export async function delete_book(JSON_string:string){
   
    const headers = {
      'Content-Type': 'text/plain'
    };
    let link = (process.env.REACT_APP_URL as string);
    let url = link +`/delete`
    
   const res= axios.post(url,JSON_string,{headers}).then(response=>{
    console.log("Sucess ========>,", response.data)

   

   }).catch(error=>{
    console.log("Error ========>", error)
   });
  }



 export async function edit_book(JSON_string:string){
    const headers = {
        'Content-Type': 'text/plain'
      };
      let link = (process.env.REACT_APP_URL as string);
     const res= axios.post(link+`/edit`,JSON_string,{headers}).then(response=>{
      console.log("Sucess ========>,")
     }).catch(error=>{
      console.log("Error ========>", error)
     });
  }


export async function add_book(JSON_string:string, values:Book) {
    const headers = {
        'Content-Type': 'text/plain'
      };
      let link = (process.env.REACT_APP_URL as string);
     let url = link+`/add`

     const res= await axios.post(url,values,{headers}).then(response=>{
       console.log("Sucess ========>,")
   
     }).catch(error=>{
      console.log("Error ========>", error)
     });

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
                if (books.ID === action.book.ID){
                    return {
                        ...books,
                        ...action.book
                    };

                }else{
                    return books;
                }
            })
        case DELETE_BOOK:
            return state.filter(({ ID}) => ID !== action.id);
        case NEW_BOOK:
            return [...state, action.book]

        default:
            return state;


    }

}


export {bookReducer}
