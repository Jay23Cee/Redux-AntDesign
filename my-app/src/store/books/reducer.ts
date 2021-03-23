import {Books} from './types';
import { Constants, BookActions,BookState } from './types';


const init: Books = {
 
  title:[],
  author:[],
  list:[],


};

export function bookReducer(state: Books = init, action: BookActions): Books {

    switch (action.type) {
        case Constants.EDIT_BOOK:
          return {...state, list: [...state.list, action.payload.item]};
        case Constants.REMOVE_BOOK:
            return {...state, ...action.payload};
        default:
          return state;
    }
}