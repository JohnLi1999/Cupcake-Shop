import React from 'react';
import { Form, Field, ErrorMessage } from 'formik';
import { FormGroup, Button, Col, Row } from 'react-bootstrap';

import ErrorFeedback from '../../../common/UI/ErrorFeedback';
import FormLabel from '../../../common/UI/FormLabel';
import { TODAY_SPECIAL, BEST_SELLING } from '../../../constants/constants';

const AdminCakesOperations = ({
  cake,
  categories,
  isUpdate,
  handleChange,
  setFieldValue,
}) => (
  <Form>
    <FormGroup as={Col} md={{ span: 6, offset: 3 }}>
      <FormLabel>Name</FormLabel>
      <Field
        className="form-control"
        type="text"
        name="name"
        placeholder="Enter the name here"
      />
      <ErrorFeedback>
        <ErrorMessage name="name" />
      </ErrorFeedback>
    </FormGroup>
    <FormGroup as={Col} md={{ span: 6, offset: 3 }}>
      <FormLabel>Description</FormLabel>
      <Field
        className="form-control"
        as="textarea"
        name="description"
        placeholder="Enter the description here"
      />
      <ErrorFeedback>
        <ErrorMessage name="description" />
      </ErrorFeedback>
    </FormGroup>
    <FormGroup as={Col} md={{ span: 6, offset: 3 }}>
      <FormLabel>Price</FormLabel>
      <Field
        className="form-control"
        type="number"
        name="price"
        placeholder="Enter the price here"
      />
      <ErrorFeedback>
        <ErrorMessage name="price" />
      </ErrorFeedback>
    </FormGroup>
    <FormGroup as={Col} md={{ span: 6, offset: 3 }}>
      <FormLabel>Stock</FormLabel>
      <Field
        className="form-control"
        type="number"
        name="stock"
        placeholder="Enter the stock here"
      />
      <ErrorFeedback>
        <ErrorMessage name="stock" />
      </ErrorFeedback>
    </FormGroup>
    <FormGroup as={Col} md={{ span: 6, offset: 3 }}>
      <FormLabel>
        Cover {isUpdate && <span>({cake.cover} as default)</span>}
      </FormLabel>
      <Field
        className="form-control-file"
        type="file"
        id="cover-image"
        name="Cover"
        onChange={event => handleChange(event, setFieldValue)}
      />
      <Field type="text" name="cover" hidden />
      <ErrorFeedback>
        <ErrorMessage name="cover" />
      </ErrorFeedback>
    </FormGroup>
    <FormGroup as={Col} md={{ span: 6, offset: 3 }}>
      <FormLabel>
        Image 1{isUpdate && <span>({cake.img1} as default)</span>}
      </FormLabel>
      <Field
        className="form-control-file"
        type="file"
        id="img1-image"
        name="image1"
        onChange={event => handleChange(event, setFieldValue)}
      />
      <Field type="text" name="img1" hidden />
      <ErrorFeedback>
        <ErrorMessage name="img1" />
      </ErrorFeedback>
    </FormGroup>
    <FormGroup as={Col} md={{ span: 6, offset: 3 }}>
      <FormLabel>
        Image 2 {isUpdate && <span>({cake.img2} as default)</span>}
      </FormLabel>
      <Field
        className="form-control-file"
        type="file"
        id="img2-image"
        name="image2"
        onChange={event => handleChange(event, setFieldValue)}
      />
      <Field type="text" name="img2" hidden />
      <ErrorFeedback>
        <ErrorMessage name="img2" />
      </ErrorFeedback>
    </FormGroup>
    <FormGroup as={Col} md={{ span: 6, offset: 3 }}>
      <FormLabel>Category</FormLabel>
      <Field as="select" name="category" className="form-control">
        <option value="default">--- Select a Category ---</option>
        {categories.map(category => (
          <option key={category.name} value={category.name}>
            {category.name}
          </option>
        ))}
      </Field>
      <ErrorFeedback>
        <ErrorMessage name="category" />
      </ErrorFeedback>
    </FormGroup>
    <FormGroup as={Col} md={{ span: 6, offset: 3 }}>
      <FormLabel>Tags</FormLabel>
      <Col>
        <Field
          className="form-check-inline"
          type="checkbox"
          name="tags"
          value={TODAY_SPECIAL}
        />
        Today's Special
      </Col>
      <Col>
        <Field
          className="form-check-inline"
          type="checkbox"
          name="tags"
          value={BEST_SELLING}
        />
        Best Selling
      </Col>
      <ErrorFeedback>
        <ErrorMessage name="tags" />
      </ErrorFeedback>
    </FormGroup>
    <Row className="justify-content-center">
      <Button className="m-3" size="lg" type="submit">
        {isUpdate ? 'Update' : 'Add'}
      </Button>
    </Row>
  </Form>
);

export default AdminCakesOperations;
