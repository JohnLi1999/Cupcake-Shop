import React from 'react';
import { Form, Field, ErrorMessage } from 'formik';
import { FormGroup, Button, Col, Row } from 'react-bootstrap';

import ErrorFeedback from '../../../common/UI/ErrorFeedback';
import FormLabel from '../../../common/UI/FormLabel';
import {
  OLD_PASSWORD_PLACEHOLDER,
  NEW_PASSWORD_PLACEHOLDER,
} from '../../../constants/en';

const UserPasswordForm = () => (
  <Form>
    <FormGroup as={Col} md={{ span: 6, offset: 3 }}>
      <FormLabel>Old Password</FormLabel>
      <Field
        className="form-control"
        type="password"
        name="password"
        placeholder={OLD_PASSWORD_PLACEHOLDER}
      />
      <ErrorFeedback>
        <ErrorMessage name="password" />
      </ErrorFeedback>
    </FormGroup>
    <FormGroup as={Col} md={{ span: 6, offset: 3 }}>
      <FormLabel>New Password</FormLabel>
      <Field
        className="form-control"
        type="password"
        name="newPassword"
        placeholder={NEW_PASSWORD_PLACEHOLDER}
      />
      <ErrorFeedback>
        <ErrorMessage name="newPassword" />
      </ErrorFeedback>
    </FormGroup>
    <Row className="justify-content-center">
      <Button className="m-2 mb-5" type="submit" variant="warning">
        Update Your Password
      </Button>
    </Row>
  </Form>
);

export default UserPasswordForm;
