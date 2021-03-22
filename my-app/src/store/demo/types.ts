  
import { ActionType } from 'typesafe-actions';
import * as actions from './actions'

export type DemoActions = ActionType<typeof actions>;

export interface Books {

    list: string[],
    title: string[],
    author: string[],
    loading: boolean

}

export interface IDemoState {
    list: string[],
    title:string[],
    author:string[],
    loading: boolean
}

export enum Constants {
    ADD_ITEM = 'ADD_ITEM',
    SET_LOADING = 'SET_LOADING',
}

