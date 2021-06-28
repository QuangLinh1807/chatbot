/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { GET_TOKEN, GET_BOT } from './constants';

// The initial state of the App
export const initialState = {
    loading: false,
    error: false,
    answer: false,
    token: false,
    botId: false
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {

            case GET_TOKEN:
                draft.token = action.token;
                break;

            case GET_BOT:
                draft.botId = action.botId;
                break;
        }
    });

export default appReducer;
