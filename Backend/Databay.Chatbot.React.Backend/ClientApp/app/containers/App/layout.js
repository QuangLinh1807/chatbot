import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, Row, Form, FormGroup, Label, Input, FormText, Table, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './SystemTable.css';

import ProtectedRoute from 'containers/ProtectedRoute';
import Intent from 'containers/Intent';
import Pattern from 'containers/Pattern';
import EntityType from 'containers/EntityType';

import ChangePassword from 'containers/ChangePassword';
import axios from 'axios';
import { API_TRAINING_BOT_URL } from 'utils/constants';

import search from '../../images/search-icon.png';
import ailogo from '../../images/ai-logo.png';
import charticon from '../../images/chart-icon.png';
import boticon from '../../images/bot-icon.png';
import msgicon from '../../images/message-icon.png';
import listicon from '../../images/list-icon.png';
import avataruser from '../../images/ava-user.png';
import editpass from '../../images/edit-icon.png';
import imglogout from '../../images/img-logout.png';
import imgrepair from '../../images/img-repair.png';
import avata1 from '../../images/ava1.png';
import avata2 from '../../images/ava2.png';
import avata3 from '../../images/ava3.png';
import avata4 from '../../images/ava4.png';
import avata5 from '../../images/ava5.png';

let botId = '';
export default props => {
    //debugger;
    botId = props.location.pathname.split('/')[1];
    function onTrainModel() {
        axios.get(`${API_TRAINING_BOT_URL}/train/` + botId)
            .then(response => response)
            .then((data) => {
                console.log(data)
            })
    }
    return (
        <div className="wrapper ff">
            <div className="ai-navbar-left">
                <img src={ailogo} />
                <hr style={{ borderColor: '#141b37' }} />
                <ul>
                    <li className="pb-18"><a href="#"><img src={charticon} /></a></li>
                    <li className="pt-18 pb-18"><a href="#"><img src={boticon} /></a></li>
                    <li className="pt-18 pb-18"><a href="#"><img src={msgicon} /></a></li>
                    <li className="pt-18 pb-18"><a href="#"><img src={listicon} /></a></li>
                </ul>
            </div>
            <div className="ai-content">
                <div className="ai-content__header">
                    <span className="ai-content__header--select-bot">
                        <UncontrolledDropdown>
                            <DropdownToggle className="Button ai-content__header--select-bot">
                                <button type="button" class="dropdown-toggle dropdown-button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Buratino</button>
                            </DropdownToggle>
  
                            <DropdownMenu right className="intent__dropdown-menu ">
                                <DropdownItem type="button" className="dropdown-name" data-toggle="tooltip" value="bu"><img className="img-avt" src={avata1} />Buratino</DropdownItem>

                                <DropdownItem type="button" className="dropdown-name" data-toggle="tooltip" value="li"><img className="img-avt" src={avata2}/>Lila</DropdownItem>

                                <DropdownItem type="button" className="dropdown-name" data-toggle="tooltip" value="lady"><img className="img-avt" src={avata3}/>Lady Gaga</DropdownItem>

                                <DropdownItem type="button" className="dropdown-name" data-toggle="tooltip" value="ze"><img className="img-avt" src={avata4}/>Zest</DropdownItem>

                                <DropdownItem type="button" className="dropdown-name" data-toggle="tooltip" value="br"><img className="img-avt" src={avata5}/>Bray</DropdownItem>
                            </DropdownMenu>
                            <div className="input-group ai-content__header--input-gr">
                                <input type="text" className="form-control ai-content__header--input" placeholder="Tìm kiếm" />
                                <div className="input-group-btn">
                                    <button className="ai-content__header--input-gr-btn" type="submit">
                                        <span className="glyphicon glyphicon-search"><img className=" img-search" src={search} alt="icon" /></span>
                                    </button>
                                </div>
                            </div>
                        </UncontrolledDropdown>
                    </span>

                    <div className="ai-content__header--header-right">
                        <div className="ai-content__header--header-right-hover">
                            <div style={{ position: 'absolute', right: '145px', top: '21px' }}>
                                <a href="#" style={{ color: '#878b9a' }}><i className="fa fa-bell fs-18 mr-10" aria-hidden="true" ></i></a>
                                <a href="#" style={{ color: '#878b9a' }}><i className="fa fa-question-circle fs-18 mr-10" aria-hidden="true"></i></a>
                                <a href="#" style={{ color: '#878b9a' }}><i className="fa fa-cog fs-18 mr-10" aria-hidden="true"></i></a>
                            </div>
                        </div>
                        <div>
                            <UncontrolledDropdown>
                                <DropdownToggle className="Button">
                                    <img src={avataruser} className="mr-10" />
                                    <span className="fw-600">Hoanghai</span>
                                </DropdownToggle>
                                <DropdownMenu right className="intent__dropdown-menu">
                                    <DropdownItem type="button" className="button-function" data-toggle="tooltip"><img className="img-edit" src={editpass} /> Đổi mật khẩu</DropdownItem>

                                    <DropdownItem type="button" className="button-function" data-toggle="tooltip"><img className="img-edit" src={imgrepair}/>Sửa thông tin</DropdownItem>

                                    <DropdownItem type="button" className="button-function" data-toggle="tooltip"><img className="img-edit" src={imglogout}/> Đăng xuất</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </div>

                    </div>
                </div>
                <div style={{ height: '100%' }}>
                    <div className="container-fluid" style={{ height: '100%' }}>
                        <div className="row" style={{ height: '100%' }}>
                            <div className="col-lg-2 ai-content__navbar-left">
                                <p className="fw-600">Chatbot</p>
                                <ul>
                                    <li><Link to="#">Vai trò của Bot</Link></li>
                                    <li><Link to="#">Cài đặt Bot</Link></li>
                                    <li><Link to={`/${botId}/intent`}>Ý định</Link></li>
                                    <li><Link to={`/${botId}/pattern`}>Câu mẫu</Link></li>
                                    <li><Link to={`/${botId}/entitytype`}>Loại thực thể</Link></li>
                                    <li><Link to="#">Từ điển</Link></li>
                                </ul>
                            </div>
                            <div className="col-lg-10 ai-content__body" >
                                <button
                                    className="btn padding-content__btn"
                                    type="button"
                                    onClick={onTrainModel}
                                    title="Huấn luyện"
                                    style={{ position: 'absolute', right: '32px' }}
                                >
                                    <i className="fa fa-globe" aria-hidden="true"></i>Huấn luyện
                                </button>

                                <Switch>
                                    <Route path="/:bot/intent" component={Intent} />
                                    <Route path="/:bot/pattern" component={Pattern} />
                                    <Route path="/:bot/entitytype" component={EntityType} />
                                    <Route path="/changepassword" component={ChangePassword} />
                                </Switch>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
