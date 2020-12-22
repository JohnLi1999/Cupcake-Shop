import React from 'react';
import styled from 'styled-components';

import { PLACED, DELIVERED, FINISHED } from '../../constants/constants';

const StyledDiv = styled.div`
  color: ${props => {
    if (props.status === PLACED) {
      return '#33cc33';
    } else if (props.status === DELIVERED) {
      return '#0000ff';
    } else if (props.status === FINISHED) {
      return '#000000';
    }
  }};
`;

const OrderStatus = ({ status, children }) => (
  <StyledDiv status={status}>{children}</StyledDiv>
);

export default OrderStatus;
