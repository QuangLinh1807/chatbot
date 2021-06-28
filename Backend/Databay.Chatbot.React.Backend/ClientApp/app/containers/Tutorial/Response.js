import React, { useEffect, memo, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import reducer from './reducer';
import saga from './saga';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { Collapse } from 'reactstrap';
import ResponseDetailList from './ResponseDetailList';
import {
} from './selectors';
import {
    addResponseDetail,
    deleteResponseRequest,
    loadResponseRequest,
    changeResponse,
    changeStyles,
    handleNext,
    responseChangeImage,
    responseDetailChangeImageRequest,
    addResponseDetailRequest
} from './actions';

import form_icon from '../../images/form-icon.png';
import step_icon from '../../images/go-to-step-icon.png';
import helper_icon from '../../images/helper-icon.png';
import img_icon_gray from '../../images/img-icon.png';
import img_icon_select from '../../images/img-icon-select.png';
import reply_flash_icon from '../../images/reply-flash-icon.png';
import slide_icon from '../../images/slide-icon.png';
import text_icon_select from '../../images/text-icon-select.png';
import text_icon_gray from '../../images/text-icon.png';

const key = 'tutorial';

export function Response({
    step,
    responseItem,
    toggle,
    onClickText,
    onClickImage,
    onChangeStyles,
    onHandleNext,
    onChangeFileHandler,
}) {
    useInjectReducer({ key, reducer });
    useInjectSaga({ key, saga });

    function onToggle() {
        toggle(responseItem);
    }

    useEffect(() => {
        var element = document.getElementById('step-' + step);
        if (element != undefined) {
            var el = element.getBoundingClientRect();
            onChangeStyles(el);
        }
    }, []);

    const [deleteResponse, setDeleteResponse] = useState(false);

    let responseDetails = responseItem != undefined ? responseItem.responseDetails : []
    return (
        <div className="rp-item" data-responseid={responseItem.internalId}>
            <div className="rp-body">
                <div className="rp-features" style={{ display: 'flex' }}>
                    <div className={(step === 11 ? 'floating-div circle-text-btn' : '')} id="step-11" /*onClick={onClickText}*/></div>
                    <button className={(step === 11 ? 'image-btn-tutorial fw-500' : 'image-btn-tutorial fw-500 z-index-1')} id="step-11" onClick={onClickText} > <img src={(step === 11 ? text_icon_select : text_icon_gray)} alt="alt" /> Văn bản</button>

                    <div className={(step === 13 ? 'floating-div circle-image-btn' : '')} id="step-13" /*onClick={onChangeFileHandler}*/></div>
                    <label className={(step === 13 ? 'image-btn-tutorial fw-500' : 'image-btn-tutorial fw-500 z-index-1')} id="step-13" style={{ marginRight: "20px", marginBottom: "-7px" }}>
                        <input type="file" name="file" id="uploadfile" onChange={onChangeFileHandler} style={{ display: 'none' }} accept="image/*" />
                        <img src={(step === 13 ? img_icon_select : img_icon_gray)} alt="alt" /> Hình ảnh
                    </label>
                    
                    <button className='image-btn-tutorial fw-500 z-index-1'>  <img src={slide_icon} alt="alt" /> Slide ảnh </button>
                    <button className='image-btn-tutorial fw-500 z-index-1'>  <img src={form_icon} alt="alt" /> Form </button>
                    <button className='image-btn-tutorial fw-500 z-index-1'>  <img src={step_icon} alt="alt" /> Đi đến bước </button>
                    <button className='image-btn-tutorial fw-500 z-index-1'>  <img src={reply_flash_icon} alt="alt" /> Phản hồi nhanh </button>
                    <button className='image-btn-tutorial fw-500 z-index-1'>  <img src={helper_icon} alt="alt" /> Người hỗ trợ </button>
                </div>
                <ResponseDetailList items={responseDetails} step={step} />
            </div>
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
});

export function mapDispatchToProps(dispatch) {
    return {
        onClickText: evt => {
            //debugger;
            var responseId = evt.target.closest('.rp-item').attributes['data-responseid'].value;
            dispatch(addResponseDetail(responseId, "text"));
            dispatch(handleNext(evt));
        },
        onChangeFileHandler: evt => {
            var file = evt.target.files[0];

            // check file type is not image or file size > 2mb
            if (!file || file['type'].split('/')[0] !== 'image' || file.size > 2097152) {
                return;
            }

            var responseId = evt.target.closest('.rp-item').attributes['data-responseid'].value;
            dispatch(addResponseDetail(responseId, "image"));

            dispatch(responseChangeImage(file));
            dispatch(responseDetailChangeImageRequest());

            setTimeout(() => {
                dispatch(addResponseDetailRequest());
                dispatch(handleNext(evt));
            }, 1000);
        },
        onChangeStyles: evt => {
            var styles = {
                background: '#1745f2',
                color: "#fff",
                position: 'absolute',
                top: evt.top - 90,
                left: evt.right + 50
            }
            dispatch(changeStyles(styles))
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
