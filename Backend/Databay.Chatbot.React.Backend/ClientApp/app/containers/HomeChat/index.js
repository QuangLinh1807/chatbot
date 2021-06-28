import React, { useEffect, memo, useState } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { getBot } from '../App/actions';
import {
    //makeSelectAnswer,
    makeSelectLoading,
    makeSelectError,
} from 'containers/App/selectors';
import { changeMessage, pushMessage, chatRequest } from './actions';
import { makeSelectMessage, makeSelectHubConnection, makeSelectAnswer, makeSelectGroupName } from './selectors';

import reducer from './reducer';
import saga from './saga';
import MessageList from 'components/MessageList';
import './SystemTable.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, Row, Form, FormGroup, Label, Input, FormText, Table, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Dropdown } from 'reactstrap';
import { Link } from 'react-router-dom';
import ava_chat_bot from '../../images/img/ava-chat-bot.png';
import send_icon from '../../images/send_icon.png';
import exit_icon from '../../images/exit-icon.png';
import popup_success from '../../images/img/popup-success.png';
const key = 'homechat';

export function HomeChat({
    message,
    loading,
    error,
    answer,
    hubConnection,
    groupName,
    match,

    onGetBot,
    onChangeMessage,
    onSubmitForm,
    onPushMessage,
}) {
    useInjectReducer({ key, reducer });
    useInjectSaga({ key, saga });

    //var groupName = "1";

    function checkJsonObject(str) {
        try {
            var json = JSON.parse(str);
            return json;
        } catch (e) {
            return false;
        }
    }
    useEffect(() => {
        let bot = match.params.bot;
        onGetBot(bot);

        (async () => {
            try {
                
                await hubConnection.start()
                await hubConnection.invoke("AddToGroup", groupName);

                hubConnection.on('Send', (message) => {
                    
                    var obj = checkJsonObject(message);
                    if (obj !== false) {
                        if (obj.listResponse !== undefined) {
                            for (var i = 0; i < obj.listResponse.length; i++) {
                                //getTextMessage(obj.listResponse[i].Text);
                                onPushMessage(obj.listResponse[i]);
                            }
                        } else {
                            //getTextMessage(obj.Text);
                            //onPushMessage(obj.Text);
                        }
                    } else {
                        //getTextMessage(message);
                        //onPushMessage(message);
                    }

                    //var msg = {
                    //    Text: receivedMessage,
                    //    Type: "text"
                    //}
                    //dispatch(pushMessage(receivedMessage));
                });
            }
            catch (e) {
                console.error(e.toString());
            }
        })();

    }, []);

    const answerListProps = {
        loading,
        error,
        answer,
    };

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
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 box-chat">
                            <div className="box-chat-header">
                                <img src={ava_chat_bot} alt="alt" style={{ float: 'left' }} />
                                <div style={{ marginLeft: '65px'}}>
                                    <h3 className="fw-700" style={{ color: '#261559'}} >Buratino</h3>
                                    <p>Ngay lúc này</p>
                                </div>
                                <button type="button" style={{ position: 'absolute', right: '30px', top: '35px', border: 'none', background: '#fff' }}  ><NavLink tag={Link} to="/popup"><img src={exit_icon} alt="alt" /></NavLink> </button>
                            </div>

                            <div className="box-chat-body fw-500">
                                <div>
                                    <div className="incoming-msg">
                                        <div className="receive-msg">
                                            <p>Xin chào, mình là <span className="fw-600">Buratino</span>.<span style={{ display: 'block' }}>Chúng ta cùng xem bot hoạt động thế nào nhé.</span></p>
                                            <p>Giờ trong vai là khách hàng, bạn hãy hỏi giá của đôi giày Nike.</p>
                                        </div>
                                    </div>
                                    <MessageList {...answerListProps} />

                                </div>
                            </div>
                            <div className="box-chat-footer">
                                <input type="text" className="text-input-user fw-500" placeholder="Nhập nội dung tin nhắn" onChange={onChangeMessage} value={message} />
                                <button className="btn-send fw-500" onClick={onSubmitForm}><img src={send_icon} alt="alt" style={{ marginRight: '5px' }} />    Gửi ngay</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="sank-div" style={{display:'none'}}></div>
            <div className="popup-white" style={{ display: 'none' }}>
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

HomeChat.propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    //answer: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
    onSubmitForm: PropTypes.func,
    message: PropTypes.string,
    onChangeMessage: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
    answer: makeSelectAnswer(),
    message: makeSelectMessage(),
    loading: makeSelectLoading(),
    error: makeSelectError(),
    hubConnection: makeSelectHubConnection(),
    groupName: makeSelectGroupName(),
});

export function mapDispatchToProps(dispatch, ownProps) {
    let botId = ownProps.match.params.bot;
    return {
        // get bot id from url
        onGetBot: evt => dispatch(getBot(evt)),
        onChangeMessage: evt => dispatch(changeMessage(evt.target.value)),
        onSubmitForm: evt => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            {
                dispatch(chatRequest(botId));
            }
        },
        onPushMessage: evt => {
            dispatch(pushMessage(evt));
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
)(HomeChat);
