/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { Grid } from '@mui/material';
import HeaderComponent from './../header';
import FooterComponent from './../footer';
import style from './style';

const Wrapper = ({ content }) => {
  const classes = style();

  return (
    <Grid container>
      <HeaderComponent />
      <Grid className={classes.container}>{content}</Grid>
      <FooterComponent />
    </Grid>
  );
};

export default Wrapper;
