import React, { useEffect, useCallback } from 'react';
import { Container, Button, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';

import { getAllUsers, deleteUser } from '../../api/userService';
import * as actions from '../../store/actions/index';
import UsersTable from '../../components/admin/Users/UsersTable';

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

  const addUserHandler = () => history.push('/admin/users/add');

  const updateUserHandler = userId =>
    history.push(`/admin/users/update/${userId}`, {
      id: userId,
    });

  const deleteUserHandler = async id => {
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
        <Button className="m-4" variant="info" onClick={addUserHandler}>
          Add User
        </Button>
      </Row>
      <UsersTable
        users={users}
        history={history}
        updateUser={updateUserHandler}
        deleteUser={deleteUserHandler}
      />
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
