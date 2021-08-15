import { combineReducers } from "redux";
import { cartReducer } from "./cartReducer";
import getOneproduct from "./getOneproduct";
import { OrderDetailReducer, orderPayReducer } from "./orderDetailReducer";
import { OrderReducer } from "./orderReducer";
import getAllProduct from "./productget";
import { userRegister, userSignIn } from "./userReducer";

export default combineReducers({
  productList: getAllProduct,
  oneProductList: getOneproduct,
  cart: cartReducer,
  user: userSignIn,
  newUser: userRegister,
  wholeOrderInformation: OrderReducer,
  order: OrderDetailReducer,
  orderPay: orderPayReducer,
});
