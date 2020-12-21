import React from 'react';
import { Table } from 'react-bootstrap';

const CategoryTable = ({ categories }) => (
  <Table striped bordered hover responsive className="text-center mt-3">
    <thead className="thead-dark">
      <tr>
        <th>ID</th>
        <th>NAME</th>
        <th>CREATED AT</th>
        <th>UPDATED AT</th>
      </tr>
    </thead>
    <tbody>
      {categories.map(category => (
        <tr key={category.id}>
          <td>{category.id}</td>
          <td>{category.name}</td>
          <td>{category.createdAt}</td>
          <td>{category.updatedAt}</td>
        </tr>
      ))}
    </tbody>
  </Table>
);

export default CategoryTable;
