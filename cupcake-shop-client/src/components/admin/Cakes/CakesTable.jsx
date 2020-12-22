import React from 'react';
import { Table, Button } from 'react-bootstrap';

import { filterByCondition } from '../../../util/utility';

const CakesTable = ({ cakes, targetTab, updateCake }) => (
  <Table striped bordered hover responsive className="text-center mt-2">
    <thead className="thead-dark">
      <tr>
        <th>ID</th>
        <th>NAME</th>
        <th width="10%">IMAGES</th>
        <th>DESCRIPTION</th>
        <th>PRICE ($)</th>
        <th>STOCK</th>
        <th>CATEGORY</th>
        <th width="5%">CREATED AT</th>
        <th width="5%">UPDATED AT</th>
        <th>OPERATIONS</th>
      </tr>
    </thead>
    <tbody>
      {filterByCondition('array', cakes, 'tags', targetTab).map(cake => (
        <tr key={cake.id}>
          <td>{cake.id}</td>
          <td>{cake.name}</td>
          <td className="d-flex">
            <img
              className="m-1"
              style={{ width: 50, height: 50 }}
              src={cake.cover}
              alt={cake.name}
            />
            <img
              className="m-1"
              style={{ width: 50, height: 50 }}
              src={cake.img1}
              alt={cake.name}
            />
            <img
              className="m-1"
              style={{ width: 50, height: 50 }}
              src={cake.img2}
              alt={cake.name}
            />
          </td>
          <td>{cake.description}</td>
          <td>{cake.price}</td>
          <td>{cake.stock}</td>
          <td>{cake.category}</td>
          <td>{cake.createdAt}</td>
          <td>{cake.updatedAt}</td>
          <td>
            <Button
              variant="warning"
              className="m-1"
              onClick={() => updateCake(cake.id)}>
              Update
            </Button>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
);

export default CakesTable;
