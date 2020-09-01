import { combineReducers } from 'redux';
import userReducer from './user';
import adminReducer from './admin';
import categoryReducer from './category';
import cakeReducer from './cake';
import cartReducer from './cart';
import orderReducer from './order';

const rootReducer = combineReducers({
  user: userReducer,
  admin: adminReducer,
  category: categoryReducer,
  cake: cakeReducer,
  cart: cartReducer,
  orders: orderReducer,
});

export default rootReducer;
