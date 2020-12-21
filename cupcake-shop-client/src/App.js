import React, { useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import * as actions from './store/actions/index';
import { getCurrentUser } from './api/userService';
import { getAllCategories } from './api/categoryService';
import { getAllCakes } from './api/cakeService';
import {
  updateAndGetCart,
  addCartItem,
  reduceCartItem,
  deleteCartItem,
} from './api/cartService';
import AuthenticatedRoute from './common/AuthenticatedRoute';
import AdminRoute from './common/AdminRoute';
import NotFound from './common/NotFound';
import CakeList from './containers/CakeList';
import Home from './containers/Home';
import CakeDetails from './containers/CakeDetails';
import Cart from './containers/Cart';
import OrderList from './containers/OrderList';
import CustomNavbar from './containers/CustomNavbar';

import LogIn from './components/LogIn';
import Checkout from './components/Checkout';
import Profile from './components/Profile';
import SignUp from './components/SignUp';
import AdminUsers from './components/admin/users/AdminUsers';
import AdminUsersAdd from './components/admin/users/AdminUsersAdd';
import AdminUsersUpdate from './components/admin/users/AdminUsersUpdate';
import AdminCategories from './components/admin/AdminCategories';
import AdminCakes from './components/admin/cakes/AdminCakes';
import AdminCakesOperations from './components/admin/cakes/AdminCakesOperations';
import AdminOrders from './components/admin/AdminOrders';
import { getTempCart, clearTempCart } from './util/tempCart';

const FullWidthContainer = styled(Container)`
  margin: 0;
  padding: 0;
  border: 0;
  max-width: 100%;
  background-color: #f2f2f2;
`;

const App = ({
  userId,
  loadAllCategories,
  loadAllCakes,
  loadCurrentUser,
  loadAllCartItems,
  cartAddItem,
  cartReduceItem,
  cartDeleteItem,
  clearCart,
  logOut,
  history,
}) => {
  const loadUser = useCallback(async () => {
    try {
      const response = await getCurrentUser();
      loadCurrentUser(response.data);
    } catch {}
  }, [loadCurrentUser]);

  const loadCategories = useCallback(async () => {
    try {
      const response = await getAllCategories();
      loadAllCategories(response.data);
    } catch {}
  }, [loadAllCategories]);

  const loadCakes = useCallback(async () => {
    try {
      const response = await getAllCakes();
      loadAllCakes(response.data);
    } catch {}
  }, [loadAllCakes]);

  const loadCart = useCallback(async () => {
    let cartItemList = getTempCart();

    if (!cartItemList) {
      cartItemList = [];
    }

    try {
      const response = await updateAndGetCart(userId, cartItemList);
      loadAllCartItems(response.data);
      clearTempCart();
    } catch {}
  }, [userId, loadAllCartItems]);

  useEffect(() => {
    loadCategories();
    loadCakes();
    loadUser();
    loadCart();
  }, [loadCategories, loadCakes, loadUser, loadCart]);

  const handleLogIn = path => {
    loadUser();
    if (path) {
      history.push(path);
      toast.info('Cakes previously in your cart have also been included!', {
        autoClose: 3000,
      });
    } else {
      history.push('/');
    }
  };

  const handleLogOut = () => {
    logOut();
    clearCart();
    toast.success('You are successfully logged out!');
    history.push('/');
  };

  const handleCheckout = () => {
    clearCart();
    history.push('/orders');
  };

  const addCakeToCart = async (cakeId, path) => {
    try {
      const response = await addCartItem(userId, cakeId);
      cartAddItem(cakeId);
      toast.success(response.data.message);
      history.push(path);
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 2000,
      });
    }
  };

  const reduceCakeInCart = async cakeId => {
    try {
      const response = await reduceCartItem(userId, cakeId);
      cartReduceItem(cakeId);
      toast.success(response.data.message);
      history.push('/cart');
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 2000,
      });
    }
  };

  const deleteCakeFromCart = async cakeId => {
    try {
      const response = await deleteCartItem(userId, cakeId);
      cartDeleteItem(cakeId);
      toast.success(response.data.message);
      history.push('/cart');
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 2000,
      });
    }
  };

  return (
    <FullWidthContainer>
      <CustomNavbar onLogOut={handleLogOut} />
      <Switch>
        <Route
          path="/"
          exact
          render={() => <Home addCakeToCart={addCakeToCart} />}
        />
        <Route
          path="/login"
          exact
          render={() => <LogIn onLogIn={handleLogIn} />}
        />
        <Route path="/signup" exact component={SignUp} />
        <Route
          path="/category/:name"
          exact
          render={() => <CakeList addCakeToCart={addCakeToCart} />}
        />
        <Route
          path="/cakes/:name"
          exact
          render={() => <CakeDetails addCakeToCart={addCakeToCart} />}
        />
        <Route
          path="/cart"
          exact
          render={() => (
            <Cart
              addCakeToCart={addCakeToCart}
              reduceCakeInCart={reduceCakeInCart}
              deleteCakeFromCart={deleteCakeFromCart}
            />
          )}
        />
        <Route
          path="/checkout"
          exact
          render={() => <Checkout onCheckout={handleCheckout} />}
        />
        <Route path="/orders" exact render={() => <OrderList />} />
        <AuthenticatedRoute path="/profile" exact component={Profile} />
        <AdminRoute path="/admin/users" exact component={AdminUsers} />
        <AdminRoute path="/admin/users/add" exact component={AdminUsersAdd} />
        <AdminRoute
          path="/admin/users/update/:id"
          exact
          component={AdminUsersUpdate}
        />
        <AdminRoute
          path="/admin/categories"
          exact
          render={() => <AdminCategories loadCategories={loadCategories} />}
        />
        <AdminRoute
          path="/admin/cakes"
          exact
          render={() => <AdminCakes loadCakes={loadCakes} />}
        />
        <AdminRoute
          path="/admin/cakes/:operation/:id?"
          exact
          render={() => <AdminCakesOperations loadCakes={loadCakes} />}
        />
        <AdminRoute path="/admin/orders" exact component={AdminOrders} />
        <Route component={NotFound} />
      </Switch>
    </FullWidthContainer>
  );
};

const mapStateToProps = state => {
  const { id } = state.user;

  return {
    userId: id,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadAllCategories: categories =>
      dispatch(actions.categoryLoadingAll(categories)),
    loadAllCakes: cakes => dispatch(actions.cakeLoadingAll(cakes)),
    loadCurrentUser: currentUser => dispatch(actions.userLoading(currentUser)),
    loadAllCartItems: cart => dispatch(actions.cartLoadingAll(cart)),
    clearCart: () => dispatch(actions.cartClear()),
    cartAddItem: cakeId => dispatch(actions.cartAddItem(cakeId)),
    cartReduceItem: cakeId => dispatch(actions.cartReduceItem(cakeId)),
    cartDeleteItem: cakeId => dispatch(actions.cartDeleteItem(cakeId)),
    logOut: currentUser => dispatch(actions.userLogOut(currentUser)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
