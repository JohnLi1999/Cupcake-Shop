import React from 'react';
import { Table, Button } from 'react-bootstrap';

import { ROLE_ADMIN } from '../../../constants/constants';

const UsersTable = ({ users, updateUser, deleteUser }) => (
  <Table striped bordered hover responsive className="text-center mt-3">
    <thead className="thead-dark">
      <tr>
        <th>ID</th>
        <th>USERNAME</th>
        <th>EMAIL</th>
        <th>ADDRESS</th>
        <th>ROLES</th>
        <th>OPERATIONS</th>
      </tr>
    </thead>
    <tbody>
      {users.map(user => (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.username}</td>
          <td>{user.email}</td>
          <td>{user.address}</td>
          <td>{user.roles.includes(ROLE_ADMIN) ? 'Admin' : 'User'}</td>
          <td>
            <Button
              variant="warning"
              className="m-1"
              onClick={() => updateUser(user.id)}>
              Update Info
            </Button>
            {!user.roles.includes(ROLE_ADMIN) && (
              <Button variant="danger" onClick={() => deleteUser(user.id)}>
                Delete
              </Button>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
);

export default UsersTable;
