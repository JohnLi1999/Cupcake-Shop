import * as actionTypes from '../actionTypes';

export const userLoading = (user) => {
  return { type: actionTypes.USER_LOADING, user };
};

export const userLogOut = () => {
  return { type: actionTypes.USER_LOGOUT };
};

export const userUpdateInfo = (user) => {
  return { type: actionTypes.USER_UPDATE_INFO, user };
};
