import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';

import LogInForm from '../components/User/LoginForm';
import { login } from '../api/authService';
import { AUTHENTICATION_TOKEN } from '../constants/constants';

const LogIn = ({ onLogIn, location }) => {
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async values => {
    setLoading(true);

    const logInRequest = Object.assign({}, values);
    delete logInRequest['confirm_password'];

    try {
      const response = await login(logInRequest);
      toast.success('Log In Successfully!');

      const { jwtToken, tokenType } = response.data;
      localStorage.setItem(AUTHENTICATION_TOKEN, `${tokenType} ${jwtToken}`);

      setLoading(false);

      if (location.state && location.state.path) {
        onLogIn(location.state.path);
      } else {
        onLogIn();
      }
    } catch {
      toast.error(
        'Your Username / Email or Password is incorrect. Please try again',
        {
          autoClose: 2000,
        }
      );
      setLoading(false);
    }
  };

  return <LogInForm isLoading={isLoading} submitForm={handleSubmit} />;
};

export default withRouter(LogIn);
