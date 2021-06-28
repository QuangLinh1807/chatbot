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
  BOT_LIST_REQUEST,
  BOT_LIST_SUCCESS,
  BOT_LIST_FAIL,
  CHANGE_SUGGESTION_VALUE,
  CHANGE_SUGGESTIONS,
  CHANGE_BOT,
  CREATE_BOT_REQUEST,
  CREATE_BOT_SUCCESS,
  CREATE_BOT_FAILURE,
  BOT_CHANGE_NAME,
  BOT_CHANGE_DESCRIPTION,
  ON_TOGGLE,
  BOT_DELETE_REQUEST,
  BOT_DELETE_FAILURE,
  BOT_DELETE_SUCCESS,
  BOT_EDIT_REQUEST,
  BOT_EDIT_SUCCESS,
  BOT_EDIT_FAILURE,
  USERS_CHANGE_BUSINESS,
  CHANGE_ADD_BOT,
  CHANGE_SEARCH,
} from "./constants";

/**
 * Changes the input field of the form
 *
 * @param  {string} username The new text of the input field
 *
 * @return {object} An action object with a type of CHANGE_USERNAME
 */
export function requestBots() {
  return {
    type: BOT_LIST_REQUEST,
  };
}

export function getBotsSuccess(bots) {
  return {
    type: BOT_LIST_SUCCESS,
    bots,
  };
}

export function getBotsFail(error) {
  return {
    type: BOT_LIST_FAIL,
    error,
  };
}
export function changeSuggestionValue(suggestionValue) {
  return {
    type: CHANGE_SUGGESTION_VALUE,
    suggestionValue,
  };
}
export function getSuggestions(value) {
  return {
    type: CHANGE_SUGGESTION_VALUE,
    suggestionValue,
  };
}
export function changeSuggestions(suggestions) {
  return {
    type: CHANGE_SUGGESTIONS,
    suggestions,
  };
}

export function changeBot(botId) {
  return {
    type: CHANGE_BOT,
    botId,
  };
}

export function requestCreateBot() {
  return {
    type: CREATE_BOT_REQUEST,
  };
}

export function getCreateBotsSuccess(bot) {
  return {
    type: CREATE_BOT_SUCCESS,
    bot,
  };
}

export function getCreateBotsError(error) {
  return {
    type: CREATE_BOT_FAILURE,
    error,
  };
}

export function changeBotName(bot_name) {
  return {
    type: BOT_CHANGE_NAME,
    bot_name,
  };
}

export function changeBotAdd(bot_name) {
  return {
    type: CHANGE_ADD_BOT,
    bot_name,
  };
}

export function changeBotDescription(bot_description) {
  return {
    type: BOT_CHANGE_DESCRIPTION,
    bot_description,
  };
}

export function onToggle() {
  return {
    type: ON_TOGGLE,
  };
}

//delete bot
export function deleteBotRequest() {
  return {
    type: BOT_DELETE_REQUEST,
  };
}

export function deleteBotSuccess(botId) {
  return {
    type: BOT_DELETE_SUCCESS,
    botId,
  };
}

export function deleteBotFalse(err) {
  return {
    type: BOT_DELETE_FAILURE,
    err,
  };
}

//edit name
export function editBotRequest() {
  return {
    type: BOT_EDIT_REQUEST,
  };
}

export function editBotSuccess(name) {
  return {
    type: BOT_EDIT_SUCCESS,
    name,
  };
}

export function editBotError(err) {
  return {
    type: BOT_EDIT_FAILURE,
    err,
  };
}
export function changeBusiness(business) {
  return {
    type: USERS_CHANGE_BUSINESS,
    business,
  };
}

//search
export function changeSearch(bot_name) {
  return {
    type: CHANGE_SEARCH,
    bot_name,
  };
}
