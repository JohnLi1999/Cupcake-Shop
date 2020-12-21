import React from 'react';
import { Form, Field, ErrorMessage } from 'formik';
import { FormGroup, Button, Col, Row } from 'react-bootstrap';

import ErrorFeedback from '../../common/UI/ErrorFeedback';
import FormLabel from '../../common/UI/FormLabel';

const UserInfoForm = () => (
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
      <Button className="m-2 mb-5" type="submit">
        Update Your Information
      </Button>
    </Row>
  </Form>
);

export default UserInfoForm;
