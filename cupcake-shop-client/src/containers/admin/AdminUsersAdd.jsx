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
          roles: Yup.array(),
        })}
        onSubmit={handleSubmit}>
        {() => <UsersAddForm />}
      </Formik>
    </Container>
  );
};

export default withRouter(AdminUsersAdd);
