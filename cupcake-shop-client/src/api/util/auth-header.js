import { AUTHENTICATION_TOKEN } from '../../constants/constants';

const authHeader = () => {
  const token = localStorage.getItem(AUTHENTICATION_TOKEN);
  return token ? { Authorization: token } : {};
};

export default authHeader;
