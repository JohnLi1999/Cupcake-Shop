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
import {
  CAKE_NAME_MIN_LENGTH,
  CAKE_NAME_MAX_LENGTH,
  CAKE_MIN_PRICE,
  CAKE_MAX_PRICE,
  CAKE_MIN_STOCK,
  CAKE_MAX_STOCK,
} from '../../constants/constants';
import {
  IMAGE_SIZE_TOO_LARGE,
  CAKE_NAME_REQUIRED,
  CAKE_NAME_MIN_MESSAGE,
  CAKE_NAME_MAX_MESSAGE,
  CAKE_DESCRIPTION_REQUIRED,
  CAKE_PRICE_TEST,
  CAKE_PRICE_REQUIRED,
  CAKE_PRICE_MIN_MESSAGE,
  CAKE_PRICE_MAX_MESSAGE,
  CAKE_STOCK_REQUIRED,
  CAKE_STOCK_MIN_MESSAGE,
  CAKE_STOCK_MAX_MESSAGE,
  CAKE_COVER_REQUIRED,
  CAKE_IMAGE1_REQUIRED,
  CAKE_IMAGE2_REQUIRED,
  CAKE_CATEGORY_REQUIRED,
  CAKE_CATEGORY_TEST,
} from '../../constants/en';

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
      toast.error(IMAGE_SIZE_TOO_LARGE, {
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

  const goBack = () => history.push('/admin/cakes');

  const isUpdate = !!location.state.update;

  return (
    <Container>
      <Row className="justify-content-end m-3">
        <Button variant="warning" onClick={goBack}>
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
            .required(CAKE_NAME_REQUIRED)
            .min(CAKE_NAME_MIN_LENGTH, CAKE_NAME_MIN_MESSAGE)
            .max(CAKE_NAME_MAX_LENGTH, CAKE_NAME_MAX_MESSAGE),
          description: Yup.string().required(CAKE_DESCRIPTION_REQUIRED),
          price: Yup.number()
            .test(CAKE_PRICE_TEST, value =>
              (value + '').match(/^([0-9]+[.]?[0-9]?[0-9]?|[0-9]+)$/)
            )
            .required(CAKE_PRICE_REQUIRED)
            .min(CAKE_MIN_PRICE, CAKE_PRICE_MIN_MESSAGE)
            .max(CAKE_MAX_PRICE, CAKE_PRICE_MAX_MESSAGE),
          stock: Yup.number()
            .required(CAKE_STOCK_REQUIRED)
            .min(CAKE_MIN_STOCK, CAKE_STOCK_MIN_MESSAGE)
            .max(CAKE_MAX_STOCK, CAKE_STOCK_MAX_MESSAGE),
          cover: Yup.string().required(CAKE_COVER_REQUIRED),
          img1: Yup.string().required(CAKE_IMAGE1_REQUIRED),
          img2: Yup.string().required(CAKE_IMAGE2_REQUIRED),
          category: Yup.string()
            .required(CAKE_CATEGORY_REQUIRED)
            .test(CAKE_CATEGORY_TEST, value => value !== 'default'),
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
