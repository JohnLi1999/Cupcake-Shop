import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Container } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';

import CustomSpinner from '../../common/UI/CustomSpinner';
import Title from '../../common/UI/Title';
import LogInForm from '../../components/customer/User/LogInForm';
import { login } from '../../api/authService';
import { AUTHENTICATION_TOKEN } from '../../constants/constants';

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

  return (
    <Container>
      <Title center>Log In</Title>

      {isLoading && <CustomSpinner />}

      <Formik
        initialValues={{
          usernameOrEmail: '',
          password: '',
        }}
        validationSchema={Yup.object().shape({
          usernameOrEmail: Yup.string().required(
            'Username or Email is required'
          ),
          password: Yup.string().required('Password is required'),
        })}
        onSubmit={handleSubmit}>
        {() => <LogInForm />}
      </Formik>
    </Container>
  );
};

export default withRouter(LogIn);
