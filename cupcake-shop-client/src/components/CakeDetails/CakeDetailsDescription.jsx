import React from 'react';
import styled from 'styled-components';
import { Col } from 'react-bootstrap';

const CakeDetailNameDiv = styled.div`
  margin-top: 60px;
  margin-bottom: 10px;
  color: #ff9900;
  font-size: 60px;
  font-weight: 500;

  @media (max-width: 1000px) {
    font-size: 40px;
  }

  @media (max-width: 700px) {
    font-size: 30px;
  }
`;  

const CakeDetailCategoryDiv = styled.div`
  margin-bottom: 20px;
  font-size: 30px;
  font-weight: 700;
  color: #993333;

  @media (max-width: 1000px) {
    font-size: 25px;
  }

  @media (max-width: 700px) {
    font-size: 20px;
  }
`;

const CakeDetailDescriptionDiv = styled.div`  
  margin-bottom: 20px;
  font-size: 25px;
  color: #8c8c8c;

  @media (max-width: 1000px) {
    font-size: 20px;
  }

  @media (max-width: 700px) {
    font-size: 15px;
  }
`;

const CakeDetailPriceDiv = styled.div`
  margin-bottom: 30px;
  font-size: 30px;
  font-weight: 700;

  @media (max-width: 1000px) {
    font-size: 20px;
  }

  @media (max-width: 700px) {
    font-size: 15px;
  }
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

const CakeDetailsDescription = ({ cake, addToCart }) => 
  <Col sm={5} lg={7} className='text-center'>
    <CakeDetailNameDiv>{cake.name}</CakeDetailNameDiv>
    <CakeDetailCategoryDiv>
      Category: {cake.category}
    </CakeDetailCategoryDiv>
    <CakeDetailDescriptionDiv>
      {cake.description}
    </CakeDetailDescriptionDiv>
    <CakeDetailPriceDiv>
      $ {cake.price}
    </CakeDetailPriceDiv>
    <CakeDetailButton onClick={() => addToCart(cake.id)}>
      Add to Cart
    </CakeDetailButton>
  </Col>

export default CakeDetailsDescription;