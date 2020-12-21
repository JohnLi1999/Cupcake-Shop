import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Container } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';

import CustomSpinner from '../common/UI/CustomSpinner';
import Title from '../common/UI/Title';
import SignUpFrom from '../components/User/SignUpForm';
import { signup } from '../api/authService';

const SignUp = ({ history }) => {
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async values => {
    setLoading(true);

    const signUpRequest = Object.assign({}, values);
    delete signUpRequest['confirm_password'];

    try {
      const response = await signup(signUpRequest);
      toast.success(response.data.message);
      setLoading(false);
      history.push('/login');
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 2000,
      });
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title center>Sign Up</Title>

      {isLoading && <CustomSpinner />}

      <Formik
        initialValues={{
          username: '',
          email: '',
          password: '',
          confirm_password: '',
          address: '',
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string()
            .required('Username is required')
            .min(3, 'Username should have 3 characters or more')
            .max(40, 'Username should have 40 characters or less'),
          email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
          password: Yup.string()
            .required('Password is required')
            .min(6, 'Password should have 6 characters or more')
            .max(100, 'Password should have 100 characters or less'),
          confirm_password: Yup.string()
            .required('Confirm Password is required')
            .oneOf([Yup.ref('password')], 'Two passwords must match'),
          address: Yup.string()
            .required('Address is required')
            .max(200, 'Address should have 200 characters or less'),
        })}
        onSubmit={handleSubmit}>
        {() => <SignUpFrom />}
      </Formik>
    </Container>
  );
};

export default withRouter(SignUp);
