import produce from 'immer';
import {
    validRequire
} from '../../utils/validate';

import {
    //TUTORIAL_CHANGE_BUSINESS_FIELD,
    //TUTORIAL_CHANGE_STEP
    TUTORIAL_HANDLE_NEXT,
    TUTORIAL_CHANGE_STYLE,

    //add tutorial bot
    TUTORIAL_CHANGE_BOT_NAME,
    TUTORIAL_CHANGE_BOT_DESCRIPTION,

    TUTORIAL_ADD_BOT_REQUEST,
    TUTORIAL_ADD_BOT_SUCCESS,
    TUTORIAL_ADD_BOT_FAILURE,

    //add intent
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

    //select entity
    GET_SELECTION_TEXT,
    ENTITY_ADD_TEXT,

    ENTITY_ADD_REQUEST,
    ENTITY_ADD_SUCCESS,
    ENTITY_ADD_FAILURE,

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

    LOAD_RESPONSE_FAILURE,
    LOAD_RESPONSE_REQUEST,
    LOAD_RESPONSE_SUCCESS,

    //valid
    VALID_REQUEST,

    UPLOAD_RESPONSE_DETAIL_IMAGE_REQUEST,
    UPLOAD_RESPONSE_DETAIL_IMAGE_SUCCESS,
    UPLOAD_RESPONSE_DETAIL_IMAGE_FAILURE
} from './constants'

const INIT_RESPONSE_DETAIL = {
    internalId: '',
    text: '',
    image: '',
    type: '',
}

const INIT_ENTITY = {
    internalId: '',
    name: '',
    //description:'',
    entityTypeId: '',
}

export const initialState = {

    BusinessField: '',
    styles: {
        backgroud: '#fff'
    },
    step: 1,
    disable: true,
    type_domain: 1,
    bot_id: '',
    bot_name: '',
    bot_description: '',
    intent_id: '',
    intent_name: '',
    pattern_id: '',
    pattern_templatesentence: '',
    entitytype_name: '',
    error: '',
    Entities: [],

    intentSelectList: [],
    entityText: '',
    entity: INIT_ENTITY,

    entityTypes: [],
    entityTypeId: '',
    responses: {data: []},
    responseDetail: INIT_RESPONSE_DETAIL,
    responseDetailtext: '',

    responseId: "",
    //response: [],
    responseDetailId: "",
    responseDetails: [],

    isEnableAddTutorialBot: true,
    isEnableAddIntent: true,
    isEnableAddPattern: true,
    isEnableAddEntityType: true,
    isEnableAddResponse: true,
    isEnableAddResponseDetail: true,
    uploadFile: null,
    uploadedFile: null,
    responseDetailType: ''
}

const tutorialReducer = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {
            //case TUTORIAL_CHANGE_BUSINESS_FIELD:
            //    draft.BusinessField = action.BusinessField;
            //    break;
            //case TUTORIAL_CHANGE_STEP:
            //    draft.step = action.step;
            //    break;
            case VALID_REQUEST:
                if (draft.bot_name == '')
                    break;
            case TUTORIAL_HANDLE_NEXT:
                if (draft.step === 1) {
                    var data = action.evt.currentTarget.attributes["data"].value;
                    draft.BusinessField = data;
                };
                draft.step = draft.step + 1;
                break;
            case TUTORIAL_CHANGE_STYLE:
                draft.styles = action.styles;
                break;

            //add tutorial bot
            case TUTORIAL_CHANGE_BOT_NAME:
                //debugger;
                draft.bot_name = action.bot_name;
                break;
            case TUTORIAL_CHANGE_BOT_DESCRIPTION:
                draft.bot_description = action.bot_description;
                break;

            case TUTORIAL_ADD_BOT_REQUEST:
                //debugger;
                break;
            case TUTORIAL_ADD_BOT_SUCCESS:
                draft.bot_id = action.tutorialBot.data;
                break;
            case TUTORIAL_ADD_BOT_FAILURE:
                draft.error = action.error;
                break;

            //add intent
            case INTENT_CHANGE_NAME:
                draft.intent_name = action.intent_name;
                break;

            case ADD_INTENT_REQUEST:
                break;
            case ADD_INTENT_SUCCESS:
                draft.intent_id = action.intent.data.item2;
                break;
            case ADD_INTENT_FAILURE:
                draft.error = action.error;
                break;

            //add pattern
            case PATTERN_CHANGE_TEMPLATESENTENCE:
                draft.pattern_templatesentence = action.pattern_templatesentence;
                break;

            case ADD_PATTERN_REQUEST:
                break;
            case ADD_PATTERN_SUCCESS:
                draft.pattern_id = action.pattern.data.item2;
                break;
            case ADD_PATTERN_FAILURE:
                draft.error = action.error;
                break;

            //add entity type
            case ENTITYTYPE_CHANGE_NAME:
                draft.entitytype_name = action.entitytype_name;
                break;

            case ADD_ENTITYTYPE_REQUEST:

                break;

            case ADD_ENTITYTYPE_SUCCESS:
                draft.entitytypeId = action.entitytype.data.item2;
                break;
            case ADD_ENTITYTYPE_FAILURE:
                draft.error = action.error;
                break;

            //select entity
            case GET_SELECTION_TEXT:
                //debugger;
                draft.entityText = action.entityText;
                draft.entity.name = action.entityText;
                break;

            case ENTITY_ADD_TEXT:
                //debugger;
                var entity = {
                    internalId: '',
                    name: action.entityText,
                    entityTypeId: action.entityTypeId
                }
                draft.entity.name = action.entityText;
                draft.entityText = action.entityText;
                //debugger;
                draft.Entities.push(entity);
                break;

            case ENTITY_ADD_REQUEST:
                break;

            case ENTITY_ADD_SUCCESS:
                draft.entity = action.entity;
                break;
            case ENTITY_ADD_FAILURE:
                draft.error = action.error;
                break;

            //add response
            case RESPONSE_ADD:
                //debugger;
                var rp = {
                    internalId: '',
                    responseDetails: [],
                }
                if (draft.responses.data != undefined) {
                    draft.responses.data = [...draft.responses.data, rp]
                    console.log("RESPONSE_ADD")
                    console.log(draft.responses.data)
                }
                break;
            case CHANGE_RESPONSE:
                draft.responseId = action.responseId;
                break;

            case RESPONSE_ADD_REQUEST:
                break;
            case RESPONSE_ADD_SUCCESS:
                draft.responseId = action.response.data.item2;
                break;
            case RESPONSE_ADD_FAILURE:
                draft.error = action.error;
                break;

            //add response detail
            case RESPONSE_DETAIL_ADD:
                switch (action.responseType) {
                    case "text":
                        let rpDetail = {
                            internalId: "",
                            text: "",
                            imageUrl: "",
                            type: "text",
                        }
                        draft.responses.data.map((item, index) => {
                            if (item.internalId == action.responseId) {
                                item.responseDetails = [...item.responseDetails, rpDetail];
                            }
                        })       
                        break;
                    case "image":
                        let rpDetail_img = {
                            internalId: "",
                            text: "",
                            imageUrl: "",
                            type: "image",
                        }
                        draft.responses.data.map((item, index) => {
                            if (item.internalId == action.responseId) {
                                item.responseDetails = [...item.responseDetails, rpDetail_img];
                            }
                        })
                        break;
                }
                break;
            case CHANGE_RESPONSE_DETAIL:
                draft.responseDetailId = action.responseDetailId;
                break;

            case RESPONSE_DETAIL_CHANGE_TEXT:
                draft.responses.data.map((item) => {
                    if (item.internalId == action.responseId) {
                        item.responseDetails.map((detail) => {
                            if (detail.internalId == action.responseDetailId && detail.type == 'text') {
                                detail.text = action.text;
                            }
                        })
                    }
                })
                draft.responseDetailtext = action.text;
                draft.responseDetailType = 'text';
                break;

            case RESPONSE_DETAIL_ADD_REQUEST:
                break;
            case RESPONSE_DETAIL_ADD_SUCCESS:
                debugger;
                draft.responseDetail = action.responseDetail;
                break;
            case RESPONSE_DETAIL_ADD_FAILURE:
                draft.error = action.error;
                break;

            case LOAD_RESPONSE_REQUEST:
                break;

            case LOAD_RESPONSE_SUCCESS:
                draft.responses = action.responses;
                break;

            case LOAD_RESPONSE_FAILURE:
                draft.error = action.error;
                break;

            case RESPONSE_DETAIL_CHANGE_IMAGE:
                draft.uploadFile = action.image;
                draft.responseDetailType = 'image';
                break;

            case UPLOAD_RESPONSE_DETAIL_IMAGE_REQUEST:
                draft.uploadedFile = null;
                break;
            case UPLOAD_RESPONSE_DETAIL_IMAGE_SUCCESS:
                debugger;
                draft.uploadedFile = action.image.data;
                draft.responses.data.map((item) => {
                    if (item.internalId == draft.responseId) {
                        item.responseDetails.map((detail) => {
                            if (detail.type == 'image') {
                                detail.imageUrl = action.image.data;
                            }
                        })
                    }
                })
                break;
            case UPLOAD_RESPONSE_DETAIL_IMAGE_FAILURE:
                draft.error = action.error;
                break;

        }
    });

export default tutorialReducer;
