import { action } from 'typesafe-actions';
import { Constants } from './types';

export function addItemToList(item: string) {
    return action(Constants.EDIT_BOOK, {
        item
    });
}


export function setLoading(loading: boolean) {
    return action(Constants.REMOVE_BOOK, {
        loading
    });
}