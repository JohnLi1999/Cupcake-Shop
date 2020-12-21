import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import Title from '../common/UI/Title';
import Cake from '../components/Cake/Cake';
import { isAuthenticated } from '../util/auth';
import { filterByCategory } from '../util/cakes';
import { addItemToTempCart } from '../util/tempCart';

const CakeList = ({ cakes, history, match, addCakeToCart }) => {
  const addToCartHandler = cake => {
    if (isAuthenticated()) {
      return addCakeToCart(cake.id, `/category/${cake.category}`);
    }
    addItemToTempCart(cake.id);
    toast.success('Cake added!');
    return history.push(`/category/${cake.category}`);
  };

  return (
    <Container>
      <Title>{match.params.name.toUpperCase()}</Title>
      <Row>
        {filterByCategory(cakes, match.params.name).map(cake => (
          <Cake key={cake.id} cake={cake} addToCart={addToCartHandler} />
        ))}
      </Row>
    </Container>
  );
};

const mapStateToProps = state => {
  const { cakes } = state.cake;

  return {
    cakes,
  };
};

export default connect(mapStateToProps)(withRouter(CakeList));
