import React, { useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Table, Button, Tabs, Tab } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';

import FullWidthContainer from '../../common/UI/FullWidthContainer';
import { getAllOrders, updateOrderStatus } from '../../api/orderService';
import { PLACED, DELIVERED, FINISHED } from '../../constants/constants';
import * as actions from '../../store/actions/index';

const StyledOrderStatus = styled.div`
  color: ${props => props.color};
`;

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

  const orderStatus = status => {
    if (status === PLACED) {
      return <StyledOrderStatus color="#33cc33">{status}</StyledOrderStatus>;
    } else if (status === DELIVERED) {
      return <StyledOrderStatus color="#0000ff">{status}</StyledOrderStatus>;
    } else {
      return <StyledOrderStatus color="#000000">{status}</StyledOrderStatus>;
    }
  };

  const getTargetOrderList = (orderList, targetStatus) =>
    targetStatus
      ? orders.filter(order => order.orderStatus === targetStatus)
      : orderList;

  const buildOrderList = targetStatus => (
    <Table striped bordered hover responsive className="text-center mt-2">
      <thead className="thead-dark">
        <tr>
          <th width="5%">ID</th>
          <th width="7%">USER</th>
          <th width="5%">ORDER STATUS</th>
          <th width="5%">RECEIVER</th>
          <th>DELIVERY ADDRESS</th>
          <th>DETAILS</th>
          <th width="5%">TOTAL PRICE ($)</th>
          <th width="5%">TOTAL AMOUNT</th>
          <th width="5%">PAY TYPE</th>
          <th width="5%">CREATED AT</th>
          <th width="5%">UPDATED AT</th>
          <th width="10%">OPERATIONS</th>
        </tr>
      </thead>
      <tbody>
        {getTargetOrderList(orders, targetStatus).map(order => (
          <tr key={order.id}>
            <td>{order.id}</td>
            <td>{order.username}</td>
            <td>{orderStatus(order.orderStatus)}</td>
            <td>{order.receiver}</td>
            <td>{order.address}</td>
            <td>
              {order.orderItemList.map(orderItem => (
                <div key={orderItem.cakeName}>
                  {orderItem.cakeName} ({orderItem.price}) * {orderItem.amount}
                </div>
              ))}
            </td>
            <td>{order.totalPrice}</td>
            <td>{order.totalAmount}</td>
            <td>{order.payType}</td>
            <td>{order.createdAt}</td>
            <td>{order.updatedAt}</td>
            <td>
              {order.orderStatus === PLACED && (
                <Button
                  variant="primary"
                  onClick={() => {
                    handleUpdate(order.id, DELIVERED);
                  }}>
                  DELIVER
                </Button>
              )}
              {order.orderStatus === DELIVERED && (
                <Button
                  variant="success"
                  onClick={() => {
                    handleUpdate(order.id, FINISHED);
                  }}>
                  FINISH
                </Button>
              )}
              {order.orderStatus === FINISHED && (
                <Button variant="secondary" disabled>
                  NO OPERATION
                </Button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );

  return (
    <FullWidthContainer needMargin>
      <Tabs defaultActiveKey="all">
        <Tab eventKey="all" title="All ORDERS">
          {buildOrderList()}
        </Tab>
        <Tab eventKey={PLACED} title={PLACED}>
          {buildOrderList(PLACED)}
        </Tab>
        <Tab eventKey={DELIVERED} title={DELIVERED}>
          {buildOrderList(DELIVERED)}
        </Tab>
        <Tab eventKey={FINISHED} title={FINISHED}>
          {buildOrderList(FINISHED)}
        </Tab>
      </Tabs>
    </FullWidthContainer>
  );
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
