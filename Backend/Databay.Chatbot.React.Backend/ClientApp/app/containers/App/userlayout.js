import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SystemTable.css';
import ailogo from '../../images/ai-logo.png';
import charticon from '../../images/chart-icon.png';
import boticon from '../../images/bot-icon.png';
import msgicon from '../../images/message-icon.png';
import listicon from '../../images/list-icon.png';
import avataruser from '../../images/ava-user.png';
import ProtectedRoute from 'containers/ProtectedRoute';

import ChangePassword from 'containers/ChangePassword';

import search from '../../images/search-icon.png';


//let botId = '';
export default props => {
    //botId = props.location.pathname.split('/')[1];
    
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
                    <select className="ai-content__header--select-bot">
                        <option value="bu" data-image="images/ava1.png">Buratino</option>
                        <option value="li" data-image="images/ava2.png">Lila</option>
                        <option value="lady" data-image="images/ava3.png">Lady Gaga</option>
                        <option value="ze" data-image="images/ava4.png">Zest</option>
                        <option value="br" data-image="images/ava5.png">Bray</option>
                    </select>
                    <div className="input-group ai-content__header--input-gr">
                        <input type="text" className="form-control ai-content__header--input" placeholder="Tìm kiếm" />
                        <div className="input-group-btn">
                            <button className="ai-content__header--input-gr-btn" type="submit">
                                <span className="glyphicon glyphicon-search"><img className=" img-search" src={search} alt="icon" /></span>
                            </button>
                        </div>
                    </div>
                    <div className="ai-content__header--header-right">
                        <div className="ai-content__header--header-right-hover">
                            <div style={{ position: 'absolute', right: '145px', top: '21px' }}>
                                <a href="#" style={{ color: '#878b9a' }}><i className="fa fa-bell fs-18 mr-10" aria-hidden="true" ></i></a>
                                <a href="#" style={{ color: '#878b9a' }}><i className="fa fa-question-circle fs-18 mr-10" aria-hidden="true"></i></a>
                                <a href="#" style={{ color: '#878b9a' }}><i className="fa fa-cog fs-18 mr-10" aria-hidden="true"></i></a>
                            </div>
                        </div>
                        <img src={avataruser} className="mr-10" />
                        <span className="fw-600">Hoanghai</span>
                    </div>
                </div>
                <div style={{ height: '100%' }}>
                    <div className="container-fluid" style={{ height: '100%' }}>
                        <div className="row" style={{ height: '100%' }}>
                            <div className="col-lg-2 ai-content__navbar-left">
                                <p className="fw-600">Thông tin của tôi</p>
                                <ul>
                                    <li><Link to="#">Thông tin chung</Link></li>
                                    <li><Link to="#">Thông tin công ty</Link></li>
                                    <li><Link to={`/changepassword`}>Đổi mật khẩu</Link></li>
                                    <li><Link to="#">Ý kiến phản hồi</Link></li>
                                </ul>
                            </div>
                            <div className="col-lg-10 ai-content__body" >
                                
                                <Switch>
                                    <Route  component={ChangePassword} />
                                </Switch>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
