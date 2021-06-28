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
    
} from './selectors';
import {
    addResponseRequest,
    loadResponseRequest,
    deleteResponseDetailRequest,
    addResponseDetailRequest,
    responseChangeText,
    changeResponse,
    changeResponseDetail,
    changeStyles
    
} from './actions';

import {
    validRequire,
    valid_check,
    Validator
} from '../../utils/validate';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, Row, Form, FormGroup, Label, Input, FormText, Table, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Dropdown } from 'reactstrap';

import text_icon_white from '../../images/text-icon-white.png';
import text_icon_gray from '../../images/text-icon.png';
import delete_icon_tutorial from '../../images/delete-icon-tutorial.png';
import duplicate_icon_tutorial from '../../images/duplicate-icon-tutorial.png';

const key = 'tutorial';

export function ResponseDetail({
    step,
    onChangeText,
    onAddResponse,
    responseDetailItem,
    onDeleteResponseDetail,
    onChangeStyles
}) {
    useInjectReducer({ key, reducer });
    useInjectSaga({ key, saga });

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const rules_responses = [
        {
            field: 'responses',
            method: 'isEmpty',
            validWhen: false,
            message: 'Bạn vui lòng nhập câu trả lời',
        }
    ];

    useEffect(() => {
        var element = document.getElementById('step-' + step);
        if (element != undefined) {
            var el = element.getBoundingClientRect();
            onChangeStyles(el);
        }
    }, []);

    return (
        <div style={{ position: 'relative' }}>
            <div className={(step === 12 ? 'rp-detail floating-div' : 'rp-detail')} style={{ backgroundColor: 'transparent' }}>
                <span className="rp-title" style={(step === 12 ? { color: '#fff' } : { color: '#000' })}>  <img src={(step === 12 ? text_icon_white : text_icon_gray)} alt="alt" /> Văn bản</span>
                <input id="step-12" className="text-response fw-600" data-responsedetailid={responseDetailItem.internalId} onChange={onChangeText} onBlur={onAddResponse} type="text" value={responseDetailItem.text} />
                <Label className={(valid_check(responseDetailItem.text) != null ? 'show-tag valid-text' : 'hidden-tag')} style={{ color: '#fff' }}> Bạn chưa nhập câu trả lời </Label>
            </div>

            <div className="support-icon">
                <img src={delete_icon_tutorial} alt="alt" style={{ marginBottom: '10px' }} />
                <img src={duplicate_icon_tutorial} alt="alt" />
            </div>
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
});

export function mapDispatchToProps(dispatch) {
    return {
        onChangeText: evt => {
            var responseId = evt.target.closest('.rp-item').attributes['data-responseid'].value;
            var responseDetailId = evt.target.attributes['data-responsedetailid'].value;
            dispatch(responseChangeText(responseId, responseDetailId, evt.target.value))
        },
        onAddResponse: evt => {
            var responseId = evt.target.closest('.rp-item').attributes['data-responseid'].value;
            var responseDetailId = evt.target.attributes['data-responsedetailid'].value;
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
            setTimeout(() => {
                dispatch(loadResponseRequest());
            }, 100);
        },
        onChangeStyles: evt => {
            //debugger;
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
)(ResponseDetail);
