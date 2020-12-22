import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Container, Button, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { updateUserInfo, resetUserPassword } from '../../api/userService';
import CustomSpinner from '../../common/UI/CustomSpinner';
import Title from '../../common/UI/Title';
import UsersInfoUpdateForm from '../../components/admin/Users/UsersInfoUpdateForm';
import UsersPasswordUpdateForm from '../../components/admin/Users/UsersPasswordUpdateForm';

const AdminUsersUpdate = ({ users, history, location }) => {
  const [user, setUser] = useState({ username: '', email: '', address: '' });
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (!users.length) {
      history.push('/admin/users');
    }
    setUser(users.find(user => user.id === location.state.id));
  }, [users, location, history]);

  const handleSubmitInfo = async values => {
    setLoading(true);

    try {
      const response = await updateUserInfo(user.id, values);
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

  const handleSubmitPassword = async values => {
    setLoading(true);

    try {
      const response = await resetUserPassword(user.id, values);
      toast.success(response.data.message);
      history.push('/admin/users');
      setLoading(false);
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

      <Title center>Update User Info</Title>

      {isLoading && <CustomSpinner />}

      <Formik
        initialValues={{
          username: user.username,
          email: user.email,
          address: user.address,
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
          address: Yup.string()
            .required('Address is required')
            .max(200, 'Address should have 200 characters or less'),
        })}
        onSubmit={handleSubmitInfo}>
        {() => <UsersInfoUpdateForm />}
      </Formik>

      <Formik
        initialValues={{
          newPassword: '',
        }}
        validationSchema={Yup.object().shape({
          newPassword: Yup.string()
            .required('New Password is required')
            .min(6, 'New Password should have 6 characters or more')
            .max(100, 'New Password should have 100 characters or less'),
        })}
        onSubmit={handleSubmitPassword}>
        {() => <UsersPasswordUpdateForm />}
      </Formik>
    </Container>
  );
};

const mapStateToProps = state => {
  const { users } = state.admin;

  return {
    users,
  };
};

export default connect(mapStateToProps)(withRouter(AdminUsersUpdate));
