import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Container } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';

import CustomSpinner from '../../common/UI/CustomSpinner';
import Title from '../../common/UI/Title';
import SignUpFrom from '../../components/customer/User/SignUpForm';
import { signup } from '../../api/authService';
import {
  USERNAME_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  ADDRESS_MAX_LENGTH,
} from '../../constants/constants';
import {
  USERNAME_REQUIRED,
  USERNAME_MIN_MESSAGE,
  USERNAME_MAX_MESSAGE,
  EMAIL_REQUIRED,
  EMAIL_INVALID,
  PASSWORD_REQUIRED,
  PASSWORD_MIN_MESSAGE,
  PASSWORD_MAX_MESSAGE,
  CONFIRM_PASSWORD_REQUIRED,
  CONFIRM_PASSWORD_MISMATCH,
  ADDRESS_REQUIRED,
  ADDRESS_MAX_MESSAGE,
} from '../../constants/en';

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
            .required(USERNAME_REQUIRED)
            .min(USERNAME_MIN_LENGTH, USERNAME_MIN_MESSAGE)
            .max(USERNAME_MAX_LENGTH, USERNAME_MAX_MESSAGE),
          email: Yup.string().required(EMAIL_REQUIRED).email(EMAIL_INVALID),
          password: Yup.string()
            .required(PASSWORD_REQUIRED)
            .min(PASSWORD_MIN_LENGTH, PASSWORD_MIN_MESSAGE)
            .max(PASSWORD_MAX_LENGTH, PASSWORD_MAX_MESSAGE),
          confirm_password: Yup.string()
            .required(CONFIRM_PASSWORD_REQUIRED)
            .oneOf([Yup.ref('password')], CONFIRM_PASSWORD_MISMATCH),
          address: Yup.string()
            .required(ADDRESS_REQUIRED)
            .max(ADDRESS_MAX_LENGTH, ADDRESS_MAX_MESSAGE),
        })}
        onSubmit={handleSubmit}>
        {() => <SignUpFrom />}
      </Formik>
    </Container>
  );
};

export default withRouter(SignUp);
