import React, { useEffect, memo, useState } from 'react';

import { createStructuredSelector } from 'reselect';
import reducer from './reducer';
import saga from './saga';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import Validator from 'utils/validator';
import './StyleChangePassword.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, Row, Form, FormGroup, Label, Input, FormText, Table } from 'reactstrap';
import {
    makeSelecOldPassWord,
    makeSelecNewPassWord,
    makeSelecConfirmPassWord,
    makeSelectIsHiddenPassword,
} from './selectors';

import {

    changeOldPassWord,
    changeNewPassWord,
    changeConfirmPassWord,
    changePassWordRequest,
    changedPassWordSuccess,
    changePassWordError,
    hiddenPassword

} from './actions';

const key = 'changePassword';

export function ChangePassword({
    password,
    old_password,
    new_password,
    confirm_password,
    onChangeOldPassWord,
    onChangeNewPassWord,
    onChangeConfirmPassWord,
    onChangePassWordSubmit,
    isHiddenPassword,
    toggleShowPassword,

}) {

    useInjectReducer({ key, reducer });
    useInjectSaga({ key, saga });

    
    var label_password = isHiddenPassword ? '  Hiện mật khẩu' : '  Ẩn mật khẩu';
    return (

        <div>

            <div className="padding-content">
                <div className="Title-pass">Đổi mật khẩu</div>
                <span className="Content-pass">Tại đây bạn có thể đổi mật khẩu ứng dụng của Databay.ai</span>
            </div>
            <hr />

            <Row>
                <Col md={8}>

                    <Form>
                        <Table className="custom-table table-change">
                            <tbody>
                                <tr className="">
                                    <td colSpan="2" className="td-border">
                                        <FormGroup className="">
                                            <div className="Content-pass" >Thông tin thay đổi mật khẩu</div>
                                        </FormGroup>
                                    </td>
                                </tr>

                                <tr className="td-height">
                                    <td className="td-content td-content-border">
                                        <FormGroup className="form-group-box">
                                            <span id="name">Mật khẩu cũ</span>
                                            <span className="td-pass">
                                                <Input className="no-bd-l ps-r td-content td-location" type={isHiddenPassword ? "password" : "text"} name="password" id="password" placeholder="Nhập mật khẩu cũ" />
                                            </span>
                                        </FormGroup>
                                    </td>
                                    
                                    <td className="no-bd-l ps-r td-border td-location td-content-border">
                                        <a onClick={toggleShowPassword} className="btn-show-hide-password"><i className={(isHiddenPassword ? "fa fa-eye" : "fa fa-eye-slash")}></i>{label_password}</a>
                                    </td>
                                </tr>

                                <tr className="td-height">
                                    <td className="td-content">
                                        <FormGroup className="form-group-box">
                                            <span id="name">Mật khẩu mới</span>
                                            <span className="td-pass">
                                                <Input className="no-bd-l ps-r td-content td-location" type={isHiddenPassword ? "password" : "text"} name="password" id="password" placeholder="Nhập mật khẩu mới" />
                                            </span>
                                        </FormGroup>
                                    </td>
                                    
                                    <td className="no-bd-l ps-r td-border">
                                        <a onClick={toggleShowPassword} className="btn-show-hide-pass"><i className={(isHiddenPassword ? "fa fa-eye" : "fa fa-eye-slash")}></i>{label_password}</a>
                                    </td>
                                </tr>

                                <tr className="td-height">
                                    <td className="td-content">
                                        <FormGroup className="form-group-box">
                                            <span id="name">Nhập lại mật khẩu mới</span>
                                            <span className="td-pass">
                                                <Input className="no-bd-l ps-r td-content td-location" type={isHiddenPassword ? "password" : "text"} name="password" id="password" placeholder="Nhập lại mật khẩu mới" />
                                            </span>
                                        </FormGroup>
                                    </td>
                                    
                                    <td className="no-bd-l ps-r td-border">
                                        <a onClick={toggleShowPassword} className="btn-show-hide-pass"><i className={(isHiddenPassword ? "fa fa-eye" : "fa fa-eye-slash")}></i>{label_password}</a>
                                    </td>
                                </tr>

                                <tr>
                                    <td colSpan="2" className=" td-content-borderbottom ">
                                        <FormGroup className="register-btn">
                                            <Button className="btn-confirm mg-r-1" type="submit">Xác nhận</Button>
                                        </FormGroup>
                                    </td>

                                </tr>
                            </tbody>
                        </Table>
                    </Form>
                </Col>
            </Row>










        </div>
    );

}

ChangePassword.PropTypes = {

};

const mapStateToProps = createStructuredSelector({
    
    old_password: makeSelecOldPassWord(),
    new_password: makeSelecNewPassWord(),
    confirm_password: makeSelecConfirmPassWord(),
    isHiddenPassword: makeSelectIsHiddenPassword(),
});


export function mapDispatchToProps(dispatch) {
    return {
        onChangeOldPassWord: evt => {
            //debugger;
            dispatch(changeOldPassWord(evt.target.value));
        },

        onChangeNewPassWord: evt => {
            //debugger;
            dispatch(changeNewPassWord(evt.target.value));
        },
        onChangeConfirmPassWord: evt => {
            dispatch(changeConfirmPassWord(evt.target.value));
        },
        onChangePassWordSubmit: evt => {
            if (evt !== undefined && evt.preventDefault)
                evt.preventDefault();
            //debugger;
            dispatch(changePassWordRequest());
        },
        toggleShowPassword: evt => {
            //debugger;
            dispatch(hiddenPassword());
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
)(ChangePassword);