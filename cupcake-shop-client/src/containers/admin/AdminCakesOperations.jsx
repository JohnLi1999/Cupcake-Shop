import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Container, Button, Row } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';

import { upload } from '../../api/uploadService';
import { addCake, updateCake } from '../../api/cakeService';
import { MAX_FILE_SIZE_IN_MB } from '../../constants/constants';
import { bytesToMB, updateObject } from '../../util/utility';
import CustomSpinner from '../../common/UI/CustomSpinner';
import Title from '../../common/UI/Title';
import CakesFrom from '../../components/admin/Cakes/CakesForm';

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

  const isUpdate = !!location.state.update;

  return (
    <Container>
      <Row className="justify-content-end m-3">
        <Button variant="warning" onClick={() => history.push('/admin/cakes')}>
          Back to cake list
        </Button>
      </Row>

      <Title center>{isUpdate ? 'Update Cake' : 'Add a new Cake'}</Title>

      {isLoading && <CustomSpinner />}

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
          <CakesFrom
            cake={cake}
            categories={categories}
            isUpdate={isUpdate}
            handleChange={handleChange}
            setFieldValue={setFieldValue}
          />
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
