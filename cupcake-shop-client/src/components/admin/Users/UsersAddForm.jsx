import React from 'react';
import { Form, Field, ErrorMessage } from 'formik';
import { FormGroup, Button, Col, Row } from 'react-bootstrap';

import { ROLE_USER, ROLE_ADMIN } from '../../../constants/constants';
import ErrorFeedback from '../../../common/UI/ErrorFeedback';
import FormLabel from '../../../common/UI/FormLabel';

const UsersAddForm = () => (
  <Form>
    <FormGroup as={Col} md={{ span: 6, offset: 3 }}>
      <FormLabel>Username</FormLabel>
      <Field
        className="form-control"
        type="text"
        name="username"
        placeholder="Enter the username here"
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
        placeholder="Enter the email here"
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
        placeholder="Enter the password here"
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
        placeholder="Confirm the password again"
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
        placeholder="Enter the address here"
      />
      <ErrorFeedback>
        <ErrorMessage name="address" />
      </ErrorFeedback>
    </FormGroup>
    <FormGroup as={Col} md={{ span: 6, offset: 3 }}>
      <FormLabel>Roles</FormLabel>
      <Col>
        <Field
          className="form-check-inline"
          type="checkbox"
          name="roles"
          value={ROLE_USER}
          checked
        />
        User
      </Col>
      <Col>
        <Field
          className="form-check-inline"
          type="checkbox"
          name="roles"
          value={ROLE_ADMIN}
        />
        Admin
      </Col>
      <ErrorFeedback>
        <ErrorMessage name="roles" />
      </ErrorFeedback>
    </FormGroup>
    <Row className="justify-content-center">
      <Button className="m-3" size="lg" type="submit">
        Add
      </Button>
    </Row>
  </Form>
);

export default UsersAddForm;
