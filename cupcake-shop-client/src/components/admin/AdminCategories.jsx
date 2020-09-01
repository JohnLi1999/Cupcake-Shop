import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  Container,
  Table,
  FormGroup,
  Button,
  Col,
  Spinner,
} from 'react-bootstrap';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import { addCategory } from '../../api/categoryService';

const StyledErrorFeedback = styled.div`
  color: #ff0000;
  margin: 0 5px;
`;

const AdminCategories = ({ categories, loadCategories }) => {
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);

    try {
      const response = await addCategory(values);
      toast.success(response.data.message);
      loadCategories();
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        autoClose: 2000,
      });
      setLoading(false);
    }
  };

  return (
    <Container>
      {isLoading && (
        <Container className='d-flex justify-content-center'>
          <Spinner animation='border' variant='primary' />
        </Container>
      )}

      <Formik
        initialValues={{
          name: '',
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string()
            .required('Category name is required')
            .min(3, 'New category name should have 3 characters or more')
            .max(100, 'New category name should have 100 characters or less'),
        })}
        onSubmit={handleSubmit}>
        {() => (
          <Form>
            <FormGroup as={Col} md={6} className='mt-4'>
              <Field
                className='form-control'
                type='text'
                name='name'
                placeholder='Enter the new category name'
              />
              <StyledErrorFeedback>
                <ErrorMessage name='name' />
              </StyledErrorFeedback>
              <Button className='mt-3 mb-2' type='submit'>
                Add a new category
              </Button>
            </FormGroup>
          </Form>
        )}
      </Formik>

      <Table striped bordered hover responsive className='text-center mt-3'>
        <thead className='thead-dark'>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>CREATED AT</th>
            <th>UPDATED AT</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
              <td>{category.createdAt}</td>
              <td>{category.updatedAt}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

const mapStateToProps = (state) => {
  const { categories } = state.category;

  return {
    categories,
  };
};

export default connect(mapStateToProps)(AdminCategories);
