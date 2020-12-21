import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';

import CustomSpinner from '../common/UI/CustomSpinner';
import Title from '../common/UI/Title';
import CartDetails from '../components/Cart/CartDetails';
import CheckoutForm from '../components/Cart/CheckoutForm';
import { addOrder } from '../api/orderService';
import { getSubtotalAmount, getSubtotalPrice } from '../util/cart';

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
              .required('Receiver is required')
              .max(40, 'Username should have 40 characters or less'),
            address: Yup.string()
              .required('Receiver is required')
              .max(200, 'Username should have 200 characters or less'),
            totalPrice: Yup.number(),
            totalAmount: Yup.number(),
            payType: Yup.string()
              .required('Pay Type is required')
              .test(
                'Please select your payment type',
                value => value !== 'default'
              ),
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
