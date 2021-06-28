import {
    ENTITY_TYPE_CHANGE_NAME,
    ENTITY_TYPE_CHANGE_DESCRIPTION,
    ENTITY_TYPE_CHANGE_EXTRACT,


    ENTITY_TYPE_EDIT_REQUEST,
    ENTITY_TYPE_EDIT_SUCCESS,
    ENTITY_TYPE_EDIT_FAILURE,

    ENTITY_TYPE_DELETE_REQUEST,
    ENTITY_TYPE_DELETE_FAILURE,
    ENTITY_TYPE_DELETE_SUCCESS,

    GET_ENTITY_TYPE_FAILURE,
    GET_ENTITY_TYPE_SUCCESS,
    GET_ENTITY_TYPE_REQUEST,
    ENTITY_TYPE_TOGGLE,

    LOAD_ENTITY_TYPE_REQUEST,
    LOAD_ENTITY_TYPE_FAILURE,
    LOAD_ENTITY_TYPE_SUCCESS,

    CHANGE_ENTITY_TYPE,
    CHANGE_SEARCH,
    CHANGE_PAGE,
    CHANGE_SIZE_PER_PAGE,
    CHANGE_ORDER_COLUMN,
    CHANGE_ORDER

} from './constants'

export function changeName(name) {
    return {
        type: ENTITY_TYPE_CHANGE_NAME,
        name
    };
}

export function changeDescription(description) {
    return {
        type: ENTITY_TYPE_CHANGE_DESCRIPTION,
        description
    };
}

export function changeExtractionMethod (extractionMethod) {
    return {
        type: ENTITY_TYPE_CHANGE_EXTRACT,
        extractionMethod
    };
}

export function onToggle() {
    return {
        type: ENTITY_TYPE_TOGGLE
    };
}

export function changeEntityType(id) {
    return {
        type: CHANGE_ENTITY_TYPE,
        id
    };
}

// form list
export function loadEntityTypeRequest() {
    return {
        type: LOAD_ENTITY_TYPE_REQUEST
    };
}

export function loadEntityTypeSuccess(entityTypes) {
    return {
        type: LOAD_ENTITY_TYPE_SUCCESS,
        entityTypes
    };
}

export function loadEntityTypeError(err) {
    return {
        type: LOAD_ENTITY_TYPE_FAILURE,
        err
    };
}

// get
export function getEntityTypeRequest() {
    return {
        type: GET_ENTITY_TYPE_REQUEST
    };
}

export function getEntityTypeSuccess(entityType) {
    return {
        type: GET_ENTITY_TYPE_SUCCESS,
        entityType
    };
}

export function getEntityTypeFalse(error) {
    return {
        type: GET_ENTITY_TYPE_FAILURE,
        error
    };
}

// edit
export function editEntityTypeRequest() {
    return {
        type: ENTITY_TYPE_EDIT_REQUEST
    };
}

export function editEntityTypeSuccess(entityType) {
    return {
        type: ENTITY_TYPE_EDIT_SUCCESS,
        entityType
    };
}

export function editEntityTypeFalse(error) {
    return {
        type: ENTITY_TYPE_EDIT_FAILURE,
        error
    };
}

// delete
export function deleteEntityTypeRequest() {
    return {
        type: ENTITY_TYPE_DELETE_REQUEST,

    };
}

export function deleteEntityTypeSuccess(entityType) {
    return {
        type: ENTITY_TYPE_DELETE_SUCCESS,
        entityType
    };
}

export function deleteEntityTypeFalse(err) {
    return {
        type: ENTITY_TYPE_DELETE_FAILURE,
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
