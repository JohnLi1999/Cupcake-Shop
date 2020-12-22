import React from 'react';
import { Container, Row, Alert } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import FullWidthContainer from '../../common/UI/FullWidthContainer';
import Cake from '../../components/customer/Cake/Cake';
import CustomCarousel from '../../components/customer/Cake/CustomCarousel';
import { BEST_SELLING } from '../../constants/constants';
import { isAuthenticated } from '../../util/auth';
import { filterByCondition } from '../../util/utility';
import { addItemToTempCart } from '../../util/tempCart';

const Home = ({ cakes, history, addCakeToCart }) => {
  const checkCartHandler = () => history.push('/cart');

  const checkCakeHandler = cakeName => history.push(`/cakes/${cakeName}`);

  const addToCartHandler = cake => {
    if (isAuthenticated()) {
      return addCakeToCart(cake.id, '/');
    }
    addItemToTempCart(cake.id);
    toast.success('Cake added!');
    return history.push('/');
  };

  return (
    <FullWidthContainer>
      <CustomCarousel
        cakes={cakes}
        history={history}
        checkCart={checkCartHandler}
        checkCake={checkCakeHandler}
      />
      <Container>
        <Alert variant="primary" className="mt-5">
          Best Selling
        </Alert>
        <Row>
          {filterByCondition('array', cakes, 'tags', BEST_SELLING).map(cake => (
            <Cake key={cake.id} cake={cake} addToCart={addToCartHandler} />
          ))}
        </Row>
      </Container>
    </FullWidthContainer>
  );
};

const mapStateToProps = state => {
  const { cakes } = state.cake;

  return {
    cakes,
  };
};

export default connect(mapStateToProps)(withRouter(Home));
