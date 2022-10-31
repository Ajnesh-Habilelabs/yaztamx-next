/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import { Grid, Typography } from '@mui/material';
import style from './../authStyle';
import { Box } from '@mui/system';
import TextInput from './../../../components/atoms/textfield';
import LoginButton from './../../../components/atoms/button';
import LeftAuthImg from './../../../assets/images/auth-left-img.svg';
import AuthLogo from './../../../assets/images/auth-logo.svg';
import FbLogo from './../../../assets/images/facebook.png';
import GmailLogo from './../../../assets/images/google.png';
import {
  loginUser,
  facebookLoginUser,
  googleLoginUser,
} from '../../../../../store/src/api/auth/action';
import { useDispatch } from 'react-redux';
import { validateEmail, validatePassword } from '../../../utils/validation';
import { useNavigate, NavLink } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { VisibilitySharp, VisibilityOffSharp } from '@mui/icons-material';
import { getLocalStorage } from '../../../../../store/src/redux/localStore';

const initialState = {
  email: '',
  password: '',
};
const initialError = { field: '', message: '' };

const Login = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const classes = style();

  const [loginDetail, setLoginDetail] = useState(initialState);
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

  const onFacebookLogin = (response) => {
    // console.log('responseFacebook :', response?.accessToken);
    if (response?.accessToken) {
      dispatch(
        facebookLoginUser(
          {
            token: response?.accessToken,
            role: 'CUSTOMER',
          },
          navigate
        )
      );
    }
  };

  const onGoogleLogin = (response) => {
    // console.log('responseGoogle :', response?.accessToken);
    if (response?.accessToken) {
      if (response?.accessToken) {
        dispatch(
          googleLoginUser(
            {
              token: response?.accessToken,
              role: 'CUSTOMER',
            },
            navigate
          )
        );
      }
    }
  };

  const onLogin = () => {
    const errorEntity = { ...onValidate() };
    if (Object.keys(errorEntity).length === 0) {
      dispatch(
        loginUser(
          {
            email: loginDetail.email,
            password: loginDetail.password,
            role: 'CUSTOMER',
          },
          navigate
        )
      );
      setLoginDetail(initialState);
    }
  };

  const onNavigate = () => {
    navigate('/home');
  };

  const onValidate = () => {
    const validateEmailId = validateEmail(loginDetail.email);
    // const validatePasswords = validatePassword(loginDetail.password);

    let errorEntity = {};
    if (validateEmailId.message) {
      errorEntity = validateEmailId;
    } 
    // else if (validatePasswords.message) {
    //   errorEntity = validatePasswords;
    // }
    setError(errorEntity);
    return errorEntity;
  };

  const onChange = (field, value) => {
    setLoginDetail({ ...loginDetail, [field]: value });
  };

  return (
    <>
      <Grid container className={classes.loginRoot}>
        <Grid item xs={12} md={6} className={classes.leftPanel}>
          <img draggable={false} src={LeftAuthImg} alt="Left Img" />
        </Grid>
        <Grid item xs={12} md={6} className={classes.rightPanel}>
          <form onSubmit={() => {event.preventDefault(); onLogin();}}>
            <Box display="flex" alignItems="center" marginBottom={5}>
              <img draggable={false} src={AuthLogo} alt="Auth Logo" />
              <Typography
                variant="h6"
                gutterBottom
                component="div"
                className={classes.leftSpace}
              >
                Login
              </Typography>
            </Box>
            <Box>
              <TextInput
                // placeholder="email"
                name="email"
                label="email"
                type="email"
                required={true}
                value={loginDetail.email}
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
                required={true}
                value={loginDetail.password}
                error={error.field === 'password' ? true : false}
                errorText={error.field === 'password' && error.message}
                onChange={(event) => onChange('password', event.target.value)}
                InputProps={{
                  endAdornment: (
                    <span onClick={viewPassword}>
                      {!showPassword ? (
                        <VisibilitySharp sx={{ cursor: 'pointer' }} />
                      ) : (
                        <VisibilityOffSharp sx={{ cursor: 'pointer' }} />
                      )}
                    </span>
                  ),
                }}
              />
            </Box>
            <Box paddingTop={2} paddingBottom={10}>
              <NavLink className={classes.forgotLink} to="/forgot-password">
                Forgot Password
              </NavLink>
            </Box>
            <Box paddingLeft={8} paddingRight={8} paddingBottom={3}>
              <LoginButton label="Log In" type="submit" />
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
            <FacebookLogin
              appId="1061606414452237"
              // autoLoad={true}
              fields="name,email,picture"
              callback={onFacebookLogin}
              render={(renderProps) => (
                <img
                  draggable={false}
                  onClick={renderProps.onClick}
                  height={50}
                  className={classes.fbBtn}
                  src={FbLogo}
                  alt="Auth Logo"
                />
              )}
              cssClass="my-facebook-button-class"
              icon="fa-facebook"
            />

            <GoogleLogin
              clientId="338546627001-b8hob44mdh00gsgnjlc3fuhleilr9mpg.apps.googleusercontent.com"
              render={(renderProps) => (
                <img
                  draggable={false}
                  height={75}
                  src={GmailLogo}
                  className={classes.googleBtn}
                  alt="Auth Logo"
                  onClick={renderProps.onClick}
                />
              )}
              onSuccess={onGoogleLogin}
              onFailure={onGoogleLogin}
              cookiePolicy={'single_host_origin'}
            />
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
              Not a member yet?
            </Typography>
            <NavLink to="/register" className={classes.signText}>
              Sign Up here
            </NavLink>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
