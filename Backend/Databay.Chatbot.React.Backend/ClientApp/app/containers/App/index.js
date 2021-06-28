/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { memo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route, BrowserRouter , Redirect } from 'react-router-dom';
import HomePage from 'containers/HomePage/Loadable';
import Layout from './layout';
import UserLayout from './userlayout';
import ProtectedRoute from 'containers/ProtectedRoute';
import PropTypes, { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { getToken } from './actions';
import { HOMEPAGE_URL } from 'utils/constants';
import Tutorial from 'containers/Tutorial';
import Popup from 'containers/HomeChat/popup.js';
import HomeChat from 'containers/HomeChat';

//import ChangePassword from 'containers/ChangePassword';
//import Intent from 'containers/Intent';
//import Pattern from 'containers/Pattern';
//import EntityType from 'containers/EntityType';

// import FeaturePage from 'containers/FeaturePage/Loadable';
// import NotFoundPage from 'containers/NotFoundPage/Loadable';
// import Header from 'components/Header';
// import Footer from 'components/Footer';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, Row, Form, FormGroup, Label, Input, FormText, Table, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import GlobalStyle from '../../global-styles';
import popup from '../HomeChat/popup';

//export default function App() {
//    return (
//        <div style={{ height: '100%' }}>
//            <Helmet
//                titleTemplate="%s - React.js Boilerplate"
//                defaultTitle="React.js Boilerplate"
//            >
//                <meta name="description" content="A React.js Boilerplate application" />
//            </Helmet>
//            <Switch>
//                <ProtectedRoute exact path="/" component={HomePage} />
//                <ProtectedRoute path="/" component={Layout} />
//            </Switch>
//            <GlobalStyle />
//        </div>
//    );
//}

//const AppRoute = ({ component: Component, layout: Layout, ...rest }) => (
//    <Route {...rest} render={props => (
//        <Layout>
//            <Component {...props} />
//        </Layout>
//    )} />
//)


//let botId = '';
class App extends React.Component {
    //static propTypes = {
    //    cookies: instanceOf(Cookies).isRequired
    //};

    constructor(props) {
        super(props);
    }
    
    render() {
        const { cookies } = this.props;
        if (cookies.cookies.token == undefined) {
            window.location.href = HOMEPAGE_URL;
        } else {
            this.props.onLoad(cookies.cookies.token);
        }
        

        return (
            <div style={{ height: '100%' }}>
                <Helmet
                    titleTemplate="%s - React.js Boilerplate"
                    defaultTitle="React.js Boilerplate"
                >
                    <meta name="description" content="A React.js Boilerplate application" />
                </Helmet>
                
                <Switch>

                        
                        <Route exact path="/" component={HomePage} />
                        <Route path="/tutorial" component={Tutorial} />
                        <Route path="/popup" component={Popup} />
                        <Route path="/:bot/homechat" component={HomeChat} />
                        <Route path="/" component={Layout} />
                        


                </Switch>
                
                
                
                <GlobalStyle />
            </div>
        );
    }
}

//export default withCookies(App);

//const mapStateToProps = createStructuredSelector({
//    //bots: makeSelectBots(),
//    //bot: makeSelectBot(),
//    //loading: makeSelectLoading(),
//    //error: makeSelectError(),
//});

export function mapDispatchToProps(dispatch) {
    return {
        onLoad: evt => {
            dispatch(getToken(evt))
        }
    };
}

const withConnect = connect(
    //mapStateToProps,
    null,
    mapDispatchToProps,
);

export default compose(
    withConnect,
    memo,
    withCookies
)(App);
