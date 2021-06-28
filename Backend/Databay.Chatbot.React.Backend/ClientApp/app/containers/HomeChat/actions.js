/*
 * Home Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
    CHANGE_MESSAGE,
    PUSH_MESSAGE,
    HOME_CHAT_REQUEST,
    HOME_CHAT_SUCCESS,
    HOME_CHAT_FAILURE
} from './constants';
/**
 * Changes the input field of the form
 *
 * @param  {string} username The new text of the input field
 *
 * @return {object} An action object with a type of CHANGE_USERNAME
 */
export function changeMessage(message) {
  return {
    type: CHANGE_MESSAGE,
    message,
  };
}

export function pushMessage(message) {
    return {
        type: PUSH_MESSAGE,
        message,
    };
}
export function chatRequest(botId) {
    return {
        type: HOME_CHAT_REQUEST,
        botId
    };
}

export function chatSuccess(message, answer) {
    return {
        type: HOME_CHAT_SUCCESS,
        message,
        answer,
    };
}

export function chatError(error) {
    return {
        type: HOME_CHAT_FAILURE,
        error,
    };
}
