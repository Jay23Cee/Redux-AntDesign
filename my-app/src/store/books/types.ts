  
import { ActionType } from 'typesafe-actions';
import * as actions from './actions'

export type BookActions = ActionType<typeof actions>;


export interface BookState {
    list: string[],
    title:string[],
    author:string[],

}

export enum Constants {
    EDIT_BOOK = 'EDIT_BOOK',
    REMOVE_BOOK = 'REMOVE_BOOK',
}

