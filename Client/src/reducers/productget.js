const initialState = {
  allProducts: [],
  loading: true,
};

const getAllProduct = (state = initialState, action) => {
    
//   console.log("Action :", action.type);
//   console.log("Data :", action.payload);
  switch (action.type) {
    case "LOAD_PRODUCT":
      return { loading: true };

    case "GET_PRODUCT":
      return { ...state, loading: false, allProducts: action.payload };

    default:
      return state;
  }
};

export default getAllProduct;
