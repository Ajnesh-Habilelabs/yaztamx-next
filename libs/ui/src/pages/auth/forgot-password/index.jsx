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
import { forgetPassword } from '../../../../../store/src/api/auth/action';
import { useDispatch } from 'react-redux';
import { validateEmail } from '../../../utils/validation';
import { useNavigate, NavLink } from 'react-router-dom';

const initialError = { field: '', message: '' };

const ForgotPassWord = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const classes = style();

  const [email, setEmail] = useState();
  const [error, setError] = useState(initialError);

  const onForget = () => {
    const errorEntity = { ...onValidate() };
    if (Object.keys(errorEntity).length === 0) {
      dispatch(forgetPassword({ email: email }, navigate, null, null));
      setEmail('');
    }
  };

  const onValidate = () => {
    const validateEmailId = validateEmail(email);
    let errorEntity = {};
    if (validateEmailId.message) {
      errorEntity = validateEmailId;
    }
    setError(errorEntity);
    return errorEntity;
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
              Forgot Password
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" marginBottom={3}>
            <Typography variant="h6" gutterBottom component="div">
              Verify Email
            </Typography>
          </Box>
          <form
            onSubmit={() => {
              event.preventDefault();
              onForget();
            }}
          >
            <Box>
              <TextInput
                name="Please enter your email"
                label="Please enter your email"
                type="text"
                required={true}
                value={email}
                error={error.field === 'email' ? true : false}
                errorText={error.field === 'email' && error.message}
                onChange={(event) => setEmail(event.target.value)}
              />
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

export default ForgotPassWord;
