import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';

import OrdersTabs from '../../components/admin/Orders/OrdersTabs';
import { getAllOrders, updateOrderStatus } from '../../api/orderService';
import { PLACED, DELIVERED, FINISHED } from '../../constants/constants';
import * as actions from '../../store/actions/index';

const AdminOrders = ({
  orders,
  orderLoadingAll,
  orderStatusUpdate,
  history,
}) => {
  const loadAllOrders = useCallback(async () => {
    try {
      const response = await getAllOrders();
      orderLoadingAll(response.data);
    } catch {}
  }, [orderLoadingAll]);

  useEffect(() => {
    loadAllOrders();
  }, [loadAllOrders]);

  const handleUpdate = async (orderId, newStatus) => {
    try {
      const response = await updateOrderStatus(orderId, {
        newStatus,
      });
      orderStatusUpdate(orderId, newStatus);
      toast.success(response.data.message);
      history.push('/admin/orders', { status: newStatus });
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 2000,
      });
    }
  };

  const keys = [
    { eventKey: 'all', title: 'All ORDERS' },
    PLACED,
    DELIVERED,
    FINISHED,
  ];

  return <OrdersTabs orders={orders} keys={keys} handleUpdate={handleUpdate} />;
};

const mapStateToProps = state => {
  const { orders } = state.admin;

  return {
    orders,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    orderLoadingAll: orders => dispatch(actions.orderLoadingAll(orders)),
    orderStatusUpdate: (orderId, newStatus) =>
      dispatch(actions.orderStatusUpdate(orderId, newStatus)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AdminOrders));
