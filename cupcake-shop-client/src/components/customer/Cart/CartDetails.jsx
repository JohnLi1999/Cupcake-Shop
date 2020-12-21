import React from 'react';
import styled from 'styled-components';

const StyledDetails = styled.div`
  text-align: center;
  font-size: 20px;
  font-size: 700;
  margin: 10px;
`;

const CartDetails = ({ cart, cakes }) => {
  return (
    <>
      <StyledDetails>Cart Details</StyledDetails>
      {cart.map(cartItem => {
        const cake = cakes.find(cake => cake.id === cartItem.cakeId);
        return (
          <StyledDetails key={cake.id}>
            <span>{cake.name}</span> * <span>{cartItem.amount}</span>
          </StyledDetails>
        );
      })}
    </>
  );
};

export default CartDetails;
