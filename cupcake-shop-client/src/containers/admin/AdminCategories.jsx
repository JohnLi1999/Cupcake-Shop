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
import {
  CATEGORY_MIN_LENGTH,
  CATEGORY_MAX_LENGTH,
} from '../../constants/constants';
import {
  CATEGORY_REQUIRED,
  CATEGORY_MIN_MESSAGE,
  CATEGORY_MAX_MESSAGE,
} from '../../constants/en';

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
            .required(CATEGORY_REQUIRED)
            .min(CATEGORY_MIN_LENGTH, CATEGORY_MIN_MESSAGE)
            .max(CATEGORY_MAX_LENGTH, CATEGORY_MAX_MESSAGE),
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
