import React from 'react';
import styled from 'styled-components';
import { Container, Row, Col, Carousel, Alert, Button } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import { TODAY_SPECIAL, BEST_SELLING } from '../constants/constants';
import { addItemToTempCart } from '../util/tempCart';
import { isAuthenticated } from '../util/utility';

const FullWidthContainer = styled(Container)`
  margin: 0;
  padding: 0;
  border: 0;
  max-width: 100%;
`;

const CakeListOutlineDiv = styled.div`
  width: 100%;
  height: 470px;
  padding: 3px 0;
  margin: 10px 0;
  border: 2px solid #f2f2f2;
  position: relative;
  transition: border 0.5s;
  float: left;

  &:hover {
    border: 2px solid #ff6600;
  }
`

const SeeDetailsDiv = styled.div`
  position: absolute;
  top: 35%;
  left: 50%;
  padding: 7px;
  border-radius: 5px;
  color: #ffffff;
  background: #b3b3b3;
  pointer-events: none;
  cursor: default;
  visibility: hidden;
  opacity: 0;
  transition: visibility 0.5s, opacity 0.5s ease-in-out;
  transform: translate(-50%, -50%);
  display: table-cell;
  vertical-align: middle;
  text-align: center;
`;

const CakeListImageAreaDiv = styled.div`
  &:hover ${SeeDetailsDiv} {
    visibility: visible;
    opacity: 1;
  }
`;

const CakeListImg = styled.img`
  width: 250px;
  height: 250px;
  margin: 25px auto;
  border: 1px solid #ffb3cc;
  border-radius: 5px;
  display: table-cell;
  vertical-align: middle;
  text-align: center;
`

const CakeListInfoDiv = styled.div`
  margin: 0px 45px;
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 3px;
`;

const CakeNameAreaDiv = styled.div`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 3px;
`;

const CakeNameDiv = styled.div`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 3px;
`;

const CakeCategoryDiv = styled.div`
  font-size: 14px;
  margin-bottom: 5px;
  color: #3333cc;
`;

const CakePriceDiv = styled.div`
  font-size: 16px;
  margin-bottom: 5px;
  font-weight: 700;
`

const TextRightDiv = styled.div`
  text-align: right;
`

const CakeListButton = styled.button`
  padding: 5px 10px;
  border: 2px solid #f2f2f2;
  border-radius: 5px;
  font-size: 16px;
  color: #f2f2f2;
  background-color: #e68a00;

  &:hover {
    border-color: #e68a00;
    color: #e68a00;
    background-color: #f2f2f2;
  }
`;

const Home = ({ addCakeToCart, cakes, history }) => {
  const getTargetCakeList = (cakeList, targetTag) =>
    cakeList.filter((cake) => cake.tags.includes(targetTag));

  const buildCakeList = () =>
    getTargetCakeList(cakes, BEST_SELLING).map((cake) => (
      <Col lg={4} sm={6} xs={12} key={cake.id}>
        <CakeListOutlineDiv>
          <CakeListImageAreaDiv>
            <SeeDetailsDiv>See Details</SeeDetailsDiv>
            <Link to={`/cakes/${cake.name}`}>
              <CakeListImg
                src={cake.cover}
                alt={cake.name} />
            </Link>
          </CakeListImageAreaDiv>
          <CakeListInfoDiv>
            <CakeNameAreaDiv>
              <CakeNameDiv>{cake.name}</CakeNameDiv>
              <CakeCategoryDiv>{cake.category}</CakeCategoryDiv>
            </CakeNameAreaDiv>
            <CakePriceDiv>
              $ {cake.price}
            </CakePriceDiv>
            <TextRightDiv>
              <CakeListButton
                onClick={() => {
                  if (isAuthenticated()) {
                    return addCakeToCart(cake.id, '/');
                  }
                  addItemToTempCart(cake.id);
                  toast.success('Cake added!');
                  return history.push('/');
                }}>
                Add to Cart
              </CakeListButton>
            </TextRightDiv>
          </CakeListInfoDiv>
        </CakeListOutlineDiv>
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
