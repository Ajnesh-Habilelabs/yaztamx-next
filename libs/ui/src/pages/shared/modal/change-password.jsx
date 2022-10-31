import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './style';
import { Modal, Box, Grid, Typography, Button } from '@mui/material';
import { VisibilitySharp, VisibilityOffSharp } from '@mui/icons-material';
import TextInput from '../../../components/atoms/textfield';
import DateRangeIcon from '@mui/icons-material/DateRange';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import CancelIcon from '@mui/icons-material/Cancel';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LoginButton from '../../../components/atoms/button';
import {
  changePassword,
  changePasswordFromProfile,
  forgetPassword,
} from '../../../../../../libs/store/src/api/auth/action';
import { useFormik } from 'formik';
import IconButton from '@mui/material/IconButton';
import * as Yup from 'yup';
import { forgotPassword } from 'libs/store/src/api/auth/service';
import { getLocalStorage } from 'libs/store/src/redux/localStore';
import colors from 'libs/ui/src/theme/color';

const ChangePasswordModal = (props) => {
  const { open, setOpen } = props;
  const classes = style();
  const [viewOldPassword, setViewOldPassword] = useState(true);
  const [viewNewPassword, setViewNewPassword] = useState(true);
  const [viewConfirmPassword, setViewConfirmPassword] = useState(true);
  const [OTPSent, setOTPSent] = useState(false);
  const [email, setEmail] = useState('');
  const [intervalVar, setIntervalVar] = useState(null);
  const [timeSeconds, setTimeSeconds] = useState(60);
  const [activateResendButton, setActivateResendButton] = useState(false);
  const [refresh, setRefresh] = useState(false);
  // const { data, commentId } = commentData;
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      otp: '',
      new_password: '',
      confirm_new_password: '',
    },
    validationSchema: Yup.object({
      otp: Yup.string().required('Please type OTP sent to email.'),
      new_password: Yup.string()
        .required('Please type your new password.')
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .matches(
          /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/,
          'Password should have minimum 8 characters with number, special character & uppercase, ex. Johndoe@123'
        ),
      confirm_new_password: Yup.string()
        .required('Please type your password again.')
        .oneOf([Yup.ref('new_password')], 'Your passwords do not match.'),
    }),
    onSubmit: (values) => {
      // console.log('form values', values);
      onContinue(values);
    },
  });
  
  const handleClose = () => {
    clearInterval(intervalVar);
    setOTPSent(false);
    setActivateResendButton(false);
    setTimeSeconds(60);
    setOpen(false);
  };

  const onContinue = (values) => {
    const payload = {
      email: email,
      code: values.otp,
      password: values.new_password,
      passwordConfirmation: values.confirm_new_password,
    };
    dispatch(changePassword(payload, null, setOpen, formik, setOTPSent));
  };

  const viewPassword = (type) => {
    const types = {
      [0]: [viewOldPassword, setViewOldPassword],
      [1]: [viewNewPassword, setViewNewPassword],
      [2]: [viewConfirmPassword, setViewConfirmPassword],
    };
    types[type][1](!types[type][0]);
  };

  const sendOTP = () => {
    const userData = getLocalStorage('userData');
    setEmail(userData.email);
    dispatch(forgetPassword({ email: userData.email }, null, setOTPSent, null));
  };

  const resendOTP = () => {
    const userData = getLocalStorage('userData');
    setEmail(userData.email);
    dispatch(
      forgetPassword(
        { email: userData.email },
        null,
        null,
        setActivateResendButton
      )
    );
  };

  const nullFunction = () => {
    return;
  };

  React.useEffect(() => {
    if (activateResendButton) {
      setTimeSeconds(60);
    }
    if (OTPSent && !activateResendButton) {
      let time = timeSeconds;
      const interval = setInterval(() => {
        time = time - 1;
        setTimeSeconds(time);
      }, 1000);
      setIntervalVar(interval);
    }
  }, [OTPSent, activateResendButton]);

  React.useEffect(() => {
    if (intervalVar !== null && timeSeconds === 0) {
      clearInterval(intervalVar);
      setActivateResendButton(true);
    }
  }, [intervalVar, timeSeconds]);

  React.useEffect(() => {
    if (activateResendButton) {
      setIntervalVar(null);
    }
  }, [activateResendButton]);

  React.useEffect(() => {
    console.log('time', timeSeconds);
  }, [timeSeconds]);
  return (
    <Modal
      open={open}
      onClose={OTPSent ? nullFunction : handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ zIndex: 1 }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '40%',
          height: 'fit-content',
          bgcolor: '#fefbf8',
          boxShadow: 24,
          p: 2,
          borderRadius: '10px',
          outline: 'unset',
        }}
        >
        {!OTPSent && <HighlightOffRoundedIcon onClick={handleClose} className={classes.closeChangePasswordButton} />}
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
          sx={{
            width: '100% !important',
            borderRadius: '0px !important',
            marginTop: '10px !important',
            padding: '0px !important',
          }}
        >
          Change Password
        </IconButton>
        <Grid item sm={12} sx={{ position: 'relative' }}>
          <form
            onSubmit={() => {
              event.preventDefault();
              formik.submitForm();
            }}
          >
            <Box>
              <Grid container>
                <TextInput
                  name="otp"
                  id="otp"
                  label="Code"
                  type={viewOldPassword ? 'password' : 'text'}
                  required={true}
                  value={formik.values.otp}
                  error={formik.touched.otp && formik.errors.otp}
                  disable={!OTPSent}
                  errorText={formik.errors.otp}
                  onChange={formik.handleChange}
                  InputProps={{
                    endAdornment: (
                      <span onClick={() => viewPassword(0)}>
                        {!viewOldPassword ? (
                          <VisibilitySharp sx={{ cursor: 'pointer' }} />
                        ) : (
                          <VisibilityOffSharp sx={{ cursor: 'pointer' }} />
                        )}
                      </span>
                    ),
                  }}
                />
              </Grid>
            </Box>
            <Box>
              <Grid container paddingTop={2}>
                <TextInput
                  name="new_password"
                  id="new_password"
                  label="New Password"
                  type={viewNewPassword ? 'password' : 'text'}
                  required={true}
                  value={formik.values.new_password}
                  error={
                    formik.touched.new_password && formik.errors.new_password
                  }
                  disable={!OTPSent}
                  errorText={formik.errors.new_password}
                  onChange={formik.handleChange}
                  InputProps={{
                    endAdornment: (
                      <span onClick={() => viewPassword(1)}>
                        {!viewNewPassword ? (
                          <VisibilitySharp sx={{ cursor: 'pointer' }} />
                        ) : (
                          <VisibilityOffSharp sx={{ cursor: 'pointer' }} />
                        )}
                      </span>
                    ),
                  }}
                />
              </Grid>
            </Box>
            <Box>
              <Grid container paddingTop={2}>
                <TextInput
                  name="confirm_new_password"
                  id="confirm_new_password"
                  label="Confirm Password"
                  type={viewConfirmPassword ? 'password' : 'text'}
                  required={true}
                  value={formik.values.confirm_new_password}
                  error={
                    formik.touched.confirm_new_password &&
                    formik.errors.confirm_new_password
                  }
                  disable={!OTPSent}
                  errorText={formik.errors.confirm_new_password}
                  onChange={formik.handleChange}
                  InputProps={{
                    endAdornment: (
                      <span onClick={() => viewPassword(2)}>
                        {!viewConfirmPassword ? (
                          <VisibilitySharp sx={{ cursor: 'pointer' }} />
                        ) : (
                          <VisibilityOffSharp sx={{ cursor: 'pointer' }} />
                        )}
                      </span>
                    ),
                  }}
                />
              </Grid>
            </Box>
            <Box>
              <Grid
                container
                justifyContent="center"
                paddingTop={2}
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'nowrap',
                  gap: '10px',
                }}
              >
                <LoginButton
                  label="Cancel"
                  type="button"
                  onClick={handleClose}
                  sx={{ margin: 'unset !important' }}
                  styles={{
                    background: `${colors.white} !important`,
                    color: `${colors.primary} !important`,
                  }}
                />
                {/* <LoginButton
                  label="Resend Code"
                  type="button"
                  onClick={handleClose}
                  sx={{ margin: 'unset !important' }}
                  styles={activateResendButton ? {
                    background: `${colors.white} !important`,
                    color: `${colors.primary} !important`,
                    
                  } : {
                    background: `${colors.white} !important`,
                    color: `${colors.primary} !important`,
                    fontSize: '14px',

                  }}
                /> */}
                <LoginButton
                  label="Submit"
                  type="submit"
                  sx={{ margin: 'unset !important' }}
                />
              </Grid>
              <Button
                color="primary"
                aria-label="upload picture"
                component="span"
                disabled={!activateResendButton}
                onClick={resendOTP}
                sx={{
                  fontSize: '14px !important',
                  borderRadius: '0px !important',
                  marginTop: '10px !important',
                  padding: '0px !important',
                  textTransform: 'capitalize !important',
                }}
              >
                RESEND CODE {!activateResendButton && `IN ${timeSeconds}s`}
              </Button>
            </Box>
          </form>
          {!OTPSent && (
            <div className={classes.divOnPasswordResetModal}>
              <LoginButton
                label="Click here to send code"
                type="button"
                sx={{
                  margin: 'unset !important',
                  width: '335px !important',
                }}
                styles={{
                  background: `${colors.white} !important`,
                  color: `${colors.primary} !important`,
                  fontWeight: 'bold !important',
                }}
                onClick={sendOTP}
              />
            </div>
          )}
        </Grid>
      </Box>
    </Modal>
  );
};

export default ChangePasswordModal;
