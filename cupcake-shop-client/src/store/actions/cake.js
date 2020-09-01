import * as actionTypes from '../actionTypes';

export const cakeLoadingAll = (cakes) => {
  return {
    type: actionTypes.CAKE_LOADING_ALL,
    cakes,
  };
};
