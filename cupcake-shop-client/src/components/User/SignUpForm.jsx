import React from 'react';
import { Form, Field, ErrorMessage } from 'formik';
import { FormGroup, Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import ErrorFeedback from '../../common/UI/ErrorFeedback';
import FormLabel from '../../common/UI/FormLabel';

const SignUpForm = () => (
  <Form>
    <FormGroup as={Col} md={{ span: 6, offset: 3 }}>
      <FormLabel>Username</FormLabel>
      <Field
        className="form-control"
        type="text"
        name="username"
        placeholder="Please enter your username"
      />
      <ErrorFeedback>
        <ErrorMessage name="username" />
      </ErrorFeedback>
    </FormGroup>
    <FormGroup as={Col} md={{ span: 6, offset: 3 }}>
      <FormLabel>Email</FormLabel>
      <Field
        className="form-control"
        type="text"
        name="email"
        placeholder="Please enter your email"
      />
      <ErrorFeedback>
        <ErrorMessage name="email" />
      </ErrorFeedback>
    </FormGroup>
    <FormGroup as={Col} md={{ span: 6, offset: 3 }}>
      <FormLabel>Password</FormLabel>
      <Field
        className="form-control"
        type="password"
        name="password"
        placeholder="Please enter your password"
      />
      <ErrorFeedback>
        <ErrorMessage name="password" />
      </ErrorFeedback>
    </FormGroup>
    <FormGroup as={Col} md={{ span: 6, offset: 3 }}>
      <FormLabel>Confirm Password</FormLabel>
      <Field
        className="form-control"
        type="password"
        name="confirm_password"
        placeholder="Please confirm your password"
      />
      <ErrorFeedback>
        <ErrorMessage name="confirm_password" />
      </ErrorFeedback>
    </FormGroup>
    <FormGroup as={Col} md={{ span: 6, offset: 3 }}>
      <FormLabel>Address</FormLabel>
      <Field
        className="form-control"
        type="text"
        name="address"
        placeholder="Please enter your address"
      />
      <ErrorFeedback>
        <ErrorMessage name="address" />
      </ErrorFeedback>
    </FormGroup>
    <Row className="justify-content-center">
      <Button className="m-3" size="lg" type="submit">
        Sign Up
      </Button>
    </Row>
    <Row className="justify-content-center">
      <FormGroup>
        Or <Link to="/login">Log In</Link> now
      </FormGroup>
    </Row>
  </Form>
);

export default SignUpForm;
