import { call, put, select, takeLatest, takeEvery } from 'redux-saga/effects';
import { makeSelectToken, makeSelectBot } from '../App/selectors';
//import { makeSelectBot} from '../HomePage/selectors';

import {
    INTENT_ADD_REQUEST,
    INTENT_EDIT_REQUEST,
    GET_INTENT_REQUEST,
    LOAD_INTENT_REQUEST,
    INTENT_DELETE_REQUEST,
    RESPONSE_ADD_REQUEST,
    LOAD_RESPONSE_REQUEST,
    RESPONSE_DELETE_REQUEST,
    RESPONSE_DETAIL_ADD_REQUEST,
    INTENT_SELECT_LIST_REQUEST,
    RESPONSE_DETAIL_DELETE_REQUEST,
    UPLOAD_RESPONSE_DETAIL_IMAGE_REQUEST
} from './constants';

import {
    addintentSuccess,
    addintentError,

    editIntentSuccess,
    editIntentFalse,

    getIntentSuccess,
    getIntentFalse,

    loadIntentError,
    loadIntentSuccess,

    deleteIntentRequest,
    deleteIntentSuccess,
    deleteIntentFalse,
    changePageOption,

    // for response 

    addResponseSuccess,
    addResponseError,

    loadResponseSuccess,
    loadResponseError,

    deleteResponseSuccess,
    deleteResponseError,

    editResponseSuccess,
    editResponseError,
    addResponseDetailSuccess,
    addResponseDetailError,
    getIntentSelectListSuccess,
    getIntentSelectListFalse,
    deleteResponseDetailSuccess,
    deleteResponseDetailError,

    responseDetailChangeImageSuccess,
    responseDetailChangeImageFailure,

} from './actions';

import request from 'utils/request';
import { API_URL } from 'utils/constants';
import {
    makeSelectIntent,
    //makeSelectName,
    //makeSelectDesc,
    makeSelectID,
    makeSelectPage,
    makeSelectSizePerPage,
    makeSelectSearch,
    makeSelectOrderColumn,
    makeSelectOrder,
    makeSelectResponseID,
    makeSelectResponseDetail,
    makeResponseDetailtext,
    makeSelectSelectIntentId,
    makeSelectResponseDetailID,

    makeSelectUploadFile,
    makeSelectUploadedFile,
    makeSelectResponseDetailType
} from 'containers/Intent/selectors';

// form list intent
export function* loadIntents() {
    const bot = yield select(makeSelectBot());
    const token = yield select(makeSelectToken());
    const pageIndex = yield select(makeSelectPage());
    const pageSize = yield select(makeSelectSizePerPage());
    const orderColumn = yield select(makeSelectOrderColumn());
    const order = yield select(makeSelectOrder());
    const search = yield select(makeSelectSearch());
    const param = `?botid=${bot}&keyword=${search}&orderColumn=${orderColumn}&sortColumnDirection=${order}&pageIndex=${pageIndex}&pageSize=${pageSize}`;
    const requestURL = `${API_URL}/api/v1/intents` + param;

    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${token}`
        },
    };

    try {
        const req = yield call(request, requestURL, requestOptions);
        yield put(loadIntentSuccess(req));
    } catch (err) {
        yield put(loadIntentError(err));
    }
}

// form list intent
export function* getIntentSelectList() {
    const bot = yield select(makeSelectBot());
    const token = yield select(makeSelectToken());
    const param = `?botid=${bot}`;
    const requestURL = `${API_URL}/api/v1/intents` + param;

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

export function* getIntent() {
    const token = yield select(makeSelectToken());
    const id = yield select(makeSelectID());
    const bot = yield select(makeSelectBot());
    const requestURL = `${API_URL}/api/v1/intents/${bot}/${id}`;

    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${token}`
        },
    };

    try {
        const req = yield call(request, requestURL, requestOptions);
        yield put(getIntentSuccess(req));
    } catch (err) {
        yield put(getIntentFalse(err));
    }
}

export function* editIntent() {
    const bot = yield select(makeSelectBot());
    const token = yield select(makeSelectToken());
    const id = yield select(makeSelectID());
    const item = yield select(makeSelectIntent());

    const requestURL = `${API_URL}/api/v1/intents/`;
    let requestOptions;

    if (id !== '') {
        var intent = {
            botId: bot,
            internalId: id,
            name: item.name,
            description: item.description
        }

        requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`
            },
            body: JSON.stringify(intent)
        };

    } else {
        var intent = {
            botid: bot,
            name: item.name,
            description: item.description
        }

        requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`
            },
            body: JSON.stringify(intent)
        };
    }

    try {
        const req = yield call(request, requestURL, requestOptions);
        yield put(editIntentSuccess(req));
    } catch (err) {
        yield put(editIntentFalse(err));
    }
}

export function* deleteIntent() {
    const bot = yield select(makeSelectBot());
    const token = yield select(makeSelectToken());
    const id = yield select(makeSelectID());

    const requestURL = `${API_URL}/api/v1/intents/${bot}/${id}`;
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${token}`
        },
    };

    try {
        const req = yield call(request, requestURL, requestOptions);
        yield put(deleteIntentSuccess(req));
    } catch (err) {
        yield put(deleteIntentFalse(err));
    }
}

export function* addResponse() {
    const bot = yield select(makeSelectBot());
    const token = yield select(makeSelectToken());
    const intentid = yield select(makeSelectID());
    //const intentid = yield select(makeSelectSelectIntentId());

    const requestURL = `${API_URL}/api/v1/responses`;

    var response = {
        botid: bot,
        intentid: intentid
    };
    
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${token}`
        },
        body: JSON.stringify(response)
    };

    try {
        const req = yield call(request, requestURL, requestOptions);
        yield put(addResponseSuccess(req));
    } catch (err) {
        yield put(addResponseError(err));
    }
}

export function* loadResponses() {
    const bot = yield select(makeSelectBot());
    const token = yield select(makeSelectToken());
    const intentid = yield select(makeSelectID());
    const param = `?botid=${bot}&intentid=${intentid}`;
    const requestURL = `${API_URL}/api/v1/responses` + param;
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${token}`
        },
    };

    try {
        const req = yield call(request, requestURL, requestOptions);
        yield put(loadResponseSuccess(req));
    } catch (err) {
        yield put(loadResponseError(err));
    }
}

export function* deleteResponse() {

    const bot = yield select(makeSelectBot());
    const token = yield select(makeSelectToken());
    const intentid = yield select(makeSelectID());
    const responseid = yield select(makeSelectResponseID());
    const param = `/${bot}/${intentid}/${responseid}`;
    const requestURL = `${API_URL}/api/v1/responses` + param;

    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${token}`
        },
    };

    try {
        const req = yield call(request, requestURL, requestOptions);
        yield put(deleteResponseSuccess(req));
        //console.log(req);
    } catch (err) {
        yield put(deleteResponseError(err));
    }
}


export function* addResponseDetail() {
    const bot = yield select(makeSelectBot());
    const token = yield select(makeSelectToken());
    const intentid = yield select(makeSelectID());
    //const rpDetail = yield select(makeSelectResponseDetail());
    var rpDetailText = yield select(makeResponseDetailtext());
    const responseid = yield select(makeSelectResponseID());
    const requestURL = `${API_URL}/api/v1/ResponseDetails`;
    const responsedetailid = yield select(makeSelectResponseDetailID());

    const responseDetailType = yield select(makeSelectResponseDetailType());
    var uploadedFile = '';
    if (responseDetailType == 'text') {
        uploadedFile = '';
    } else if (responseDetailType == 'image') {
        yield* uploadResponseDetailImage();
        uploadedFile = yield select(makeSelectUploadedFile());
        rpDetailText = '';
    } else {
        uploadedFile = '';
        rpDetailText = '';
    }
    console.log('saga' + uploadedFile);
    
    var responseDetail = {
        botid: bot,
        intentid: intentid,
        responseid: responseid,
        internalid: responsedetailid,
        text: rpDetailText,
        imageurl: uploadedFile,
        type: responseDetailType
    };
    var methodOption = responsedetailid == "" ? "POST" : "PUT";
    const requestOptions = {
        method: methodOption,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${token}`
        },

        body: JSON.stringify(responseDetail)
    };

    try {
        const req = yield call(request, requestURL, requestOptions);
        yield put(addResponseDetailSuccess(req));
        yield* loadResponses();
    } catch (err) {
        yield put(addResponseDetailError(err));
    }
}

export function* deleteResponseDetail() {
    const bot = yield select(makeSelectBot());
    const token = yield select(makeSelectToken());
    const intentid = yield select(makeSelectID());
    const responseid = yield select(makeSelectResponseID());
    const responsedetailid = yield select(makeSelectResponseDetailID());
    const param = `/${bot}/${intentid}/${responseid}/${responsedetailid}`;
    const requestURL = `${API_URL}/api/v1/ResponseDetails` + param;

    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${token}`
        },
    };

    try {
        const req = yield call(request, requestURL, requestOptions);
        yield put(deleteResponseDetailSuccess(req));
    } catch (err) {
        yield put(deleteResponseDetailError(err));
    }
}

export function* uploadResponseDetailImage() {
    const token = yield select(makeSelectToken());
    const file = yield select(makeSelectUploadFile());

    const requestURL = `${API_URL}/api/v1/fileapi/upload-file`;
    const data = new FormData();
    
    //data.append('file', file);
    for (var x = 0; x < file.length; x++) {
        data.append('file', file[x])
    }

    const requestOptions = {
        method: 'POST',
        headers: {
            'Authorization': `bearer ${token}`
        },
        body: data
    };
    
    try {
        const req = yield call(request, requestURL, requestOptions);
        yield put(responseDetailChangeImageSuccess(req));
    } catch (err) {
        yield put(responseDetailChangeImageFailure(err));
    }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* intentData() {
    yield takeLatest(LOAD_INTENT_REQUEST, loadIntents);
    yield takeLatest(INTENT_SELECT_LIST_REQUEST, getIntentSelectList);
    yield takeLatest(GET_INTENT_REQUEST, getIntent);
    yield takeLatest(INTENT_EDIT_REQUEST, editIntent);
    yield takeLatest(INTENT_DELETE_REQUEST, deleteIntent);
    yield takeLatest(RESPONSE_ADD_REQUEST, addResponse);
    yield takeLatest(LOAD_RESPONSE_REQUEST, loadResponses);
    yield takeLatest(RESPONSE_DELETE_REQUEST, deleteResponse);
    yield takeLatest(RESPONSE_DETAIL_ADD_REQUEST, addResponseDetail);
    yield takeLatest(RESPONSE_DETAIL_DELETE_REQUEST, deleteResponseDetail);
    yield takeLatest(UPLOAD_RESPONSE_DETAIL_IMAGE_REQUEST, uploadResponseDetailImage);
}
