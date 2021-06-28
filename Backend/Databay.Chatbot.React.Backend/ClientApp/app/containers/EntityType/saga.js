import { call, put, select, takeLatest, takeEvery } from 'redux-saga/effects';
import { makeSelectToken, makeSelectBot } from '../App/selectors';
//import { makeSelectBot} from '../HomePage/selectors';

import {
    ENTITY_TYPE_ADD_REQUEST,
    ENTITY_TYPE_EDIT_REQUEST,
    GET_ENTITY_TYPE_REQUEST,
    LOAD_ENTITY_TYPE_REQUEST,
    ENTITY_TYPE_DELETE_REQUEST

} from './constants';

import {
    addentityTypeSuccess,
    addentityTypeError,

    editEntityTypeSuccess,
    editEntityTypeFalse,

    getEntityTypeSuccess,
    getEntityTypeFalse,

    loadEntityTypeError,
    loadEntityTypeSuccess,

    deleteEntityTypeRequest,
    deleteEntityTypeSuccess,
    deleteEntityTypeFalse,
    changePageOption
} from './actions';

import request from 'utils/request';
import { API_URL } from 'utils/constants';
import {
    makeSelectEntityType,
    //makeSelectName,
    //makeSelectDesc,
    makeSelectID,
    makeSelectPage,
    makeSelectSizePerPage,
    makeSelectSearch,
    makeSelectOrderColumn,
    makeSelectOrder
} from 'containers/EntityType/selectors';

// form list entityType
export function* loadEntityTypes() {
    const bot = yield select(makeSelectBot());
    const token = yield select(makeSelectToken());
    const pageIndex = yield select(makeSelectPage());
    const pageSize = yield select(makeSelectSizePerPage());
    const orderColumn = yield select(makeSelectOrderColumn());
    const order = yield select(makeSelectOrder());
    const search = yield select(makeSelectSearch());
    const param = `?botid=${bot}&keyword=${search}&orderColumn=${orderColumn}&sortColumnDirection=${order}&pageIndex=${pageIndex}&pageSize=${pageSize}`;
    const requestURL = `${API_URL}/api/v1/entityTypes` + param;
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${token}`
        },
    };

    try {
        const req = yield call(request, requestURL, requestOptions);
        yield put(loadEntityTypeSuccess(req));
    } catch (err) {
        yield put(loadEntityTypeError(err));
    }
}

export function* getEntityType() {
    const token = yield select(makeSelectToken());
    const id = yield select(makeSelectID());
    const bot = yield select(makeSelectBot());
    const requestURL = `${API_URL}/api/v1/entityTypes/${bot}/${id}`;

    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${token}`
        },
    };

    try {
        const req = yield call(request, requestURL, requestOptions);
        yield put(getEntityTypeSuccess(req));
    } catch (err) {
        yield put(getEntityTypeFalse(err));
    }
}

export function* editEntityType() {
    const bot = yield select(makeSelectBot());
    const token = yield select(makeSelectToken());
    const id = yield select(makeSelectID());
    const item = yield select(makeSelectEntityType());

    const requestURL = `${API_URL}/api/v1/entityTypes/`;
    let requestOptions;
    //debugger;
    if (id !== '') {
        var entityType = {
            botId: bot,
            internalId: id,
            name: item.name,
            description: item.description,
            extractionMethod: item.extractionMethod,
        }
        requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`
            },
            body: JSON.stringify(entityType)
        };

    } else {
        var entityType = {
            botid: bot,
            name: item.name,
            description: item.description,
            extractionMethod: item.extractionMethod,
        }

        requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`
            },
            body: JSON.stringify(entityType)
        };
    }

    try {
        const req = yield call(request, requestURL, requestOptions);
        yield put(editEntityTypeSuccess(req));
    } catch (err) {
        yield put(editEntityTypeFalse(err));
    }
}

export function* deleteEntityType() {
    const bot = yield select(makeSelectBot());
    const token = yield select(makeSelectToken());
    const id = yield select(makeSelectID());

    const requestURL = `${API_URL}/api/v1/entityTypes/${bot}/${id}`;
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${token}`
        },
    };

    try {
        const req = yield call(request, requestURL, requestOptions);
        yield put(deleteEntityTypeSuccess(req));
    } catch (err) {
        yield put(deleteEntityTypeFalse(err));
    }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* entityTypeData() {
    yield takeLatest(LOAD_ENTITY_TYPE_REQUEST, loadEntityTypes);
    //yield takeLatest(ENTITY_TYPE_ADD_REQUEST, addEntityType);
    yield takeLatest(GET_ENTITY_TYPE_REQUEST, getEntityType);
    yield takeLatest(ENTITY_TYPE_EDIT_REQUEST, editEntityType);
    yield takeLatest(ENTITY_TYPE_DELETE_REQUEST, deleteEntityType);
}
