import {
    PATTERN_CHANGE_TEMPLATESENTENCE,
    PATTERN_EDIT_REQUEST,
    PATTERN_EDIT_SUCCESS,
    PATTERN_EDIT_FAILURE,
    
    PATTERN_INTENT_SELECT_LIST_REQUEST,
    PATTERN_INTENT_SELECT_LIST_SUCCESS,
    PATTERN_INTENT_SELECT_LIST_FAILURE,
    PATTERN_CHANGE_SELECT_INTENT_ID,

    PATTERN_DELETE_REQUEST,
    PATTERN_DELETE_FAILURE,
    PATTERN_DELETE_SUCCESS,

    GET_PATTERN_FAILURE,
    GET_PATTERN_SUCCESS,
    GET_PATTERN_REQUEST,
    PATTERN_TOGGLE,
   
    LOAD_PATTERN_REQUEST,
    LOAD_PATTERN_FAILURE,
    LOAD_PATTERN_SUCCESS,

    CHANGE_PATTERN,
    CHANGE_SEARCH,
    CHANGE_PAGE,
    CHANGE_SIZE_PER_PAGE,
    CHANGE_ORDER_COLUMN,
    CHANGE_ORDER,

    ENTITY_ADD_REQUEST,
    ENTITY_ADD_TEXT,
    ENTITY_ADD_SUCCESS,
    ENTITY_ADD_FAILURE,
    GET_ENTITY_FROM_LIST,
    GET_INTENT_ID,

    LOAD_ENTITY_TYPE_REQUEST,
    LOAD_ENTITY_TYPE_SUCCESS,
    LOAD_ENTITY_TYPE_FAILURE,
    CHANGE_ENTITY_TYPE,

    LOAD_ENTITY_REQUEST,
    LOAD_ENTITY_SUCCESS,
    LOAD_ENTITY_FAILURE,

    DELETE_ENTITY_REQUEST,
    DELETE_ENTITY_SUCCESS,
    DELETE_ENTITY_FAILURE

} from './constants'
export function changeTemplateSentence(templateSentence) {
    return {
        type: PATTERN_CHANGE_TEMPLATESENTENCE,
        templateSentence
    };
}

export function onToggle() {
    return {
        type: PATTERN_TOGGLE
    };
}

export function changePattern(id) {

    return {
        type: CHANGE_PATTERN,
        id
    };
}

//form list
export function loadPatternRequest() {
    return {
        type: LOAD_PATTERN_REQUEST
    };
}

export function loadPatternSuccess(patterns) {
    return {
        type: LOAD_PATTERN_SUCCESS,
        patterns
    };
}

export function loadPatternError(err) {
    return {
        type: LOAD_PATTERN_FAILURE,
        err
    };
}

//get

// get intet select list
export function changeSelectIntentId(intentId) {
    return {
        type: PATTERN_CHANGE_SELECT_INTENT_ID,
        intentId
    };
}

export function getIntentSelectListRequest() {
    //debugger;
    return {
        type: PATTERN_INTENT_SELECT_LIST_REQUEST,

    };
}

export function getIntentSelectListSuccess(intentSelectList) {
    return {
        type: PATTERN_INTENT_SELECT_LIST_SUCCESS,
        intentSelectList
    };
}

export function getIntentSelectListFalse(err) {
    return {
        type: PATTERN_INTENT_SELECT_LIST_FAILURE,
        err
    };
}

export function getPatternRequest() {
    //debugger;
    return {
        type: GET_PATTERN_REQUEST,

    };
}

export function getPatternSuccess(pattern) {
    return {
        type: GET_PATTERN_SUCCESS,
        pattern
    };
}

export function getPatternFalse(error) {
    return {
        type: GET_PATTERN_FAILURE,
        error
    };
}
export function getPaternSelectListRequest() {
    return {
        type: PATTERN_SELECT_LIST_REQUEST,
    };
}
// edit
export function editPatternRequest() {
    return {
        type: PATTERN_EDIT_REQUEST,
    };
}

export function editPatternSuccess(pattern) {
    return {
        type: PATTERN_EDIT_SUCCESS,
        pattern
    };
}

export function editPatternFalse(error) {
    return {
        type: PATTERN_EDIT_FAILURE,
        error
        //console.log("Edit Pattern Error!")
    };
}


// delete
export function deletePatternRequest() {
    return {
        
        type: PATTERN_DELETE_REQUEST,
        
    };
}

export function deletePatternSuccess(pattern) {
    return {
        type: PATTERN_DELETE_SUCCESS,
        pattern
    };
}

export function deletePatternFalse(error) {
    return {
        type: PATTERN_DELETE_FAILURE,
        error
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

export function addEntity() {
    return {
        type: ENTITY_ADD_REQUEST,
        
    };
}


export function entityGetText(entityText) {
    return {
        type: ENTITY_ADD_TEXT,
        entityText
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
        type:ENTITY_ADD_FAILURE,
        error
    };
}

export function getEntity(entity) {
    return {
        type:GET_ENTITY_FROM_LIST,
        entity
    };
}


export function getIntentId(intentId) {
    return {
        type:GET_INTENT_ID,
        intentId
    };
}


// load entity type for add entity 
export function loadEntityTypeRequest() {

   
    return {
        type: LOAD_ENTITY_TYPE_REQUEST,
        
    };
}

export function loadEntityTypeSuccess(entityTypes) {
    return {
        type: LOAD_ENTITY_TYPE_SUCCESS,
        entityTypes
    };
}
export function loadEntityTypeError(error) {
    return {
        type: LOAD_ENTITY_TYPE_FAILURE,
        error
    };
}

export function changeEntityType() {
    return {
        type: CHANGE_ENTITY_TYPE,
    };
}

//export function changeEntity() {
//    return {
//        type: CHANGE_ENTITY,
//    };
//}

// load entity
export function loadEntityRequest() {
    
    return {
        type: LOAD_ENTITY_REQUEST,

    };
}

export function loadEntitySuccess(entities) {
    //debugger;
    return {
        type: LOAD_ENTITY_SUCCESS,
        entities
    };
}
export function loadEntityError(error) {
    return {
        type: LOAD_ENTITY_FAILURE,
        error
    };
}


export function deleteEntityRequest() {
    return {
        type: DELETE_ENTITY_REQUEST,
        
    };
}

export function deleteEntitySuccess(entity) {
    return {
        type: DELETE_ENTITY_SUCCESS,
        entity

    };
}

export function deleteEntityError(error) {
    return {
        type: DELETE_ENTITY_FAILURE,
        error

    };
}