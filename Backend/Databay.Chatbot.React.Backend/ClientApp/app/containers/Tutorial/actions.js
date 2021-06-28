import {
    //TUTORIAL_CHANGE_BUSINESS_FIELD,
    //TUTORIAL_CHANGE_STEP,
    //anh Minh viet
    TUTORIAL_HANDLE_NEXT,
    TUTORIAL_CHANGE_STYLE,


    //add tutorial bot
    TUTORIAL_CHANGE_BOT_NAME,
    TUTORIAL_CHANGE_BOT_DESCRIPTION,

    TUTORIAL_ADD_BOT_REQUEST,
    TUTORIAL_ADD_BOT_SUCCESS,
    TUTORIAL_ADD_BOT_FAILURE,

    //add tutorial intent
    INTENT_CHANGE_NAME,

    ADD_INTENT_REQUEST,
    ADD_INTENT_SUCCESS,
    ADD_INTENT_FAILURE,

    //add pattern
    PATTERN_CHANGE_TEMPLATESENTENCE,

    ADD_PATTERN_REQUEST,
    ADD_PATTERN_SUCCESS,
    ADD_PATTERN_FAILURE,

    //add entity type
    ENTITYTYPE_CHANGE_NAME,

    ADD_ENTITYTYPE_REQUEST,
    ADD_ENTITYTYPE_SUCCESS,
    ADD_ENTITYTYPE_FAILURE,
    ENTITY_ADD_REQUEST,
    ENTITY_ADD_FAILURE,
    ENTITY_ADD_SUCCESS,

    //add response
    RESPONSE_ADD,
    CHANGE_RESPONSE,

    RESPONSE_ADD_REQUEST,
    RESPONSE_ADD_SUCCESS,
    RESPONSE_ADD_FAILURE,

    //add response detail
    RESPONSE_DETAIL_ADD,
    CHANGE_RESPONSE_DETAIL,

    RESPONSE_DETAIL_CHANGE_TEXT,
    RESPONSE_DETAIL_CHANGE_IMAGE,
    RESPONSE_DETAIL_CHANGE_TYPE,

    RESPONSE_DETAIL_ADD_REQUEST,
    RESPONSE_DETAIL_ADD_SUCCESS,
    RESPONSE_DETAIL_ADD_FAILURE,

    CHANGE_IS_ENABLE_ADD_RESPONSE,
    CHANGE_IS_ENABLE_ADD_RESPONSE_DETAIL,
    ENTITY_ADD_TEXT,

    LOAD_RESPONSE_REQUEST,
    LOAD_RESPONSE_SUCCESS,
    LOAD_RESPONSE_FAILURE,
    GET_SELECTION_TEXT,

    REDIRECT_TO_HOME_CHAT,

    //valid
    VALID_REQUEST,
    ADD_DEFAULT_INTENT,
    ADD_DEFAULT_PATTERN,

    //CHANGE_RESPONSE_IMAGE,
    UPLOAD_RESPONSE_DETAIL_IMAGE_REQUEST,
    UPLOAD_RESPONSE_DETAIL_IMAGE_SUCCESS,
    UPLOAD_RESPONSE_DETAIL_IMAGE_FAILURE

} from './constants'

//export function changeBusinessField(BusinessField) {
//    return {
//        type: TUTORIAL_CHANGE_BUSINESS_FIELD,
//        BusinessField
//    };
//}

//export function changeStep(step) {
//    return {
//        type: TUTORIAL_CHANGE_STEP,
//        step
//    };
//}

export function handleNext(evt) {
    return {
        type: TUTORIAL_HANDLE_NEXT,
        evt
    };
}

export function changeStyles(styles) {
    return {
        type: TUTORIAL_CHANGE_STYLE,
        styles
    };
}

//add tutorial bot
export function changeTutorialBotName(bot_name) {
    return {
        type: TUTORIAL_CHANGE_BOT_NAME,
        bot_name
    };
}

export function changeTutorialBotDescription(bot_description) {
    return {
        type: TUTORIAL_CHANGE_BOT_DESCRIPTION,
        bot_description
    };
}



export function addTutorialBotRequest() {
    return {
        type: TUTORIAL_ADD_BOT_REQUEST
    };
}

export function addTutorialBotSuccess(tutorialBot) {
    return {
        type: TUTORIAL_ADD_BOT_SUCCESS,
        tutorialBot
    };
}

export function addTutorialBotError(error) {
    return {
        type: TUTORIAL_ADD_BOT_FAILURE,
        error
    };
}

//add intent
export function changeIntentName(intent_name) {
    return {
        type: INTENT_CHANGE_NAME,
        intent_name
    };
}

export function addIntentRequest() {
    return {
        type: ADD_INTENT_REQUEST
    };
}

export function addIntentSuccess(intent) {
    return {
        type: ADD_INTENT_SUCCESS,
        intent
    };
}

export function addIntentError(error) {
    return {
        type: ADD_INTENT_FAILURE,
        error
    };
}

//add pattern
export function changePatternTemplateSentence(pattern_templatesentence) {
    return {
        type: PATTERN_CHANGE_TEMPLATESENTENCE,
        pattern_templatesentence
    };
}

export function addPatternRequest() {
    return {
        type: ADD_PATTERN_REQUEST
    };
}

export function addPatternSuccess(pattern) {
    return {
        type: ADD_PATTERN_SUCCESS,
        pattern
    };
}

export function addPatternError(error) {
    return {
        type: ADD_PATTERN_FAILURE,
        error
    };
}

//add entity type
export function changeEntityTypeName(entitytype_name) {
    return {
        type: ENTITYTYPE_CHANGE_NAME,
        entitytype_name
    };
}

export function addEntityTypeRequest() {
    return {
        type: ADD_ENTITYTYPE_REQUEST
    };
}

export function addEntityTypeSuccess(entitytype) {
    return {
        type: ADD_ENTITYTYPE_SUCCESS,
        entitytype
    };
}

export function getEntityText(entityText) {
    return {
        type: GET_SELECTION_TEXT,
        entityText
    };
}


export function addEntityTypeError(error) {
    return {
        type: ADD_ENTITYTYPE_FAILURE,
        error
    };
}



//select entity
export function entityGetText(entityText) {
    return {
        type: ENTITY_ADD_TEXT,
        entityText
    };
}

export function addEntityRequest() {
    return {
        type: ENTITY_ADD_REQUEST,

    };
}

export function addEntitySuccess(entity) {
    return {
        type: ENTITY_ADD_SUCCESS,
        entity
    };
}

export function addEntityError(error) {
    return {
        type: ENTITY_ADD_FAILURE,
        error
    };
}

//add response
export function addResponse() {
    return {
        type: RESPONSE_ADD,
    };
}

export function changeResponse(responseId) {
    return {
        type: CHANGE_RESPONSE,
        responseId
    }
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

//add response detail
export function addResponseDetail(responseId, responseType) {
    //debugger;
    return {
        type: RESPONSE_DETAIL_ADD,
        responseId,
        responseType
    }
}

export function changeResponseDetail(responseDetailId) {
    return {
        type: CHANGE_RESPONSE_DETAIL,
        responseDetailId
    }
}

export function responseChangeText(responseId, responseDetailId, text) {
    //debugger;
    return {
        type: RESPONSE_DETAIL_CHANGE_TEXT,
        responseId,
        responseDetailId,
        text
    };
}

export function responseChangeImage(image) {
    return {
        type: RESPONSE_DETAIL_CHANGE_IMAGE,
        image

    };
}

export function responseChangeType(_type) {
    return {
        type: RESPONSE_DETAIL_CHANGE_TYPE,
        _type

    };
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

export function redirectToHomeChat() {
    return {
        type: REDIRECT_TO_HOME_CHAT
    };
}

//valid
export function validRequest() {
    //debugger;
    return {

        type: VALID_REQUEST
        //user
    };
}

export function addDefaultIntent() {
    //debugger;
    return {

        type: ADD_DEFAULT_INTENT
        //user
    };
}

export function addDefaultPattern() {
    //debugger;
    return {

        type: ADD_DEFAULT_PATTERN
        //user
    };
}

//export function changeResponseFile(file) {
//    return {
//        type: CHANGE_RESPONSE_IMAGE,
//        file
//    };
//}

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
