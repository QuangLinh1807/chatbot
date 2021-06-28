/*
 * HomeConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const BOT_LIST_REQUEST = "boilerplate/Home/BOT_LIST_REQUEST";
export const BOT_LIST_SUCCESS = "boilerplate/Home/BOT_LIST_SUCCESS";
export const BOT_LIST_FAIL = "boilerplate/Home/BOT_LIST_FAIL";

export const CREATE_BOT = "boilerplate/Home/CREATE_BOT";
export const USERS_CHANGE_BUSINESS = "boilerplate/Home/USERS_CHANGE_BUSINESS";

//export const USER_ID_BOT_LIST_REQUEST = 'boilerplate/Home/USER_ID_BOT_LIST_REQUEST';
//export const USER_ID_BOT_LIST_SUCCESS = 'boilerplate/Home/USER_ID_BOT_LIST_SUCCESS';
//export const USER_ID_BOT_LIST_FAIL = 'boilerplate/Home/USER_ID_BOT_LIST_FAIL';

export const CHANGE_SUGGESTION_VALUE =
  "boilerplate/Home/CHANGE_SUGGESTION_VALUE";
export const CHANGE_SUGGESTIONS = "boilerplate/Home/CHANGE_SUGGESTIONS";
export const CHANGE_BOT = "boilerplate/Home/CHANGE_BOT";

export const CREATE_BOT_REQUEST = "boilerplate/Home/CREATE_BOT_REQUEST";
export const CREATE_BOT_SUCCESS = "boilerplate/Home/CREATE_BOT_SUCCESS";
export const CREATE_BOT_FAILURE = "boilerplate/Home/CREATE_BOT_FAILURE";

export const BOT_CHANGE_NAME = "boilerplate/Home/BOT_CHANGE_NAME";
export const CHANGE_ADD_BOT = "boilerplate/Home/CHANGE_ADD_BOT";
export const BOT_CHANGE_DESCRIPTION = "boilerplate/Home/BOT_CHANGE_DESCRIPTION";
export const ON_TOGGLE = "boilerplate/Home/ON_TOGGLE";
export const CHANGE_SEARCH = "boilerplate/Home/CHANGE_SEARCH";

// delete bot
export const BOT_DELETE_REQUEST = "boilerplate/Home/BOT_DELETE_REQUEST";
export const BOT_DELETE_SUCCESS = "boilerplate/Home/BOT_DELETE_SUCCESS";
export const BOT_DELETE_FAILURE = "boilerplate/Home/BOT_DELETE_FAILURE";

// edit name
export const BOT_EDIT_REQUEST = "boilerplate/Home/BOT_EDIT_REQUEST";
export const BOT_EDIT_SUCCESS = "boilerplate/Home/BOT_EDIT_SUCCESS";
export const BOT_EDIT_FAILURE = "boilerplate/Home/BOT_EDIT_FAILURE";
