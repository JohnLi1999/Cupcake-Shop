import * as actionTypes from '../actionTypes';

export const categoryLoadingAll = (categories) => {
  return {
    type: actionTypes.CATEGORY_LOADING_ALL,
    categories,
  };
};
