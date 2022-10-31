import * as Constant from '../constant';

const initialState = {
  loader: false,
  snackbar: {},
  photoId: {},
  reference: {},
  resume: {},
  backgroundCheck: {},
  testimonialList: [],
  serviceList: [],
  faqList: [],
  policyContent: {},
  userChatList: [],
  feedbackList: {},
  userChatRoom: [],
  userNotifications: [],
  userNotificationCounter: 0,
  language: '',
};

const core = (state = initialState, action) => {
  switch (action.type) {
    case Constant.OPEN_SNACKBAR:
      return {
        ...state,
        snackbar: action.payload,
      };
    case Constant.SHOW_LOADER:
      return {
        ...state,
        loader: action.payload,
      };
    case Constant.UPLOAD_PHOTO_ID:
      return {
        ...state,
        photoId: action.payload,
      };
    case Constant.UPLOAD_REFERNCE:
      return {
        ...state,
        reference: action.payload,
      };
    case Constant.UPLOAD_RESUME:
      return {
        ...state,
        resume: action.payload,
      };
    case Constant.UPLOAD_BACKGROUND_CHECK:
      return {
        ...state,
        backgroundCheck: action.payload,
      };
    case Constant.TESTIMONIAL_LIST:
      return {
        ...state,
        testimonialList: action.payload,
      };
    case Constant.SERVICE_LIST:
      return {
        ...state,
        serviceList: action.payload,
      };
    case Constant.FAQ_LIST:
      return {
        ...state,
        faqList: action.payload,
      };
    case Constant.POLICY_CONTENT:
      return {
        ...state,
        policyContent: action.payload,
      };
    case Constant.USER_CHAT_LIST:
      return {
        ...state,
        userChatList: action.payload,
      };
    case Constant.USER_ROOM_CHATS:
      return {
        ...state,
        userChatRoom: action.payload,
      };
    case Constant.FEEDBACK_LIST:
      return {
        ...state,
        feedbackList: action.payload,
      };
    case Constant.NOTIFICATION_LIST:
      return {
        ...state,
        userNotifications: action.payload,
      };
    case Constant.CHANGE_LANGUAGE:
      return {
        ...state,
        language: action.payload,
      };
    case Constant.NOTIFICATION_UPDATE_READ:
      {
        const updatedState = state;
        updatedState.userNotifications[action.index].isRead = true;
        return updatedState

      }
      // return {
      //   ...state,
      //   // userNotifications: updatedUserNotifications
      //   userNotifications: [
      //     ...state.userNotifications,
      //     {
      //       ...state.userNotifications[action.index],
      //       isRead: true,
      //     },
      //   ],
      // };
    case Constant.NOTIFICATION_COUNTER:
      return {
        ...state,
        userNotificationCounter: action.payload,
      };
    default:
      return state;
  }
};

export default core;
