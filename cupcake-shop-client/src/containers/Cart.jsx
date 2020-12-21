import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Container, Button, Row } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';

import Empty from '../common/Empty';
import CartItem from '../components/CartItem';
import { isAuthenticated } from '../util/auth';
import { getSubtotalPrice } from '../util/cart';
import {
  getTempCart,
  addItemToTempCart,
  reduceItemInTempCart,
  deleteItemFromTempCart,
} from '../util/tempCart';

const StyledH1 = styled.h1`
  margin: 25px 0 40px 10px;
`;

const StyledHr = styled.hr`
  width: 100%;
  border: 0;
  height: 2px;
  background-color: #ff80bf;
`;

const Cart = ({
  cart,
  cakes,
  addCakeToCart,
  reduceCakeInCart,
  deleteCakeFromCart,
  history,
}) => {
  const showEmptyMessage = () => {
    if (isAuthenticated()) {
      return cart.length < 1;
    } else if (getTempCart() === null) {
      return true;
    } else {
      return getTempCart().length < 1;
    }
  };

  const addToCartHandler = cakeId => {
    if (isAuthenticated()) {
      return addCakeToCart(cakeId, '/cart');
    }
    addItemToTempCart(cakeId);
    toast.success('Cake added!');
    return history.push('/cart');
  };

  const reduceInCartHandler = cakeId => {
    if (isAuthenticated()) {
      return reduceCakeInCart(cakeId);
    }
    reduceItemInTempCart(cakeId);
    toast.success('Cake reduced!');
    return history.push('/cart');
  };

  const deleteFromCartHandler = cakeId => {
    if (isAuthenticated()) {
      return deleteCakeFromCart(cakeId);
    }
    deleteItemFromTempCart(cakeId);
    toast.success('Cake successfully removed from your cart');
    return history.push('/cart');
  };

  const buildCartList = (cart, cakes) => {
    if (cakes.length < 1) {
      history.push('/');
    } else {
      return cart.map(cartItem => {
        const cake = cakes.find(cake => cake.id === cartItem.cakeId);
        return (
          <CartItem
            cake={cake}
            amount={cartItem.amount}
            history={history}
            addToCart={addToCartHandler}
            reduceInCart={reduceInCartHandler}
            deleteFromCart={deleteFromCartHandler}
          />
        );
      });
    }
  };

  const displayCart = () => {
    if (!!getTempCart()) {
      return buildCartList(getTempCart(), cakes);
    } else {
      return buildCartList(cart, cakes);
    }
  };

  const getSubTotalPrice = cakes => {
    if (cakes.length < 1) {
      return history.push('/');
    } else {
      if (isAuthenticated()) {
        return getSubtotalPrice(cart, cakes);
      } else {
        return getSubtotalPrice(getTempCart(), cakes);
      }
    }
  };

  const checkoutHandler = () => {
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
  };

  return (
    <Container>
      {showEmptyMessage() ? (
        <Empty>Your Cart is Empty</Empty>
      ) : (
        <>
          <StyledH1>Cart</StyledH1>
          <Row>{displayCart()}</Row>
          <StyledHr />
          <StyledH1>Subtotal: $ {getSubTotalPrice(cakes)}</StyledH1>
          <Row className="justify-content-end">
            <Button variant="info" className="mb-5" onClick={checkoutHandler}>
              Proceed to Checkout
            </Button>
          </Row>
        </>
      )}
    </Container>
  );
};

const mapStateToProps = state => {
  const { cart } = state;
  const { cakes } = state.cake;

  return {
    cart,
    cakes,
  };
};

export default connect(mapStateToProps)(withRouter(Cart));
