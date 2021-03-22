import { combineReducers, createStore} from 'redux';
import {demoReducer} from './demo/reducer';
import {Books} from './demo/types'


export interface IRootState {
    demo: Books
}



const store = createStore<IRootState, any,any,any>(
    combineReducers({
        demo: demoReducer
    })
)


export default store;