import * as actionTypes from '../actionTypes';
import { updateObject } from '../../util/utility';

const initialState = {
  cakes: [],
};

const cakeLoadingAll = (state, action) => {
  const { cakes } = action;
  return updateObject(state, { cakes });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CAKE_LOADING_ALL:
      return cakeLoadingAll(state, action);
    default:
      return state;
  }
};

export default reducer;
