import React from 'react';
import { Form, Field, ErrorMessage } from 'formik';
import { FormGroup, Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import ErrorFeedback from '../../../common/UI/ErrorFeedback';
import FormLabel from '../../../common/UI/FormLabel';
import {
  USERNAME_EMAIL_PLACEHOLDER,
  PASSWORD_PLACEHOLDER,
} from '../../../constants/en';

const LogInForm = () => (
  <Form>
    <FormGroup as={Col} md={{ span: 6, offset: 3 }}>
      <FormLabel>Username or Email</FormLabel>
      <Field
        className="form-control"
        type="text"
        name="usernameOrEmail"
        placeholder={USERNAME_EMAIL_PLACEHOLDER}
      />
      <ErrorFeedback>
        <ErrorMessage name="usernameOrEmail" />
      </ErrorFeedback>
    </FormGroup>
    <FormGroup as={Col} md={{ span: 6, offset: 3 }}>
      <FormLabel>Password</FormLabel>
      <Field
        className="form-control"
        type="password"
        name="password"
        placeholder={PASSWORD_PLACEHOLDER}
      />
      <ErrorFeedback>
        <ErrorMessage name="password" />
      </ErrorFeedback>
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
);

export default LogInForm;
