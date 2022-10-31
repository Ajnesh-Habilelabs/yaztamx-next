import * as Constant from "../constant";

const initialState = {
  snackbar: {},
  user: [],
  clientUser: null,
  loader: false,
  userToken: "",
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case Constant.OPEN_SNACKBAR:
      return {
        ...state,
        snackbar: action.payload,
      };
    case Constant.USER_LOGIN:
      return {
        ...state,
        user: action.payload,
      };
    case Constant.SAVE_CLIENT_DATA:
      return {
        ...state,
        user: action.payload,
      };
    case Constant.USER_CLIENT_LOGIN:
      return {
        ...state,
        clientUser: action.payload,
      };
    case Constant.SHOW_LOADER:
      return {
        ...state,
        loader: action.payload,
      };
    case Constant.SAVE_STORE_TOKEN:
      return {
        ...state,
        userToken: action.payload,
      };
    case Constant.USER_LOGOUT:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default auth;
