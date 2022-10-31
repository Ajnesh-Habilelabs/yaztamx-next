/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import { Grid, Typography, InputAdornment } from '@mui/material';
import style from './../authStyle';
import { Box, color } from '@mui/system';
import TextInput from './../../../components/atoms/textfield';
import LoginButton from './../../../components/atoms/button';
import LeftAuthImg from './../../../assets/images/auth-left-img.svg';
import AuthLogo from './../../../assets/images/auth-logo.svg';
import FbLogo from './../../../assets/images/facebook.png';
import GmailLogo from './../../../assets/images/google.png';
import { registerUser } from '../../../../../store/src/api/auth/action';
import { useDispatch } from 'react-redux';
import PhoneInput from 'react-phone-number-input';
import { NavLink } from 'react-router-dom';

import {
  validateEmail,
  validateName,
  validatePassword,
  validatePhone,
} from '../../../utils/validation';
import { useNavigate } from 'react-router-dom';
import { VisibilitySharp, VisibilityOffSharp } from '@mui/icons-material';
import { getLocalStorage } from '../../../../../store/src/redux/localStore';

import 'react-phone-number-input/style.css';

const initialState = {
  name: '',
  email: '',
  password: '',
  phone: '',
};
const initialError = { field: '', message: '' };

const Register = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const classes = style();

  const [registerDetail, setRegisterDetail] = useState(initialState);
  const [error, setError] = useState(initialError);
  const [showPassword, setShowPassword] = useState(true);
  const token = getLocalStorage('Token');

  React.useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [navigate, token]);

  const viewPassword = () => {
    setShowPassword(!showPassword);
  };

  const onRegister = () => {
    event.preventDefault();
    const errorEntity = { ...onValidate() };
    if (Object.keys(errorEntity).length === 0) {
      dispatch(
        registerUser(
          {
            name: registerDetail.name,
            email: registerDetail.email,
            password: registerDetail.password,
            phoneNo: registerDetail.phone,
            userRole: 'CUSTOMER',
          },
          navigate
        )
      );
      // setRegisterDetail(initialState);
    }
  };

  const onValidate = () => {
    const validateUsername = validateName(registerDetail.name);
    const validateEmailId = validateEmail(registerDetail.email);
    const validatePasswords = validatePassword(registerDetail.password);
    const validatePhoneNo = validatePhone(registerDetail.phone);

    let errorEntity = {};
    if (validateUsername.message) {
      errorEntity = validateUsername;
    } else if (validateEmailId.message) {
      errorEntity = validateEmailId;
    } else if (validatePasswords.message) {
      errorEntity = validatePasswords;
    } else if (validatePhoneNo.message) {
      errorEntity = validatePhoneNo;
    }
    setError(errorEntity);
    return errorEntity;
  };

  const onChange = (field, value) => {
    setRegisterDetail({ ...registerDetail, [field]: value });
  };

  return (
    <>
      <Grid container className={classes.loginRoot}>
        <Grid item xs={12} md={6} className={classes.leftPanel}>
          <img draggable={false} src={LeftAuthImg} alt="Left Img" />
        </Grid>
        <Grid item xs={12} md={6} className={classes.rightPanel}>
          <Box display="flex" alignItems="center" marginBottom={5}>
            <img draggable={false} src={AuthLogo} alt="Auth Logo" />
            <Typography
              variant="h6"
              gutterBottom
              component="div"
              className={classes.leftSpace}
            >
              Register
            </Typography>
          </Box>

          <form onSubmit={() => {event.preventDefault(); onRegister();}}>
          <Box>
            <TextInput
              // placeholder="name"
              name="name"
              color="secondary"
              label="name"
              type="text"
              value={registerDetail.name}
              required={true}
              error={error.field === 'name' ? true : false}
              errorText={error.field === 'name' && error.message}
              onChange={(event) => onChange('name', event.target.value)}
            />
          </Box>
          <Box>
            <TextInput
              // placeholder="email"
              name="email"
              label="email"
              type="email"
              value={registerDetail.email}
              required={true}
              error={error.field === 'email' ? true : false}
              errorText={error.field === 'email' && error.message}
              onChange={(event) => onChange('email', event.target.value)}
            />
          </Box>
          <Box>
            <TextInput
              // placeholder="password"
              name="password"
              label="password"
              type={showPassword ? 'password' : 'text'}
              value={registerDetail.password}
              required={true}
              error={error.field === 'password' ? true : false}
              errorText={error.field === 'password' && error.message}
              onChange={(event) => onChange('password', event.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    sx={{
                      padding: '27.5px 14px',
                      backgroundColor: '#FEFBF8',
                    }}
                  >
                    <span onClick={viewPassword}>
                      {!showPassword ? (
                        <VisibilitySharp sx={{cursor: 'pointer'}} />
                      ) : (
                        <VisibilityOffSharp sx={{cursor: 'pointer'}} />
                      )}
                    </span>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box>
            {/* <label htmlFor="Phone" style={{ fontSize: '14px' }}>
              PHONE*
            </label> */}
            <PhoneInput
              placeholder="PHONE *"
              value={registerDetail.phone}
              onChange={(value) => onChange('phone', value)}
              className={classes.phoneInput}
              // labels="Phone*"
            />
            {/* <TextInput
              // placeholder="phone"
              name="phone"
              label="phone"
              type="tel"
              value={registerDetail.phone}
              required={true}
              error={error.field === 'phone' ? true : false}
              errorText={error.field === 'phone' && error.message}
              onChange={(event) => onChange('phone', event.target.value)}
            /> */}
          </Box>
          <Box
            paddingLeft={8}
            paddingRight={8}
            paddingTop={3}
            paddingBottom={3}
          >
            <LoginButton label="Submit" type="submit" />
          </Box>
          </form>
          <Box className={`${classes.dFlex} ${classes.backBorder}`} p={4}>
            <span></span>
            <Typography
              variant="subtitle1"
              gutterBottom
              component="div"
              fontSize={20}
            >
              Or Sign Up With
            </Typography>
          </Box>
          <Box className={classes.dFlex}>
            <NavLink to="#">
              <img
                draggable={false}
                height={50}
                className={classes.fbBtn}
                src={FbLogo}
                alt="Auth Logo"
              />
            </NavLink>
            <NavLink to="#">
              <img draggable={false} height={75} src={GmailLogo} alt="Auth Logo" />
            </NavLink>
          </Box>
          <Box className={classes.dFlex} paddingTop={4}>
            <Typography
              variant="subtitle1"
              gutterBottom
              component="div"
              m={0}
              marginRight={1}
              fontSize={20}
            >
              Already a member?
            </Typography>
            <NavLink to="/login" className={classes.signText}>
              Log In here
            </NavLink>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Register;
