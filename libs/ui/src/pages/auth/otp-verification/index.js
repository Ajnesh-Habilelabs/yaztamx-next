/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import { Grid, Typography } from '@mui/material';
import style from './../authStyle';
import { Box } from '@mui/system';
import TextInput from './../../../components/atoms/textfield';
import LoginButton from './../../../components/atoms/button';
import LeftAuthImg from './../../../assets/images/forgot-left-img.png';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { confirmEmailOTP, verifyOtp } from '../../../../../store/src/api/auth/action';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { VisibilitySharp, VisibilityOffSharp } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';

const OtpVerification = () => {
  const classes = style();
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  const [otp, setOtp] = useState();
  const [viewOTP, setViewOTP] = useState(true);
  const [error, setError] = useState('');
  const [fromScreen, setFromScreen] = useState(state?.from);

  const onVerify = () => {
    if (fromScreen === 'login') {
      if (otp && otp.length === 4) {
        dispatch(
          confirmEmailOTP({ email: state?.email, confirmationToken: otp }, navigate)
        );
        setError('');
      } else {
        setError('OTP should be 4 digits!');
      }
    } else if (fromScreen === 'register') {
      if (otp && otp.length === 4) {
        dispatch(
          verifyOtp({ phoneNo: state?.phoneNo, otp }, navigate, state?.userRole)
        );
        setError('');
      } else {
        setError('OTP should be 4 digits!');
      }
    }
  };

  return (
    <>
      <Grid container className={classes.loginRoot}>
        <Grid item xs={12} md={6} className={classes.leftPanel}>
          <img draggable={false} src={LeftAuthImg} alt="Left Img" />
        </Grid>
        <Grid item xs={12} md={6} className={classes.rightPanel}>
          <Box display="flex" alignItems="center" marginBottom={5}>
            <NavLink to="/login" className={classes.backArrow}>
              <ArrowBackIosIcon />
            </NavLink>
            <Typography
              variant="h6"
              gutterBottom
              component="div"
              className={classes.leftSpace}
            >
              {/* Forgot Password */}
              {/* Verify Email or Phone number */}
              Verify Email
            </Typography>
          </Box>

          {/* <Box display="flex" alignItems="center" marginBottom={3}>
            <Typography variant="h6" gutterBottom component="div">
              Verify Email or Phone number
            </Typography>
          </Box> */}
          <Box display="flex" alignItems="center" marginBottom={3}>
            <Typography variant="overline" gutterBottom component="div">
              {/* Please enter the OTP (One Time Password) */}
              Please enter the Code
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" marginBottom={3}>
            <Typography variant="caption" gutterBottom component="div">
              {/* Sent to your registered email or phone number */}
              Sent to your registered email
            </Typography>
          </Box>
          <form
            onSubmit={() => {
              event.preventDefault();
              onVerify();
            }}
          >
            <Box>
              <TextInput
                name="Please enter OTP"
                type={viewOTP ? 'password' : 'text'}
                required={true}
                value={otp}
                error={error ? true : false}
                errorText={`${error}`}
                onChange={(event) => setOtp(event.target.value)}
                InputProps={{
                  endAdornment: (
                    <span onClick={() => setViewOTP(!viewOTP)}>
                      {!viewOTP ? (
                        <VisibilitySharp sx={{ cursor: 'pointer' }} />
                      ) : (
                        <VisibilityOffSharp sx={{ cursor: 'pointer' }} />
                      )}
                    </span>
                  ),
                }}
              />
            </Box>
            <Box
              display="flex"
              alignItems="center"
              marginBottom={3}
              marginTop={3}
            >
              <Typography variant="h6" gutterBottom component="div">
                Resend Verification Code
              </Typography>
            </Box>
            <Box
              paddingTop={5}
              paddingLeft={8}
              paddingRight={8}
              paddingBottom={3}
            >
              <LoginButton label="Verify" type="submit" />
            </Box>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default OtpVerification;
