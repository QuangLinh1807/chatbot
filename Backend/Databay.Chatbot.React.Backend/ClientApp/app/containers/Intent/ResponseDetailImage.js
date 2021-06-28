import React, { useEffect, memo, useState } from 'react';
import { API_URL } from 'utils/constants';
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

import img_icon_gray from '../../images/img-icon.png';
import delete_icon from '../../images/delete-icon-tutorial.png'

const key = 'intent';

export function ResponseDetailImage({
    responseDetailItem,
    onDeleteResponseDetail
}) {
    useInjectReducer({ key, reducer });
    useInjectSaga({ key, saga });

    const [deleteResponseDetail, setDeleteResponseDetail] = useState(true);
    
    function loadImages() {
        debugger;
        var images = responseDetailItem.imageUrl.split(',');
        //images.map((item, index) => {
        //    debugger;
        //    var fileUrl = item != "" ? `${API_URL}${item}` : "";
        //    return (<img key={item} src={fileUrl} alt="alt" style={{ width: "30%" }} />)
        //})
        var arr = [];
        for (var i = 0; i < images.length; i++) {
            var item = images[i];
            var fileUrl = item != "" ? `${API_URL}${item}` : "";
            arr.push(<img src={fileUrl} key={item} alt="alt" className="rp-load-images" />);
        }
        return arr;
    };
    return (
        <div /*style={{ position: "relative" }}*/>
            <div className="rp-detail" style={{ backgroundColor: "transparent" }}  /*onMouseEnter={() => setDeleteResponseDetail(true)} onMouseLeave={() => setDeleteResponseDetail(false)}*/>
                
                    <span className="rp-title" style={{ color: "#000" }}>
                        <img src={img_icon_gray} alt="alt" /> Hình ảnh</span>
               
                <div className="rp-images" data-responsedetailid={responseDetailItem.internalId}>
                    {loadImages()}
                    {deleteResponseDetail && <button type="button" onClick={onDeleteResponseDetail} className="delete-img-rp-btn"><img src={delete_icon} /></button>}
                </div>               
            </div>
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
        onDeleteResponseDetail: evt => {
            //debugger;
            var responseId = evt.target.closest('.rp-item').attributes['data-responseid'].value;
            dispatch(changeResponse(responseId));
            var responseDetailId = evt.target.closest('.rp-images').attributes['data-responsedetailid'].value;
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
)(ResponseDetailImage);