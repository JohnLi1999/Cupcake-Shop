import React from 'react';
import styled from 'styled-components';
import { Accordion, Card, Col } from 'react-bootstrap';

import CakesTable from './CakesTable';
import UserTable from './UserTable';
import { PLACED, DELIVERED, FINISHED } from '../../../constants/constants';

const StyledDiv = styled.div`
  cursor: pointer;
  font-size: x;
  font-weight: 500;
`;

const StyledCol = styled(Col)`
  padding: 0;
`;

const StyledOrderStatus = styled.div`
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
const Order = ({ order }) => (
  <Card key={order.id}>
    <Card.Header>
      <Accordion.Toggle as={StyledDiv} eventKey={order.id}>
        <StyledCol>Ordered by: {order.createdAt}</StyledCol>
        <StyledCol>
          Order Status
          <StyledOrderStatus status={order.orderStatus}>
            {order.orderStatus}
          </StyledOrderStatus>
        </StyledCol>
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey={order.id}>
      <Card.Body>
        <UserTable order={order} />
        <CakesTable order={order} />
      </Card.Body>
    </Accordion.Collapse>
  </Card>
);

export default Order;
