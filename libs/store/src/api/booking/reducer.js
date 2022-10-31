import * as Constant from '../constant';

const initialState = {
  snackbar: {},
  providerDetail: [],
  providerList: [],
  loader: false,
  favoriteProvider: [],
  couponCode: {},
  blockedUserList: [],
  getBlockedClient: [],
  blockedClient: [],
  blockedProvider: [],
  offerDetails: {},
  upcomingBookings: [],
  pastBookings: [],
  pendingBookings: [],
  cancelledBookings: [],
  arrangement: '',
  searchId: 0,
};

const clientBooking = (state = initialState, action) => {
  switch (action.type) {
    case Constant.OPEN_SNACKBAR:
      return {
        ...state,
        snackbar: action.payload,
      };
    case Constant.PROVIDER_DETAIL:
      return {
        ...state,
        providerDetail: action.payload,
      };
    case Constant.PROVIDER_LIST:
      return {
        ...state,
        providerList: action.payload,
        searchId: action.searchId
      };
    case Constant.SET_IS_FAVOURITE:
      // const indexOfLikedPro = state.providerList.findIndex(provider => provider.id === action.payload.favourite_userid);
      return {
        ...state,
        providerList: action.payload,
      };
    case Constant.FAVORITE_PROVIDER:
      return {
        ...state,
        favoriteProvider: action.payload,
      };
    case Constant.COUPON_CODE:
      return {
        ...state,
        couponCode: action.payload,
      };
    case Constant.GET_BLOCKED_CLIENT:
      return {
        ...state,
        getBlockedClient: action.payload,
      };
    case Constant.GET_BLOCKED_PROVIDER:
      return {
        ...state,
        blockedUserList: action.payload,
      };
    case Constant.BLOCKED_CLIENT:
      return {
        ...state,
        blockedClient: action.payload,
      };
    case Constant.BLOCKED_PROVIDER:
      return {
        ...state,
        blockedProvider: action.payload,
      };
    case Constant.SET_OFFER_DETAILS:
      return {
        ...state,
        offerDetails: action.payload,
      };
    case Constant.SHOW_LOADER:
      return {
        ...state,
        loader: action.payload,
      };

    case Constant.UPCOMING_BOOKINGS:
      return {
        ...state,
        upcomingBookings: action.payload,
      };

    case Constant.PAST_BOOKINGS:
      return {
        ...state,
        pastBookings: action.payload,
      };

    case Constant.PENDING_BOOKINGS:
      return {
        ...state,
        pendingBookings: action.payload,
      };

    case Constant.CANCELLED_BOOKINGS:
      return {
        ...state,
        cancelledBookings: action.payload,
      };

    case Constant.SET_ARRANGEMENT:
      return {
        ...state,
        arrangement: action.payload,
      };
    default:
      return state;
  }
};

export default clientBooking;
