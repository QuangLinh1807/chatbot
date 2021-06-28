import { call, put, select, takeLatest } from 'redux-saga/effects';
import { makeSelectToken, makeSelectBot } from '../App/selectors';
import { push } from 'connected-react-router'
//import { makeSelectBot} from '../HomePage/selectors';

import {
    TUTORIAL_ADD_BOT_REQUEST,
    ADD_INTENT_REQUEST,
    ADD_PATTERN_REQUEST,
    ADD_ENTITYTYPE_REQUEST,
    ENTITY_ADD_REQUEST,
    RESPONSE_ADD_REQUEST,
    RESPONSE_DETAIL_ADD_REQUEST,
    LOAD_RESPONSE_REQUEST,
    REDIRECT_TO_HOME_CHAT,
    ADD_DEFAULT_INTENT,
    ADD_DEFAULT_PATTERN,
    UPLOAD_RESPONSE_DETAIL_IMAGE_REQUEST
} from './constants';

import {
    //add tutorial bot
    addTutorialBotSuccess,
    addTutorialBotError,

    //add intent
    addIntentSuccess,
    addIntentError,

    //add pattern
    addPatternSuccess,
    addPatternError,

    //add entity type
    addEntityTypeSuccess,
    addEntityTypeError,

    //select entity
    addEntitySuccess,
    addEntityError,

    //add response && response detail
    addResponseSuccess,
    addResponseError,

    //add response detail
    addResponseDetailSuccess,
    addResponseDetailError,
    loadResponseSuccess,
    loadResponseError,

    responseDetailChangeImageSuccess,
    responseDetailChangeImageFailure,
} from './actions';

import request from 'utils/request';
import { API_URL } from 'utils/constants';
import {
    //add tutorial bot
    makeSelectTutorialBotName,
    makeSelectTutorialBotDescription,

    //add intent
    makeSelectIntentName,

    //add pattern
    makeSelectPatternTemplateSentence,

    //add entity type
    makeSelectEntityTypeName,

    //select entity
    makeSelectEntityText,
    makeSelectEntity,

    //add response && response detail
    makeSelectResponseID,
    makeSelectResponseDetail,
    makeResponseDetailtext,
    makeSelectResponseDetailID,

    makeSelectTutorialBotID,
    makeSelectTutorialIntentID,
    makeSelectTutorialPatternID,
    makeSelectEntitytypeId,

    makeSelectUploadFile,
    makeSelectUploadedFile,
    makeSelectResponseDetailType
} from 'containers/Tutorial/selectors';

export function* addTutorialBot() {

    const token = yield select(makeSelectToken());
    const bot_name = yield select(makeSelectTutorialBotName());
    const bot_description = yield select(makeSelectTutorialBotDescription());

    const requestURL = `${API_URL}/api/v1/bots`;
    var tutorialBot = {
        name: bot_name,
        description: bot_description
    };

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${token}`
        },
        body: JSON.stringify(tutorialBot)
    };

    try {
        const req = yield call(request, requestURL, requestOptions);
        yield put(addTutorialBotSuccess(req));
    } catch (err) {
        yield put(addTutorialBotError(err));
    }

}

export function* addIntent() {
    const token = yield select(makeSelectToken());
    const intent_name = yield select(makeSelectIntentName());
    const botid = yield select(makeSelectTutorialBotID());
    //debugger;
    const requestURL = `${API_URL}/api/v1/intents`;
    var intent = {
        botid: botid,
        name: intent_name,
        description: ''
    };

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${token}`
        },
        body: JSON.stringify(intent)
    };

    try {
        const req = yield call(request, requestURL, requestOptions);
        yield put(addIntentSuccess(req));
    } catch (err) {
        yield put(addIntentError(err));
    }

}

export function* addPattern() {
    const token = yield select(makeSelectToken());
    const pattern_templatesentence = yield select(makeSelectPatternTemplateSentence());
    const botid = yield select(makeSelectTutorialBotID());
    const intentid = yield select(makeSelectTutorialIntentID());


    const requestURL = `${API_URL}/api/v1/patterns`;
    var pattern = {
        botid: botid,

        intentid: intentid,
        templatesentence: pattern_templatesentence
    };

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${token}`
        },
        body: JSON.stringify(pattern)
    };

    try {
        const req = yield call(request, requestURL, requestOptions);
        yield put(addPatternSuccess(req));
    } catch (err) {
        yield put(addPatternError(err));
    }

}

export function* addEntityType() {
    //debugger;
    const token = yield select(makeSelectToken());
    const entitytype_name = yield select(makeSelectEntityTypeName());
    const botid = yield select(makeSelectTutorialBotID());
    //const des = yield select(makeSelectEntityText());

    const requestURL = `${API_URL}/api/v1/entityTypes`;
    var entitytype = {
        botid: botid,
        name: entitytype_name,
        description: ''
    };

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${token}`
        },
        body: JSON.stringify(entitytype)
    };

    try {
        const req = yield call(request, requestURL, requestOptions);
        yield put(addEntityTypeSuccess(req));
    } catch (err) {
        yield put(addEntityTypeError(err));
    }

}

export function* addEntity() {
    const token = yield select(makeSelectToken());
    const botid = yield select(makeSelectTutorialBotID());
    const intentid = yield select(makeSelectTutorialIntentID());
    const patternid = yield select(makeSelectTutorialPatternID());
    const name = yield select(makeSelectEntityText());
    const entityTypeId = yield select(makeSelectEntitytypeId());

    const requestURL = `${API_URL}/api/v1/entities`;

    var entity = {
        botid: botid,
        intentid: intentid,
        patternId: patternid,
        name: name,
        entityTypeId: entityTypeId
    }

    const requestOptions = {
        method: "POST",
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

export function* addResponse() {
    //const bot = yield select(makeSelectBot());
    const token = yield select(makeSelectToken());
    //const intentid = yield select(makeSelectID());
    //const intentid = yield select(makeSelectSelectIntentId());

    const botid = yield select(makeSelectTutorialBotID());
    const intentid = yield select(makeSelectTutorialIntentID());
    const requestURL = `${API_URL}/api/v1/responses`;

    var response = {
        botid: botid,
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

export function* addResponseDetail() {
    const token = yield select(makeSelectToken());
    const botid = yield select(makeSelectTutorialBotID());
    const intentid = yield select(makeSelectTutorialIntentID());
    var rpDetailText = yield select(makeResponseDetailtext());
    const responseid = yield select(makeSelectResponseID());
    const requestURL = `${API_URL}/api/v1/ResponseDetails`;
    const responsedetailid = yield select(makeSelectResponseDetailID());

    var uploadedFile = yield select(makeSelectUploadedFile());
    const responseDetailType = yield select(makeSelectResponseDetailType());

    if (responseDetailType == 'text') {
        uploadedFile = '';
    } else if (responseDetailType == 'image') {
        rpDetailText = '';
    } else {
        uploadedFile = '';
        rpDetailText = '';
    }

    var responseDetail = {
        botid: botid,
        intentid: intentid,
        responseid: responseid,
        internalid: responsedetailid,
        text: rpDetailText,
        imageurl: uploadedFile,
        type: responseDetailType
    };
    //debugger;
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
    } catch (err) {
        yield put(addResponseDetailError(err));
    }
}

export function* loadResponses() {
    const bot = yield select(makeSelectTutorialBotID());
    const token = yield select(makeSelectToken());
    const intentid = yield select(makeSelectTutorialIntentID());
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

export function* redirectToHomeChat() {
    const botId = yield select(makeSelectTutorialBotID());
    yield put(push('/' + botId + '/homechat'));
}

export function* addDefaultIntent() {

    const token = yield select(makeSelectToken());
    const botId = yield select(makeSelectTutorialBotID());

    const requestURL = `${API_URL}/api/v1/intents`;
    var intent = {
        botid: botId,
        name: 'dont_known',
        description: ''
    };

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${token}`
        },
        body: JSON.stringify(intent)
    };

    try {
        //debugger;
        const req1 = yield call(request, requestURL, requestOptions);
        yield put(addIntentSuccess(req1));
    } catch (err) {
        yield put(addIntentError(err));
    }


}

export function* addDefaultPatttern() {

    const token = yield select(makeSelectToken());
    const botid = yield select(makeSelectTutorialBotID());
    const intentid = yield select(makeSelectTutorialIntentID());

    //debugger;
    const requestURL = `${API_URL}/api/v1/patterns`;
    var pattern = {
        botid: botid,
        intentid: intentid,
        templatesentence: ''
    };

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${token}`
        },
        body: JSON.stringify(pattern)
    };

    try {
        const req = yield call(request, requestURL, requestOptions);
        yield put(addPatternSuccess(req));
    } catch (err) {
        yield put(addPatternError(err));
    }
}

export function* uploadResponseDetailImage() {
    const token = yield select(makeSelectToken());
    const file = yield select(makeSelectUploadFile());
    //const botid = yield select(makeSelectTutorialBotID());

    const requestURL = `${API_URL}/api/v1/fileapi/upload-file`;
    const data = new FormData();
    console.log(file);
    data.append('file', file);

    //var obj = {
    //    botid: botid,
    //    data: data
    //};

    const requestOptions = {
        method: 'POST',
        headers: {
            'Authorization': `bearer ${token}`
        },
        body: data
    };
    //debugger;
    try {
        const req = yield call(request, requestURL, requestOptions);
        yield put(responseDetailChangeImageSuccess(req));
    } catch (err) {
        yield put(responseDetailChangeImageFailure(err));
    }

}


export default function* tutorialData() {
    yield takeLatest(TUTORIAL_ADD_BOT_REQUEST, addTutorialBot);
    yield takeLatest(ADD_INTENT_REQUEST, addIntent);
    yield takeLatest(ADD_PATTERN_REQUEST, addPattern);
    yield takeLatest(ADD_ENTITYTYPE_REQUEST, addEntityType);
    yield takeLatest(ENTITY_ADD_REQUEST, addEntity);
    yield takeLatest(RESPONSE_ADD_REQUEST, addResponse);
    yield takeLatest(RESPONSE_DETAIL_ADD_REQUEST, addResponseDetail);
    yield takeLatest(LOAD_RESPONSE_REQUEST, loadResponses);
    yield takeLatest(REDIRECT_TO_HOME_CHAT, redirectToHomeChat);
    yield takeLatest(ADD_DEFAULT_INTENT, addDefaultIntent);
    yield takeLatest(ADD_DEFAULT_PATTERN, addDefaultPatttern);
    yield takeLatest(UPLOAD_RESPONSE_DETAIL_IMAGE_REQUEST, uploadResponseDetailImage);
}
