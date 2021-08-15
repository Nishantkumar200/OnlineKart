import axios from "axios";
import { URL } from "../url";

// To fetch all the product on the home page
export const fetchAllProduct = () => async (dispatch) => {
  dispatch({
    type: "LOAD_PRODUCT",
  });

  try {
    const { data } = await axios.get(`${URL}/api/products`);
    dispatch({
      type: "GET_PRODUCT",
      payload: data,
    });
  } catch (error) {
    console.log("Error is Coming from ACtion ", error);
  }
};

// to get the particular product detail
export const getParticularProductDetail = (productID) => async (dispatch) => {
  dispatch({
    type: "GET_ONE_PRODUCT_REQUEST",
    payload: productID,
  });

  try {
    const { data } = await axios.get(
      `${URL}/api/products/${productID}`
    );

    //console.log(data);

    dispatch({
      type: "GET_ONE_PRODUCT_REQUEST_SUCCESS",
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};
