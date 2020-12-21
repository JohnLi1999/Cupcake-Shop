import React from 'react';
import { Table } from 'react-bootstrap';

const UserTable = ({ order }) =>         
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

export default UserTable;