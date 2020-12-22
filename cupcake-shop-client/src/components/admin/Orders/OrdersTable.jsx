import React from 'react';
import { Table, Button } from 'react-bootstrap';

import OrderStatus from '../../../common/UI/OrderStatus';
import { PLACED, DELIVERED, FINISHED } from '../../../constants/constants';
import { filterByCondition } from '../../../util/utility';

const OrdersTable = ({ orders, targetStatus, handleUpdate }) => (
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
      {filterByCondition('object', orders, 'orderStatus', targetStatus).map(
        order => (
          <tr key={order.id}>
            <td>{order.id}</td>
            <td>{order.username}</td>
            <td>
              <OrderStatus status={order.orderStatus}>
                {order.orderStatus}
              </OrderStatus>
            </td>
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
        )
      )}
    </tbody>
  </Table>
);

export default OrdersTable;
