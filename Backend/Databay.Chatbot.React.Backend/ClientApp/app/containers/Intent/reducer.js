import produce from 'immer';
import {
    INTENT_CHANGE_NAME,
    INTENT_CHANGE_DESCRIPTION,
    CHANGE_INTENT,

    INTENT_EDIT_REQUEST,
    INTENT_EDIT_SUCCESS,
    INTENT_EDIT_FAILURE,

    INTENT_DELETE_REQUEST,
    INTENT_DELETE_FAILURE,
    INTENT_DELETE_SUCCESS,

    GET_INTENT_REQUEST,
    GET_INTENT_SUCCESS,
    GET_INTENT_FAILURE,
    INTENT_TOGGLE,

    LOAD_INTENT_REQUEST,
    LOAD_INTENT_FAILURE,
    LOAD_INTENT_SUCCESS,

    CHANGE_SEARCH,
    CHANGE_PAGE,
    CHANGE_SIZE_PER_PAGE,
    CHANGE_ORDER_COLUMN,
    CHANGE_ORDER,

    CHANGE_SELECT_INTENT_ID,
    INTENT_SELECT_LIST_REQUEST,
    INTENT_SELECT_LIST_SUCCESS,
    INTENT_SELECT_LIST_FAILURE,

    //--------------  for response ----------------------

    RESPONSE_TOGGLE,

    LOAD_RESPONSE_FAILURE,
    LOAD_RESPONSE_REQUEST,
    LOAD_RESPONSE_SUCCESS,

    CHANGE_RESPONSE,
    RESPONSE_ADD,
    RESPONSE_COLLAPSE,
    RESPONSE_ADD_FAILURE,
    RESPONSE_ADD_REQUEST,
    RESPONSE_ADD_SUCCESS,

    //RESPONSE_CHANGE_IMAGE_URL,
    //RESPONSE_CHANGE_TEXT,
    //RESPONSE_CHANGE_TYPE,

    RESPONSE_DELETE_FAILURE,
    RESPONSE_DELETE_REQUEST,
    RESPONSE_DELETE_SUCCESS,
    // ----------------- for response detail----------------
    CHANGE_RESPONSE_DETAIL,
    RESPONSE_DETAIL_ADD,
    RESPONSE_DETAIL_ADD_REQUEST,
    RESPONSE_DETAIL_ADD_FAILURE,
    RESPONSE_DETAIL_ADD_SUCCESS,


    RESPONSE_DETAIL_DELETE_REQUEST,
    RESPONSE_DETAIL_DELETE_SUCCESS,
    RESPONSE_DETAIL_DELETE_FAILURE,

    GET_RESPONSE_DETAIL_REQUEST,
    GET_RESPONSE_DETAIL_SUCCESS,
    GET_RESPONSE_DETAIL_FAILURE,

    LOAD_RESPONSE_DETAIL_REQUEST,
    LOAD_RESPONSE_DETAIL_SUCCESS,
    LOAD_RESPONSE_DETAIL_FAILURE,

    RESPONSE_DETAIL_EDIT_REQUEST,
    RESPONSE_DETAIL_EDIT_SUCCESS,
    RESPONSE_DETAIL_EDIT_FAILURE,

    RESPONSE_DETAIL_CHANGE_TEXT,
    RESPONSE_DETAIL_CHANGE_IMAGE,

    UPLOAD_RESPONSE_DETAIL_IMAGE_REQUEST,
    UPLOAD_RESPONSE_DETAIL_IMAGE_SUCCESS,
    UPLOAD_RESPONSE_DETAIL_IMAGE_FAILURE

} from './constants'

const INIT_INTENT = {
    id: '',
    name: '',
    description: ''
}




const INIT_RESPONSE_DETAIL = {
    internalId: '',
    text: '',
    image: "",
    type: "",
}
export const initialState = {
    modal: false,
    intent: INIT_INTENT,
    submitted: false,
    error: false,
    id: '',
    intents: [],
    page: 1,
    sizePerPage: 10,
    totalSize: 0,
    search: '',
    orderColumn: 'name',
    order: 'asc',
    

    //text: '',
    //image: "",
    //type: "",
    responseDetail: INIT_RESPONSE_DETAIL,
    responseModal: false,
    responses: [],
    //responseid: "",
    //responseComponents: [],
    collapse: null,
    //responseDetails: [],
    responseDetailtext: '',
    isEnableAddResponse: true,
    isEnableAddResponseDetail: true,
    intentSelectList: [],
    selectIntentId: '',
    responseId: "",
    responseDetailId: "",
    response: {},

    uploadFile: null,
    uploadedFile: null,
    responseDetailType: '',
    Toast:false
}

const intentReducer = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {

            // load intents insert for table
            case LOAD_INTENT_REQUEST:
                break;

            case LOAD_INTENT_SUCCESS:
                //debugger;
                draft.intents = action.intents.data;
                draft.totalSize = action.intents.totalRecords;
                break;

            case LOAD_INTENT_FAILURE:
                draft.error = action.error;
                break;

            case INTENT_CHANGE_NAME:
                draft.intent.name = action.name;
                break;

            case INTENT_CHANGE_DESCRIPTION:
                draft.intent.description = action.description;;
                break;

            // Get intent
            case CHANGE_INTENT:
                draft.id = action.id;
                break;

            case GET_INTENT_REQUEST:
                draft.intent = INIT_INTENT;
                break;

            case GET_INTENT_SUCCESS:
                draft.intent = action.intent.data;
                break;

            case GET_INTENT_FAILURE:
                draft.error = action.error;
                break;

            // Edit intent
            case INTENT_EDIT_REQUEST:
                break;

            case INTENT_EDIT_SUCCESS:
                debugger;
                
                draft.intent = action.intent;
                var status = action.intent.isSuccess;
                if (status) {
                    draft.Toast = !draft.Toast;
                }
                break;

            case INTENT_EDIT_FAILURE:
                draft.error = action.error;
                break;

            case INTENT_TOGGLE:
                draft.modal = !draft.modal;
                // clear intent when close popup
                draft.intent = INIT_INTENT;
                // clear id when close popup
                if (!draft.modal) {
                    draft.id = '';
                }

                break;

            // Delete intent
            case INTENT_DELETE_REQUEST:
                break;

            case INTENT_DELETE_FAILURE:
                draft.error = action.error;
                break;

            case INTENT_DELETE_SUCCESS:
                draft.intent = action.intent;
                draft.id = '';
                draft.intent = INIT_INTENT;
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

            case CHANGE_SELECT_INTENT_ID:
                draft.selectIntentId = action.selectIntentId;
                break;

            case INTENT_SELECT_LIST_REQUEST:
                break;

            case INTENT_SELECT_LIST_SUCCESS:
                draft.intentSelectList = action.intentSelectList;
                break;

            case INTENT_SELECT_LIST_FAILURE:
                draft.error = action.error;
                break;


            //---------- for response -------------
            case RESPONSE_TOGGLE:
                draft.responseModal = !draft.responseModal;
                break;

            //case RESPONSE_CHANGE_TEXT:

            //    draft.text = action.text;
            //    break;

            //case RESPONSE_CHANGE_IMAGE_URL:

            //    draft.image = action.image;
            //    break;

            //case RESPONSE_CHANGE_TYPE:

            //    draft.type = action.type;
            //    break;

            case LOAD_RESPONSE_REQUEST:
                //draft.responses = action.responses;
                break;

            case LOAD_RESPONSE_SUCCESS:
                draft.responses = action.responses;
                break;

            case LOAD_RESPONSE_FAILURE:
                draft.error = action.error;
                break;

            case RESPONSE_COLLAPSE:
                draft.collapse = action.collapse;
                break;

            case RESPONSE_ADD:
                //debugger;
                //draft.responseComponents.push({});
                //var rp = {
                //    internalId: "",
                //    text: "",
                //    imageUrl: "",
                //    type: "text"
                //}
                //draft.responses.push(rp);
                var rp = {
                    internalId: "",
                    responseDetails: [],
                }
                //draft.responses.data = [...draft.responses.data, rp]
                if (draft.responses.data != undefined) {
                    //draft.responses.data.push(rp);
                    draft.responses.data = [...draft.responses.data, rp]
                    console.log("RESPONSE_ADD")
                    console.log(draft.responses.data)
                }
                break;

            case RESPONSE_ADD_REQUEST:
                //debugger;
                break;

            case RESPONSE_ADD_SUCCESS:
                draft.responseId = action.response.data.item2;
                //draft.response = action.response;
                // them response trong responses list
                break;

            case RESPONSE_ADD_FAILURE:
                draft.error = action.error;
                break;

            // delete response
            case RESPONSE_DELETE_REQUEST:
                break;

            case RESPONSE_DELETE_SUCCESS:
                //draft.response = action.response; 
                // xoa response trong responses list
                break;

            case RESPONSE_DELETE_FAILURE:
                draft.error = action.error;
                break;

            case CHANGE_RESPONSE:
                draft.responseId = action.responseId;
                break;

            case CHANGE_RESPONSE_DETAIL:
                draft.responseDetailId = action.responseDetailId;
                break;

            //add response detail
            case RESPONSE_DETAIL_ADD:
                draft.responseDetailId = "";
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

            case RESPONSE_DETAIL_ADD_REQUEST:
                break;

            case RESPONSE_DETAIL_ADD_SUCCESS:
                draft.responseDetail = action.responseDetail;
                break;

            case RESPONSE_DETAIL_ADD_FAILURE:
                draft.error = action.error;
                break;

            case RESPONSE_DETAIL_EDIT_REQUEST:
                break;

            case RESPONSE_DETAIL_EDIT_SUCCESS:
                draft.responseDetail = action.responseDetail;
                break;
            case RESPONSE_DETAIL_EDIT_FAILURE:
                draft.error = action.error;
                break;

            case RESPONSE_DETAIL_DELETE_REQUEST:
                //draft.error = action.error;
                break;
            case RESPONSE_DETAIL_DELETE_SUCCESS:
                //draft.error = action.error;
                break;
            case RESPONSE_DETAIL_DELETE_FAILURE:
                draft.error = action.error;
                break;

            //case RESPONSE_DETAIL_CHANGE_TEXT:
            //    debugger;
            //    draft.responseDetailtext = action.text;
            //    break;


            case RESPONSE_DETAIL_CHANGE_TEXT:
                //debugger;
                draft.responses.data.map((item) => {
                    if (item.internalId == action.responseId) {
                        item.responseDetails.map((detail) => {
                            if (detail.internalId == action.responseDetailId) {
                                detail.text = action.text;
                            }
                        })
                    }
                })
                //for (var i in draft.responses.data) {
                //    if (draft.responses.data[i].internalId == action.responseId) {
                //        for (var j in draft.responses.data[i].responseDetails) {
                //            draft.responses.data[i].responseDetails[j].text = action.text
                //            break;
                //        }
                //    }
                //}
                draft.responseDetailtext = action.text;
                draft.responseDetailType = 'text';
                break;

            case RESPONSE_DETAIL_CHANGE_IMAGE:
                draft.uploadFile = action.image;
                draft.responseDetailType = 'image';
                break;

            case UPLOAD_RESPONSE_DETAIL_IMAGE_REQUEST:
                draft.uploadedFile = null;
                break;
            case UPLOAD_RESPONSE_DETAIL_IMAGE_SUCCESS:
                console.log('UPLOAD_RESPONSE_DETAIL_IMAGE_SUCCESS' + action.image.data)
                draft.uploadedFile = action.image.data;
                //draft.responses.data.map((item) => {
                //    if (item.internalId == draft.responseId) {
                //        item.responseDetails.map((detail) => {
                //            if (detail.type == 'image') {
                //                detail.imageUrl = action.image.data;
                //            }
                //        })
                //    }
                //})
                break;
            case UPLOAD_RESPONSE_DETAIL_IMAGE_FAILURE:
                draft.error = action.error;
                break;
        }
    });

export default intentReducer;
