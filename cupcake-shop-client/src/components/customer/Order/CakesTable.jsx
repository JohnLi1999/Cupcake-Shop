import React from 'react';
import { Table } from 'react-bootstrap';

const CakesTable = ({ order }) => (
  <Table striped bordered hover responsive className="text-center">
    <thead className="thead-dark">
      <tr>
        <th>Cake Name</th>
        <th>Image</th>
        <th>Price ($)</th>
        <th>Amount</th>
      </tr>
    </thead>
    <tbody>
      {order.orderItemList.map(orderItem => (
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
);

export default CakesTable;
