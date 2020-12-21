import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Container } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';

import CustomSpinner from '../common/UI/CustomSpinner';
import Title from '../common/UI/Title';
import UserInfoForm from '../components/User/UserInfoForm';
import UserPasswordForm from '../components/User/UserPasswordForm';
import * as actions from '../store/actions/index';
import { updateUserInfo, updateUserPassword } from '../api/userService';

const Profile = ({ id, username, email, address, userUpdateInfo }) => {
  const [isLoading, setLoading] = useState(false);

  const handleSubmitInfo = async values => {
    setLoading(true);

    try {
      const response = await updateUserInfo(id, values);
      toast.success(response.data.message);
      userUpdateInfo(values);
      setLoading(false);
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
      const response = await updateUserPassword(id, values);
      toast.success(response.data.message);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 2000,
      });
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title center>Profile</Title>

      {isLoading && <CustomSpinner />}

      <Formik
        initialValues={{
          username,
          email,
          address,
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
        {() => <UserInfoForm />}
      </Formik>

      <Formik
        initialValues={{
          password: '',
          newPassword: '',
        }}
        validationSchema={Yup.object().shape({
          password: Yup.string().required('Password is required'),
          newPassword: Yup.string()
            .required('New Password is required')
            .min(6, 'New Password should have 6 characters or more')
            .max(100, 'New Password should have 100 characters or less'),
        })}
        onSubmit={handleSubmitPassword}>
        {() => <UserPasswordForm />}
      </Formik>
    </Container>
  );
};

const mapStateToProps = state => {
  const { id, username, email, address } = state.user;

  return {
    id,
    username,
    email,
    address,
  };
};

const mapDispatchToProps = dispatch => {
  return { userUpdateInfo: user => dispatch(actions.userUpdateInfo(user)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
