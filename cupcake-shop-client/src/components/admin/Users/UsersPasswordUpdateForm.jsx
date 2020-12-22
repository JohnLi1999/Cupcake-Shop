import React from 'react';
import { Form, Field, ErrorMessage } from 'formik';
import { FormGroup, Button, Col, Row } from 'react-bootstrap';

import ErrorFeedback from '../../../common/UI/ErrorFeedback';
import FormLabel from '../../../common/UI/FormLabel';

const UsersPasswordUpdateForm = () => (
  <Form>
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
      <Button className="m-2 mb-5" type="submit" variant="danger">
        Reset Password
      </Button>
    </Row>
  </Form>
);

export default UsersPasswordUpdateForm;
