import React from 'react';
import { Form, Field, ErrorMessage } from 'formik';
import { FormGroup, Button, Col, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
const StyledLabel = styled.label`
  font-size: 18px;
  font-weight: 500;
  margin: 10px 2px;
`;

const StyledErrorFeedback = styled.div`
  color: #ff0000;
  margin: 0 5px;
`;

const SignUpForm = () => (
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
      <StyledLabel>Password</StyledLabel>
      <Field
        className="form-control"
        type="password"
        name="password"
        placeholder="Please enter your password"
      />
      <StyledErrorFeedback>
        <ErrorMessage name="password" />
      </StyledErrorFeedback>
    </FormGroup>
    <FormGroup as={Col} md={{ span: 6, offset: 3 }}>
      <StyledLabel>Confirm Password</StyledLabel>
      <Field
        className="form-control"
        type="password"
        name="confirm_password"
        placeholder="Please confirm your password"
      />
      <StyledErrorFeedback>
        <ErrorMessage name="confirm_password" />
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
