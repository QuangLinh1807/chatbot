/**
 * Homepage selectors
 */

import { createSelector } from "reselect";
import { initialState } from "./reducer";

const selectHome = (state) => state.home || initialState;
const makeSelectBots = () =>
  createSelector(
    selectHome,
    (homeState) => homeState.bots
  );

const makeSelectBot = () =>
  createSelector(
    selectHome,
    (homeState) => homeState.bot
  );
const makeSelectError = () =>
  createSelector(
    selectHome,
    (homeState) => homeState.error
  );
const makeSelectBotName = () =>
  createSelector(
    selectHome,
    (homeState) => homeState.name
  );
const makeSelectBotDescription = () =>
  createSelector(
    selectHome,
    (homeState) => homeState.description
  );

const makeSelectSuggestionValue = () =>
  createSelector(
    selectHome,
    (homeState) => homeState.suggestionValue
  );

const makeSelectSuggestions = () =>
  createSelector(
    selectHome,
    (homeState) => homeState.suggestions
  );
const makeSelectModal = () =>
  createSelector(
    selectHome,
    (homeState) => homeState.modal
  );

const makeSelectID = () =>
  createSelector(
    selectHome,
    (homeState) => homeState.botId
  );
const makeSelectBusiness = () =>
  createSelector(
    selectHome,
    (homeState) => homeState.business
  );

export {
  selectHome,
  makeSelectBots,
  makeSelectSuggestionValue,
  makeSelectSuggestions,
  makeSelectBot,
  makeSelectError,
  makeSelectBotName,
  makeSelectBotDescription,
  makeSelectModal,
  makeSelectID,
  makeSelectBusiness,
};
