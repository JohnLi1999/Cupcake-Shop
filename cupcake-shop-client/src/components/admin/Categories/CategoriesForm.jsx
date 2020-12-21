import React from 'react';
import { Form, Field, ErrorMessage } from 'formik';
import { FormGroup, Button, Col } from 'react-bootstrap';

import ErrorFeedback from '../../../common/UI/ErrorFeedback';

const CategoryForm = () => (
  <Form>
    <FormGroup as={Col} md={6} className="mt-4">
      <Field
        className="form-control"
        type="text"
        name="name"
        placeholder="Enter the new category name"
      />
      <ErrorFeedback>
        <ErrorMessage name="name" />
      </ErrorFeedback>
      <Button className="mt-3 mb-2" type="submit">
        Add a new category
      </Button>
    </FormGroup>
  </Form>
);

export default CategoryForm;
