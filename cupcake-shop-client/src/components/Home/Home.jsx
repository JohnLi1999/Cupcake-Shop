import React from 'react';
import styled from 'styled-components';
import { Container, Row, Col, Carousel, Alert, Button } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.css';

import { TODAY_SPECIAL, BEST_SELLING } from '../../constants/constants';
import { addItemToTempCart } from '../../shared/tempCart';
import { isAuthenticated } from '../../shared/utility';
import './Home.css';

const FullWidthContainer = styled(Container)`
  margin: 0;
  padding: 0;
  border: 0;
  max-width: 100%;
`;

const Home = ({ addCakeToCart, cakes, history }) => {
  const getTargetCakeList = (cakeList, targetTag) =>
    cakeList.filter((cake) => cake.tags.includes(targetTag));

  const buildCakeList = () =>
    getTargetCakeList(cakes, BEST_SELLING).map((cake) => (
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
                      return addCakeToCart(cake.id, '/');
                    }
                    addItemToTempCart(cake.id);
                    toast.success('Cake added!');
                    return history.push('/');
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
    <FullWidthContainer>
      <Carousel>
        <Carousel.Item>
          <div style={{ backgroundColor: 'pink', height: 300 }}></div>
          <Carousel.Caption>
            <h2>Welcome to the Cupcake Shop</h2>
            <h3>Hope you find your favorite cake here</h3>
            <Button
              variant='warning'
              className='mt-2 mb-3'
              onClick={() => history.push('/cart')}>
              Check your cart
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
        {getTargetCakeList(cakes, TODAY_SPECIAL).map((cake) => (
          <Carousel.Item key={cake.id}>
            <div style={{ backgroundColor: 'pink', height: 300 }}></div>
            <Carousel.Caption>
              <Container>
                <h3>Today's Special</h3>
                <h2>{cake.name}</h2>
                <div>{cake.description}</div>
              </Container>
              <Button
                variant='warning'
                className='mt-2 mb-4'
                onClick={() => history.push(`/cakes/${cake.name}`)}>
                See Details
              </Button>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
      <Container>
        <Alert variant='primary' className='mt-5'>
          Best Selling
        </Alert>
        <Row>{buildCakeList()}</Row>
      </Container>
    </FullWidthContainer>
  );
};

const mapStateToProps = (state) => {
  const { cakes } = state.cake;

  return {
    cakes,
  };
};

export default connect(mapStateToProps)(withRouter(Home));
