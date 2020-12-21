import React, { useState } from 'react';
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
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';

import { addOrder } from '../api/orderService';
import { getSubtotalAmount, getSubtotalPrice } from '../util/cart';
import { MASTER, VISA, WECHAT, ALIPAY } from '../constants/constants';

const StyledH1 = styled.h1`
  text-align: center;
  margin: 25px;
`;

const StyledDetails = styled.div`
  text-align: center;
  font-size: 20px;
  font-size: 700;
  margin: 10px;
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

const Checkout = ({
  onCheckout,
  id,
  username,
  address,
  cart,
  cakes,
  history,
}) => {
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

  const buildCartItemList = (cart, cakes) =>
    cart.map(cartItem => {
      const cake = cakes.find(cake => cake.id === cartItem.cakeId);
      return (
        <StyledDetails key={cake.id}>
          <span>{cake.name}</span> * <span>{cartItem.amount}</span>
        </StyledDetails>
      );
    });

  return (
    <>
      <Container>
        <StyledH1>Checkout</StyledH1>

        {isLoading && (
          <Container className="d-flex justify-content-center">
            <Spinner animation="border" variant="primary" />
          </Container>
        )}

        <StyledDetails>Cart Details</StyledDetails>
        {buildCartItemList(cart, cakes)}

        <Formik
          initialValues={{
            receiver: username,
            address: address,
            totalPrice: getSubtotalPrice(cart, cakes),
            totalAmount: getSubtotalAmount(cart),
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
            <Form>
              <FormGroup as={Col} md={{ span: 6, offset: 3 }}>
                <StyledLabel>Receiver</StyledLabel>
                <Field
                  className="form-control"
                  type="text"
                  name="receiver"
                  placeholder="Please enter the receiver name"
                />
                <StyledErrorFeedback>
                  <ErrorMessage name="receiver" />
                </StyledErrorFeedback>
              </FormGroup>
              <FormGroup as={Col} md={{ span: 6, offset: 3 }}>
                <StyledLabel>Address</StyledLabel>
                <Field
                  className="form-control"
                  type="text"
                  name="address"
                  placeholder="Please enter the address"
                />
                <StyledErrorFeedback>
                  <ErrorMessage name="address" />
                </StyledErrorFeedback>
              </FormGroup>
              <FormGroup as={Col} md={{ span: 6, offset: 3 }}>
                <StyledLabel>
                  Total Price: {getSubtotalPrice(cart, cakes)}
                </StyledLabel>
              </FormGroup>
              <FormGroup as={Col} md={{ span: 6, offset: 3 }}>
                <StyledLabel>
                  Total Amount: {getSubtotalAmount(cart)}
                </StyledLabel>
              </FormGroup>
              <FormGroup as={Col} md={{ span: 6, offset: 3 }}>
                <StyledLabel>Pay Type</StyledLabel>
                <Field as="select" name="payType" className="form-control">
                  <option value="default">
                    --- Select your Payment Type ---
                  </option>
                  <option value={MASTER}>MASTER</option>
                  <option value={VISA}>VISA</option>
                  <option value={WECHAT}>WECHAT</option>
                  <option value={ALIPAY}>ALIPAY</option>
                </Field>
                <StyledErrorFeedback>
                  <ErrorMessage name="payType" />
                </StyledErrorFeedback>
              </FormGroup>
              <Row className="justify-content-center">
                <Button className="m-3" size="lg" type="submit">
                  Place the Order!
                </Button>
              </Row>
            </Form>
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
