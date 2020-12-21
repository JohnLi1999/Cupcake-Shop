import React, { useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Container, Alert, Accordion, Card, Col, Table } from 'react-bootstrap';
import { connect } from 'react-redux';

import { getOrders } from '../api/orderService';
import { PLACED, DELIVERED } from '../constants/constants';
import * as actions from '../store/actions/index';

const StyledH1 = styled.h1`
  text-align: center;
  margin: 25px;
`;

const StyledAlert = styled(Alert)`
  margin-top: 50px;
  padding: 50px;
  border-radius: 10px;
  color: #0066ff;
  background-color: #ffcc99;
  text-align: center;
  font-size: 30px;
  font-weight: 700;
`;

const StyledDiv = styled.div`
  cursor: pointer;
  font-size: x;
  font-weight: 500;
`;

const StyledCol = styled(Col)`
  padding: 0;
`;

const StyledOrderStatus = styled.div`
  color: ${(props) => props.color};
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

  const orderStatus = (status) => {
    if (status === PLACED) {
      return <StyledOrderStatus color='#33cc33'>{status}</StyledOrderStatus>;
    } else if (status === DELIVERED) {
      return <StyledOrderStatus color='#0000ff'>{status}</StyledOrderStatus>;
    } else {
      return <StyledOrderStatus color='#000000'>{status}</StyledOrderStatus>;
    }
  };

  const buildOrderList = (orderList) =>
    orderList.map((order) => (
      <Card key={order.id}>
        <Card.Header>
          <Accordion.Toggle as={StyledDiv} eventKey={order.id}>
            <StyledCol>Ordered by: {order.createdAt}</StyledCol>
            <StyledCol>Order Status {orderStatus(order.orderStatus)}</StyledCol>
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey={order.id}>
          <Card.Body>
            <Table striped bordered hover responsive className='text-center'>
              <thead className='thead-dark'>
                <tr>
                  <th>Receiver</th>
                  <th>Address</th>
                  <th>Pay Type</th>
                  <th>Total Amount</th>
                  <th>Total Price ($)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{order.receiver}</td>
                  <td>{order.address}</td>
                  <td>{order.payType}</td>
                  <td>{order.totalAmount}</td>
                  <td>{order.totalPrice}</td>
                </tr>
              </tbody>
            </Table>
            <Table striped bordered hover responsive className='text-center'>
              <thead className='thead-dark'>
                <tr>
                  <th>Cake Name</th>
                  <th>Image</th>
                  <th>Price ($)</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {order.orderItemList.map((orderItem) => (
                  <tr key={orderItem.cakeName}>
                    <td>{orderItem.cakeName}</td>
                    <td>
                      <img
                        src={orderItem.cakeCover}
                        alt={orderItem.cakeName}
                        style={{ height: 50, width: 50 }}
                      />
                    </td>
                    <td>{orderItem.price}</td>
                    <td>{orderItem.amount}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    ));

  return (
    <Container>
      {orders.length < 1 ? (
        <StyledAlert>Your do not have any order yet</StyledAlert>
      ) : (
        <>
          <StyledH1>Order List</StyledH1>
          <Accordion>{buildOrderList(orders)}</Accordion>
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
