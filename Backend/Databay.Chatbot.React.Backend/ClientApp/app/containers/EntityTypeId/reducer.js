import produce from 'immer';
import {
    ENTITY_TYPE_ADD_SUBMIT,
    ENTITY_TYPE_CHANGE_NAME,
    ENTITY_TYPE_CHANGE_DESCRIPTION,
    ENTITY_TYPE_ADD_FAILURE,
    ENTITY_TYPE_ADD_SUCCESS,
    ENTITY_TYPE_ADD_TOGGLE,
    ENTITY_TYPE_ADD_REQUEST,

    ENTITY_TYPE_EDIT_REQUEST,
    ENTITY_TYPE_EDIT_SUCCESS,
    ENTITY_TYPE_EDIT_FAILURE,

    ENTITY_TYPE_DELETE_REQUEST,
    ENTITY_TYPE_DELETE_FAILURE,
    ENTITY_TYPE_DELETE_SUCCESS,

    GET_ENTITY_TYPE_REQUEST,
    GET_ENTITY_TYPE_SUCCESS,
    GET_ENTITY_TYPE_FAILURE,
    ENTITY_TYPE_EDIT_TOGGLE,

    LOAD_ENTITY_TYPE_REQUEST,
    LOAD_ENTITY_TYPE_FAILURE,
    LOAD_ENTITY_TYPE_SUCCESS,

    CHANGE_ENTITY_TYPE,
    REFRESH_ENTITY_TYPES,

    CHANGE_SEARCH,
    CHANGE_PAGE,
    CHANGE_SIZE_PER_PAGE,
    CHANGE_ORDER_COLUMN,
    CHANGE_ORDER
} from './constants'

export const initialState = {
    isAddEntityTypeModal: false,
    isEditEntityTypeModal: false,
    modal: false,
    entityType: {
        id: '',
        name: '',
        description: ''
    },
    submitted: false,
    error: false,
    name: '',
    description: '',
    id: '',
    editmodal: false,
    entityTypes: [],
    page: 1,
    sizePerPage: 10,
    totalSize: 0,
    search: '',
    orderColumn: 'name',
    order: 'asc',
    refresh: false,
}

const entityTypeReducer = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {

            case ENTITY_TYPE_ADD_SUBMIT:
                isAddEntityTypeModal: true;
                //draft.Name = action.Name;
                //draft.Description = action.Description;
                draft.entityType = action.entityType;
                break;

            case ENTITY_TYPE_CHANGE_NAME:
                //debugger;
                draft.name = action.name;
                draft.entityType.name = action.name;
                break;

            case ENTITY_TYPE_CHANGE_DESCRIPTION:
                draft.description = action.description;
                draft.entityType.description = action.description;;
                break;

            case ENTITY_TYPE_ADD_FAILURE:
                draft.error = action.error;

                break;
            case ENTITY_TYPE_ADD_SUCCESS:
                draft.entityType = action.entityType;
                //draft.name = action.name;
                //draft.description = action.description;

                break;
            case ENTITY_TYPE_ADD_TOGGLE:
                draft.id = '';
                draft.name = '';
                draft.description = '';
                draft.entityType = {
                    id: '',
                    name: '',
                    description: ''
                },
                draft.modal = !draft.modal;
                break;
            case ENTITY_TYPE_ADD_REQUEST:
                isAddEntityTypeModal: true;
                draft.entityType = action.entityType;
                //draft.entityType.id = action.id;
                //draft.entityType.name = action.name;
                //draft.entityType.description = action.description;
                //draft.modal = action.modal;
                break;

            // Put edit entityType
            case ENTITY_TYPE_EDIT_REQUEST:
                isEditEntityTypeModal: true;
                draft.entityType = action.entityType;
                //draft.entityType.name = action.name;
                //draft.entityType.description = action.description;
                break;

            case ENTITY_TYPE_EDIT_SUCCESS:
                break;

            case ENTITY_TYPE_EDIT_FAILURE:
                draft.error = action.error;
                break;

            // Get entityType
            case GET_ENTITY_TYPE_REQUEST:
                //debugger;
                //draft.entityType = false;
                break;

            case GET_ENTITY_TYPE_SUCCESS:
                draft.entityType = action.entityType.data;
                break;

            case GET_ENTITY_TYPE_FAILURE:
                draft.error = action.error;
                break;


            case ENTITY_TYPE_EDIT_TOGGLE:
                
                draft.editmodal = !draft.editmodal;
                break;

            // load entityTypes insert for table
            case LOAD_ENTITY_TYPE_REQUEST:
                
                //draft.entityType = false;
                break;

            case LOAD_ENTITY_TYPE_SUCCESS:
                debugger;
                draft.entityTypes = action.entityTypes.data;
                draft.totalSize = action.entityTypes.totalRecords;
                //draft.entityType = false;
                break;

            case LOAD_ENTITY_TYPE_FAILURE:
                //draft.entityType = false;
                draft.error = action.error;
                break;

            case CHANGE_ENTITY_TYPE:
                draft.id = action.id;
                break;

            case ENTITY_TYPE_DELETE_REQUEST:
                
                break;

            case ENTITY_TYPE_DELETE_FAILURE:
                draft.error = action.error;
                break;
            case ENTITY_TYPE_DELETE_SUCCESS:
                draft.entityType = action.entityType;
                break;

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
