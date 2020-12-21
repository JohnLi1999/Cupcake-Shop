import React, { useEffect, useCallback } from 'react';
import { Container, Table, Button, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';

import { getAllUsers, deleteUser } from '../../../api/userService';
import * as actions from '../../../store/actions/index';
import { ROLE_ADMIN } from '../../../constants/constants';

const AdminUsers = ({ users, userLoadingAll, userDelete, history }) => {
  const loadAllUsers = useCallback(async () => {
    try {
      const response = await getAllUsers();
      userLoadingAll(response.data);
    } catch {}
  }, [userLoadingAll]);

  useEffect(() => {
    loadAllUsers();
  }, [loadAllUsers]);

  const handleDelete = async id => {
    try {
      const response = await deleteUser(id);
      userDelete(id);
      toast.success(response.data.message);
    } catch (error) {
      toast.error('Not allowed to delete a user with orders!', {
        autoClose: 3000,
      });
    }
  };

  return (
    <Container>
      <Row className="justify-content-end">
        <Button
          className="m-4"
          variant="info"
          onClick={() => history.push('/admin/users/add')}>
          Add User
        </Button>
      </Row>
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
                {user.roles.includes(ROLE_ADMIN) ? (
                  <Button variant="secondary" className="m-1" disabled>
                    NO OPERATION
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="warning"
                      className="m-1"
                      onClick={() =>
                        history.push(`/admin/users/update/${user.id}`, {
                          id: user.id,
                        })
                      }>
                      Update Info
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(user.id)}>
                      Delete
                    </Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

const mapStateToProps = state => {
  const { users } = state.admin;

  return {
    users,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    userLoadingAll: users => dispatch(actions.userLoadingAll(users)),
    userDelete: id => dispatch(actions.userDelete(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AdminUsers));
