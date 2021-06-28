import {
    INTENT_CHANGE_NAME,
    INTENT_CHANGE_DESCRIPTION,

    INTENT_EDIT_REQUEST,
    INTENT_EDIT_SUCCESS,
    INTENT_EDIT_FAILURE,

    INTENT_DELETE_REQUEST,
    INTENT_DELETE_FAILURE,
    INTENT_DELETE_SUCCESS,

    GET_INTENT_FAILURE,
    GET_INTENT_SUCCESS,
    GET_INTENT_REQUEST,
    INTENT_TOGGLE,

    LOAD_INTENT_REQUEST,
    LOAD_INTENT_FAILURE,
    LOAD_INTENT_SUCCESS,

    CHANGE_INTENT,
    CHANGE_SEARCH,
    CHANGE_PAGE,
    CHANGE_SIZE_PER_PAGE,
    CHANGE_ORDER_COLUMN,
    CHANGE_ORDER,

    CHANGE_SELECT_INTENT_ID,
    INTENT_SELECT_LIST_REQUEST,
    INTENT_SELECT_LIST_SUCCESS,
    INTENT_SELECT_LIST_FAILURE,

    GET_RESPONSE_FAILURE,
    GET_RESPONSE_REQUEST,
    GET_RESPONSE_SUCCESS,

    LOAD_RESPONSE_FAILURE,
    LOAD_RESPONSE_REQUEST,
    LOAD_RESPONSE_SUCCESS,

    RESPONSE_ADD,
    RESPONSE_COLLAPSE,
    RESPONSE_ADD_FAILURE,
    RESPONSE_ADD_REQUEST,
    RESPONSE_ADD_SUCCESS,

    RESPONSE_DETAIL_CHANGE_IMAGE,
    RESPONSE_DETAIL_CHANGE_TEXT,
    RESPONSE_DETAIL_CHANGE_TYPE,


    RESPONSE_DELETE_FAILURE,
    RESPONSE_DELETE_REQUEST,
    RESPONSE_DELETE_SUCCESS,

    RESPONSE_EDIT_FAILURE,
    RESPONSE_EDIT_REQUEST,
    RESPONSE_EDIT_SUCCESS,
    RESPONSE_TOGGLE,

    LOAD_RESPONSE_DETAIL_REQUEST,
    LOAD_RESPONSE_DETAIL_FAILURE,
    LOAD_RESPONSE_DETAIL_SUCCESS,

    CHANGE_RESPONSE,
    CHANGE_RESPONSE_DETAIL,
    RESPONSE_DETAIL_ADD,
    RESPONSE_DETAIL_ADD_REQUEST,
    RESPONSE_DETAIL_ADD_SUCCESS,
    RESPONSE_DETAIL_ADD_FAILURE,

    RESPONSE_DETAIL_EDIT_REQUEST,
    RESPONSE_DETAIL_EDIT_SUCCESS,
    RESPONSE_DETAIL_EDIT_FAILURE,

    RESPONSE_DETAIL_DELETE_REQUEST,
    RESPONSE_DETAIL_DELETE_SUCCESS,
    RESPONSE_DETAIL_DELETE_FAILURE,

    GET_RESPONSE_DETAIL_REQUEST,
    GET_RESPONSE_DETAIL_SUCCESS,
    GET_RESPONSE_DETAIL_FAILURE,

    CHANGE_IS_ENABLE_ADD_RESPONSE,
    CHANGE_IS_ENABLE_ADD_RESPONSE_DETAIL,

    UPLOAD_RESPONSE_DETAIL_IMAGE_REQUEST,
    UPLOAD_RESPONSE_DETAIL_IMAGE_SUCCESS,
    UPLOAD_RESPONSE_DETAIL_IMAGE_FAILURE

} from './constants'

export function changeName(name) {
    return {
        type: INTENT_CHANGE_NAME,
        name
    };
}

export function changeDescription(description) {
    return {
        type: INTENT_CHANGE_DESCRIPTION,
        description
    };
}

export function onToggle() {
    return {
        type: INTENT_TOGGLE
    };
}

export function changeIntent(id) {
    return {
        type: CHANGE_INTENT,
        id
    };
}

// form list
export function loadIntentRequest() {
    return {
        type: LOAD_INTENT_REQUEST
    };
}

export function loadIntentSuccess(intents) {
    return {
        type: LOAD_INTENT_SUCCESS,
        intents
    };
}

export function loadIntentError(err) {
    return {
        type: LOAD_INTENT_FAILURE,
        err
    };
}

// get
export function getIntentRequest() {
    return {
        type: GET_INTENT_REQUEST
    };
}

export function getIntentSuccess(intent) {
    return {
        type: GET_INTENT_SUCCESS,
        intent
    };
}

export function getIntentFalse(error) {
    return {
        type: GET_INTENT_FAILURE,
        error
    };
}

// edit
export function editIntentRequest() {
    return {
        type: INTENT_EDIT_REQUEST
    };
}

export function editIntentSuccess(intent) {
    return {
        type: INTENT_EDIT_SUCCESS,
        intent
    };
}

export function editIntentFalse(error) {
    return {
        type: INTENT_EDIT_FAILURE,
        error
    };
}

// delete
export function deleteIntentRequest() {
    return {
        type: INTENT_DELETE_REQUEST,

    };
}

export function deleteIntentSuccess(intent) {
    return {
        type: INTENT_DELETE_SUCCESS,
        intent
    };
}

export function deleteIntentFalse(err) {
    return {
        type: INTENT_DELETE_FAILURE,
        err
    };
}

// table action
export function changeSearch(search) {
    return {
        type: CHANGE_SEARCH,
        search
    };
}

export function changePage(page) {
    return {
        type: CHANGE_PAGE,
        page
    };
}

export function changeSizePerPage(sizePerPage) {
    return {
        type: CHANGE_SIZE_PER_PAGE,
        sizePerPage
    };
}

export function changeOrderColumn(orderColumn) {
    return {
        type: CHANGE_ORDER_COLUMN,
        orderColumn
    };
}

export function changeOrder(order) {
    return {
        type: CHANGE_ORDER,
        order
    };
}

// get intet select list

export function changeSelectIntentId(selectIntentId) {
    return {
        type: CHANGE_SELECT_INTENT_ID,
        selectIntentId
    };
}

export function getIntentSelectListRequest() {
    return {
        type: INTENT_SELECT_LIST_REQUEST,

    };
}

export function getIntentSelectListSuccess(intentSelectList) {
    return {
        type: INTENT_SELECT_LIST_SUCCESS,
        intentSelectList
    };
}

export function getIntentSelectListFalse(err) {
    return {
        type: INTENT_SELECT_LIST_FAILURE,
        err
    };
}

// ----------------- for Response ahihi ----------------

export function onResponseToggle() {
    return {
        type: RESPONSE_TOGGLE

    };
}

//export function responseChangeText(text) {
//    debugger;
//    return {
//        type: RESPONSE_DETAIL_CHANGE_TEXT,
//        text
//    };
//}

export function responseChangeText(responseId, responseDetailId, text) {
    //debugger;
    return {
        type: RESPONSE_DETAIL_CHANGE_TEXT,
        responseId,
        responseDetailId,
        text
    };
}

export function responseChangeType(_type) {
    return {
        type: RESPONSE_DETAIL_CHANGE_TYPE,
        _type

    };
}

export function responseChangeImage(image) {
    return {
        type: RESPONSE_DETAIL_CHANGE_IMAGE,
        image

    };
}

export function loadResponseRequest() {
    return {
        type: LOAD_RESPONSE_REQUEST

    };
}

export function loadResponseSuccess(responses) {
    return {
        type: LOAD_RESPONSE_SUCCESS,
        responses

    };
}

export function loadResponseError(error) {
    return {
        type: LOAD_RESPONSE_FAILURE,
        error
    };
}

export function collapseResponse(collapse) {
    return {
        type: RESPONSE_COLLAPSE,
        collapse
    };
}


export function addResponse() {
    return {
        type: RESPONSE_ADD,
    };
}

export function addResponseRequest() {
    return {
        type: RESPONSE_ADD_REQUEST
    };
}

export function addResponseSuccess(response) {
    return {
        type: RESPONSE_ADD_SUCCESS,
        response

    };
}

export function addResponseError(error) {
    return {
        type: RESPONSE_ADD_FAILURE,
        error

    };
}

export function editResponseRequest() {
    return {
        type: RESPONSE_EDIT_REQUEST
    };
}


export function editResponseSuccess(response) {
    return {
        type: RESPONSE_EDIT_SUCCESS,
        response
    };
}

export function editResponseError(error) {
    return {
        type: RESPONSE_EDIT_FAILURE,
        error
    };
}

export function deleteResponseRequest() {
    return {
        type: RESPONSE_DELETE_REQUEST,

    };
}

export function deleteResponseSuccess(response) {
    return {
        type: RESPONSE_DELETE_SUCCESS,
        response
    };
}

export function deleteResponseError(err) {
    return {
        type: RESPONSE_DELETE_FAILURE,
        err
    };
}

export function getResponseRequest() {
    return {
        type: GET_RESPONSE_REQUEST,
    }
}

export function getResponseSuccess(response) {
    return {
        type: GET_RESPONSE_SUCCESS,
        response
    }
}

export function getResponseError(error) {
    return {
        type: GET_RESPONSE_FAILURE,
        error
    }
}

// -------------- for responseDetail-------------------------
export function loadResponseDetailRequest() {
    return {
        type: LOAD_RESPONSE_DETAIL_REQUEST,

    }
}

export function loadResponseDetailSuccess(responseDetails) {
    return {
        type: LOAD_RESPONSE_DETAIL_SUCCESS,
        responseDetail

    }
}

export function loadResponseDetailError(error) {
    return {
        type: LOAD_RESPONSE_DETAIL_FAILURE,
        error

    }
}

//export function changeTextResponseDetail(text) {
//    return {
//        type: RESPONSE_DETAIL_CHANGE_TEXT,
//        text
//    }
//}

export function changeResponse(responseId) {
    return {
        type: CHANGE_RESPONSE,
        responseId
    }
}
export function changeResponseDetail(responseDetailId) {
    return {
        type: CHANGE_RESPONSE_DETAIL,
        responseDetailId
    }
}
export function addResponseDetail(responseId, responseType) {
    //debugger;
    return {
        type: RESPONSE_DETAIL_ADD,
        responseId,
        responseType
    }
}

export function addResponseDetailRequest() {
    return {
        type: RESPONSE_DETAIL_ADD_REQUEST,
    }
}

export function addResponseDetailSuccess(responseDetail) {
    return {
        type: RESPONSE_DETAIL_ADD_SUCCESS,
        responseDetail
    }
}

export function addResponseDetailError(error) {
    return {
        type: RESPONSE_DETAIL_ADD_FAILURE,
        error
    }
}

export function editResponseDetailRequest() {
    return {
        type: RESPONSE_DETAIL_EDIT_REQUEST,

    }
}

export function editResponseDetailSuccess(responseDetail) {
    return {
        type: RESPONSE_DETAIL_EDIT_SUCCESS,
        responseDetail

    }
}

export function editResponseDetailError(error) {
    return {
        type: RESPONSE_DETAIL_EDIT_FAILURE,
        error
    }
}


export function getResponseDetailRequest() {
    return {
        type: GET_RESPONSE_DETAIL_REQUEST,

    }
}
export function getResponseDetailSuccess(responseDetail) {
    return {
        type: GET_RESPONSE_DETAIL_SUCCESS,
        responseDetail
    }
}
export function getResponseDetailError(error) {
    return {
        type: GET_RESPONSE_DETAIL_FAILURE,
        error
    }
}

export function deleteResponseDetailRequest() {
    return {
        type: RESPONSE_DETAIL_DELETE_REQUEST,

    }
}
export function deleteResponseDetailSuccess(responseDetaill) {
    return {
        type: RESPONSE_DETAIL_DELETE_SUCCESS,
        responseDetaill
    }
}
export function deleteResponseDetailError(error) {
    return {
        type: RESPONSE_DETAIL_DELETE_FAILURE,
        error
    }
}
export function changeIsEnableAddResponse(isEnableAddResponse) {
    return {
        type: CHANGE_IS_ENABLE_ADD_RESPONSE,
        isEnableAddResponse
    }
}
export function changeIsEnableAddResponseDetail(isEnableAddResponseDetail) {
    return {
        type: CHANGE_IS_ENABLE_ADD_RESPONSE_DETAIL,
        isEnableAddResponseDetail
    }
}

export function responseDetailChangeImageRequest() {
    return {
        type: UPLOAD_RESPONSE_DETAIL_IMAGE_REQUEST

    };
}

export function responseDetailChangeImageSuccess(image) {
    return {
        type: UPLOAD_RESPONSE_DETAIL_IMAGE_SUCCESS,
        image

    };
}

export function responseDetailChangeImageFailure(error) {
    return {
        type: UPLOAD_RESPONSE_DETAIL_IMAGE_FAILURE,
        error
    };
}
