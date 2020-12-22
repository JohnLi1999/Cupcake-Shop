import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Container, Button, Row } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';

import { signup } from '../../api/authService';
import { ROLE_USER } from '../../constants/constants';
import CustomSpinner from '../../common/UI/CustomSpinner';
import Title from '../../common/UI/Title';
import UsersAddForm from '../../components/admin/Users/UsersAddForm';
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

const AdminUsersAdd = ({ history }) => {
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async values => {
    setLoading(true);

    const signUpRequest = Object.assign({}, values);
    delete signUpRequest['confirm_password'];

    try {
      const response = await signup(signUpRequest);
      toast.success(response.data.message);
      setLoading(false);
      history.push('/admin/users');
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 2000,
      });
      setLoading(false);
    }
  };

  const goBack = () => history.push('/admin/users');

  return (
    <Container>
      <Row className="justify-content-end m-3">
        <Button variant="warning" onClick={goBack}>
          Back to user list
        </Button>
      </Row>

      <Title center>Add a new User</Title>

      {isLoading && <CustomSpinner />}

      <Formik
        initialValues={{
          username: '',
          email: '',
          password: '',
          confirm_password: '',
          address: '',
          roles: [ROLE_USER],
        }}
        enableReinitialize
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
          roles: Yup.array(),
        })}
        onSubmit={handleSubmit}>
        {() => <UsersAddForm />}
      </Formik>
    </Container>
  );
};

export default withRouter(AdminUsersAdd);
