import * as actionTypes from '../actionTypes';

const initialState = [];

const orderLoading = (state, action) => {
  const { orderList } = action;
  return orderList.slice(0);
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ORDER_LOADING:
      return orderLoading(state, action);
    default:
      return state;
  }
};

export default reducer;
