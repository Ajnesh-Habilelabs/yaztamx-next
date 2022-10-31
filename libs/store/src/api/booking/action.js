import * as Constant from '../constant';
import {
  providerDetail,
  findBestProvider,
  createNewOffer,
  fetchFavoriteProvider,
  addFavorite,
  getCouponCode,
  getBlockedClient,
  getBlockedProvider,
  blockedClient,
  blockedProvider,
  fetchUpcomingBookings,
  fetchPastBookings,
  fetchPendingBookings,
  fetchCancelledBookings,
  publishSearchToForum,
  declineOffer,
  declineOrTerminateOffer,
} from './service';

import { useSelector } from 'react-redux';
import { logout } from '../auth/action';
import { clearStorage } from '../../redux/localStore';
// import { alert } from '../../../../ui/src/utils/flashMessage';
// import { loader } from '../../common/auth/action';
// import { goToScreen } from '../../../../../apps/yazta-client/src/navigation/navigationHelper';

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
    return true;
  } else {
    return false;
  }
};

export const getProviderDetail = (id) => {
  return (dispatch) => {
    dispatch(loader(true));
    providerDetail(id)
      .then(([response, status]) => {
        // console.log('getProviderDetail response -->:', response);
        if (status == 201) {
          dispatch({
            type: Constant.PROVIDER_DETAIL,
            payload: response,
          });
        }
      })
      .catch((err) => {
        console.log('getProviderDetail err,', err);
        dispatch(loader(false));
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

export const findProvider = (data) => {
  const queryString = require('query-string');
  const payload = queryString.stringify(data, { encode: false });

  return (dispatch) => {
    dispatch(loader(true));
    findBestProvider(payload)
      .then(([response, status]) => {
        // console.log('findBestProvider response -->:', response);
        if (status == 201) {
          // navigate('/search-result');
          dispatch({
            type: Constant.PROVIDER_LIST,
            payload: response.userData,
            searchId: response.searchId,
          });
        }
        dispatch(loader(false));
      })
      .catch((err) => {
        console.log('findBestProvider err :', err);
        dispatch(loader(false));
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
      });
  };
};

export const saveArrangement = (data) => {
  console.log(data, 'save arrangement data');
  return {
    type: Constant.SET_ARRANGEMENT,
    payload: data,
  };
};

export const newOffer = (data, navigate) => {
  return (dispatch) => {
    dispatch(loader(true));
    createNewOffer(data)
      .then(([response, status]) => {
        console.log('newOffer response -->:', response);
        if (status == 201) {
          dispatch({
            type: Constant.NEW_OFFER,
            payload: response,
          });
          // aleart('Your Offer has been Submitted!');
          dispatch(
            snackbar({
              type: 'success',
              open: true,
              message: 'Your Offer has been Submitted!',
            })
          );
          navigate('/home');
        }
        dispatch(loader(false));
      })
      .catch((err) => {
        console.log('newOffer err,', err.message[0].messages);
        // aleart('API Error');
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
      })
      .finally(() => {
        dispatch(loader(false));
      });
  };
};

export const getFavoriteProvider = () => {
  return (dispatch) => {
    dispatch(loader(true));
    fetchFavoriteProvider()
      .then(([response, status]) => {
        // console.log('getProviderDetail response -->:', response);
        if (status == 201) {
          dispatch({
            type: Constant.FAVORITE_PROVIDER,
            payload: response,
          });
        }
        dispatch(loader(false));
      })
      .catch((err) => {
        console.log('Fav Provider err,', err);
        // aleart('API Error');
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
      })
      .finally(() => {
        dispatch(loader(false));
      });
  };
};

export const setFavoriteUser = (data, providerList) => {
  if (Array.isArray(providerList)) {
    const providerListData = providerList;
    return (dispatch) => {
      dispatch(loader(true));
      addFavorite(data)
        .then(([response, status]) => {
          // console.log('setFavoriteUser response :', response);
          if (status == 201) {
            const indexOfLikedPro = providerListData.findIndex(
              (provider) => provider.id === response.favourite_userid
            );
            console.log('api called', response.is_favourite);
            providerListData[indexOfLikedPro].isFavourite =
              response.is_favourite;
            dispatch({
              type: Constant.SET_IS_FAVOURITE,
              payload: providerListData,
            });
            if (response.is_favourite) {
              dispatch(
                snackbar({
                  type: 'success',
                  open: true,
                  message: 'You have added this provider as favourite!',
                })
              );
              // aleart('You have added this provider as favourite!');
            } else {
              dispatch(
                snackbar({
                  type: 'success',
                  open: true,
                  message: 'You have removed this provider from favourite!',
                })
              );
              // aleart('You have removed this provider from favourite!');
            }
          }
          dispatch(loader(false));
        })
        .catch((err) => {
          dispatch(loader(false));
          console.log('setFavoriteUser err :', err);
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
  } else {
    return (dispatch) => {
      dispatch(loader(true));
      addFavorite(data)
        .then(([response, status]) => {
          // console.log('setFavoriteUser response :', response);
          if (status == 201) {
            if (data.isFavourite === true) {
              dispatch(
                snackbar({
                  type: 'success',
                  open: true,
                  message: 'You have added this provider as favourite!',
                })
              );
              // aleart('You have added this provider as favourite!');
            } else {
              dispatch(
                snackbar({
                  type: 'success',
                  open: true,
                  message: 'You have removed this provider from favourite!',
                })
              );
              // aleart('You have removed this provider from favourite!');
            }
          }
          dispatch(getFavoriteProvider());
          dispatch(loader(false));
        })
        .catch((err) => {
          dispatch(loader(false));
          console.log('setFavoriteUser err :', err);
          const isUnauthorized = checkUnauthorized(err, dispatch);
          if (isUnauthorized) return;
          // aleart('API Error!');
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
  }
};

export const getCoupon = (userId) => {
  return (dispatch) => {
    dispatch(loader(true));
    getCouponCode(userId)
      .then(([response, status]) => {
        // console.log('getCoupon response :', response);
        if (status == 201) {
          dispatch({
            type: Constant.COUPON_CODE,
            payload: response,
          });
        }
        dispatch(loader(false));
      })
      .catch((err) => {
        dispatch(loader(false));
        console.log('getCoupon err :', err);
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

export const blockedClientList = () => {
  return (dispatch) => {
    dispatch(loader(true));
    getBlockedClient()
      .then(([response, status]) => {
        if (status == 201) {
          dispatch({
            type: Constant.GET_BLOCKED_CLIENT,
            payload: response,
          });
        }
        dispatch(loader(false));
      })
      .catch((err) => {
        dispatch(loader(false));
        console.log('getBlockClient err :', err);
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

export const blockedProviderList = () => {
  return (dispatch) => {
    dispatch(loader(true));
    getBlockedProvider()
      .then(([response, status]) => {
        console.log('getBLockProvider response :', response);
        if (status == 201) {
          dispatch({
            type: Constant.GET_BLOCKED_PROVIDER,
            payload: response,
          });
        }
        dispatch(loader(false));
      })
      .catch((err) => {
        dispatch(loader(false));
        console.log('getBlockProvider err :', err);
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

export const blockedUser = (data) => {
  return (dispatch) => {
    dispatch(loader(true));
    blockedClient(data)
      .then(([response, status]) => {
        console.log('BLock Client post response :::::', response);
        if (status == 201) {
          blockedProviderList();
          dispatch(blockedClientList());

          if (data?.isBlocked == false) {
            // aleart('Unblocked Provider Successfully!');
            dispatch(
              snackbar({
                type: 'success',
                open: true,
                message: 'Unblocked Provider Successfully.',
              })
            );
          } else {
            dispatch(
              snackbar({
                type: 'success',
                open: true,
                message: 'Blocked Provider Successfully.',
              })
            );
            // aleart('Blocked Provider Successfully!');
          }
          dispatch({
            type: Constant.BLOCKED_CLIENT,
            payload: response,
          });
        }
        dispatch(blockedProviderList());
        dispatch(loader(false));
      })
      .catch((err) => {
        dispatch(loader(false));
        console.log('Block Client post err :', err);
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

export const blockedUsers = (userId) => {
  return (dispatch) => {
    dispatch(loader(true));
    blockedProvider(userId)
      .then(([response, status]) => {
        console.log('BLock Provider post response :', response);
        if (status == 201) {
          dispatch({
            type: Constant.BLOCKED_PROVIDER,
            payload: response,
          });
        }
        dispatch(loader(false));
      })
      .catch((err) => {
        dispatch(loader(false));
        console.log('Block Provider post err :', err);
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

export const setOfferDetails = (data) => {
  return (dispatch) => {
    dispatch({
      type: Constant.SET_OFFER_DETAILS,
      payload: data,
    });
  };
};

export const getUpcomingBookings = (data) => {
  return (dispatch) => {
    dispatch(loader(true));
    fetchUpcomingBookings(data)
      .then(([response, status]) => {
        console.log('getUpcomingBookings response -->:', response);
        if (status == 201) {
          dispatch({
            type: Constant.UPCOMING_BOOKINGS,
            payload: response,
          });
        }
      })
      .catch((err) => {
        console.log('getUpcomingBookings err,', err);
        // aleart('API Error');

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
      })
      .finally(() => {
        dispatch(loader(false));
      })
  };
};

export const getPastBookings = () => {
  return (dispatch) => {
    dispatch(loader(true));
    fetchPastBookings()
      .then(([response, status]) => {
        console.log('getPastBookings response -->:', response);
        if (status == 200) {
          dispatch({
            type: Constant.PAST_BOOKINGS,
            payload: response,
          });
        }
      })
      .catch((err) => {
        dispatch(loader(false));
        console.log('getPastBookings err,', err);
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

export const getPendingBookings = (data) => {
  return (dispatch) => {
    dispatch(loader(true));
    fetchPendingBookings(data)
      .then(([response, status]) => {
        console.log('getPendingBookings response -->:', response);
        if (status == 201) {
          dispatch({
            type: Constant.PENDING_BOOKINGS,
            payload: response,
          });
        }
      })
      .catch((err) => {
        console.log('getPendingBookings err,', err);
        // aleart('API Error');
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
      })
      .finally(() => {
        dispatch(loader(false));
      })
  };
};

export const getCancelledBookings = (data) => {
  return (dispatch) => {
    dispatch(loader(true));
    fetchCancelledBookings(data)
      .then(([response, status]) => {
        console.log('getCancelledBookings response -->:', response, status);
        if (status == 201) {
          dispatch({
            type: Constant.CANCELLED_BOOKINGS,
            payload: response,
          });
        }
      })
      .catch((err) => {
        console.log('getCancelledBookings err,', err);
        dispatch(loader(false));
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

export const postSearchDataInForum = (searchId, navigate) => {
  return (dispatch) => {
    dispatch(loader(true));
    publishSearchToForum(searchId)
      .then(([response, status]) => {
        console.log('postSearchDataInForum response -->:', response, status);
        if (status == 201) {
          // dispatch({
          //   type: Constant.PUBLISH_SEARCH_TO_FORUM,
          //   payload: response,
          // });
          navigate('/comments', {
            state: { postId: response.id, categoryId: response.categoryId },
          });
        }
      })
      .catch((err) => {
        console.log('postSearchDataInForum err,', err);
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

export const declineProviderOffer = (jobOfferId, jobStatus, id, setOpen) => {
  return (dispatch) => {
    dispatch(loader(true));
    declineOrTerminateOffer(jobOfferId, { job_status: 'DECLINED' })
      .then(([response, status]) => {
        console.log('declineProviderOffer response -->:', response, status);
        if (status == 201) {
          setOpen(false);
          if (jobStatus === 'NEW') {
            dispatch(getPendingBookings({ jobStatus: 'NEW', id }));
          } else if (jobStatus === 'ACCEPTED') {
            dispatch(getUpcomingBookings({ jobStatus: 'ACCEPTED', id }));
          }
          dispatch(
            snackbar({
              type: 'success',
              open: true,
              message: 'Success. Engagement Declined.',
            })
          );
          dispatch(getPastBookings());
          // dispatch({
          //   type: Constant.PUBLISH_SEARCH_TO_FORUM,
          //   payload: response,
          // });
        }
      })
      .catch((err) => {
        dispatch(loader(false));
        console.log('declineProviderOffer err,', err);
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

export const terminateProviderOffer = (
  jobOfferId,
  jobStatus,
  id,
  setOpen,
  navigate,
  providerData
) => {
  return (dispatch) => {
    dispatch(loader(true));
    declineOrTerminateOffer(jobOfferId, { job_status: 'TERMINATED' })
      .then(([response, status]) => {
        console.log('terminateProviderOffer response -->:', response, status);
        if (status == 201) {
          setOpen(false);
          if (jobStatus === 'NEW') {
            dispatch(getPendingBookings({ jobStatus: 'NEW', id }));
          } else if (jobStatus === 'ACCEPTED') {
            dispatch(getUpcomingBookings({ jobStatus: 'ACCEPTED', id }));
          }
          dispatch(
            snackbar({
              type: 'success',
              open: true,
              message: 'Success. Engagement Terminated.',
            })
          );
          navigate('/rating-and-review', {
            state: { providerData, jobId: jobOfferId },
          });
          // dispatch({
          //   type: Constant.PUBLISH_SEARCH_TO_FORUM,
          //   payload: response,
          // });
        }
      })
      .catch((err) => {
        console.log('terminateProviderOffer err,', err);
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
