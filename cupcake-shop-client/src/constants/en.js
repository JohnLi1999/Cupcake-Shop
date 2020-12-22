import {
  USERNAME_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  ADDRESS_MAX_LENGTH,
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

/* Error Feedbacks */
export const USERNAME_EMAIL_REQUIRED = `Username or Email is required`;
export const USERNAME_REQUIRED = `Username is required`;
export const USERNAME_MIN_MESSAGE = `Username should have ${USERNAME_MIN_LENGTH} characters or more`;
export const USERNAME_MAX_MESSAGE = `Username should have ${USERNAME_MAX_LENGTH}40 characters or less`;
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

/* Success Messages */
export const LOGIN_SUCCESS_MESSAGE = `Log In Successfully!`;

/* Failure Messages */
export const LOGIN_FAILURE_MESSAGE = `Your Username / Email or Password is incorrect. Please try again`;
