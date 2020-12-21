import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import CustomSpinner from '../../common/UI/CustomSpinner';
import CategoryForm from '../../components/admin/Categories/CategoriesForm';
import CategoryTable from '../../components/admin/Categories/CategoriesTable';
import { addCategory } from '../../api/categoryService';

const AdminCategories = ({ categories, loadCategories }) => {
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async values => {
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
      {isLoading && <CustomSpinner />}

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
        {() => <CategoryForm />}
      </Formik>

      <CategoryTable categories={categories} />
    </Container>
  );
};

const mapStateToProps = state => {
  const { categories } = state.category;

  return {
    categories,
  };
};

export default connect(mapStateToProps)(AdminCategories);
