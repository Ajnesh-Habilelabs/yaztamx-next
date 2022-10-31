/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { Grid, Typography } from '@mui/material';
import style from './style';
import TermsCondImg from './../../assets/images/terms-cond-img.png';
import { useDispatch, useSelector } from 'react-redux';
import { getPolicyContent } from '../../../../store/src/api/core/action';
import { getLocalStorage } from 'libs/store/src/redux/localStore';
import ReactMarkdown from 'react-markdown';

const TermsConditions = () => {
  const dispatch = useDispatch();
  const classes = style();

  React.useEffect(() => {
    dispatch(getPolicyContent('terms-conditions', 'sp'));
  }, []);

  const policyContent = useSelector((state) => state.core.policyContent);

  return (
    <>
      <Grid container className={classes.commonRoot} alignItems="center">
        <Grid item sm={5} paddingBottom={12} paddingTop={5} paddingLeft={10}>
          <img draggable={false} src={TermsCondImg} alt="profile-icon" />
        </Grid>
        <Grid item sm={7} alignItems="center">
          <Typography
            variant="h6"
            gutterBottom
            component="div"
            className={classes.innerHeading}
          >
            Terms & conditions
          </Typography>
        </Grid>
        <Grid item sm={12} paddingBottom={5}>
          {/* <Typography
            variant="h6"
            gutterBottom
            component="div"
            className={classes.innerPagePara}
          > */}
          <ReactMarkdown
            className={classes.reactMarkdown}
          >
            {policyContent
              ? policyContent?.description
              : 'Content Coming Soon!'}
          </ReactMarkdown>
          {/* </Typography> */}
        </Grid>
      </Grid>
    </>
  );
};

export default TermsConditions;
