import React from 'react';
import styled from 'styled-components';
import { Accordion, Card, Col } from 'react-bootstrap';

import OrderStatus from '../../../common/UI/OrderStatus';
import CakesTable from './CakesTable';
import UserTable from './UserTable';

const StyledDiv = styled.div`
  cursor: pointer;
  font-size: x;
  font-weight: 500;
`;

const StyledCol = styled(Col)`
  padding: 0;
`;

const Order = ({ order }) => (
  <Card key={order.id}>
    <Card.Header>
      <Accordion.Toggle as={StyledDiv} eventKey={order.id}>
        <StyledCol>Ordered by: {order.createdAt}</StyledCol>
        <StyledCol>
          Order Status
          <OrderStatus status={order.orderStatus}>
            {order.orderStatus}
          </OrderStatus>
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
