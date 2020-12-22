import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';

import CustomSpinner from '../../common/UI/CustomSpinner';
import Title from '../../common/UI/Title';
import CartDetails from '../../components/customer/Cart/CartDetails';
import CheckoutForm from '../../components/customer/Cart/CheckoutForm';
import { addOrder } from '../../api/orderService';
import { getSubtotalAmount, getSubtotalPrice } from '../../util/cart';
import {
  USERNAME_MAX_LENGTH,
  ADDRESS_MAX_LENGTH,
} from '../../constants/constants';
import {
  RECEIVER_REQUIRED,
  RECEIVER_MAX_MESSAGE,
  ADDRESS_REQUIRED,
  ADDRESS_MAX_MESSAGE,
  PAY_TYPE_REQUIRED,
  PAY_TYPE_TEST,
} from '../../constants/en';

const Checkout = ({ onCheckout, id, username, address, cart, cakes }) => {
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async values => {
    setLoading(true);

    try {
      const response = await addOrder(id, values);
      toast.success(response.data.message);
      setLoading(false);
      onCheckout();
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 2000,
      });
      setLoading(false);
    }
  };

  const totalPrice = getSubtotalPrice(cart, cakes);
  const totalAmount = getSubtotalAmount(cart);

  return (
    <>
      <Container>
        <Title center>Checkout</Title>

        {isLoading && <CustomSpinner />}

        <CartDetails cart={cart} cakes={cakes} />

        <Formik
          initialValues={{
            receiver: username,
            address: address,
            totalPrice: totalPrice,
            totalAmount: totalAmount,
            payType: '',
            cart: cart,
          }}
          validationSchema={Yup.object().shape({
            receiver: Yup.string()
              .required(RECEIVER_REQUIRED)
              .max(USERNAME_MAX_LENGTH, RECEIVER_MAX_MESSAGE),
            address: Yup.string()
              .required(ADDRESS_REQUIRED)
              .max(ADDRESS_MAX_LENGTH, ADDRESS_MAX_MESSAGE),
            totalPrice: Yup.number(),
            totalAmount: Yup.number(),
            payType: Yup.string()
              .required(PAY_TYPE_REQUIRED)
              .test(PAY_TYPE_TEST, value => value !== 'default'),
            cart: Yup.array(),
          })}
          onSubmit={handleSubmit}
          enableReinitialize>
          {() => (
            <CheckoutForm totalPrice={totalPrice} totalAmount={totalAmount} />
          )}
        </Formik>
      </Container>
    </>
  );
};

const mapStateToProps = state => {
  const { id, username, address } = state.user;
  const { cart } = state;
  const { cakes } = state.cake;

  return {
    id,
    username,
    address,
    cart,
    cakes,
  };
};

export default connect(mapStateToProps)(withRouter(Checkout));
