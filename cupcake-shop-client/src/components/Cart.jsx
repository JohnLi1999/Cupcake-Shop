import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Container, Button, Row, Col, Alert } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.css';

import { isAuthenticated, getSubtotalPrice } from '../shared/utility';
import {
  getTempCart,
  addItemToTempCart,
  reduceItemInTempCart,
  deleteItemFromTempCart,
} from '../shared/tempCart';

const StyledH1 = styled.h1`
  margin: 25px 0 40px 10px;
`;

const StyledHr = styled.hr`
  width: 100%;
  border: 0;
  height: 2px;
  background-color: #ff80bf;
`;

const StyledDiv = styled.div`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 15px;
`;

const StyledColorDiv = styled(StyledDiv)`
  color: ${(props) => props.color};
`;

const StyledAlert = styled(Alert)`
  margin-top: 50px;
  padding: 50px;
  border-radius: 10px;
  color: #0066ff;
  background-color: #ffcc99;
  text-align: center;
  font-size: 30px;
  font-weight: 700;
`;

const Cart = ({
  cart,
  cakes,
  addCakeToCart,
  reduceCakeInCart,
  deleteCakeFromCart,
  history,
}) => {
  const buildCartList = (cart, cakes) => {
    if (cakes.length < 1) {
      history.push('/');
    } else {
      return cart.map((cartItem) => {
        const cake = cakes.find((cake) => cake.id === cartItem.cakeId);
        return buildCartItem(cake, cartItem.amount);
      });
    }
  };

  const buildCartItem = (cake, amount) => (
    <Col sm={6} md={6} lg={6} className='mb-4' key={cake.id}>
      <Row>
        <Col sm={12} lg={6}>
          <Link to={`/cakes/${cake.name}`}>
            <img src={cake.cover} alt={cake.name} className='img-fluid' />
          </Link>
        </Col>
        <Col sm={12} md={12} lg={6} className='p-2 mb-4'>
          <Container className='mt-2'>
            <StyledColorDiv color='#993333'>{cake.name}</StyledColorDiv>
            <StyledDiv>$ {cake.price}</StyledDiv>
            <StyledColorDiv color='#ff6600'>Amount: {amount}</StyledColorDiv>
          </Container>
          <Container>
            <Button
              variant='primary'
              className='m-1'
              onClick={() => {
                if (isAuthenticated()) {
                  return addCakeToCart(cake.id, '/cart');
                }
                addItemToTempCart(cake.id);
                toast.success('Cake added!');
                return history.push('/cart');
              }}>
              Add
            </Button>
            <Button
              variant='warning'
              className='m-1'
              onClick={() => {
                if (isAuthenticated()) {
                  return reduceCakeInCart(cake.id);
                }
                reduceItemInTempCart(cake.id);
                toast.success('Cake reduced!');
                return history.push('/cart');
              }}>
              Reduce
            </Button>
            <Button
              variant='danger'
              className='m-1'
              onClick={() => {
                if (isAuthenticated()) {
                  return deleteCakeFromCart(cake.id);
                }
                deleteItemFromTempCart(cake.id);
                toast.success('Cake successfully removed from your cart');
                return history.push('/cart');
              }}>
              Delete
            </Button>
          </Container>
        </Col>
      </Row>
    </Col>
  );

  const showEmptyMessage = () => {
    if (isAuthenticated()) {
      return cart.length < 1;
    } else if (getTempCart() === null) {
      return true;
    } else {
      return getTempCart().length < 1;
    }
  };

  return (
    <Container>
      {showEmptyMessage() ? (
        <StyledAlert>Your Cart is Empty</StyledAlert>
      ) : (
        <>
          <StyledH1>Cart</StyledH1>
          <Row>
            {getTempCart()
              ? buildCartList(getTempCart(), cakes)
              : buildCartList(cart, cakes)}
          </Row>
          <StyledHr />
          <h1 className='mt-3'>
            Subtotal: ${' '}
            {cakes.length < 1
              ? history.push('/')
              : isAuthenticated()
              ? getSubtotalPrice(cart, cakes)
              : getSubtotalPrice(getTempCart(), cakes)}
          </h1>
          <Row className='justify-content-end'>
            <Button
              variant='info'
              className='mb-5'
              onClick={() => {
                if (isAuthenticated()) {
                  history.push('/checkout');
                } else {
                  toast.warn('Please login first!', {
                    autoClose: 2000,
                  });
                  history.push('/login', {
                    path: '/checkout',
                  });
                }
              }}>
              Proceed to Checkout
            </Button>
          </Row>
        </>
      )}
    </Container>
  );
};

const mapStateToProps = (state) => {
  const { cart } = state;
  const { cakes } = state.cake;

  return {
    cart,
    cakes,
  };
};

export default connect(mapStateToProps)(withRouter(Cart));
