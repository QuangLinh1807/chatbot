import produce from 'immer';
import {
    ENTITY_TYPE_CHANGE_NAME,
    ENTITY_TYPE_CHANGE_DESCRIPTION,
    ENTITY_TYPE_CHANGE_EXTRACT,
    CHANGE_ENTITY_TYPE,

    ENTITY_TYPE_EDIT_REQUEST,
    ENTITY_TYPE_EDIT_SUCCESS,
    ENTITY_TYPE_EDIT_FAILURE,

    ENTITY_TYPE_DELETE_REQUEST,
    ENTITY_TYPE_DELETE_FAILURE,
    ENTITY_TYPE_DELETE_SUCCESS,

    GET_ENTITY_TYPE_REQUEST,
    GET_ENTITY_TYPE_SUCCESS,
    GET_ENTITY_TYPE_FAILURE,
    ENTITY_TYPE_TOGGLE,

    LOAD_ENTITY_TYPE_REQUEST,
    LOAD_ENTITY_TYPE_FAILURE,
    LOAD_ENTITY_TYPE_SUCCESS,

    CHANGE_SEARCH,
    CHANGE_PAGE,
    CHANGE_SIZE_PER_PAGE,
    CHANGE_ORDER_COLUMN,
    CHANGE_ORDER
} from './constants'

const INIT_ENTITY_TYPE = {
    id: '',
    name: '',
    description: '',
    extractionMethod:'',
}

export const initialState = {
    modal: false,
    entityType: INIT_ENTITY_TYPE,
    submitted: false,
    error: false,
    id: '',
    entityTypes: [],
    page: 1,
    sizePerPage: 10,
    totalSize: 0,
    search: '',
    orderColumn: 'name',
    order: 'asc',
}

const entityTypeReducer = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {

            // load entityTypes insert for table
            case LOAD_ENTITY_TYPE_REQUEST:
                break;

            case LOAD_ENTITY_TYPE_SUCCESS:
                draft.entityTypes = action.entityTypes.data;
                draft.totalSize = action.entityTypes.totalRecords;
                break;

            case LOAD_ENTITY_TYPE_FAILURE:
                draft.error = action.error;
                break;

            case ENTITY_TYPE_CHANGE_NAME:
                draft.entityType.name = action.name;
                break;

            case ENTITY_TYPE_CHANGE_DESCRIPTION:
                draft.entityType.description = action.description;
                break;

            case ENTITY_TYPE_CHANGE_EXTRACT:
                //debugger;
                draft.entityType.extractionMethod = action.extractionMethod;
                break;

            // Get entityType
            case CHANGE_ENTITY_TYPE:
                draft.id = action.id;
                break;

            case GET_ENTITY_TYPE_REQUEST:
                draft.entityType = INIT_ENTITY_TYPE;
                break;

            case GET_ENTITY_TYPE_SUCCESS:
                draft.entityType = action.entityType.data;
                break;

            case GET_ENTITY_TYPE_FAILURE:
                draft.error = action.error;
                break;

            // Edit entityType
            case ENTITY_TYPE_EDIT_REQUEST:
                break;

            case ENTITY_TYPE_EDIT_SUCCESS:
                draft.entityType = action.entityType;
                break;

            case ENTITY_TYPE_EDIT_FAILURE:
                draft.error = action.error;
                break;

            case ENTITY_TYPE_TOGGLE:
                draft.modal = !draft.modal;
                // clear entityType when close popup
                draft.entityType = INIT_ENTITY_TYPE;
                // clear id when close popup
                if (!draft.modal) {
                    draft.id = '';
                }

                break;

            // Delete entityType
            case ENTITY_TYPE_DELETE_REQUEST:
                break;

            case ENTITY_TYPE_DELETE_FAILURE:
                draft.error = action.error;
                break;

            case ENTITY_TYPE_DELETE_SUCCESS:
                draft.entityType = action.entityType;
                break;

            // Table action
            case CHANGE_SEARCH:
                draft.search = action.search;
                break;

            case CHANGE_PAGE:
                draft.page = action.page;
                break;

            case CHANGE_SIZE_PER_PAGE:
                draft.sizePerPage = action.sizePerPage;
                break;

            case CHANGE_ORDER_COLUMN:
                draft.orderColumn = action.orderColumn;
                break;

            case CHANGE_ORDER:
                draft.order = action.order;
                break;
        }
    });

export default entityTypeReducer;
