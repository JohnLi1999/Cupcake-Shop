import { TEMP_CART } from '../constants/constants';

export const getTempCart = () => JSON.parse(localStorage.getItem(TEMP_CART));
export const setTempCart = (cart) => {
  localStorage.setItem(TEMP_CART, JSON.stringify(cart));
};

export const addItemToTempCart = (cakeId) => {
  if (!getTempCart()) {
    localStorage.setItem(TEMP_CART, JSON.stringify([]));
  }

  const cart = getTempCart();
  let item = cart.find((cartItem) => cartItem.cakeId === cakeId);

  if (item) {
    item.amount += 1;
  } else {
    item = {
      amount: 1,
      cakeId,
    };
    cart.push(item);
  }

  setTempCart(cart);
};

export const reduceItemInTempCart = (cakeId) => {
  let cart = getTempCart();

  let item = cart.find((cartItem) => cartItem.cakeId === cakeId);

  if (item.amount === 1) {
    cart = cart.filter((cartItem) => cartItem.cakeId !== cakeId);
  } else {
    item.amount -= 1;
  }

  setTempCart(cart);
};

export const deleteItemFromTempCart = (cakeId) => {
  let cart = getTempCart();
  cart = cart.filter((cartItem) => cartItem.cakeId !== cakeId);
  setTempCart(cart);
};

export const clearTempCart = () => {
  localStorage.removeItem(TEMP_CART);
};
