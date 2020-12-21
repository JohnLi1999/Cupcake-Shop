import React from 'react';
import { Form, Field, ErrorMessage } from 'formik';
import { FormGroup, Button, Col, Row } from 'react-bootstrap';

import ErrorFeedback from '../../common/UI/ErrorFeedback';
import FormLabel from '../../common/UI/FormLabel';

const UserPasswordForm = () => (
  <Form>
    <FormGroup as={Col} md={{ span: 6, offset: 3 }}>
      <FormLabel>Old Password</FormLabel>
      <Field
        className="form-control"
        type="password"
        name="password"
        placeholder="Please enter your old password"
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
        placeholder="Please enter your new password"
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
