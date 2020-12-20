import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { isAuthenticated } from '../util/utility';

const AuthenticatedRoute = ({ ...props }) => {
  return isAuthenticated() ? <Route {...props} /> : <Redirect to='/login' />;
};

export default AuthenticatedRoute;
