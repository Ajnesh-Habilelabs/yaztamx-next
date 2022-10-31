import * as Constant from '../constant';
import {
  forumCategories,
  getPostList,
  getPostWithComments,
  checkLiked,
  likeAPost,
  createComment,
  createPost,
  updatePost,
  updateComment,
  deletePost,
  deleteComment,
  getUserProfile,
} from './service';
import { clearStorage, getLocalStorage } from '../../redux/localStore';


const checkUnauthorized = (error, dispatch) => {
  if (error.statusCode === 401 && error.error === 'Unauthorized') {
    dispatch(loader(true));
    dispatch(
      snackbar({
        type: 'error',
        open: true,
        message: Constant.UNAUTHORIZED_401,
      })
    );
    // dispatch(logout(navigate));
    setTimeout(() => {
      clearStorage();
      window.location.replace('/login');
      dispatch(loader(false));
    }, 1500);
    return true;
  } else {
    return false;
  }
}


export const loader = (payload) => {
  return {
    type: Constant.SHOW_LOADER,
    payload,
  };
};

export const snackbar = (payload) => {
  return {
    type: Constant.OPEN_SNACKBAR,
    payload,
  };
  // payload = {
  //   type: 'success',
  //   open: true,
  //   message: 'this is my message.'
  // }
};

export const getForumCategories = () => {
  return (dispatch) => {
    dispatch(loader(true));
    forumCategories()
      .then(([response, status]) => {
        console.log('getForumCategories response -->:', response);
        if (status == 201) {
          dispatch({
            type: Constant.FORUM_CATEGORIES,
            payload: response,
          });
        }
      })
      .catch((err) => {
        console.log('getForumCategories err,', err);
        // aleart('API Error');
        dispatch(loader(false));
        // const isUnauthorized = checkUnauthorized(err, dispatch);
        // if (isUnauthorized) return;
        dispatch(
          snackbar({
            type: 'error',
            open: true,
            message: err?.message || err.message[0].messages[0].message || Constant.OOPS_ERROR,
          })
        );
      })
      .finally(() => {
        dispatch(loader(false));
      });
  };
};

export const fetchPostList = (categoryId, limitPerPage, pageNumber) => {
  return (dispatch) => {
    dispatch(loader(true));
    getPostList(categoryId, limitPerPage, pageNumber)
      .then(([response, status]) => {
        console.log('getPostLists response -->:', response);
        if (status == 201) {
          console.log({
            type: Constant.POST_LIST_DATA,
            payload: response,
          });
          dispatch({
            type: Constant.POST_LIST_DATA,
            payload: response,
          });
        }
      })
      .catch((err) => {
        console.log('getPostLists err,', err);
        // aleart('API Error');
        dispatch(loader(false));
        // const isUnauthorized = checkUnauthorized(err, dispatch);
        // if (isUnauthorized) return;
        dispatch(
          snackbar({
            type: 'error',
            open: true,
            message: err?.message || err.message[0].messages[0].message || Constant.OOPS_ERROR,
          })
        );
      })
      .finally(() => {
        dispatch(loader(false));
      });
  };
};

export const fetchPostWithComments = (postId, limitPerPage, pageNumber) => {
  return (dispatch) => {
    dispatch(loader(true));
    getPostWithComments(postId, limitPerPage, pageNumber)
      .then(([response, status]) => {
        console.log('fetchPostWithComments response -->:', response);
        if (status == 201) {
          console.log({
            type: Constant.CURRENT_POST_WITH_COMMENTS,
            payload: response,
          });
          const payload = {
            postId: Number(response.post.postId),
          };
          if (getLocalStorage('Token')) {
            dispatch(fetchIfLikedOrNot(payload));
          }
          dispatch({
            type: Constant.CURRENT_POST_WITH_COMMENTS,
            payload: response,
          });
        }
      })
      .catch((err) => {
        console.log('fetchPostWithComments err,', err);
        // aleart('API Error');
        dispatch(loader(false));
        // const isUnauthorized = checkUnauthorized(err, dispatch);
        // if (isUnauthorized) return;
        dispatch(
          snackbar({
            type: 'error',
            open: true,
            message: err?.message || err.message[0].messages[0].message || Constant.OOPS_ERROR,
          })
        );
      })
      .finally(() => {
        dispatch(loader(false));
      });
  };
};

export const fetchIfLikedOrNot = (payload) => {
  return (dispatch) => {
    // dispatch(loader(true));
    checkLiked(payload)
      .then(([response, status]) => {
        console.log('fetchIfLikedOrNot response -->:', response);
        if (status == 201) {
          console.log({
            type: Constant.POST_LIKE_CHECK,
            payload: response,
          });
          dispatch({
            type: Constant.POST_LIKE_CHECK,
            payload: response?.isLike,
          });
        } else {
          dispatch({
            type: Constant.POST_LIKE_CHECK,
            payload: false,
          });
        }
      })
      .catch((err) => {
        console.log('fetchIfLikedOrNot err,', err);
        // aleart('API Error');
        dispatch(loader(false));
        // const isUnauthorized = checkUnauthorized(err, dispatch);
        // if (isUnauthorized) return;
        dispatch(
          snackbar({
            type: 'error',
            open: true,
            message: err?.message || err.message[0].messages[0].message || Constant.OOPS_ERROR,
          })
        );
      })
      .finally(() => {
        // dispatch(loader(false));
      });
  };
};

export const likeUnlikePost = (payload) => {
  return (dispatch) => {
    dispatch(loader(true));
    likeAPost(payload)
      .then(([response, status]) => {
        console.log('likeUnlikePost response -->:', response);
        if (status == 201) {
          console.log({
            type: Constant.POST_LIKE_UNLIKE,
            payload: response,
          });
          dispatch({
            type: Constant.POST_LIKE_UNLIKE,
            payload: { like: response?.isLike, upvotes: response?.upvotes },
          });
          // aleart(
          //   `You have ${response?.isLike ? 'liked' : 'unliked'} this post.`
          // );
          dispatch(
            snackbar({
              type: 'success',
              open: true,
              message: `You have ${
                response?.isLike ? 'liked' : 'unliked'
              } this post.`,
            })
          );
        }
      })
      .catch((err) => {
        console.log('likeUnlikePost err,', err);
        // aleart('API Error');
        dispatch(loader(false));
        // const isUnauthorized = checkUnauthorized(err, dispatch);
        // if (isUnauthorized) return;
        dispatch(
          snackbar({
            type: 'error',
            open: true,
            message: err?.message || err.message[0].messages[0].message || Constant.OOPS_ERROR,
          })
        );
      })
      .finally(() => {
        dispatch(loader(false));
      });
  };
};

export const postComment = (payload, setOpen) => {
  return (dispatch) => {
    setOpen(false);
    dispatch(loader(true));
    createComment(payload)
      .then(([response, status]) => {
        console.log('postComment response -->:', response);
        if (status == 201) {
          console.log({
            type: Constant.CREATE_COMMENT,
            payload: response,
          });
          dispatch({
            type: Constant.CREATE_COMMENT,
            payload: response,
          });
          // aleart('You commented.');
          dispatch(fetchPostWithComments(response.postId, 5, 1));
          dispatch(
            snackbar({
              type: 'success',
              open: true,
              message: 'You commented.',
            })
          );
        }
      })
      .catch((err) => {
        console.log('postComment err,', err);
        // aleart('API Error');
        dispatch(loader(false));
        // const isUnauthorized = checkUnauthorized(err, dispatch);
        // if (isUnauthorized) return;
        dispatch(
          snackbar({
            type: 'error',
            open: true,
            message: err?.message || err.message[0].messages[0].message || Constant.OOPS_ERROR,
          })
        );
      })
      .finally(() => {
        dispatch(loader(false));
      });
  };
};

export const postNewPost = (payload, setOpen) => {
  return (dispatch) => {
    setOpen(false);
    dispatch(loader(true));
    createPost(payload)
      .then(([response, status]) => {
        console.log('postNewPost response -->:', response);
        if (status == 201) {
          console.log({
            type: Constant.CREATE_POST,
            payload: response,
          });
          dispatch({
            type: Constant.CREATE_POST,
            payload: response,
          });
          // aleart('New Post Created.');
          dispatch(fetchPostList(payload.categoryId, 5, 1));
          dispatch(
            snackbar({
              type: 'success',
              open: true,
              message: 'New post created.',
            })
          );
        }
      })
      .catch((err) => {
        console.log('postNewPost err,', err);
        // aleart('API Error');
        dispatch(loader(false));
        // const isUnauthorized = checkUnauthorized(err, dispatch);
        // if (isUnauthorized) return;
        dispatch(
          snackbar({
            type: 'error',
            open: true,
            message: err?.message || err.message[0].messages[0].message || Constant.OOPS_ERROR,
          })
        );
      })
      .finally(() => {
        dispatch(loader(false));
      });
  };
};

export const updateThisPost = (postId, payload, setOpen) => {
  return (dispatch) => {
    setOpen(false);
    dispatch(loader(true));
    updatePost(postId, payload)
      .then(([response, status]) => {
        console.log('updateThisPost response -->:', response);
        if (status == 201) {
          console.log({
            type: Constant.EDIT_POST,
            payload: response,
          });
          dispatch({
            type: Constant.EDIT_POST,
            payload: response,
          });
          // aleart('Post Edited !');
          dispatch(fetchPostWithComments(response.id, 5, 1));
          dispatch(
            snackbar({
              type: 'success',
              open: true,
              message: 'Post Edited.',
            })
          );
        }
      })
      .catch((err) => {
        console.log('updateThisPost err,', err);
        dispatch(loader(false));
        // const isUnauthorized = checkUnauthorized(err, dispatch);
        // if (isUnauthorized) return;
        dispatch(
          snackbar({
            type: 'error',
            open: true,
            message: err?.message || err.message[0].messages[0].message || Constant.OOPS_ERROR,
          })
        );
        // aleart('API Error');
      })
      .finally(() => {
        dispatch(loader(false));
      });
  };
};

export const updateThisComment = (commentId, payload, setOpen, postId) => {
  return (dispatch) => {
    setOpen(false);
    dispatch(loader(true));
    updateComment(commentId, payload)
      .then(([response, status]) => {
        console.log('updateThisComment response -->:', response);
        if (status == 201) {
          console.log({
            type: Constant.EDIT_COMMENT,
            payload: response,
          });
          dispatch({
            type: Constant.EDIT_COMMENT,
            payload: response,
          });
          // aleart('Comment Edited !');
          dispatch(fetchPostWithComments(postId, 5, 1));
          dispatch(
            snackbar({
              type: 'success',
              open: true,
              message: 'Comment Edited.',
            })
          );
        }
      })
      .catch((err) => {
        console.log('updateThisComment err,', err);
        dispatch(loader(false));
        // const isUnauthorized = checkUnauthorized(err, dispatch);
        // if (isUnauthorized) return;
        dispatch(
          snackbar({
            type: 'error',
            open: true,
            message: err?.message || err.message[0].messages[0].message || Constant.OOPS_ERROR,
          })
        );
        // aleart('API Error');
      })
      .finally(() => {
        dispatch(loader(false));
      });
  };
};

export const deleteThisPost = (postId, categoryId, navigate) => {
  return (dispatch) => {
    dispatch(loader(true));
    deletePost(postId)
      .then(([response, status]) => {
        console.log('deleteThisPost response -->:', response);
        if (status == 201) {
          console.log({
            type: Constant.DELETE_POST,
            payload: response,
          });
          dispatch({
            type: Constant.DELETE_POST,
            payload: response,
          });
          navigate(`/discussion`, {
            state: { categoryId: categoryId },
            replace: true,
          });
          // aleart('Post Deleted !');
          dispatch(
            snackbar({
              type: 'success',
              open: true,
              message: 'Post deleted.',
            })
          );
        }
      })
      .catch((err) => {
        console.log('deleteThisPost err,', err);
        // aleart('API Error');
        dispatch(loader(false));
        // const isUnauthorized = checkUnauthorized(err, dispatch);
        // if (isUnauthorized) return;
        dispatch(
          snackbar({
            type: 'error',
            open: true,
            message: err?.message || err.message[0].messages[0].message || Constant.OOPS_ERROR,
          })
        );
      })
      .finally(() => {
        dispatch(loader(false));
      });
  };
};

export const deleteThisComment = (commentId, postId) => {
  return (dispatch) => {
    dispatch(loader(true));
    deleteComment(commentId)
      .then(([response, status]) => {
        console.log('deleteThisComment response -->:', response);
        if (status == 201) {
          console.log({
            type: Constant.DELETE_COMMENT,
            payload: response,
          });
          dispatch({
            type: Constant.DELETE_COMMENT,
            payload: response,
          });
          // aleart('Comment Deleted !');
          dispatch(fetchPostWithComments(postId, 5, 1));
          dispatch(
            snackbar({
              type: 'success',
              open: true,
              message: 'Comment deleted.',
            })
          );
        }
      })
      .catch((err) => {
        console.log('deleteThisComment err,', err);
        // aleart('API Error');
        dispatch(loader(false));
        // const isUnauthorized = checkUnauthorized(err, dispatch);
        // if (isUnauthorized) return;
        dispatch(
          snackbar({
            type: 'error',
            open: true,
            message: err?.message || err.message[0].messages[0].message || Constant.OOPS_ERROR,
          })
        );
      })
      .finally(() => {
        dispatch(loader(false));
      });
  };
};

export const getUserProfileForums = (userId) => {
  return (dispatch) => {
    dispatch(loader(true));
    getUserProfile(userId)
      .then(([response, status]) => {
        console.log('getUserProfileForums response -->:', response);
        if (status == 201) {
          console.log({
            type: Constant.USER_PROFILE,
            payload: response,
          });
          dispatch({
            type: Constant.USER_PROFILE,
            payload: response,
          });
        }
      })
      .catch((err) => {
        console.log('getUserProfileForums err,', err);
        // aleart('API Error');
        dispatch(loader(false));
        // const isUnauthorized = checkUnauthorized(err, dispatch);
        // if (isUnauthorized) return;
        dispatch(
          snackbar({
            type: 'error',
            open: true,
            message: err?.message || err.message[0].messages[0].message || Constant.OOPS_ERROR,
          })
        );
      })
      .finally(() => {
        dispatch(loader(false));
      });
  };
};
