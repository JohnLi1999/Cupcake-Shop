import { IS_AUTHENTICATED, IS_ADMIN } from '../constants/constants';

export const updateObject = (oldObject, updatedProperties) => {
  return { ...oldObject, ...updatedProperties };
};

export const isAuthenticated = () => localStorage.getItem(IS_AUTHENTICATED);

export const isAdmin = () => localStorage.getItem(IS_ADMIN);

export const bytesToMB = (bytes) => {
  return (bytes / (1024 * 1024)).toFixed(2);
};

export const getSubtotalPrice = (cart, cakes) => {
  let totalPrice = 0;

  cart.forEach((cartItem) => {
    const amount = cartItem.amount;
    const price = cakes.find((cake) => cake.id === cartItem.cakeId).price;
    totalPrice += price * amount;
  });

  return totalPrice.toFixed(2);
};

export const getSubtotalAmount = (cart) =>
  cart.reduce((amount, cartItem) => (amount += cartItem.amount), 0);
