export const userSignIn = (userInfo = {}, action) => {
 // console.log(action.type);
  switch (action.type) {
    case "USER_SIGN_IN_REQUEST":
      return { loading: true };

    case "USER_SIGNIN_SUCCESS":
      return {
        loading: false,
        userInfo: action.payload,
      };

      case "USER_SIGN_REQUEST_FAILED":
        return{
          loading:false,
          userInfo:action.payload
        }

    case "SIGN_OUT":
      return {};

    default:
      return userInfo;
  }
};

export const userRegister = (userInfo = {}, action) => {
 // console.log(action.type);
  switch (action.type) {
    case "USER_REGISTER_REQUEST":
      return { loading: true };

    case "USER_REGISTER_SUCCESS":
      return {
        loading: false,
        userInfo: action.payload,
      };

    default:
      return userInfo;
  }
};
