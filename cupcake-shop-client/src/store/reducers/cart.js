import * as actionTypes from '../actionTypes';

const initialState = [];

const cartLoadingAll = (state, action) => {
  const { cart } = action;
  return cart.slice(0);
};

const cartClear = (state, action) => {
  return [];
};

const cartAddItem = (state, action) => {
  const cakeId = action.cakeId;
  let item = state.find((cartItem) => cartItem.cakeId === action.cakeId);

  if (item) {
    item.amount += 1;
  } else {
    item = {
      amount: 1,
      cakeId,
    };
    state.push(item);
  }

  return state;
};

const cartReduceItem = (state, action) => {
  let item = state.find((cartItem) => cartItem.cakeId === action.cakeId);

  if (item.amount === 1) {
    return state.filter((cartItem) => cartItem.cakeId !== action.cakeId);
  }

  item.amount -= 1;
  return state;
};

const cartDeleteItem = (state, action) => {
  return state.filter((cartItem) => cartItem.cakeId !== action.cakeId);
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CART_LOADING_ALL:
      return cartLoadingAll(state, action);
    case actionTypes.CART_CLEAR:
      return cartClear(state, action);
    case actionTypes.CART_ADD_ITEM:
      return cartAddItem(state, action);
    case actionTypes.CART_REDUCE_ITEM:
      return cartReduceItem(state, action);
    case actionTypes.CART_DELETE_ITEM:
      return cartDeleteItem(state, action);
    default:
      return state;
  }
};

export default reducer;
