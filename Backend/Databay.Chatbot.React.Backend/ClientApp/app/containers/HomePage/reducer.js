/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from "immer";
import {
  BOT_LIST_REQUEST,
  BOT_LIST_SUCCESS,
  BOT_LIST_FAIL,
  CHANGE_SUGGESTION_VALUE,
  CHANGE_SUGGESTIONS,
  CREATE_BOT_REQUEST,
  CREATE_BOT_SUCCESS,
  CREATE_BOT_FAILURE,
  BOT_CHANGE_NAME,
  CHANGE_ADD_BOT,
  BOT_CHANGE_DESCRIPTION,
  ON_TOGGLE,
  ON_TOGGLE_BOT_NAME,
  BOT_DELETE_REQUEST,
  BOT_DELETE_FAILURE,
  BOT_DELETE_SUCCESS,
  CHANGE_BOT,
  BOT_EDIT_REQUEST,
  BOT_EDIT_SUCCESS,
  BOT_EDIT_FAILURE,
  USERS_CHANGE_BUSINESS,
  CHANGE_SEARCH,
} from "./constants";

// The initial state of the App
export const initialState = {
  bots: false,
  bot: "",
  error: false,
  suggestionValue: "",
  suggestions: [],
  name: "",
  description: "",
  modal: false,
  botId: "",
  business: "",
  bot_name: "",
  search: "",
};

/* eslint-disable default-case, no-param-reassign */
const homeReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case BOT_LIST_REQUEST:
        //draft.bots = false;
        //draft.bot = '';
        break;

      case BOT_LIST_SUCCESS:
        draft.bots = action.bots.data;
        break;

      case BOT_LIST_FAIL:
        draft.error = action.error;
        break;

      case CHANGE_SUGGESTION_VALUE:
        draft.suggestionValue = action.suggestionValue;
        break;

      case CHANGE_SUGGESTIONS:
        draft.suggestions = action.suggestions;
        break;

      case CREATE_BOT_REQUEST:
        break;

      case CREATE_BOT_SUCCESS:
        draft.bot = action.bot_name;
        draft.business = "";
        draft.name = "";
        draft.description = "";
        break;

      case CREATE_BOT_FAILURE:
        draft.error = action.error;
        break;

      case BOT_CHANGE_NAME:
        draft.name = action.bot_name;
        break;

      case CHANGE_ADD_BOT:
        draft.name = action.bot_name;
        break;

      case BOT_CHANGE_DESCRIPTION:
        draft.description = action.bot_description;
        break;

      case ON_TOGGLE:
        draft.business = "";
        draft.name = "";
        draft.description = "";
        draft.modal = !draft.modal;
        break;

      case BOT_DELETE_REQUEST:
        break;

      case BOT_DELETE_SUCCESS:
        draft.bot = action.bot_name;
        break;

      case BOT_DELETE_FAILURE:
        draft.error = action.error;
        break;

      case CHANGE_BOT:
        draft.botId = action.botId;
        break;

      case BOT_EDIT_REQUEST:
        break;

      case BOT_EDIT_SUCCESS:
        draft.bot_name = "";
        draft.name = action.name;
        break;

      case BOT_EDIT_FAILURE:
        draft.error = action.error;
        break;

      case USERS_CHANGE_BUSINESS:
        draft.business = action.business;
        break;

      case CHANGE_SEARCH:
        draft.search = action.bot_name;
        break;
    }
  });

export default homeReducer;
