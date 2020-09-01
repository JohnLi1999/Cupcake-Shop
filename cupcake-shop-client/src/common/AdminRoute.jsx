import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import NotFound from './NotFound';
import { isAuthenticated, isAdmin } from '../shared/utility';

const AdminRoute = ({ ...props }) => {
  /* If logged in but not an admin, we will show an error page. 
     Otherwise we let the admin access the page */

  if (isAuthenticated()) {
    if (isAdmin()) {
      return <Route {...props} />;
    } else {
      return <Route component={NotFound} />;
    }
  }

  // If not logged in, redirect the user to the login page
  return <Redirect to='/login' />;
};
export default AdminRoute;
