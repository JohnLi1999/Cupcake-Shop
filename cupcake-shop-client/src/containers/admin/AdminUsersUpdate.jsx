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
  ADDRESS_REQUIRED,
  ADDRESS_MAX_MESSAGE,
  NEW_PASSWORD_REQUIRED,
  NEW_PASSWORD_MIN_MESSAGE,
  NEW_PASSWORD_MAX_MESSAGE,
} from '../../constants/en';

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
            .required(USERNAME_REQUIRED)
            .min(USERNAME_MIN_LENGTH, USERNAME_MIN_MESSAGE)
            .max(USERNAME_MAX_LENGTH, USERNAME_MAX_MESSAGE),
          email: Yup.string().required(EMAIL_REQUIRED).email(EMAIL_INVALID),
          address: Yup.string()
            .required(ADDRESS_REQUIRED)
            .max(ADDRESS_MAX_LENGTH, ADDRESS_MAX_MESSAGE),
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
            .required(NEW_PASSWORD_REQUIRED)
            .min(PASSWORD_MIN_LENGTH, NEW_PASSWORD_MIN_MESSAGE)
            .max(PASSWORD_MAX_LENGTH, NEW_PASSWORD_MAX_MESSAGE),
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
