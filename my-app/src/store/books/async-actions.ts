import { Dispatch } from 'redux';
import * as actions from './actions';
import { BookActions } from './types';

function sleep(timeout: number) {
    return new Promise<void>((resolve) => setTimeout(() => resolve(), timeout));
}

export async function addItemAsync(dispatch: Dispatch<BookActions>, item: string) {
    dispatch(actions.setLoading(true));

    await sleep(1000);

    dispatch(actions.addItemToList(item));
    dispatch(actions.setLoading(false));
}