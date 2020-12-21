import React from 'react';
import styled from 'styled-components';
import { Container, Row } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import Cake from '../components/Cake';
import { isAuthenticated } from '../util/auth';
import { filterByCategory } from '../util/cakes';
import { addItemToTempCart } from '../util/tempCart';

const StyledH1 = styled.h1`
  margin: 25px 0 10px 0;
`;

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
      <StyledH1>{match.params.name.toUpperCase()}</StyledH1>
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
