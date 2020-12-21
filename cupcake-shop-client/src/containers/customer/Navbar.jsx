import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';

import CustomNavbar from '../../components/customer/Navbar/CustomNavbar';
import { isAuthenticated, isAdmin } from '../../util/auth';
import { getSubtotalAmount } from '../../util/cart';
import { getTempCart } from '../../util/tempCart';

const Navbar = ({ categories, cart, onLogOut, history }) => {
  const cartAmount = getSubtotalAmount(cart);
  const tempCartAmount = getSubtotalAmount(getTempCart());
  const useCart = cart.length > 0 && cartAmount !== 0;
  const useTempCart = getTempCart() !== null && tempCartAmount !== 0;

  return (
    <CustomNavbar
      categories={categories}
      isAuthenticated={isAuthenticated()}
      isAdmin={isAdmin()}
      cartAmount={cartAmount}
      tempCartAmount={tempCartAmount}
      useCart={useCart}
      useTempCart={useTempCart}
      onLogOut={onLogOut}
      getTempCart
      history={history}
    />
  );
};

const mapStateToProps = state => {
  const { categories } = state.category;
  const { cart } = state;

  return {
    categories,
    cart,
  };
};

export default connect(mapStateToProps)(withRouter(Navbar));
