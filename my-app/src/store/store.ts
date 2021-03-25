import {createStore, applyMiddleware, combineReducers} from"redux"

import {bookReducer} from "./books/bookReducer";

import thunk from"redux-thunk";

export const rootReducer = combineReducers({
    books: bookReducer,
})

export type AppState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk))


export default store;