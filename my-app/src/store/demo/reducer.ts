import {Books} from './types';
import { Constants, DemoActions, IDemoState } from './types';


const init: Books = {
 
  title:[],
  author:[],
  list:[],
  loading: false,

};

export function demoReducer(state: Books = init, action: DemoActions): Books {

    switch (action.type) {
        case Constants.ADD_ITEM:
          return {...state, list: [...state.list, action.payload.item]};
        case Constants.SET_LOADING:
            return {...state, ...action.payload};
        default:
          return state;
    }
}