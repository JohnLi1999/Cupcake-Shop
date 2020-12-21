import React, { useEffect, useCallback } from 'react';
import { Container, Accordion } from 'react-bootstrap';
import { connect } from 'react-redux';

import Empty from '../../common/UI/Empty';
import Title from '../../common/UI/Title';
import Order from '../../components/customer/Order/Order';
import { getOrders } from '../../api/orderService';
import * as actions from '../../store/actions/index';

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
          <Title center>Order List</Title>
          <Accordion>
            {orders.map(order => (
              <Order key={order.id} order={order} />
            ))}
          </Accordion>
        </>
      )}
    </Container>
  );
};

const mapStateToProps = state => {
  const { id } = state.user;
  const { orders } = state;

  return {
    userId: id,
    orders,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadOrderList: orderList => dispatch(actions.orderLoading(orderList)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderList);
