import React from 'react';
import styled from 'styled-components';
import { Container, Carousel, Button } from 'react-bootstrap';

import { TODAY_SPECIAL } from '../../constants/constants';
import { filterByTag } from '../../util/cakes';

const StyledDiv = styled.div`
  background-color: pink;
  height: 300px;
`;

const StyledH2 = styled.h2`
  @media (max-width: 600px) {
    font-size: 30px;
  }
`;

const StyledH3 = styled.h3`
  @media (max-width: 600px) {
    font-size: 20px;
  }
`;

const StyledDescription = styled.div`
  @media (max-width: 600px) {
    font-size: 15px;
  }
`;
const StyledButton = styled(Button)`
  margin-top: 20px;
  margin-bottom: 30px;

  @media (max-width: 600px) {
    margin-top: 10px;
    margin-bottom: 10px;
  }
`;

const CustomCarousel = ({ cakes, checkCart, checkCake }) => (
  <Carousel>
    <Carousel.Item>
      <StyledDiv></StyledDiv>
      <Carousel.Caption>
        <StyledH2>Welcome to the Cupcake Shop</StyledH2>
        <StyledH3>Hope you find your favorite cake here</StyledH3>
        <StyledButton variant="warning" onClick={checkCart}>
          Check your cart
        </StyledButton>
      </Carousel.Caption>
    </Carousel.Item>
    {filterByTag(cakes, TODAY_SPECIAL).map(cake => (
      <Carousel.Item key={cake.id}>
        <StyledDiv></StyledDiv>
        <Carousel.Caption>
          <Container>
            <StyledH3>Today's Special</StyledH3>
            <StyledH2>{cake.name}</StyledH2>
            <StyledDescription>{cake.description}</StyledDescription>
          </Container>
          <StyledButton variant="warning" onClick={() => checkCake(cake.name)}>
            See Details
          </StyledButton>
        </Carousel.Caption>
      </Carousel.Item>
    ))}
  </Carousel>
);

export default CustomCarousel;
