import axios from "axios";
import { URL } from "../url";
export const createOrder = (order) => async (dispatch, getState) => {
  dispatch({ type: "ORDER_REQUEST", payload: order });

  console.log(order);

  try {
    const {
      user: { userInfo },
    } = getState();
    const { data } = await axios.post(
      `${URL}/api/order`,
      order,
      {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      }
    );

    console.log(data);

    dispatch({
      type: "ORDER_REQUEST_SUCCESS",
      payload: data,
    });

    dispatch({ type: "EMPTY_CART" });
    localStorage.removeItem("cartItems");
  } catch (error) {
    console.log(error);
  }
};

export const orderPay = (order, paymentResult) => async (
  dispatch,
  getState
) => {
  console.log("Order has to ", order);
  console.log("Payment Result", paymentResult);
  dispatch({
    type: "ORDER_PAY_REQUEST",
    payload: { order, paymentResult },
  });

  console.log("Order has to ", order);
  console.log("Payment Result", paymentResult);

  try {
    const {
      user: { userInfo },
    } = getState();

    // for updating into the database about the payment

    const { data } = axios.put(
      `http://localhost:5000/api/order/${order._id}`,
      paymentResult,
      {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      }
    );

    dispatch({ type: "ORDER_PAY_SUCCESS", payload: data });
  } catch (error) {
    console.log("Error after payment", error);
  }
};
