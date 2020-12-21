import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Container, FormGroup, Button, Col, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';

import CustomSpinner from '../common/CustomSpinner';

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

const LogInForm = ({ isLoading, submitForm }) => {
  return (
    <Container>
      <StyledH1>Log In</StyledH1>

      {isLoading && <CustomSpinner />}

      <Formik
        initialValues={{
          usernameOrEmail: '',
          password: '',
        }}
        validationSchema={Yup.object().shape({
          usernameOrEmail: Yup.string().required(
            'Username or Email is required'
          ),
          password: Yup.string().required('Password is required'),
        })}
        onSubmit={submitForm}>
        {() => (
          <Form>
            <FormGroup as={Col} md={{ span: 6, offset: 3 }}>
              <StyledLabel>Username or Email</StyledLabel>
              <Field
                className="form-control"
                type="text"
                name="usernameOrEmail"
                placeholder="Please enter your username or email"
              />
              <StyledErrorFeedback>
                <ErrorMessage name="usernameOrEmail" />
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
            <Row className="justify-content-center">
              <Button className="m-3" size="lg" type="submit">
                Log In
              </Button>
            </Row>
            <Row className="justify-content-center">
              <FormGroup>
                Or <Link to="/signup">Sign Up</Link> now
              </FormGroup>
            </Row>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default withRouter(LogInForm);
