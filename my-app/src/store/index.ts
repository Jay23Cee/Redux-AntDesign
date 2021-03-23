import { combineReducers, createStore} from 'redux';
import {bookReducer} from './books/reducer';
import {Books} from './books/types'


export interface IRootState {
    demo: Books
}



const store = createStore<IRootState, any,any,any>(
    combineReducers({
        demo: bookReducer
    })
)


export default store;