import { IS_AUTHENTICATED, IS_ADMIN } from '../constants/constants';

export const isAuthenticated = () => localStorage.getItem(IS_AUTHENTICATED);

export const isAdmin = () => localStorage.getItem(IS_ADMIN);
