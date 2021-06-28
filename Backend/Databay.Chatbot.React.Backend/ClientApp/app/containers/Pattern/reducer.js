import React from 'react';
import produce from 'immer';
import {
    PATTERN_CHANGE_TEMPLATESENTENCE,

    CHANGE_PATTERN,

    PATTERN_EDIT_REQUEST,
    PATTERN_EDIT_SUCCESS,
    PATTERN_EDIT_FAILURE,

    PATTERN_CHANGE_SELECT_INTENT_ID,
    PATTERN_INTENT_SELECT_LIST_REQUEST,
    PATTERN_INTENT_SELECT_LIST_SUCCESS,
    PATTERN_INTENT_SELECT_LIST_FAILURE,
    
    PATTERN_DELETE_REQUEST,
    PATTERN_DELETE_FAILURE,
    PATTERN_DELETE_SUCCESS,

    GET_PATTERN_REQUEST,
    GET_PATTERN_SUCCESS,
    GET_PATTERN_FAILURE,
    PATTERN_TOGGLE,

    LOAD_PATTERN_REQUEST,
    LOAD_PATTERN_FAILURE,
    LOAD_PATTERN_SUCCESS,

    CHANGE_SEARCH,
    CHANGE_PAGE,
    CHANGE_SIZE_PER_PAGE,
    CHANGE_ORDER_COLUMN,
    CHANGE_ORDER,

    GET_SELECTION_TEXT,
    ENTITY_ADD_TEXT,

    ENTITY_ADD_REQUEST,
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
//import { BOT_DELETE_FAILURE } from '../HomePage/constants';

const INIT_PATTERN = {
    id: '',
    templateSentence: ''
}


const INIT_ETITY = {
    internalId: '',
    name:'',
    //description:'',
    entityTypeId: '',
}
export const initialState = {
    //isAddPatternModal: false,
    //isEditPatternModal: false,
    intentId:'',
    modal: false,
    pattern: INIT_PATTERN,
    submitted: false,
    error: false,
    //templateSentence: '',
    //description: '',
    id: '',
    //editmodal: false,
    patterns: [],
    page: 1,
    intents: [],
    sizePerPage: 10,
    totalSize: 0,
    search: '',
    orderColumn: 'templateSentence',
    order: 'asc',
    entityText: '',
    intentSelectList: [],
    //selectIntentId:'',
    Entities: [],
    entity: INIT_ETITY,

    entityTypes:[],
    entityTypeId: '',
    entityID: '',
    dataTransform: {}
}

const patternReducer = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {
            // load patterns insert for table
            case LOAD_PATTERN_REQUEST:
                break;

            case LOAD_PATTERN_SUCCESS:
                //debugger;
                draft.patterns = action.patterns.data;
                draft.totalSize = action.patterns.totalRecords;
                //draft.pattern = false;
                break;

            case LOAD_PATTERN_FAILURE:
                //draft.pattern = false;
                draft.error = action.error;
                break;

            case PATTERN_CHANGE_TEMPLATESENTENCE:
                //debugger;
                //draft.templateSentence = action.templateSentence;
                draft.pattern.templateSentence = action.templateSentence;
                break;

            // Get pattern

            case CHANGE_PATTERN:
                //debugger;
                draft.id = action.id;
                break;
            // Get pattern
            case GET_PATTERN_REQUEST:
                //debugger;
                draft.pattern = INIT_PATTERN;
                break;
            
            case GET_PATTERN_SUCCESS:
                //debugger;
                draft.pattern = action.pattern.data;
                break;

            case GET_PATTERN_FAILURE:
                draft.error = action.error;
                break;

            // Edit pattern
            case PATTERN_EDIT_REQUEST:
                break;
            
            case PATTERN_EDIT_SUCCESS:
                //debugger;
                draft.pattern = action.pattern;
                break;

            case PATTERN_EDIT_FAILURE:
                //debugger;
                draft.error = action.error;
                break;

            case PATTERN_TOGGLE:
                //debugger;
                draft.modal = !draft.modal;
                // clear pattern when close popup
                draft.pattern = INIT_PATTERN;
                // clear id when close popup
                if (!draft.modal) {
               
                    
                    draft.id = '';
                    draft.intentId = '';
                    draft.Entities = [];

                    //draft.entity.internalId = '';
                }
                break;

            // Delete pattern
            case PATTERN_DELETE_REQUEST:
                break;

            case PATTERN_DELETE_FAILURE:
                //debugger;
                draft.error = action.error;
                break;

            case PATTERN_DELETE_SUCCESS:
                draft.pattern = action.pattern;
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


            case GET_SELECTION_TEXT:
                draft.entityText = action.entityText;
                draft.entity.name = action.entityText;
                break;
            //intent
            case PATTERN_CHANGE_SELECT_INTENT_ID:
                //debugger;
                draft.intentId = action.intentId;
                break;

            case PATTERN_INTENT_SELECT_LIST_REQUEST:
                
                //draft.entity.entityTypeId = '';
                //debugger;
                break;

            case PATTERN_INTENT_SELECT_LIST_SUCCESS:
                //debugger
                draft.intentSelectList = action.intentSelectList;
                break;

            case PATTERN_INTENT_SELECT_LIST_FAILURE:
                draft.error = action.error;
                break;
        // -------------------- for entity ----------------------------------
            case ENTITY_ADD_TEXT:
                
                var entity = {
                    internalId: '',
                    name: action.entityText,
                    entityTypeId: action.entityTypeId
                }
                draft.entity.name = action.entityText;
                //debugger;
                draft.Entities.push(entity);
                break;
            
            case ENTITY_ADD_REQUEST:
                //debugger;
                //draft.entity = action.entity;
                break;
            
            case ENTITY_ADD_SUCCESS:
                //debugger;
                draft.entity = action.entity;
                break;
            
            case ENTITY_ADD_FAILURE:
                //debugger;
                draft.error = action.error;
                break;

            case GET_ENTITY_FROM_LIST:
                //debugger;
                draft.entity = action.entity;
                break;
            case GET_INTENT_ID:
                //debugger;
                draft.intentId = action.intentId;
                break;

            case LOAD_ENTITY_TYPE_REQUEST:
                break;

            case LOAD_ENTITY_TYPE_SUCCESS:
                //debugger;
                draft.entityTypes = action.entityTypes;
                break;

            case LOAD_ENTITY_TYPE_FAILURE:
                draft.error = action.error;
                break;

            case CHANGE_ENTITY_TYPE:
                draft.entityTypeId = action.entityTypeId;
                //draft.Entities.data.map((item) => {
                //})
                break;
            //case CHANGE_ENTITY_:
            //    draft.entity = action.entity;
            //    break;

            case LOAD_ENTITY_REQUEST:
                
                break;

            case LOAD_ENTITY_SUCCESS:
                //debugger;
                draft.Entities = action.entities.data;
                break;

            case LOAD_ENTITY_FAILURE:
                draft.error = action.error;
                break;

            case DELETE_ENTITY_REQUEST:
                break;

            case DELETE_ENTITY_SUCCESS:
                debugger;
                //draft.entity = action.entity;
                var data = action.entity.data;
                console.log(data);
                break;
            case DELETE_ENTITY_FAILURE:
                //debugger;
                draft.error = action.error;
                break;

            //case BOT_DELETE_FAILURE:
            //    //debugger;
            //    draft.error = action.error;
            //    break;

        }
    });

export default patternReducer;