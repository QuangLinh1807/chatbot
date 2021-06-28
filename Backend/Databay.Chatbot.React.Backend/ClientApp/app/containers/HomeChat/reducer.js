/*
 * HomeChatReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import uuid from 'uuid';
import { HubConnectionBuilder } from '@aspnet/signalr/dist/browser/signalr.min.js';
import {
    CHANGE_MESSAGE,
    PUSH_MESSAGE,
    HOME_CHAT_REQUEST,
    HOME_CHAT_SUCCESS,
    HOME_CHAT_FAILURE,
} from './constants';
import { SIGNALR_URL } from 'utils/constants';

// The initial state of the App
export const initialState = {
    message: '',
    loading: false,
    error: false,
    answer: [],
    groupName: uuid.v4(),
    hubConnection: new HubConnectionBuilder().withUrl(SIGNALR_URL).build()
    //answer: false,
    //messageList: []
};

const homeChatReducer = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case CHANGE_MESSAGE:
                draft.message = action.message;
                break;

            case PUSH_MESSAGE:
                draft.answer = [...draft.answer, action.message];
                break;

            case HOME_CHAT_REQUEST:
                //draft.loading = true;
                //draft.error = false;
                ////draft.answer = false;

                var msg = {
                    Text: draft.message,
                    Type: "text",
                    msgType: 1
                }
                draft.answer = [...draft.answer, msg];

                draft.hubConnection
                    .invoke('SendMessageToGroup', draft.groupName, draft.message, action.botId)
                    .catch(err => console.error(err));
                draft.message = "";
                break;

            case HOME_CHAT_SUCCESS:
                draft.answer = [...draft.answer, action.answer.message];
                draft.loading = false;
                break;

            case HOME_CHAT_FAILURE:
                draft.error = action.error;
                draft.loading = false;
                break;
        }
    });

export default homeChatReducer;
