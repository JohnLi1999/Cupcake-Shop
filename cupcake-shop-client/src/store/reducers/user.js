import * as actionTypes from '../actionTypes';
import { updateObject } from '../../util/utility';
import {
  AUTHENTICATION_TOKEN,
  IS_AUTHENTICATED,
  IS_ADMIN,
  ROLE_ADMIN,
} from '../../constants/constants';

const initialState = {
  id: '',
  username: '',
  email: '',
  address: '',
  isAuthenticated: false,
  isAdmin: false,
};

const userLoading = (state, action) => {
  const { id, username, email, address, roles } = action.user;

  let isAdmin = false;
  localStorage.setItem(IS_AUTHENTICATED, true);
  if (roles.includes(ROLE_ADMIN)) {
    localStorage.setItem(IS_ADMIN, true);
    isAdmin = true;
  }

  return updateObject(state, {
    id,
    username,
    email,
    address,
    isAuthenticated: true,
    isAdmin,
  });
};

const userLogOut = (state, action) => {
  localStorage.removeItem(AUTHENTICATION_TOKEN);
  localStorage.removeItem(IS_AUTHENTICATED);
  localStorage.removeItem(IS_ADMIN);

  return updateObject(state, {
    id: '',
    username: '',
    email: '',
    address: '',
    isAuthenticated: false,
    isAdmin: false,
  });
};

const userUpdateInfo = (state, action) => {
  const { username, email, address } = action.user;

  return updateObject(state, {
    username,
    email,
    address,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_LOADING:
      return userLoading(state, action);
    case actionTypes.USER_LOGOUT:
      return userLogOut(state, action);
    case actionTypes.USER_UPDATE_INFO:
      return userUpdateInfo(state, action);
    default:
      return state;
  }
};

export default reducer;
