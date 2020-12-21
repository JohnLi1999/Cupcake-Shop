import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  Container,
  FormGroup,
  Button,
  Col,
  Row,
  Spinner,
} from 'react-bootstrap';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';

import { upload } from '../../../api/uploadService';
import { addCake, updateCake } from '../../../api/cakeService';
import {
  TODAY_SPECIAL,
  BEST_SELLING,
  MAX_FILE_SIZE_IN_MB,
} from '../../../constants/constants';
import { bytesToMB, updateObject } from '../../../util/utility';

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

const AdminCakesOperations = ({
  loadCakes,
  categories,
  cakes,
  history,
  location,
}) => {
  const [cake, setCake] = useState({
    name: '',
    description: '',
    price: 0.0,
    stock: 0,
    cover: '',
    img1: '',
    img2: '',
    category: '',
    tags: [],
  });
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (!cakes.length) {
      history.push('/admin/cakes');
    } else if (location.state.update) {
      let cake = cakes.find(cake => cake.id === location.state.id);
      cake = updateObject(cake, {
        cover: cake.cover.split('/').slice(-1)[0],
        img1: cake.img1.split('/').slice(-1)[0],
        img2: cake.img2.split('/').slice(-1)[0],
      });
      setCake(cake);
    }
  }, [cakes, history, location.state]);

  const handleSubmit = async values => {
    setLoading(true);

    try {
      let response;

      if (location.state.update) {
        response = await updateCake(cake.id, values);
      } else {
        response = await addCake(values);
        history.push('/admin/cakes');
      }

      loadCakes();

      toast.success(response.data.message);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 2000,
      });
      setLoading(false);
    }
  };

  const handleChange = async (event, setFieldValue) => {
    const file = event.target.files[0];
    if (!!file && bytesToMB(file.size) > MAX_FILE_SIZE_IN_MB) {
      toast.error('Image size is too large. Please change to another one!', {
        autoClose: 2000,
      });
      return;
    }
    const targetField = event.target.id.split('-')[0];

    try {
      setLoading(true);

      const data = new FormData();
      data.append('file', file);
      const response = await upload(data);

      setFieldValue(targetField, file.name);

      toast.success(response.data.message);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 2000,
      });
      setLoading(false);
    }
  };

  return (
    <Container>
      <Row className="justify-content-end m-3">
        <Button variant="warning" onClick={() => history.push('/admin/cakes')}>
          Back to cake list
        </Button>
      </Row>

      <StyledH1>Add a new Cake</StyledH1>

      {isLoading && (
        <Container className="d-flex justify-content-center">
          <Spinner animation="border" variant="primary" />
        </Container>
      )}

      <Formik
        initialValues={{
          name: cake.name,
          description: cake.description,
          price: cake.price,
          stock: cake.stock,
          cover: cake.cover,
          img1: cake.img1,
          img2: cake.img2,
          category: cake.category,
          tags: cake.tags,
        }}
        enableReinitialize
        validationSchema={Yup.object().shape({
          name: Yup.string()
            .required('Name is required')
            .min(3, 'Name should have 3 characters or more')
            .max(150, 'Username should have 150 characters or less'),
          description: Yup.string().required('Description is required'),
          price: Yup.number()
            .test('only two decimals are allowed', value =>
              (value + '').match(/^([0-9]+[.]?[0-9]?[0-9]?|[0-9]+)$/)
            )
            .required('Price is required')
            .min(1, 'Price for a cake should be at least $1')
            .max(500, 'Price for a cake should be at most $500'),
          stock: Yup.number()
            .required('Stock is required')
            .min(0, 'Stock cannot be a negative number')
            .max(10000, 'Stock should be at most 10000'),
          cover: Yup.string().required('Cover is required'),
          img1: Yup.string().required('Image 1 is required'),
          img2: Yup.string().required('Image 2 is required'),
          category: Yup.string()
            .required('Category is required')
            .test('Please select a category', value => value !== 'default'),
          tags: Yup.array(),
        })}
        onSubmit={handleSubmit}>
        {({ setFieldValue }) => (
          <Form>
            <FormGroup as={Col} md={{ span: 6, offset: 3 }}>
              <StyledLabel>Name</StyledLabel>
              <Field
                className="form-control"
                type="text"
                name="name"
                placeholder="Enter the name here"
              />
              <StyledErrorFeedback>
                <ErrorMessage name="name" />
              </StyledErrorFeedback>
            </FormGroup>
            <FormGroup as={Col} md={{ span: 6, offset: 3 }}>
              <StyledLabel>Description</StyledLabel>
              <Field
                className="form-control"
                as="textarea"
                name="description"
                placeholder="Enter the description here"
              />
              <StyledErrorFeedback>
                <ErrorMessage name="description" />
              </StyledErrorFeedback>
            </FormGroup>
            <FormGroup as={Col} md={{ span: 6, offset: 3 }}>
              <StyledLabel>Price</StyledLabel>
              <Field
                className="form-control"
                type="number"
                name="price"
                placeholder="Enter the price here"
              />
              <StyledErrorFeedback>
                <ErrorMessage name="price" />
              </StyledErrorFeedback>
            </FormGroup>
            <FormGroup as={Col} md={{ span: 6, offset: 3 }}>
              <StyledLabel>Stock</StyledLabel>
              <Field
                className="form-control"
                type="number"
                name="stock"
                placeholder="Enter the stock here"
              />
              <StyledErrorFeedback>
                <ErrorMessage name="stock" />
              </StyledErrorFeedback>
            </FormGroup>
            <FormGroup as={Col} md={{ span: 6, offset: 3 }}>
              <StyledLabel>
                Cover{' '}
                {location.state.update && (
                  <span>({cake.cover} as default)</span>
                )}
              </StyledLabel>
              <Field
                className="form-control-file"
                type="file"
                id="cover-image"
                name="Cover"
                onChange={event => handleChange(event, setFieldValue)}
              />
              <Field type="text" name="cover" hidden />
              <StyledErrorFeedback>
                <ErrorMessage name="cover" />
              </StyledErrorFeedback>
            </FormGroup>
            <FormGroup as={Col} md={{ span: 6, offset: 3 }}>
              <StyledLabel>
                Image 1
                {location.state.update && <span>({cake.img1} as default)</span>}
              </StyledLabel>
              <Field
                className="form-control-file"
                type="file"
                id="img1-image"
                name="image1"
                onChange={event => handleChange(event, setFieldValue)}
              />
              <Field type="text" name="img1" hidden />
              <StyledErrorFeedback>
                <ErrorMessage name="img1" />
              </StyledErrorFeedback>
            </FormGroup>
            <FormGroup as={Col} md={{ span: 6, offset: 3 }}>
              <StyledLabel>
                Image 2{' '}
                {location.state.update && <span>({cake.img2} as default)</span>}
              </StyledLabel>
              <Field
                className="form-control-file"
                type="file"
                id="img2-image"
                name="image2"
                onChange={event => handleChange(event, setFieldValue)}
              />
              <Field type="text" name="img2" hidden />
              <StyledErrorFeedback>
                <ErrorMessage name="img2" />
              </StyledErrorFeedback>
            </FormGroup>
            <FormGroup as={Col} md={{ span: 6, offset: 3 }}>
              <StyledLabel>Category</StyledLabel>
              <Field as="select" name="category" className="form-control">
                <option value="default">--- Select a Category ---</option>
                {categories.map(category => (
                  <option key={category.name} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </Field>
              <StyledErrorFeedback>
                <ErrorMessage name="category" />
              </StyledErrorFeedback>
            </FormGroup>
            <FormGroup as={Col} md={{ span: 6, offset: 3 }}>
              <StyledLabel>Tags</StyledLabel>
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
              <StyledErrorFeedback>
                <ErrorMessage name="tags" />
              </StyledErrorFeedback>
            </FormGroup>
            <Row className="justify-content-center">
              <Button className="m-3" size="lg" type="submit">
                {location.state.update ? 'Update' : 'Add'}
              </Button>
            </Row>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

const mapStateToProps = state => {
  const { categories } = state.category;
  const { cakes } = state.cake;

  return {
    categories,
    cakes,
  };
};

export default connect(mapStateToProps)(withRouter(AdminCakesOperations));
