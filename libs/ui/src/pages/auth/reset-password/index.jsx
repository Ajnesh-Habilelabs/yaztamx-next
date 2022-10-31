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
import { changePassword } from '../../../../../store/src/api/auth/action';
import { useDispatch } from 'react-redux';
import { VisibilitySharp, VisibilityOffSharp } from '@mui/icons-material';
import {
  validatePassword,
  validateConfirmPass,
  validateRequiredField,
} from '../../../utils/validation';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';

const initialState = {
  password: '',
  passwordConfirmation: '',
  code: '',
};
const initialError = { field: '', message: '' };

const ForgotPassWord = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const classes = style();

  const [passwordDetail, setPasswordDetail] = useState(initialState);
  const [error, setError] = useState(initialError);
  const [viewOldPassword, setViewOldPassword] = useState(true);
  const [viewNewPassword, setViewNewPassword] = useState(true);
  const [viewConfirmPassword, setViewConfirmPassword] = useState(true);

  const onReset = () => {
    const errorEntity = { ...onValidate() };
    if (Object.keys(errorEntity).length === 0) {
      dispatch(
        changePassword(
          {
            email: location.state.email,
            code: passwordDetail.code,
            password: passwordDetail.password,
            passwordConfirmation: passwordDetail.passwordConfirmation,
          },
          navigate,
          null,
          null,
          null
        )
      );
      setPasswordDetail(initialState);
    }
  };

  const onValidate = () => {
    const validatePasswords = validatePassword(passwordDetail.password);
    const validateConfirmPasswords = validateConfirmPass(
      passwordDetail.password,
      passwordDetail.passwordConfirmation
    );

    const validateCode = validateRequiredField(
      'code',
      passwordDetail.code,
      'Code'
    );

    let errorEntity = {};
    if (validatePasswords.message) {
      errorEntity = validatePasswords;
    } else if (validateConfirmPasswords.message) {
      errorEntity = validateConfirmPasswords;
    } else if (validateCode.message) {
      errorEntity = validateCode;
    }
    setError(errorEntity);
    return errorEntity;
  };

  const onChange = (field, value) => {
    setPasswordDetail({ ...passwordDetail, [field]: value });
  };

  const viewPassword = (type) => {
    const types = {
      [0]: [viewOldPassword, setViewOldPassword],
      [1]: [viewNewPassword, setViewNewPassword],
      [2]: [viewConfirmPassword, setViewConfirmPassword],
    };
    types[type][1](!types[type][0]);
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
              Reset Password
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" marginBottom={3}>
            <Typography variant="h6" gutterBottom component="div">
              Please reset your password
            </Typography>
          </Box>
          <form
            onSubmit={() => {
              event.preventDefault();
              onReset();
            }}
          >
            <Box>
              <TextInput
                name="New Password"
                label="New Password"
                type={viewNewPassword ? 'password' : 'text'}
                value={passwordDetail.password}
                required={true}
                error={error.field === 'password' ? true : false}
                errorText={error.field === 'password' && error.message}
                onChange={(event) => onChange('password', event.target.value)}
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
            </Box>
            <Box>
              <TextInput
                name="Confirm Password"
                label="Confirm Password"
                type={viewConfirmPassword ? 'password' : 'text'}
                value={passwordDetail.passwordConfirmation}
                required={true}
                error={error.field === 'confirmPassword' ? true : false}
                errorText={error.field === 'confirmPassword' && error.message}
                onChange={(event) =>
                  onChange('passwordConfirmation', event.target.value)
                }
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
              <Box>
                <TextInput
                  name="Code"
                  label="Code"
                  type={viewOldPassword ? 'password' : 'text'}
                  value={passwordDetail.code}
                  required={true}
                  error={error.field === 'code' ? true : false}
                  errorText={error.field === 'code' && error.message}
                  onChange={(event) => onChange('code', event.target.value)}
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
              </Box>
            </Box>
            <Box
              paddingTop={5}
              paddingLeft={8}
              paddingRight={8}
              paddingBottom={3}
            >
              <LoginButton label="Submit" type="submit" />
            </Box>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default ForgotPassWord;
