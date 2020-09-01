import React, { useState } from 'react';
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
import { Link, withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';

import { signup } from '../api/authService';

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

const SignUp = ({ history }) => {
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
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
      <StyledH1>Sign Up</StyledH1>

      {isLoading && (
        <Container className='d-flex justify-content-center'>
          <Spinner animation='border' variant='primary' />
        </Container>
      )}

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
        {() => (
          <Form>
            <FormGroup as={Col} md={{ span: 6, offset: 3 }}>
              <StyledLabel>Username</StyledLabel>
              <Field
                className='form-control'
                type='text'
                name='username'
                placeholder='Please enter your username'
              />
              <StyledErrorFeedback>
                <ErrorMessage name='username' />
              </StyledErrorFeedback>
            </FormGroup>
            <FormGroup as={Col} md={{ span: 6, offset: 3 }}>
              <StyledLabel>Email</StyledLabel>
              <Field
                className='form-control'
                type='text'
                name='email'
                placeholder='Please enter your email'
              />
              <StyledErrorFeedback>
                <ErrorMessage name='email' />
              </StyledErrorFeedback>
            </FormGroup>
            <FormGroup as={Col} md={{ span: 6, offset: 3 }}>
              <StyledLabel>Password</StyledLabel>
              <Field
                className='form-control'
                type='password'
                name='password'
                placeholder='Please enter your password'
              />
              <StyledErrorFeedback>
                <ErrorMessage name='password' />
              </StyledErrorFeedback>
            </FormGroup>
            <FormGroup as={Col} md={{ span: 6, offset: 3 }}>
              <StyledLabel>Confirm Password</StyledLabel>
              <Field
                className='form-control'
                type='password'
                name='confirm_password'
                placeholder='Please confirm your password'
              />
              <StyledErrorFeedback>
                <ErrorMessage name='confirm_password' />
              </StyledErrorFeedback>
            </FormGroup>
            <FormGroup as={Col} md={{ span: 6, offset: 3 }}>
              <StyledLabel>Address</StyledLabel>
              <Field
                className='form-control'
                type='text'
                name='address'
                placeholder='Please enter your address'
              />
              <StyledErrorFeedback>
                <ErrorMessage name='address' />
              </StyledErrorFeedback>
            </FormGroup>
            <Row className='justify-content-center'>
              <Button className='m-3' size='lg' type='submit'>
                Sign Up
              </Button>
            </Row>
            <Row className='justify-content-center'>
              <FormGroup>
                Or <Link to='/login'>Log In</Link> now
              </FormGroup>
            </Row>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default withRouter(SignUp);
