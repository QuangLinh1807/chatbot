import React, { useEffect, memo, useState } from 'react';
import { createStructuredSelector } from 'reselect';
import reducer from './reducer';
import saga from './saga';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
    makeSelectResponses,
    makeSelectResponseID,
    makeSelectResponseComponents,
    makeSelectResponseDetail,
    makeSelectResponse
} from './selectors';
import {
    addResponseRequest,
    loadResponseRequest,
    deleteResponseDetailRequest,
    addResponseDetailRequest,
    responseChangeText,
    changeResponse,
    changeResponseDetail
} from './actions';

const key = 'intent';

import text_icon from '../../images/text-icon.png'
import delete_icon from '../../images/delete-icon-tutorial.png'
import duplicate_icon from '../../images/duplicate-icon-tutorial.png'

export function ResponseDetail({
    onChangeText,
    onAddResponse,
    responseDetailItem,
    onDeleteResponseDetail
}) {

    useInjectReducer({ key, reducer });
    useInjectSaga({ key, saga });
    
    const [deleteResponseDetail, setDeleteResponseDetail] = useState(true);
    return (
        <div className="rp-detail" data-responsedetailid={responseDetailItem.internalId} /*onMouseEnter={() => setDeleteResponseDetail(true)} onMouseLeave={() => setDeleteResponseDetail(false)}*/>
            <span className="rp-title"><img src={text_icon} alt="alt" className="mr-7" />Văn bản</span>
            <input onChange={onChangeText} onBlur={onAddResponse} type="text" value={responseDetailItem.text} className="fw-500 input-response-text" />
            {deleteResponseDetail && <button type="button" onClick={onDeleteResponseDetail} className="delete-rp-btn"><img src={delete_icon} /></button>}
            <button type="button" className="duplicate-rp-btn"><img src={duplicate_icon} /></button>
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    responses: makeSelectResponses(),
    responseid: makeSelectResponseID(),
    responseComponents: makeSelectResponseComponents(),
    responseDetail: makeSelectResponseDetail(),
    response: makeSelectResponse()
});

export function mapDispatchToProps(dispatch) {
    return {
        onChangeText: evt => {
            //debugger;
            //if (evt !== undefined && evt.preventDefault)
            //    evt.preventDefault();
            //debugger;
            var responseId = evt.target.closest('.rp-item').attributes['data-responseid'].value;
            var responseDetailId = evt.target.closest('.rp-detail').attributes['data-responsedetailid'].value;
            dispatch(responseChangeText(responseId, responseDetailId, evt.target.value))
        },
        onAddResponse: evt => {
            //debugger;
            //if (evt !== undefined && evt.preventDefault)
            //    evt.preventDefault();
            var responseId = evt.target.closest('.rp-item').attributes['data-responseid'].value;
            var responseDetailId = evt.target.closest('.rp-detail').attributes['data-responsedetailid'].value;
            dispatch(responseChangeText(responseId, responseDetailId, evt.target.value))

            if (responseId == "") {
                dispatch(addResponseRequest());
                setTimeout(() => {
                    dispatch(addResponseDetailRequest());
                }, 100);

            } else {
                dispatch(changeResponse(responseId));

                if (responseDetailId != "") {
                    dispatch(changeResponseDetail(responseDetailId));
                }
                dispatch(addResponseDetailRequest());
            }
            //setTimeout(() => {
            //    dispatch(loadResponseRequest());
            //}, 100);
        },
        //onFocusDetail: evt => {
        //    debugger;
        //    setDeleteResponseDetail(true);
        //},
        onDeleteResponseDetail: evt => {
            //debugger;
            var responseId = evt.target.closest('.rp-item').attributes['data-responseid'].value;
            dispatch(changeResponse(responseId));
            var responseDetailId = evt.target.closest('.rp-detail').attributes['data-responsedetailid'].value;
            dispatch(changeResponseDetail(responseDetailId));
            dispatch(deleteResponseDetailRequest());
            setTimeout(() => {
                dispatch(loadResponseRequest());
            }, 100);
        }
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default compose(
    withConnect,
    memo,
)(ResponseDetail);
