export const OrderReducer = (state = {}, action) => {
  switch (action.type) {
    case "ORDER_REQUEST":
      return { loading: true };
    case "ORDER_REQUEST_SUCCESS":
      return { loading: false, success: true, orderItems: action.payload };

    default:
      return state;
  }
};
