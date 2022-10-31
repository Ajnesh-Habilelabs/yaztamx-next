import * as Constant from '../constant';
import {
  testimonialList,
  uploadDocuments,
  servicesList,
  getFaq,
  getContent,
  generalFeedback,
  fetchChatUserList,
  contactUs,
  fetchFeedbackList,
  giveUserFeedback,
  fetchChatRoom,
  fetchNotifications,
  fetchNotificationCounter,
  updateIsReadNotifications
} from './service';
import { clearStorage, getLocalStorage } from '../../../../../libs/store/src/redux/localStore';
import { logout } from '../auth/action';
// import { alert } from '../../../ui/src/utils/flashMessage';

export const loader = (payload) => {
  return {
    type: Constant.SHOW_LOADER,
    payload,
  };
};

export const changeLanguage = (lang) => {
  return {
    type: Constant.CHANGE_LANGUAGE,
    payload: lang,
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
    setTimeout(() => {
      clearStorage();
      // window.location.replace('/login');
      dispatch(loader(false));
    }, 1500);
    // dispatch(logout());
    return true;
  } else {
    return false;
  }
}

export const testimonialListApi = () => {
  return (dispatch) => {
    dispatch(loader(true));
    testimonialList()
      .then(([response, status]) => {
        if (status == 200) {
          dispatch({
            type: Constant.TESTIMONIAL_LIST,
            payload: response,
          });
        }
        dispatch(loader(false));
      })
      .catch((err) => {
        console.log('testimonial err,', err);
        dispatch(loader(false));
        // aleart(err);
        const isUnauthorized = checkUnauthorized(err, dispatch);
        if (isUnauthorized) return;
        dispatch(
          snackbar({
            type: 'error',
            open: true,
            message: err ? err : Constant.INTERNET_ERROR,
          })
        );
      })
      .finally(() => {
        dispatch(loader(false));
      });
  };
};

export const profileDetailApi = () => {
  return (dispatch) => {
    dispatch(loader(true));
    profileDetailApi()
      .then(([response, status]) => {
        if (status == 200) {
          dispatch({
            type: Constant.TESTIMONIAL_LIST,
            payload: response,
          });
        }
        dispatch(loader(false));
      })
      .catch((err) => {
        console.log('profileDetailApi err,', err);
        // aleart(err);
        dispatch(loader(false));
        const isUnauthorized = checkUnauthorized(err, dispatch);
        if (isUnauthorized) return;
        dispatch(
          snackbar({
            type: 'error',
            open: true,
            message: err ? err : Constant.OOPS_ERROR,
          })
        );
      })
      .finally(() => {
        dispatch(loader(false));
      });
  };
};

export const uploadImage = (data, id) => {
  return (dispatch) => {
    dispatch(loader(true));
    uploadDocuments(data, id)
      .then(([response, status]) => {
        if (status === 201) {
          // aleart('Your profile Image uploaded successfully!');
          dispatch(loader(false));
          dispatch(
            snackbar({
              type: 'success',
              open: true,
              message: 'Your profile image uploaded successfully.',
            })
          );
          //   navigateScreen('Congratulation');
        }
        dispatch(loader(false));
      })
      .catch((err) => {
        dispatch(loader(false));
        const isUnauthorized = checkUnauthorized(err, dispatch);
        if (isUnauthorized) return;
        // aleart(err);
        dispatch(
          snackbar({
            type: 'error',
            open: true,
            message: err ? err : Constant.OOPS_ERROR,
          })
        );
      })
      .finally(() => {
        dispatch(loader(false));
      });
  };
};

export const uploadFile = (data, id, fileType) => {
  return (dispatch) => {
    dispatch(loader(true));
    uploadDocuments(data, id)
      .then(([response, status]) => {
        if (status === 201) {
          // aleart('Your file uploaded successfully!');
          dispatch(loader(false));
          dispatch(
            snackbar({
              type: 'success',
              open: true,
              message: 'Your file uploaded successfully.',
            })
          );
        }
        dispatch(loader(false));
        if (fileType == 'photoId') {
          dispatch({
            type: Constant.UPLOAD_PHOTO_ID,
            payload: response,
          });
        } else if (fileType == 'reference') {
          dispatch({
            type: Constant.UPLOAD_REFERNCE,
            payload: response,
          });
        } else if (fileType == 'resume') {
          dispatch({
            type: Constant.UPLOAD_RESUME,
            payload: response,
          });
        } else {
          dispatch({
            type: Constant.UPLOAD_BACKGROUND_CHECK,
            payload: response,
          });
        }
        dispatch(loader(false));
      })
      .catch((err) => {
        // aleart(err);
        dispatch(loader(false));
        const isUnauthorized = checkUnauthorized(err, dispatch);
        if (isUnauthorized) return;
        dispatch(
          snackbar({
            type: 'error',
            open: true,
            message: err ? err : Constant.OOPS_ERROR,
          })
        );
      })
      .finally(() => {
        dispatch(loader(false));
      });
  };
};

export const deleteFile = (data, id, fileType) => {
  return (dispatch) => {
    dispatch(loader(true));
    uploadDocuments(data, id)
      .then(([response, status]) => {
        if (status === 201) {
          // aleart('Your file uploaded successfully!');
          dispatch(loader(false));
          dispatch(
            snackbar({
              type: 'success',
              open: true,
              message: 'Your file uploaded successfully.',
            })
          );
        }
        dispatch(loader(false));
        if (fileType == 'photoId') {
          dispatch({
            type: Constant.UPLOAD_PHOTO_ID,
            payload: response,
          });
        } else if (fileType == 'reference') {
          dispatch({
            type: Constant.UPLOAD_REFERNCE,
            payload: response,
          });
        } else if (fileType == 'resume') {
          dispatch({
            type: Constant.UPLOAD_RESUME,
            payload: response,
          });
        } else {
          dispatch({
            type: Constant.UPLOAD_BACKGROUND_CHECK,
            payload: response,
          });
        }
        dispatch(loader(false));
      })
      .catch((err) => {
        // aleart(err);
        dispatch(loader(false));
        const isUnauthorized = checkUnauthorized(err, dispatch);
        if (isUnauthorized) return;
        dispatch(
          snackbar({
            type: 'error',
            open: true,
            message: err ? err : Constant.OOPS_ERROR,
          })
        );
      })
      .finally(() => {
        dispatch(loader(false));
      });
  };
};

export const getServiceList = () => {
  return (dispatch) => {
    dispatch(loader(true));
    servicesList()
      .then(([response, status]) => {
        if (status == 200) {
          dispatch({
            type: Constant.SERVICE_LIST,
            payload: response,
          });
        }
        dispatch(loader(false));
      })
      .catch((err) => {
        dispatch(loader(false));
        console.log('getServiceList err,', err);
        // aleart('API Error!');
        const isUnauthorized = checkUnauthorized(err, dispatch);
        if (isUnauthorized) return;
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

export const getFaqContent = (locale) => {
  return (dispatch) => {
    dispatch(loader(true));
    const userRole = getLocalStorage('userData')?.userRole || 'CUSTOMER';
    getFaq(userRole, locale)
      .then(([response, status]) => {
        if (status == 201) {
          dispatch({
            type: Constant.FAQ_LIST,
            payload: response,
          });
        }
        dispatch(loader(false));
      })
      .catch((err) => {
        dispatch(loader(false));
        console.log('getFaqContent err,', err);
        // aleart('API Error!');
        const isUnauthorized = checkUnauthorized(err, dispatch);
        if (isUnauthorized) return;
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

export const getPolicyContent = (key, locale) => {
  return (dispatch) => {
    dispatch(loader(true));
    const userRole = getLocalStorage('userData')?.userRole || 'CUSTOMER';
    getContent(key, userRole, locale)
      .then(([response, status]) => {
        if (status == 201) {
          dispatch({
            type: Constant.POLICY_CONTENT,
            payload: response,
          });
        }
        dispatch(loader(false));
      })
      .catch((err) => {
        dispatch(loader(false));
        console.log('getPolicyContent err,', err);
        // aleart('API Error!');
        const isUnauthorized = checkUnauthorized(err, dispatch);
        if (isUnauthorized) return;
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

export const sendGeneralFeedback = (data) => {
  return (dispatch) => {
    dispatch(loader(true));
    generalFeedback(data)
      .then(([response, status]) => {
        if (status == 201) {
          // aleart('Your feedback is highly valuable to us, thank you!');
          dispatch(loader(false));
          dispatch(
            snackbar({
              type: 'success',
              open: true,
              message: 'Your feedback is highly valuable to us, thank you!',
            })
          );
        }
        dispatch(loader(false));
      })
      .catch((err) => {
        dispatch(loader(false));
        console.log('sendGeneralFeedback err,', err);
        // aleart('API Error!');
        const isUnauthorized = checkUnauthorized(err, dispatch);
        if (isUnauthorized) return;
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

export const getChatUserList = (data) => {
  return (dispatch) => {
    dispatch(loader(true));
    fetchChatUserList(data)
      .then(([response, status]) => {
        if (status == 200) {
          dispatch({
            type: Constant.USER_CHAT_LIST,
            payload: response,
          });
          // aleart('Success!');
        }
        dispatch(loader(false));
      })
      .catch((err) => {
        dispatch(loader(false));
        console.log('getChatUserList err,', err);
        const isUnauthorized = checkUnauthorized(err, dispatch);
        if (isUnauthorized) return;
        dispatch(
          snackbar({
            type: 'error',
            open: true,
            message: err?.message || err.message[0].messages[0].message || Constant.OOPS_ERROR,
          })
        );
        // aleart('API Error!');
      })
      .finally(() => {
        dispatch(loader(false));
      });
  };
};

export const getChatRoom = (roomId) => {
  return (dispatch) => {
    dispatch(loader(true));
    fetchChatRoom(roomId)
      .then(([response, status]) => {
        if (status == 200) {
          console.log({
            type: Constant.USER_ROOM_CHATS,
            payload: response,
          })
          dispatch({
            type: Constant.USER_ROOM_CHATS,
            payload: response.length ? response : [{}],
          });
          // alert('Success!');
        }
        dispatch(loader(false));
      })
      .catch((err) => {
        dispatch(loader(false));
        console.log('getChatRoom err,', err);
        const isUnauthorized = checkUnauthorized(err, dispatch);
        if (isUnauthorized) return;
        dispatch(
          snackbar({
            type: 'error',
            open: true,
            message: err?.message || err.message[0].messages[0].message || Constant.OOPS_ERROR,
          })
        );
        // aleart('API Error!');
      })
      .finally(() => {
        dispatch(loader(false));
      });
  };
};

export const contactAdmin = (data) => {
  return (dispatch) => {
    dispatch(loader(true));
    contactUs(data)
      .then(([response, status]) => {
        // console.log('response :', response);
        if (status == 200) {
          // aleart('We have received your Query, Thanks!');
          dispatch(loader(false));
          dispatch(
            snackbar({
              type: 'success',
              open: true,
              message: 'We have received your query, Thanks.',
            })
          );
        }
        dispatch(loader(false));
      })
      .catch((err) => {
        dispatch(loader(false));
        console.log('err,', err);
        const isUnauthorized = checkUnauthorized(err, dispatch);
        if (isUnauthorized) return;
        dispatch(
          snackbar({
            type: 'error',
            open: true,
            message: err?.message || err.message[0].messages[0].message || Constant.OOPS_ERROR,
          })
        );
        // aleart('API Error!');
      })
      .finally(() => {
        dispatch(loader(false));
      });
  };
};

export const getFeedbackList = () => {
  return (dispatch) => {
    dispatch(loader(true));
    fetchFeedbackList()
      .then(([response, status]) => {
        console.log('getFeedbackList response -->:', response);
        if (status == 201) {
          dispatch({
            type: Constant.FEEDBACK_LIST,
            payload: response,
          });
        }
        dispatch(loader(false));
      })
      .catch((err) => {
        console.log('getFeedbackList err,', err);
        dispatch(loader(false));
        const isUnauthorized = checkUnauthorized(err, dispatch);
        if (isUnauthorized) return;
        dispatch(
          snackbar({
            type: 'error',
            open: true,
            message: err?.message || err.message[0].messages[0].message || Constant.OOPS_ERROR,
          })
        );
        // aleart('GetFeedbackList API Error');
      })
      .finally(() => {
        dispatch(loader(false));
      })
  };
};

export const giveFeedback = (data, navigate) => {
  return (dispatch) => {
    dispatch(loader(true));
    giveUserFeedback(data)
      .then(([response, status]) => {
        // console.log('giveFeedback response -->:', response);
        if (status == 201) {
          dispatch(loader(false));

          dispatch(
            snackbar({
              type: 'success',
              open: true,
              message: 'Your Feedback has been submitted, Thanks!',
            })
          );
          navigate('/pending-offers');
          // aleart('Your Feedback has been submitted, Thanks!');
        }
        dispatch(loader(false));
      })
      .catch((err) => {
        console.log('giveFeedback error,', err);
        console.log('giveFeedback err,', err?.message[0].messages);
        dispatch(loader(false));
        const isUnauthorized = checkUnauthorized(err, dispatch);
        if (isUnauthorized) return;
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
      })
  };
};

export const getNotifications = () => {
  return (dispatch) => {
    dispatch(loader(true));
    fetchNotifications()
      .then(([response, status]) => {
        console.log('getNotifications response -->:', response);
        if (status == 201) {
          dispatch({
            type: Constant.NOTIFICATION_LIST,
            payload: response,
          });
        }
        dispatch(loader(false));
      })
      .catch((err) => {
        console.log('getNotifications error,', err);
        // console.log('giveFeedback err,', err?.message[0].messages);
        // aleart('API Error');
        const isUnauthorized = checkUnauthorized(err, dispatch);
        if (isUnauthorized) return;
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
      })
  };
};

export const getNotificationCounter = () => {
  return (dispatch) => {
    // dispatch(loader(true));
    fetchNotificationCounter()
      .then(([response, status]) => {
        console.log('getNotificationCounter response -->:', response);
        if (status == 201) {
          dispatch({
            type: Constant.NOTIFICATION_COUNTER,
            payload: response,
          });
        }
        dispatch(loader(false));
      })
      .catch((err) => {
        console.log('getNotificationCounter error,', err);
        // console.log('giveFeedback err,', err?.message[0].messages);
        // aleart('API Error');
        const isUnauthorized = checkUnauthorized(err, dispatch);
        if (isUnauthorized) return;
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
      })
  };
};

export const postIsReadNotifications = (notificationId, payload, refreshScreen , setRefreshScreen) => {
  return (dispatch) => {
    // dispatch(loader(true));
    updateIsReadNotifications(notificationId)
      .then(([response, status]) => {
        console.log('postIsReadNotifications response -->:', response);
        if (status == 201) {
          const newPayload = payload
          const indexOfUpdatedObject = newPayload.findIndex((obj) => obj.id === notificationId)
          // console.log("indexOfUpdatedObject", indexOfUpdatedObject);
          // console.log("newPayload[indexOfUpdatedObject]", newPayload[indexOfUpdatedObject])
          newPayload[indexOfUpdatedObject].isRead = true;
          // console.log("newPayload[indexOfUpdatedObject]", newPayload[indexOfUpdatedObject])
          dispatch({
            type: Constant.NOTIFICATION_UPDATE_READ,
            payload: newPayload,
            index: indexOfUpdatedObject
          });
          console.log({
            type: Constant.NOTIFICATION_UPDATE_READ,
            payload: newPayload,
            index: indexOfUpdatedObject
          })
          dispatch(getNotificationCounter());
          setRefreshScreen(!refreshScreen);
        }
        dispatch(loader(false));
      })
      .catch((err) => {
        console.log('postIsReadNotifications error,', err);
        // console.log('giveFeedback err,', err?.message[0].messages);
        // aleart('API Error');
        const isUnauthorized = checkUnauthorized(err, dispatch);
        if (isUnauthorized) return;
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
      })
  };
};
