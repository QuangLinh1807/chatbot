/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from "redux-saga/effects";
import {
  BOT_LIST_REQUEST,
  CREATE_BOT_REQUEST,
  BOT_DELETE_REQUEST,
  BOT_EDIT_REQUEST,
} from "./constants";
import {
  getBotsSuccess,
  getBotsFail,
  getCreateBotsSuccess,
  getCreateBotsError,
  deleteBotRequest,
  deleteBotSuccess,
  deleteBotFalse,
  editBotSuccess,
  editBotError,
} from "./actions";

import request from "utils/request";
import { API_URL } from "utils/constants";
import { makeSelectToken } from "../App/selectors";

import {
  makeSelectBot,
  makeSelectID,
  makeSelectBotName,
  makeSelectBotDescription,
} from "./selectors";

/**
 * Github repos request/response handler
 */
export function* getBots() {
  const token = yield select(makeSelectToken());
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    },
  };

  const requestURL = `${API_URL}/api/v1/bots`;
  try {
    const bots = yield call(request, requestURL, requestOptions);
    yield put(getBotsSuccess(bots));
  } catch (err) {
    yield put(getBotsFail(err));
  }
}

export function* addBot() {
  const token = yield select(makeSelectToken());
  const name = yield select(makeSelectBotName());
  const description = yield select(makeSelectBotDescription());
  var bot = {
    name: name,
    description: description,
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    },
    body: JSON.stringify(bot),
  };

  const requestURL = `${API_URL}/api/v1/bots`;
  try {
    const bots = yield call(request, requestURL, requestOptions);
    yield put(getCreateBotsSuccess(bots));
  } catch (err) {
    yield put(getCreateBotsError(err));
  }
}

//delete bot
export function* deleteBot() {
  const botId = yield select(makeSelectID());
  const token = yield select(makeSelectToken());
  const requestURL = `${API_URL}/api/v1/bots/${botId}`;
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    },
  };
  try {
    const bots = yield call(request, requestURL, requestOptions);
    yield put(deleteBotSuccess(bots));
  } catch (err) {
    yield put(deleteBotFalse(err));
  }
}

//edit bot name
export function* editBotName() {
  const token = yield select(makeSelectToken());
  const botId = yield select(makeSelectID());
  const name = yield select(makeSelectBotName());
  const requestURL = `${API_URL}/api/v1/bots`;
  let requestOptions;
  if (botId !== "") {
    var bot = {
      internalId: botId,
      name: name,
    };

    requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
      body: JSON.stringify(bot),
    };
  }
  try {
    const bots = yield call(request, requestURL, requestOptions);
    yield put(editBotSuccess(bots));
  } catch (err) {
    yield put(editBotError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* githubData() {
  yield takeLatest(BOT_LIST_REQUEST, getBots);
  yield takeLatest(CREATE_BOT_REQUEST, addBot);
  yield takeLatest(BOT_DELETE_REQUEST, deleteBot);
  yield takeLatest(BOT_EDIT_REQUEST, editBotName);
}
