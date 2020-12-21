import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  Container,
  FormGroup,
  Button,
  Col,
  Row,
  Spinner,
} from 'react-bootstrap';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { updateUserInfo, resetUserPassword } from '../../../api/userService';

const StyledH1 = styled.h1`
  text-align: center;
  margin: 25px;
`;

const StyledLabel = styled.label`
  font-size: 18px;
  font-weight: 500;
  margin: 10px 2px;
`;

const StyledErrorFeedback = styled.div`
  color: #ff0000;
  margin: 0 5px;
`;

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

  return (
    <Container>
      <Row className="justify-content-end m-3">
        <Button variant="warning" onClick={() => history.push('/admin/users')}>
          Back to user list
        </Button>
      </Row>

      <StyledH1>Update User Info</StyledH1>

      {isLoading && (
        <Container className="d-flex justify-content-center">
          <Spinner animation="border" variant="primary" />
        </Container>
      )}

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
        {() => (
          <Form>
            <FormGroup as={Col} md={{ span: 6, offset: 3 }}>
              <StyledLabel>Username</StyledLabel>
              <Field
                className="form-control"
                type="text"
                name="username"
                placeholder="Please enter your username"
              />
              <StyledErrorFeedback>
                <ErrorMessage name="username" />
              </StyledErrorFeedback>
            </FormGroup>
            <FormGroup as={Col} md={{ span: 6, offset: 3 }}>
              <StyledLabel>Email</StyledLabel>
              <Field
                className="form-control"
                type="text"
                name="email"
                placeholder="Please enter your email"
              />
              <StyledErrorFeedback>
                <ErrorMessage name="email" />
              </StyledErrorFeedback>
            </FormGroup>
            <FormGroup as={Col} md={{ span: 6, offset: 3 }}>
              <StyledLabel>Address</StyledLabel>
              <Field
                className="form-control"
                type="text"
                name="address"
                placeholder="Please enter your address"
              />
              <StyledErrorFeedback>
                <ErrorMessage name="address" />
              </StyledErrorFeedback>
            </FormGroup>
            <Row className="justify-content-center">
              <Button className="m-2 mb-5" type="submit">
                Update Basic Information
              </Button>
            </Row>
          </Form>
        )}
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
        {() => (
          <Form>
            <FormGroup as={Col} md={{ span: 6, offset: 3 }}>
              <StyledLabel>New Password</StyledLabel>
              <Field
                className="form-control"
                type="password"
                name="newPassword"
                placeholder="Please enter your new password"
              />
              <StyledErrorFeedback>
                <ErrorMessage name="newPassword" />
              </StyledErrorFeedback>
            </FormGroup>
            <Row className="justify-content-center">
              <Button className="m-2 mb-5" type="submit" variant="danger">
                Reset Password
              </Button>
            </Row>
          </Form>
        )}
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
