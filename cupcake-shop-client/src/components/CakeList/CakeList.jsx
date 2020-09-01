import React from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.css';

import { isAuthenticated } from '../../shared/utility';
import { addItemToTempCart } from '../../shared/tempCart';
import './CakeList.css';

const StyledH1 = styled.h1`
  margin: 25px;
`;

const CakeList = ({ addCakeToCart, cakes, history, match }) => {
  const getTargetCakeList = (cakeList, targetCategory) =>
    cakeList.filter((cake) => cake.category === targetCategory);

  const buildCakeList = () =>
    getTargetCakeList(cakes, match.params.name).map((cake) => (
      <Col lg={4} sm={6} xs={12} key={cake.id}>
        <div className='cake-list-outline'>
          <div className='cake-outline'>
            <div className='cake-list-image-area'>
              <div className='see-detail'>See Details</div>
              <Link to={`/cakes/${cake.name}`}>
                <img
                  className='cake-list-image img-fluid'
                  src={cake.cover}
                  alt={cake.name}
                />
              </Link>
            </div>
            <div className='cake-list-info'>
              <div className='cake-name-area'>
                <div className='cake-name'>{cake.name}</div>
                <div className='cake-category'>{cake.category}</div>
              </div>
              <div className='cake-price'>
                $ <span>{cake.price}</span>
              </div>
              <div className='text-right'>
                <button
                  type='button'
                  className='cake-list-button'
                  onClick={() => {
                    if (isAuthenticated()) {
                      return addCakeToCart(
                        cake.id,
                        `/category/${cake.category}`
                      );
                    }
                    addItemToTempCart(cake.id);
                    toast.success('Cake added!');
                    return history.push(`/category/${cake.category}`);
                  }}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </Col>
    ));

  return (
    <Container>
      <StyledH1>{match.params.name.toUpperCase()}</StyledH1>
      <Row>{buildCakeList()}</Row>
    </Container>
  );
};

const mapStateToProps = (state) => {
  const { cakes } = state.cake;

  return {
    cakes,
  };
};

export default connect(mapStateToProps)(withRouter(CakeList));
