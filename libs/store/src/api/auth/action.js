import { clearStorage, setLocalStorage } from '../../redux/localStore';
import * as Constant from '../constant';
import {
  userLogin,
  userRegistration,
  userOtpVerification,
  forgotPassword,
  resetPassword,
  googleLogin,
  facebookLogin,
  updateProfile,
  resetPasswordFromProfile,
  verifyEmailOTP,
  addSubscribers,
  addConcern,
} from './service';

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

export const saveUserData = (data) => {
  return (dispatch) => {
    dispatch({
      type: Constant.USER_LOGIN,
      payload: data,
    });
  };
};

export const logout = (navigate) => {
  return () => {
    navigate('/login');
    clearStorage();
  };
};

export const saveStoreToken = (data) => {
  return (dispatch) => {
    dispatch({
      type: Constant.SAVE_STORE_TOKEN,
      payload: data,
    });
  };
};

// export const loginUser = (data) => {
//   return (dispatch) => {
//     dispatch(loader(true));
//     userLogin({ identifier: data.email, password: data.password })
//       .then(([response, status]) => {
//         // console.log('response here login : ', response);
//         if (status === 200) {
//           if (
//             response.user.userRole === 'CUSTOMER' &&
//             data.userRole === 'CUSTOMER'
//           ) {
//             AlertMessage('User logged in sucessfully!');
//             asyncStore.setToken(response.jwt);
//             asyncStore.setClientData(response.user);
//             app2StackReset('HomeStack');
//           } else if (
//             response.user.userRole === 'PROVIDER' &&
//             data.userRole === 'PROVIDER'
//           ) {
//             AlertMessage('User logged in sucessfully!');
//             asyncStore.setToken(response.jwt);
//             asyncStore.setProviderData(response.user);
//             appStackReset('HomeStack');
//           } else {
//             AlertMessage(
//               `You're already registered as ${response?.user?.userRole}.`
//             );
//           }
//         }
//         dispatch(loader(false));
//         dispatch({
//           type: Constant.USER_LOGIN,
//           payload: response.user,
//         });
//       })
//       .catch((error) => {
//         dispatch(loader(false));
//         console.log('login error :', error?.data[0]?.messages[0]?.message);
//         AlertMessage('Check your email and password');
//       });
//   };
// };

export const loginUser = (data, navigate) => {
  return (dispatch) => {
    dispatch(loader(true));
    userLogin({ identifier: data.email, password: data.password })
      .then(([response, status]) => {
        // console.log(response, data);
        // console.log(response.user.userRole, data.role);
        if (status === 201) {
          if (
            (response.user.userRole === 'CUSTOMER' &&
              data.role === 'CUSTOMER') ||
            (response.user.user.userRole === 'PROVIDER' &&
              data.role === 'PROVIDER')
          ) {
            if (!response.user.confirmed) {
              navigate('/otp-verification', {
                state: {
                  phoneNo: response.user?.phoneNo,
                  userRole: response.user?.userRole,
                  email: response.user?.email,
                  from: 'login',
                },
              });
              dispatch(
                snackbar({
                  type: 'success',
                  open: true,
                  message:
                    'Please verify your OTP. Account verification details are sent to your registered email.',
                })
              );
            } else {
              // alert('User logged in sucessfully!');
              dispatch(
                snackbar({
                  type: 'success',
                  open: true,
                  message: 'User logged in sucessfully!',
                })
              );
              // asyncStore.setToken(response.jwt);
              // asyncStore.setProviderData(response.user);
              // appStackReset("HomeStack");
              setLocalStorage('Token', response.jwt);
              setLocalStorage('userData', response.user);
              navigate('/home');
            }
          } else {
            // alert(`You're already registered as ${response?.user?.userRole}.`);
            dispatch(
              snackbar({
                type: 'error',
                open: true,
                message: `You're already registered as ${response?.user?.userRole}.`,
              })
            );
          }
        }
        dispatch(loader(false));
        dispatch({
          type: Constant.USER_LOGIN,
          payload: response.user,
        });
      })
      .catch((error) => {
        dispatch(loader(false));
        // console.log('login error :', error);
        // alert(error?.message);
        dispatch(
          snackbar({
            type: 'error',
            open: true,
            message: `${error?.message ? error?.message : Constant.INTERNET_ERROR}`,
          })
        );
      })
      .finally(() => {
        dispatch(loader(false));
      });
  };
};

export const confirmEmailOTP = (data, navigate) => {
  return (dispatch) => {
    dispatch(loader(true));
    verifyEmailOTP(data)
      .then((response) => {
        // console.log('response :', response);
        // alert('You have sucessfully verified!');
        dispatch(
          snackbar({
            type: 'success',
            open: true,
            message: 'You have sucessfully verified!',
          })
        );
        // if (response.userRole === 'CUSTOMER') {
        setLocalStorage('Token', response[0].jwt);
        setLocalStorage('userData', response[0].user);
        navigate('/');
        // } else {
        //   navigate('/login');
        // }
        dispatch(loader(false));
      })
      .catch((error) => {
        dispatch(loader(false));
        // alert(error?.message ? error?.message : 'Api error');
        dispatch(
          snackbar({
            type: 'error',
            open: true,
            message: error?.message ? error?.message : Constant.INTERNET_ERROR,
          })
        );
      })
      .finally(() => {
        dispatch(loader(false));
      });
  };
};


export const registerUser = (data, navigate) => {
  return (dispatch) => {
    dispatch(loader(true));
    userRegistration(data)
      .then(([response, status]) => {
        // console.log('response here registration', response);
        console.log('OTP ---->', response?.otp);
        // alert('Please verify your phone number!');
        dispatch(
          snackbar({
            type: 'success',
            open: true,
            message: 'Please verify your email!',
          })
        );
        navigate('/otp-verification', {
          state: {
            phoneNo: data?.phoneNo,
            userRole: data?.userRole,
            email: data?.email,
            from: 'register'
          },
        });
        dispatch(loader(false));
      })
      .catch((error) => {
        console.log('register error :', error);
        dispatch(loader(false));
        // alert(error?.message ? error?.message : 'Api error');
        dispatch(
          snackbar({
            type: 'error',
            open: true,
            message: error?.message ? error?.message : Constant.INTERNET_ERROR,
          })
        );
      })
      .finally(() => {
        dispatch(loader(false));
      });
  };
};

export const forgetPassword = (
  data,
  navigate,
  setOTPSent,
  setActivateResendButton
) => {
  return (dispatch) => {
    dispatch(loader(true));
    forgotPassword(data)
      .then(([response, status]) => {
        if (status === 200) {
          // alert('Mail Sent!');
          if (navigate !== null) {
            navigate('/reset-password', { state: { email: data.email } });
          }
          if (setOTPSent !== null) {
            setOTPSent(true);
          }
          if (setActivateResendButton !== null) {
            setActivateResendButton(false);
          }
          dispatch(loader(false));
          dispatch(
            snackbar({
              type: 'success',
              open: true,
              message: 'Check your email for password reset instructions.',
            })
          );
        }
      })
      .catch((error) => {
        dispatch(loader(false));
        console.log('error :', error);
        const errorMessage = error?.message[0].messages[0].message
        // alert('Email not valid!');
        dispatch(
          snackbar({
            type: 'error',
            open: true,
            message: errorMessage ? errorMessage : Constant.INTERNET_ERROR ,
          })
        );
      })
      .finally(() => {
        dispatch(loader(false));
      });
  };
};

export const changePassword = (data, navigate, setOpen, formik, setOTPSent) => {
  return (dispatch) => {
    dispatch(loader(true));
    resetPassword(data)
      .then(([response, status]) => {
        console.log('response :', response);
        dispatch(loader(false));
        if (status === 200) {
          // alert('Reset Password Successfully!');
          dispatch(
            snackbar({
              type: 'success',
              open: true,
              message: 'Reset Password Successfully!',
            })
          );
          if (navigate !== null) {
            navigate('/login');
          }
          if (setOpen !== null && formik !== null) {
            setOpen(false);
            formik.resetForm();
          }
          if (setOTPSent !== null) {
            setOTPSent(false);
          }
        }
      })
      .catch((error) => {
        dispatch(loader(false));
        console.log('reset password error :', error);
        const errorMessage = error.message[0].messages[0].message
        // alert('Invalid Code');
        dispatch(
          snackbar({
            type: 'error',
            open: true,
            message: errorMessage ? errorMessage : Constant.INTERNET_ERROR,
          })
        );
      })
      .finally(() => {
        dispatch(loader(false));
      });
  };
};

export const changePasswordFromProfile = (data, setOpen, formik) => {
  return (dispatch) => {
    dispatch(loader(true));
    resetPasswordFromProfile(data)
      .then(([response, status]) => {
        console.log('response :', response);
        dispatch(loader(false));
        if (status === 200) {
          // alert('Reset Password Successfully!');
          dispatch(
            snackbar({
              type: 'success',
              open: true,
              message: 'Password Changed Successfully!',
            })
          );
          setOpen(false);
          formik.resetForm();
        }
      })
      .catch((error) => {
        dispatch(loader(false));
        console.log('reset password error :', error);
        // alert('Invalid Code');
        dispatch(
          snackbar({
            type: 'error',
            open: true,
            message: error.message ? error?.message : Constant.INTERNET_ERROR,
          })
        );
      })
      .finally(() => {
        dispatch(loader(false));
      });
  };
};

export const verifyOtp = (data, navigate, userRole) => {
  return (dispatch) => {
    dispatch(loader(true));
    userOtpVerification(data)
      .then((response) => {
        // console.log('response :', response);
        // alert('You have sucessfully verified!');
        dispatch(
          snackbar({
            type: 'success',
            open: true,
            message: 'You have sucessfully verified!',
          })
        );
        // if (response.userRole === 'CUSTOMER') {
        setLocalStorage('Token', response[0].token);
        setLocalStorage('userData', response[0]);
        navigate('/');
        // } else {
        //   navigate('/login');
        // }
        dispatch(loader(false));
      })
      .catch((error) => {
        dispatch(loader(false));
        // alert(error?.message ? error?.message : 'Api error');
        dispatch(
          snackbar({
            type: 'error',
            open: true,
            message: error?.message ? error?.message : Constant.INTERNET_ERROR,
          })
        );
      })
      .finally(() => {
        dispatch(loader(false));
      });
  };
};

export const googleLoginUser = (data, navigate) => {
  return (dispatch) => {
    dispatch(loader(true));
    googleLogin({ accessToken: data.token, role: data.role })
      .then(([response, status]) => {
        console.log('google api response :', response);
        if (status === 201) {
          if (response.userRole === 'CUSTOMER' && data.role === 'CUSTOMER') {
            dispatch({ type: Constant.USER_CLIENT_LOGIN, payload: response });
            setLocalStorage('Token', response.token);
            setLocalStorage('userData', response);
            // alert('Google logged in sucessfully!');
            dispatch(
              snackbar({
                type: 'success',
                open: true,
                message: 'Google logged in sucessfully!',
              })
            );
            navigate('/home');
          } else {
            // alert(`You're already registered as ${response.userRole}.`);
            dispatch(
              snackbar({
                type: 'error',
                open: true,
                message: `You're already registered as ${response.userRole}.`,
              })
            );
          }
        }
        dispatch(loader(false));
      })
      .catch((error) => {
        console.log('Google login error :', error);
        dispatch(loader(false));
        // alert('API Error!');
        dispatch(
          snackbar({
            type: 'error',
            open: true,
            message: error?.message || error.message[0].messages[0].message || Constant.OOPS_ERROR,
          })
        );
      })
      .finally(() => {
        dispatch(loader(false));
      });
  };
};

export const facebookLoginUser = (data, navigate) => {
  return (dispatch) => {
    dispatch(loader(true));
    facebookLogin({ accessToken: data.token, role: data.role })
      .then(([response, status]) => {
        console.log('facebook api response :', response);
        if (status === 201) {
          if (response.userRole === 'CUSTOMER' && data.role === 'CUSTOMER') {
            dispatch({ type: Constant.USER_CLIENT_LOGIN, payload: response });
            // alert('Facebook logged in sucessfully!');
            dispatch(
              snackbar({
                type: 'success',
                open: true,
                message: 'Facebook logged in sucessfully!',
              })
            );
            setLocalStorage('Token', response.token);
            setLocalStorage('userData', response);
            navigate('/home');
          } else {
            // alert(`You're already registered as ${response.userRole}.`);
            dispatch(
              snackbar({
                type: 'error',
                open: true,
                message: `You're already registered as ${response.userRole}.`,
              })
            );
          }
        }
        dispatch(loader(false));
      })
      .catch((error) => {
        console.log('facebook login error :', error);
        dispatch(loader(false));
        // alert('API Error!');
        dispatch(
          snackbar({
            type: 'error',
            open: true,
            message: error?.message || error.message[0].messages[0].message || Constant.OOPS_ERROR,
          })
        );
      })
      .finally(() => {
        dispatch(loader(false));
      });
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    try {
      dispatch(loader(true));
      // alert('Logout Successful!');
      // asyncStore.removeDataBeforeLogout();
      // app2StackReset("Login");
      // appStackReset("Login");
      // dispatch(loader(false));
      dispatch(
        snackbar({
          type: 'success',
          open: true,
          message: 'Logout Successful!',
        })
      );
      dispatch({
        type: Constant.USER_LOGOUT,
        payload: '',
      });
      dispatch(loader(false));
    } catch (error) {
      console.log('logout user error', error);
      dispatch(loader(false));
    }
  };
};

export const updateCustomerProfile = (id, data) => {
  return (dispatch) => {
    dispatch(loader(true));
    updateProfile(id, data)
      .then(([response, status]) => {
        // console.log('response here updateProfile ===> ', response);
        if (status === 201) {
          // alert('Your Profile update successfully!');
          dispatch({
            type: Constant.SAVE_CLIENT_DATA,
            payload: response,
          });
          setLocalStorage('userData', response);
          dispatch(
            snackbar({
              type: 'success',
              open: true,
              message: 'Your Profile update successfully!',
            })
          );
        }
        dispatch(loader(false));
      })
      .catch((error) => {
        console.log('error :', error);
        dispatch(loader(false));
        // alert('Api error');
        dispatch(
          snackbar({
            type: 'error',
            open: true,
            message: error?.message || error.message[0].messages[0].message || Constant.OOPS_ERROR,
          })
        );
      })
      .finally(() => {
        dispatch(loader(false));
      });
  };
};

export const addSubscriber = (data, formik) => {
  return (dispatch) => {
    dispatch(loader(true));
    addSubscribers(data)
      .then(([response, status]) => {
        console.log('response :', response);
        dispatch(loader(false));
        if (status === 201) {
          formik.resetForm();
          dispatch(
            snackbar({
              type: 'success',
              open: true,
              message: 'You have successfully subscribed!',
            })
          );
        }
      })
      .catch((error) => {
        dispatch(loader(false));
        const errorMessage = error.message
        dispatch(
          snackbar({
            type: 'error',
            open: true,
            message: errorMessage ? errorMessage : Constant.OOPS_ERROR,
          })
        );
      })
      .finally(() => {
        dispatch(loader(false));
      });
  };
};

export const addConcernData = (data, formik) => {
  return (dispatch) => {
    dispatch(loader(true));
    addConcern(data)
      .then(([response, status]) => {
        console.log('response :', response);
        dispatch(loader(false));
        if (status === 200) {
          formik.resetForm();
          dispatch(
            snackbar({
              type: 'success',
              open: true,
              message: 'Thank you for sharing your thoughts!',
            })
          );
        }
      })
      .catch((error) => {
        dispatch(loader(false));
        const errorMessage = error.message
        dispatch(
          snackbar({
            type: 'error',
            open: true,
            message: errorMessage ? errorMessage : Constant.OOPS_ERROR,
          })
        );
      })
      .finally(() => {
        dispatch(loader(false));
      });
  };
};