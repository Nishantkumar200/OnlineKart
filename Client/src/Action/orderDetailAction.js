import axios from "axios";
import { URL } from "../url";

export const orderDetail = (orderID) => async (dispatch, getState) => {
  dispatch({
    type: "LOAD_ORDER_DETAIL",
    payload: orderID,
  });

  try {
    const {
      user: { userInfo },
    } = getState();

    const { data } = await axios.get(
      `${URL}/api/order/${orderID}`,
      {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      }
    );

    dispatch({
      type: "LOAD_ORDER_DETAIL_SUCCESS",
      payload: data,
    });
  } catch (error) {
    console.log(error, "Coming from orderDetailPage");
  }
};
