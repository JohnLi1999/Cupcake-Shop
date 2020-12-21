import React, { useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Container, Accordion } from 'react-bootstrap';
import { connect } from 'react-redux';

import Empty from '../common/Empty';
import Order from '../components/Order/Order';
import { getOrders } from '../api/orderService';
import * as actions from '../store/actions/index';

const StyledH1 = styled.h1`
  text-align: center;
  margin: 25px;
`;

const OrderList = ({ userId, orders, loadOrderList }) => {
  const loadOrders = useCallback(async () => {
    try {
      const response = await getOrders(userId);
      loadOrderList(response.data);
    } catch {}
  }, [userId, loadOrderList]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  return (
    <Container>
      {orders.length < 1 ? (
        <Empty>Your do not have any Order yet</Empty>
      ) : (
        <>
          <StyledH1>Order List</StyledH1>
          <Accordion>{     
            orders.map((order) => (
              <Order key={order.id} order={order} />
            ))
          }</Accordion>
        </>
      )}
    </Container>
  );
};

const mapStateToProps = (state) => {
  const { id } = state.user;
  const { orders } = state;

  return {
    userId: id,
    orders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadOrderList: (orderList) => dispatch(actions.orderLoading(orderList)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderList);
