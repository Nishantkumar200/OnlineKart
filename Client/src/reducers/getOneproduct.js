const initialState = {
  loading: true,
  product: {},
};

const getOneproduct = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ONE_PRODUCT_REQUEST":
      return { loading: true };

    case "GET_ONE_PRODUCT_REQUEST_SUCCESS":
      return {
        ...state,
        loading: false,
        product: action.payload,
      };

    default:
      return state;
  }
};

export default getOneproduct;
