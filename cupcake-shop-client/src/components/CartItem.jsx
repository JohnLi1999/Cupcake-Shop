import React from 'react';
import styled from 'styled-components';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const StyledDiv = styled.div`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 15px;
`;

const StyledColorDiv = styled(StyledDiv)`
  color: ${props => props.color};
`;

const CartItem = ({
  cake,
  amount,
  addToCart,
  reduceInCart,
  deleteFromCart,
}) => (
  <Col sm={6} md={6} lg={6} className="mb-4" key={cake.id}>
    <Row>
      <Col sm={12} lg={6}>
        <Link to={`/cakes/${cake.name}`}>
          <img src={cake.cover} alt={cake.name} className="img-fluid" />
        </Link>
      </Col>
      <Col sm={12} md={12} lg={6} className="p-2 mb-4">
        <Container className="mt-2">
          <StyledColorDiv color="#993333">{cake.name}</StyledColorDiv>
          <StyledDiv>$ {cake.price}</StyledDiv>
          <StyledColorDiv color="#ff6600">Amount: {amount}</StyledColorDiv>
        </Container>
        <Container>
          <Button
            variant="primary"
            className="m-1"
            onClick={() => addToCart(cake.id)}>
            Add
          </Button>
          <Button
            variant="warning"
            className="m-1"
            onClick={() => reduceInCart(cake.id)}>
            Reduce
          </Button>
          <Button
            variant="danger"
            className="m-1"
            onClick={() => deleteFromCart(cake.id)}>
            Delete
          </Button>
        </Container>
      </Col>
    </Row>
  </Col>
);

export default CartItem;
