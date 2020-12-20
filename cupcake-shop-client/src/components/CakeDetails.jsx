import React, { useState } from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import { isAuthenticated } from '../shared/utility';
import { addItemToTempCart } from '../shared/tempCart';

const CakeDetailImageArea = styled.div`
  width: 100%;
  margin-top: 30px;
`

const CakeDetailSlide = styled.img`
  width: 100%;
  height: 100%;
  border: 1px solid #d9d9d9;
  border-radius: 3px;
  display: ${props => props.show ? 'block' : 'none'}
`

const CakeDetailImage = styled.img`
  width: 100%;
  height: 100%;
  margin: 5px auto;
  border: 2px solid #d9d9d9;
  border-radius: 3px;
  cursor: pointer;
  opacity: ${props => props.show ? 1 : 0.6};

  &:hover {
    opacity: 1;
  }
`

const CakeDetailName = styled.div`
  margin-top: 60px;
  margin-bottom: 10px;
  color: #ff9900;
  font-size: 60px;
  font-weight: 500;
`;  

const CakeDetailCategory = styled.div`
  margin-bottom: 20px;
  font-size: 30px;
  font-weight: 700;
  color: #993333;
`;

const CakeDetailDescription = styled.div`  
  margin-bottom: 20px;
  font-size: 25px;
  color: #8c8c8c;`
;

const CakeDetailPrice = styled.div`
  margin-bottom: 30px;
  font-size: 30px;
  font-weight: 700;
`

const CakeDetailButton = styled.button`
  margin: 20px;
  padding: 8px 15px;
  border: 2px solid #f2f2f2;
  border-radius: 5px;
  color: #ffffff;
  background-color: #993366;
  font-size: 20px;

  &:hover {
    border-color: #993366;
    color: #993366;
    background-color: #ffffff;
  }
`

const CakeDetails = ({ addCakeToCart, cakes, history, match }) => {
  const [showCover, setShowCover] = useState(true);
  const [showImg1, setShowImg1] = useState(false);
  const [showImg2, setShowImg2] = useState(false);

  const getTargetCake = (cakeList, name) =>
    cakeList.filter((cake) => cake.name === name);

  const buildCakeDetail = () =>
    getTargetCake(cakes, match.params.name).map((cake) => (
      <Row key={cake.id}>
        <Col sm={7} lg={5}>
          <Row className='p-1'>
            <CakeDetailImageArea>
              <CakeDetailSlide                 
                src={cake.cover}
                alt=''
                show={showCover} />
              <CakeDetailSlide                 
                src={cake.img1}
                alt=''
                show={showImg1} />
              <CakeDetailSlide                 
                src={cake.img2}
                alt=''
                show={showImg2} />
            </CakeDetailImageArea>
          </Row>
          <Row>
            <Col className='p-1'>
              <CakeDetailImage                 
                src={cake.cover}
                alt='COVER'
                onClick={() => {
                  setShowCover(true);
                  setShowImg1(false);
                  setShowImg2(false);
                }} 
                show={showCover}
              />
            </Col>
            <Col className='p-1'>
              <CakeDetailImage                 
                src={cake.img1}
                alt='IMAGE1'
                onClick={() => {
                  setShowCover(false);
                  setShowImg1(true);
                  setShowImg2(false);
                }} 
                show={showImg1}
              />   
            </Col>
            <Col className='p-1'>
              <CakeDetailImage                 
              src={cake.img2}
                alt='IMAGE2'
                onClick={() => {
                  setShowCover(false);
                  setShowImg1(false);
                  setShowImg2(true);
                }} 
                show={showImg2}
              />
            </Col>
          </Row>
        </Col>
        <Col sm={5} lg={7} className='text-center'>
          <CakeDetailName>{cake.name}</CakeDetailName>
          <CakeDetailCategory>
            Category: {cake.category}
          </CakeDetailCategory>
          <CakeDetailDescription>
            {cake.description}
          </CakeDetailDescription>
          <CakeDetailPrice>
            $ {cake.price}
          </CakeDetailPrice>
          <CakeDetailButton onClick={() => {
              if (isAuthenticated()) {
                return addCakeToCart(cake.id, `/cakes/${match.params.name}`);
              }
              addItemToTempCart(cake.id);
              toast.success('Cake added!');
              return history.push(`/cakes/${match.params.name}`);
            }}>
            Add to Cart
          </CakeDetailButton>
        </Col>
      </Row>
    ));

  return <Container>{buildCakeDetail()}</Container>;
};

const mapStateToProps = (state) => {
  const { cakes } = state.cake;

  return {
    cakes,
  };
};

export default connect(mapStateToProps)(withRouter(CakeDetails));
