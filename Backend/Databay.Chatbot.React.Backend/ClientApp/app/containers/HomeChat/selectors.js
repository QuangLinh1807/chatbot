/**
 * HomeChat selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHomeChat = state => state.homechat || initialState;

const makeSelectMessage = () =>
    createSelector(
        selectHomeChat,
        homeChatState => homeChatState.message,
    );

const makeSelectAnswer = () =>
    createSelector(
        selectHomeChat,
        homeChatState => homeChatState.answer,
    );

const makeSelectHubConnection = () =>
    createSelector(
        selectHomeChat,
        homeChatState => homeChatState.hubConnection,
    );

const makeSelectGroupName = () =>
    createSelector(
        selectHomeChat,
        homeChatState => homeChatState.groupName,
    );

export {
    selectHomeChat,
    makeSelectMessage,
    makeSelectAnswer,
    makeSelectHubConnection,
    makeSelectGroupName,
};
