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

export const CHANGE_MESSAGE = 'BACKEND/HomeChat/CHANGE_MESSAGE';
export const PUSH_MESSAGE = 'BACKEND/HomeChat/PUSH_MESSAGE';
export const HOME_CHAT_REQUEST = 'BACKEND/HomeChat/HOME_CHAT_REQUEST';
export const HOME_CHAT_SUCCESS = 'BACKEND/HomeChat/HOME_CHAT_SUCCESS';
export const HOME_CHAT_FAILURE = 'BACKEND/HomeChat/HOME_CHAT_FAILURE';
