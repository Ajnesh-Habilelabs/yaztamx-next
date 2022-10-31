import * as Constant from '../constant';

const initialState = {
  categories: [],
  postListData: {},
  currentPostWithComments: {},
  loader: false,
  snackbar: {},
};

const forums = (state = initialState, action) => {
  switch (action.type) {
    case Constant.OPEN_SNACKBAR:
      return {
        ...state,
        snackbar: action.payload,
      };
    case Constant.USER_PROFILE:
      return {
        ...state,
        currentUserProfile: action.payload,
      };
    case Constant.FORUM_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case Constant.POST_LIST_DATA:
      return {
        ...state,
        postListData: action.payload,
      };
    case Constant.CURRENT_POST_WITH_COMMENTS:
      return {
        ...state,
        currentPostWithComments: action.payload,
      };
    case Constant.POST_LIKE_CHECK:
      return {
        ...state,
        currentPostWithComments: {
          ...state.currentPostWithComments,
          post: {
            ...state.currentPostWithComments.post,
            isLiked: action.payload
          }
        }
      }
    case Constant.POST_LIKE_UNLIKE:
      return {
        ...state,
        currentPostWithComments: {
          ...state.currentPostWithComments,
          post: {
            ...state.currentPostWithComments.post,
            isLiked: action?.payload?.like,
            upvotes: action?.payload?.upvotes
          }
        }
      }
    case Constant.CREATE_COMMENT:
      return {
        ...state,
      }
    case Constant.CREATE_POST:
      return {
        ...state,
      }
    case Constant.EDIT_POST:
      return {
        ...state,
      }
    case Constant.EDIT_COMMENT:
      return {
        ...state,
      }
    case Constant.DELETE_POST:
      return {
        ...state,
      }
    case Constant.DELETE_COMMENT:
      return {
        ...state,
      }
    default:
      return state;
  }
};

export default forums;
