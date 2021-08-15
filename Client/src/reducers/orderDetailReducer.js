export const OrderDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case "LOAD_ORDER_DETAIL":
      return { loading: true };

    case "LOAD_ORDER_DETAIL_SUCCESS":
      return {
        ...state,
        loading:false,
        order: action.payload,
      };

    default:
      return state;
  }
};


export const orderPayReducer = (state={},action) =>{
  switch(action.type){
    case "ORDER_PAY_REQUEST":
      return {loading:true}

      case "ORDER_PAY_SUCCES":{
        return {loading:false,success:true}
      }
      default:return state;
  }
}