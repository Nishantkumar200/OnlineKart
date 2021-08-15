export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case "CART_ADD_ITEM":
      const item = action.payload;
      console.log("cartReducer", item);
      const existItem = state.cartItems.find((x) => x.product === item.product);
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };

    case "SAVE_ CART_SHIPPING_ADDRESS":
      return { ...state, shippingAddress: action.payload };

    case "SAVE_PAYMENT_METHOD":
      return { ...state, selectedPaymentMethod: action.payload };

    case "CART_EMPTY":
      return { ...state, cartItmes: [ ] };
    default:
      return state;
  }
};
