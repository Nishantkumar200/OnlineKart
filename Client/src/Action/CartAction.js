import axios from "axios";
import { URL } from "../url";

// For adding the items into the cart
export const addToCart = (productID, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`${URL}/api/products/${productID}`);

  dispatch({
    type: "CART_ADD_ITEM",
    payload: {
      name: data.name,
      image: data.productImage,
      price: data.price,
      countInStock: data.quantity,
      product: data._id,
      qty,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// For Deleting the items from cart

export const removeFromCart = (ID) => (dispatch, getState) => {
  dispatch({
    type: "REMOVE_FROM_CART",
    payload: ID,
  });

  // In local stora , we are  saving the data into the localstorage using redux
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => async (dispatch) => {
  dispatch({
    type: "SAVE_ CART_SHIPPING_ADDRESS",
    payload: data,
  });

  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const paymentMethod = (method) => async (dispatch) => {
  dispatch({
    type: "SAVE_PAYMENT_METHOD",
    payload: method,
  });

  localStorage.setItem("paymentMethod", JSON.stringify(method));
};
