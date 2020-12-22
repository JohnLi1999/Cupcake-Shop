import {
  USERNAME_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  ADDRESS_MAX_LENGTH,
  CATEGORY_MIN_LENGTH,
  CATEGORY_MAX_LENGTH,
  CAKE_NAME_MIN_LENGTH,
  CAKE_NAME_MAX_LENGTH,
  CAKE_MIN_PRICE,
  CAKE_MAX_PRICE,
  CAKE_MAX_STOCK,
} from './constants';

/* Placeholders */
export const USERNAME_EMAIL_PLACEHOLDER = `Please enter your username or email`;
export const USERNAME_PLACEHOLDER = `Please enter your username`;
export const EMAIL_PLACEHOLDER = `Please enter your email`;
export const PASSWORD_PLACEHOLDER = `Please enter your password`;
export const OLD_PASSWORD_PLACEHOLDER = `Please enter your old password`;
export const NEW_PASSWORD_PLACEHOLDER = `Please enter your new password`;
export const CONFIRM_PASSWORD_PLACEHOLDER = `Please confirm your password`;
export const ADDRESS_PLACEHOLDER = `Please enter your address`;
export const RECEIVER_PLACEHOLDER = `Please enter the receiver name`;
export const DEFAULT_PAY_TYPE_PLACEHOLDER = `--- Select your Payment Type ---`;
export const CATEGORY_PLACEHOLDER = `Enter the new category name`;
export const CAKE_NAME_PLACEHOLDER = `Enter the cake name here`;
export const CAKE_DESCRIPTION_PLACEHOLDER = `Enter the cake description here`;
export const CAKE_PRICE_PLACEHOLDER = `Enter the cake price here`;
export const CAKE_STOCK_PLACEHOLDER = `Enter the cake stock here`;
export const DEFAULT_CATEGORY_PLACEHOLDER = `--- Select a Category ---`;

/* Error Feedbacks */
export const USERNAME_EMAIL_REQUIRED = `Username or Email is required`;
export const USERNAME_REQUIRED = `Username is required`;
export const USERNAME_MIN_MESSAGE = `Username should have ${USERNAME_MIN_LENGTH} characters or more`;
export const USERNAME_MAX_MESSAGE = `Username should have ${USERNAME_MAX_LENGTH} characters or less`;
export const EMAIL_REQUIRED = `Email is required`;
export const EMAIL_INVALID = `Email is invalid`;
export const PASSWORD_REQUIRED = `Password is required`;
export const PASSWORD_MIN_MESSAGE = `Password should have ${PASSWORD_MIN_LENGTH} characters or more`;
export const PASSWORD_MAX_MESSAGE = `Password should have ${PASSWORD_MAX_LENGTH} characters or less`;
export const NEW_PASSWORD_REQUIRED = `New password is required`;
export const NEW_PASSWORD_MIN_MESSAGE = `New password should have ${PASSWORD_MIN_LENGTH} characters or more`;
export const NEW_PASSWORD_MAX_MESSAGE = `New password should have ${PASSWORD_MAX_LENGTH} characters or less`;
export const CONFIRM_PASSWORD_REQUIRED = `Confirm Password is required`;
export const CONFIRM_PASSWORD_MISMATCH = `Two passwords must match`;
export const ADDRESS_REQUIRED = `Address is required`;
export const ADDRESS_MAX_MESSAGE = `Address should have ${ADDRESS_MAX_LENGTH} characters or less`;
export const RECEIVER_REQUIRED = `Receiver is required`;
export const RECEIVER_MAX_MESSAGE = `Receiver name should have ${USERNAME_MAX_LENGTH} characters or less`;
export const PAY_TYPE_REQUIRED = `Pay Type is required`;
export const PAY_TYPE_TEST = `Please select your payment type`;
export const CATEGORY_REQUIRED = `Category name is required`;
export const CATEGORY_MIN_MESSAGE = `New category name should have ${CATEGORY_MIN_LENGTH} characters or more`;
export const CATEGORY_MAX_MESSAGE = `New category name should have ${CATEGORY_MAX_LENGTH} characters or less`;
export const IMAGE_SIZE_TOO_LARGE = `Image size is too large. Please change to another one`;
export const CAKE_NAME_REQUIRED = `Cake name is required`;
export const CAKE_NAME_MIN_MESSAGE = `Cake name should have ${CAKE_NAME_MIN_LENGTH} characters or more`;
export const CAKE_NAME_MAX_MESSAGE = `Cake name should have ${CAKE_NAME_MAX_LENGTH} characters or less`;
export const CAKE_DESCRIPTION_REQUIRED = `Cake description is required`;
export const CAKE_PRICE_TEST = `only two decimals are allowed`;
export const CAKE_PRICE_REQUIRED = `Price is required`;
export const CAKE_PRICE_MIN_MESSAGE = `Price for a cake should be at least $${CAKE_MIN_PRICE}`;
export const CAKE_PRICE_MAX_MESSAGE = `Price for a cake should be at most $${CAKE_MAX_PRICE}`;
export const CAKE_STOCK_REQUIRED = `Stock is required`;
export const CAKE_STOCK_MIN_MESSAGE = `Stock cannot be a negative number`;
export const CAKE_STOCK_MAX_MESSAGE = `Stock should be at most ${CAKE_MAX_STOCK}`;
export const CAKE_COVER_REQUIRED = `Cover image is required`;
export const CAKE_IMAGE1_REQUIRED = `One cake needs 3 images, now have 1/3`;
export const CAKE_IMAGE2_REQUIRED = `One cake needs 3 images, now have 2/3 `;
export const CAKE_CATEGORY_REQUIRED = `Category is required`;
export const CAKE_CATEGORY_TEST = `Please select a category`;

/* Success Messages */
export const LOGIN_SUCCESS_MESSAGE = `Log In Successfully!`;

/* Failure Messages */
export const LOGIN_FAILURE_MESSAGE = `Your Username / Email or Password is incorrect. Please try again`;
