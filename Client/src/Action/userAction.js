import axios from "axios";
import { URL } from "../url";

export const USER_SIGN = (email, password) => async (dispatch) => {
  dispatch({
    type: "USER_SIGN_IN_REQUEST",
    payload: { email, password },
  });

  try {
    const { data } = await axios.post(`${URL}/api/users/signin`, {
      email,
      password,
    });
    console.log("User Action", data);

    dispatch({
      type: "USER_SIGNIN_SUCCESS",
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: "USER_SIGN_REQUEST_FAILED",
      payload: error.message,
    });
  }
};

export const SIGNOUT = () => async (dispatch, getState) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("cartItems");
  localStorage.removeItem("shippingAddress");
  localStorage.removeItem("paymentMethod");
  dispatch({ type: "SIGN_OUT" });
};

export const register_user = (name, email, password) => async (dispatch) => {
  dispatch({
    type: "USER_REGISTER_REQUEST",
    payload: { name, email, password },
  });

  try {
    const { data } = await axios.post(`${URL}/api/users/register`, {
      name: name,
      email: email,
      password: password,
    });

    // console.log("signu",data)

    dispatch({
      type: "USER_REGISTER_SUCCESS",
      payload: data,
    });

    dispatch({
      type: "USER_SIGNIN_SUCCESS",
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};
