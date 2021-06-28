
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import getToken from 'utils/auth';
import { HOMEPAGE_URL } from 'utils/constants';

const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        getToken(rest) !== null ? (
            <Component {...props} />
        ) : (
                //<Redirect to={{
                //    pathname: 'auth/login',
                //    state: { from: props.location }
                //}}
                ///>
                window.location.href = HOMEPAGE_URL
            )
    )} />
);

export default ProtectedRoute;
