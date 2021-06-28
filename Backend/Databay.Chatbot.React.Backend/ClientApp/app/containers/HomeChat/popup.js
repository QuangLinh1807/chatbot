import React, { useEffect, memo, useState } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';



import './SystemTable.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, Row, Form, FormGroup, Label, Input, FormText, Table, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Dropdown } from 'reactstrap';
import { Link } from 'react-router-dom';

import popup_success from '../../images/img/popup-success.png';
const key = 'homechat';

export function Popup({
  
}) {
    
    

    return (
        <article>
            <Helmet>
                <title>Home Chat</title>
                <meta name="description" content="A React.js Boilerplate application homepage" />
            </Helmet>

            <Navbar className="navbar-expand-sm navbar-toggleable-sm mb-3" light >
                <div className="container-fluid chatbot-navbar">
                    <NavbarBrand tag={Link} to="/">databay.ai</NavbarBrand>
                    <NavbarToggler className="mr-2" />
                    <Collapse className="d-sm-inline-flex flex-sm-row-reverse head-nav" navbar>
                        <ul className="navbar-nav flex-grow">
                            <NavItem>
                                <NavLink tag={Link} to="/">Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to="/tut">Tutorial</NavLink>
                            </NavItem>
                            <NavItem>
                                <Dropdown >
                                    <DropdownToggle nav caret className="user-info">
                                        User name
                                        </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem >Đăng xuất</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </NavItem>
                        </ul>
                    </Collapse>
                </div>
            </Navbar>
            <div className="sank-div"></div>
            <div className="popup-white">
                    <div className="container">
                        <div className="row" >
                            <div className="col-md-12 popup-final item-center ">
                                <div className="align-center">
                                    <img src={popup_success} alt="alt" />
                                    <p className="fw-600 fs-18">Chúc mừng !</p>
                                    <p className="fw-500">Bạn đã hoàn thành phần hướng dẫn tạo Bot!</p>
                                    <button className="fw-600 return-homepage-btn" > <Link className="back-homepage" tag={Link} to="/">Trở lại màn hình chính</Link></button>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </article>
    );
}


const mapStateToProps = createStructuredSelector({
   
});

export function mapDispatchToProps(dispatch, ownProps) {
   
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default compose(
    withConnect,
    memo,
)(Popup);
