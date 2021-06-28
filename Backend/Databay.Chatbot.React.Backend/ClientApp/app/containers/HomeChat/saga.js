/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { HOME_CHAT_REQUEST } from './constants';
import { chatSuccess, chatError } from './actions';

import request from 'utils/request';
import { makeSelectUsername } from 'containers/HomeChat/selectors';
import { makeSelectMessage } from './selectors';

import { API_URL } from 'utils/constants';

export function* getAnswer() {
    const message = yield select(makeSelectMessage());
    const requestURL = `${API_URL}/response/${message}`;

    try {
        const response = yield call(request, requestURL);
        yield put(chatSuccess(response));
    } catch (err) {
        yield put(chatError(err));
    }
}

export default function* githubData() {
    //yield takeLatest(HOME_CHAT_REQUEST, getAnswer);
}
