import React, { useEffect, memo, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import reducer from './reducer';
import saga from './saga';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { Collapse, UncontrolledCollapse } from 'reactstrap';
import ResponseDetailList from './ResponseDetailList';
import {
} from './selectors';


import form_icon from '../../images/form-icon.png';
import step_icon from '../../images/go-to-step-icon.png';
import helper_icon from '../../images/helper-icon.png';
import img_icon from '../../images/img-icon.png';
import slide_icon from '../../images/slide-icon.png';
import text_icon from '../../images/text-icon.png';
import delete_icon from '../../images/delete-icon-tutorial.png';

import {
    addResponseDetail,
    deleteResponseRequest,
    loadResponseRequest,
    changeResponse,
    responseChangeImage,
    responseDetailChangeImageRequest,
    addResponseDetailRequest,
    addResponseRequest,

} from './actions';

const key = 'intent';

export function Response({
    index,
    responseItem,
    toggle,
    isOpen,
    onClickText,
    onDeleteResponse,
    onChangeFileHandler,
}) {
    useInjectReducer({ key, reducer });
    useInjectSaga({ key, saga });

    function onToggle() {
        toggle(responseItem);

    }

    //useEffect(() => {

    //}, []);

    const [deleteResponse, setDeleteResponse] = useState(true);

    let responseDetails = responseItem != undefined ? responseItem.responseDetails : []
    return (
        <div className="rp-item rp-item-intent" data-responseid={responseItem.internalId}/* onMouseEnter={() => setDeleteResponse(true)} onMouseLeave={() => setDeleteResponse(false)}*/>
            <div className="rp-header" /*onClick={onToggle}*/ id="toggler" >
                <span className="fw-600">Câu trả lời {index + 1}</span>
                {deleteResponse && <button type="button" onClick={onDeleteResponse} className='btn btn-delete-rp'><img src={delete_icon} alt="alt" className="mr-7" /></button>}
            </div>
            <Collapse isOpen={isOpen} className="rp-body">
                <div className="rp-features" style={{ borderBottom: 'none' }}>
                    <button onClick={onClickText} className="fw-500"><img src={text_icon} alt="alt" className="mr-7" />Văn bản</button>

                    <label style={{ display: 'inline-block', margin: 0, paddingRight: '20px' }} className="fw-500">
                        <input type="file" name="file" id="uploadfile" onChange={onChangeFileHandler} style={{ display: 'none' }} accept="image/*" multiple />
                        <img src={img_icon} alt="alt" className="mr-7" />
                        Hình ảnh
                    </label>

                    <button className="fw-500"><img src={slide_icon} alt="alt" className="mr-7" />Slide ảnh</button>
                    <button className="fw-500"><img src={form_icon} alt="alt" className="mr-7" />Form</button>
                    <button className="fw-500"><img src={step_icon} alt="alt" className="mr-7" />Đi đến bước</button>
                    <button className="fw-500"><img src={helper_icon} alt="alt" className="mr-7" />Người hỗ trợ</button>


                </div>
                <ResponseDetailList items={responseDetails} />
            </Collapse>
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
});

export function mapDispatchToProps(dispatch) {
    function checkMimeType(event) {
        //debugger;
        let files = event.target.files
        let err = ''
        //const types = ['image/png', 'image/jpeg', 'image/gif']
        for (var x = 0; x < files.length; x++) {
            if (files[x]['type'].split('/')[0] !== 'image') {
                err += files[x].name + ' is not a supported format\n';
            }
            //if (types.every(type => files[x].type !== type)) {
            //    err += files[x].type + ' is not a supported format\n';
            //}
        };
        
        if (err !== '') { 
            event.target.value = null;
            return false;
        }
        return true;
    }

    function checkFileSize(event) {
        let files = event.target.files
        let size = 2097152
        let err = "";
        for (var x = 0; x < files.length; x++) {
            if (files[x].size > size) {
                err += files[x].name + 'is too large, please pick a smaller file\n';
            }
        };
        if (err !== '') {
            event.target.value = null
            return false
        }
        return true;
    }

    return {
        //onChangeName: evt => {
        //    dispatch(changeName(evt.target.value));
        //},
        //toggle: evt => {
        //    toggle(collapseResponse(responseItem));
        //},

        onClickText: evt => {
            var responseId = evt.target.closest('.rp-item').attributes['data-responseid'].value;
            dispatch(addResponseDetail(responseId, "text"));
        },
        onDeleteResponse: evt => {
            var responseId = evt.target.closest('.rp-item').attributes['data-responseid'].value;
            dispatch(changeResponse(responseId));
            dispatch(deleteResponseRequest());
            setTimeout(() => {
                dispatch(loadResponseRequest());
            }, 100);
        },
        onChangeFileHandler: evt => {
            var files = evt.target.files;
            if (files.length == 0 || !checkMimeType(event) || !checkFileSize(event)) {
                return;
            }
            
            var responseId = evt.target.closest('.rp-item').attributes['data-responseid'].value;

            if (responseId == "") {
                dispatch(addResponseRequest());
            } else {
                dispatch(changeResponse(responseId));
            }

            var responseId = evt.target.closest('.rp-item').attributes['data-responseid'].value;
            dispatch(addResponseDetail(responseId, "image"));

            dispatch(responseChangeImage(files));
            setTimeout(() => {
                dispatch(addResponseDetailRequest());
            }, 100);
        },
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default compose(
    withConnect,
    memo,
)(Response);
