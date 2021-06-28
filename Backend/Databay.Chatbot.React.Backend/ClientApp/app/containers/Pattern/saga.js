import { call, put, select, takeLatest, takeEvery } from 'redux-saga/effects';
import { makeSelectToken, makeSelectBot } from '../App/selectors';
//import { makeSelectBot} from '../HomePage/selectors';

import {
    //PATTERN_ADD_REQUEST,
    PATTERN_EDIT_REQUEST,
    GET_PATTERN_REQUEST,
    LOAD_PATTERN_REQUEST,
    LOAD_INTENT_REQUEST,
    PATTERN_DELETE_REQUEST,
    ENTITY_ADD_REQUEST,
    LOAD_ENTITY_TYPE_REQUEST,
    PATTERN_INTENT_SELECT_LIST_REQUEST,
    LOAD_ENTITY_REQUEST,

    DELETE_ENTITY_REQUEST
} from './constants';


import {
    addpatternSuccess,
    addpatternError,

    editPatternSuccess,
    editPatternFalse,

    getPatternSuccess,
    getPatternFalse,

    loadPatternError,
    loadPatternSuccess,

    deletePatternRequest,
    deletePatternSuccess,
    deletePatternFalse,
    changePageOption,
    addEntitySuccess,
    addEntityError,

    getIntentSelectListSuccess,
    getIntentSelectListFalse,

    loadIntentError,
    loadIntentSuccess,

    loadEntityTypeSuccess,
    loadEntityTypeError,

    loadEntitySuccess,
    loadEntityError,

    deleteEntitySuccess,
    deleteEntityError

} from './actions';

import request from 'utils/request';
import { API_URL } from 'utils/constants';

import {
    makeSelectIntent,
    makeSelectPattern,
    //makeSelectTemplateSentence,
    makeSelectID,
    makeSelectPage,
    makeSelectSizePerPage,
    makeSelectSearch,
    makeSelectOrderColumn,
    makeSelectOrder,
    makeSelectEntityText,
    makeSelectIntentID,
    makeSelectSelectIntentId,
    makeSelectEntity,
} from 'containers/Pattern/selectors';
import { makeSelectEntities } from './selectors';

// form list pattern
export function* loadPatterns() {
    const botid = yield select(makeSelectBot());
    const token = yield select(makeSelectToken());
    const pageIndex = yield select(makeSelectPage());
    const pageSize = yield select(makeSelectSizePerPage());
    const orderColumn = yield select(makeSelectOrderColumn());
    const order = yield select(makeSelectOrder());
    const search = yield select(makeSelectSearch());
    const param = `?botid=${botid}&keyword=${search}&orderColumn=${orderColumn}&sortColumnDirection=${order}&pageIndex=${pageIndex}&pageSize=${pageSize}`;
    const requestURL = `${API_URL}/api/v1/Patterns` + param;
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${token}`
        },
    };

    try {
        const req = yield call(request, requestURL, requestOptions);
        yield put(loadPatternSuccess(req));
    } catch (err) {
        yield put(loadPatternError(err));
    }
}

export function* getPattern() {
    const token = yield select(makeSelectToken());
    const patternid = yield select(makeSelectID());
    const intentid = yield select(makeSelectIntentID());
    //debugger;
    const botid = yield select(makeSelectBot());
    const requestURL = `${API_URL}/api/v1/patterns/${botid}/${intentid}/${patternid}`;
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${token}`
        },
    };
    try {
        const req = yield call(request, requestURL, requestOptions);
        //console.log("Day la ket qua get ", req);
        yield put(getPatternSuccess(req));
    } catch (err) {
        yield put(getPatternFalse(err));
    }
}

export function* editPattern() {
    const botid = yield select(makeSelectBot());
    const token = yield select(makeSelectToken());
    const patternid = yield select(makeSelectID());
    const intentid = yield select(makeSelectIntentID());
    //const intentid = yield select(makeSelectSelectIntentId());
    //const templateSentence = yield select(makeSelectTemplateSentence());
    const item = yield select(makeSelectPattern());
    const requestURL = `${API_URL}/api/v1/Patterns/`;
    let requestOptions;
    //const requestURL = `http://10.0.0.243:5803/api/v1/patterns/`;
    //debugger;
    if (patternid != '') {
        var pattern = {
            botid: botid,
            intentid: intentid,
            internalId: patternid,
            templateSentence: item.templateSentence
        }

        requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`
            },
            body: JSON.stringify(pattern)
        };
    } else {
        var pattern = {
            botid: botid,
            intentid: intentid,
            templateSentence: item.templateSentence,
        }
        requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`
            },
            body: JSON.stringify(pattern)
        };
    }
    //debugger;
    try {
        const req = yield call(request, requestURL, requestOptions);
        yield put(editPatternSuccess(req));
    } catch (err) {
        yield put(editPatternFalse(err));
    }
}

export function* deletePattern() {
    

    const botid = yield select(makeSelectBot());
    const token = yield select(makeSelectToken());
    const patternid = yield select(makeSelectID());
    const intentid = yield select(makeSelectIntentID());
    const requestURL = `${API_URL}/api/v1/patterns/${botid}/${intentid}/${patternid}`;
    //debugger;
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${token}`
        },
    };
    try {
        const req = yield call(request, requestURL, requestOptions);
        yield put(deletePatternSuccess(req));
    } catch (err) {
        yield put(deletePatternFalse(err));
    }
}

export function* addEntity() {
    const botid = yield select(makeSelectBot());
    const token = yield select(makeSelectToken());
    const intentid = yield select(makeSelectIntentID());
    const patternid = yield select(makeSelectID());
    //const name = yield select(makeSelectEntityText());
    //const entities = yield select(makeSelectEntities());
    //const item = entities[entities.length-1]
    //const name = 'Nothing!!!!!!!!!!!!!'
    const selectEntity = yield select(makeSelectEntity());
    const requestURL = `${API_URL}/api/v1/entities`;
    //debugger;
    var entity = {
        botid: botid,
        intentid: intentid,
        patternId: patternid,
        internalId: selectEntity.internalId,
        name: selectEntity.name,
        //description:'chua co gi',
        entityTypeId: selectEntity.entityTypeId
    }
    //debugger;
    var methodOption = selectEntity.internalId == "" ? "POST" : "PUT";
    const requestOptions = {
        method: methodOption,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${token}`
        },
        body: JSON.stringify(entity)

    };
    try {
        const req = yield call(request, requestURL, requestOptions);
        //debugger;
        yield put(addEntitySuccess(req));
    } catch (err) {
        yield put(addEntityError(err));
    }
}

export function* loadEntityTypes() {
    const bot = yield select(makeSelectBot());
    const token = yield select(makeSelectToken());
    //const pageIndex = yield select(makeSelectPage());
    //const pageSize = yield select(makeSelectSizePerPage());
    //const param = `?botid=${bot}&keyword=&orderColumn=Name&pageIndex=${pageIndex}&pageSize=${pageSize}`;
    const param = `?botid=${bot}`;

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
        //debugger;
        yield put(loadEntityTypeSuccess(req));
    } catch (err) {
        yield put(loadEntityTypeError(err));
    }

}

export function* getIntentSelectList() {
    
    const bot = yield select(makeSelectBot());
    const token = yield select(makeSelectToken());
    const param = `?botid=${bot}`;
    const requestURL = `${API_URL}/api/v1/intents` + param;
    //debugger;
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${token}`
        },
    };
    try {
        const req = yield call(request, requestURL, requestOptions);
        yield put(getIntentSelectListSuccess(req));
    } catch (err) {
        yield put(getIntentSelectListFalse(err));
    }
}

export function* getEntities() {


    const botid = yield select(makeSelectBot());
    const token = yield select(makeSelectToken());
    const intentid = yield select(makeSelectIntentID());
    const patternid = yield select(makeSelectID());
    const param = `/${botid}/${intentid}/${patternid}`;
    const requestURL = `${API_URL}/api/v1/entities` + param;
    //debugger;
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${token} `
        },
    };
    //debugger;
    try {
        const req = yield call(request, requestURL, requestOptions);
        //console.log("Day la ket qua get ", req);
        //debugger;
        yield put(loadEntitySuccess(req));
    } catch (err) {
        yield put(loadEntityError(err));
    }
}


export function* deleteEntity() {

    const botid = yield select(makeSelectBot());
    const token = yield select(makeSelectToken());
    const intentid = yield select(makeSelectIntentID());
    const patternid = yield select(makeSelectID());
    const entitySelect = yield select(makeSelectEntity());
    var entityID = entitySelect.internalId;
    //debugger;

    const param = `/${botid}/${intentid}/${patternid}/${entityID}`;
    const requestURL = `${API_URL}/api/v1/entities` + param;
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${token} `
        },
    };

    try {
        const req = yield call(request, requestURL, requestOptions);
        //debugger;
        yield put(deleteEntitySuccess(req));
    } catch (err) {
        yield put(deleteEntityError(err));
    }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* patternData() {
    yield takeLatest(LOAD_PATTERN_REQUEST, loadPatterns);
    yield takeLatest(GET_PATTERN_REQUEST, getPattern);
    yield takeLatest(PATTERN_EDIT_REQUEST, editPattern);
    yield takeLatest(PATTERN_DELETE_REQUEST, deletePattern);
    yield takeLatest(ENTITY_ADD_REQUEST, addEntity);
    yield takeLatest(LOAD_ENTITY_TYPE_REQUEST, loadEntityTypes);
    yield takeLatest(PATTERN_INTENT_SELECT_LIST_REQUEST, getIntentSelectList);
    yield takeLatest(LOAD_ENTITY_REQUEST, getEntities);
    yield takeLatest(DELETE_ENTITY_REQUEST, deleteEntity);

}
