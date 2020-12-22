import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Container } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';

import CustomSpinner from '../../common/UI/CustomSpinner';
import Title from '../../common/UI/Title';
import UserInfoForm from '../../components/customer/User/UserInfoForm';
import UserPasswordForm from '../../components/customer/User/UserPasswordForm';
import * as actions from '../../store/actions/index';
import { updateUserInfo, updateUserPassword } from '../../api/userService';
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
  PASSWORD_REQUIRED,
  PASSWORD_MIN_MESSAGE,
  PASSWORD_MAX_MESSAGE,
  NEW_PASSWORD_REQUIRED,
  NEW_PASSWORD_MIN_MESSAGE,
  NEW_PASSWORD_MAX_MESSAGE,
} from '../../constants/en';

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
            .required(USERNAME_REQUIRED)
            .min(USERNAME_MIN_LENGTH, USERNAME_MIN_MESSAGE)
            .max(USERNAME_MAX_LENGTH, USERNAME_MAX_MESSAGE),
          email: Yup.string().required(EMAIL_REQUIRED).email(EMAIL_INVALID),
          address: Yup.string()
            .required(ADDRESS_REQUIRED)
            .max(ADDRESS_MAX_LENGTH, ADDRESS_MAX_MESSAGE),
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
          password: Yup.string().required(PASSWORD_REQUIRED),
          newPassword: Yup.string()
            .required(NEW_PASSWORD_REQUIRED)
            .min(PASSWORD_MIN_LENGTH, NEW_PASSWORD_MIN_MESSAGE)
            .max(PASSWORD_MAX_LENGTH, NEW_PASSWORD_MAX_MESSAGE),
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
