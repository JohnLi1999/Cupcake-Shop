import * as actionTypes from '../actionTypes';
import { updateObject } from '../../util/utility';

const initialState = {
  users: [],
  orders: [],
};

const userLoadingAll = (state, action) => {
  const { users } = action;
  return updateObject(state, { users });
};

const userDelete = (state, action) => {
  const { id } = action;
  const updatedUsers = state.users.filter(user => user.id !== id);
  return updateObject(state, { users: updatedUsers });
};

const orderLoadingAll = (state, action) => {
  const { orders } = action;
  return updateObject(state, { orders });
};

const orderStatusUpdate = (state, action) => {
  const { orderId, newStatus } = action;
  const orderToUpdate = state.orders.find(order => order.id === orderId);
  orderToUpdate.orderStatus = newStatus;
  return state;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_LOADING_ALL:
      return userLoadingAll(state, action);
    case actionTypes.USER_DELETE:
      return userDelete(state, action);
    case actionTypes.ORDER_LOADING_ALL:
      return orderLoadingAll(state, action);
    case actionTypes.ORDER_STATUS_UPDATE:
      return orderStatusUpdate(state, action);
    default:
      return state;
  }
};

export default reducer;
