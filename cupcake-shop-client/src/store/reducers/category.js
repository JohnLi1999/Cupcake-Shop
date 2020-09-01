import * as actionTypes from '../actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  categories: [],
};

const categoryLoadingAll = (state, action) => {
  const { categories } = action;
  return updateObject(state, { categories });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CATEGORY_LOADING_ALL:
      return categoryLoadingAll(state, action);
    default:
      return state;
  }
};

export default reducer;
