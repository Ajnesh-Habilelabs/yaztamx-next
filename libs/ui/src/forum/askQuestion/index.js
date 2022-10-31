import { Grid, Typography } from '@mui/material';
import React from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ChatIcon from '@mui/icons-material/Chat';
import CheckIcon from '@mui/icons-material/Check';
import style from './style';
import User1 from '../../assets/images/user-icon.png';

const AskQuestion = () => {
  const classes = style();
  return (
    <Grid>
      <Grid className={classes.aboutSec} marginTop={2}>
        <Typography className={classes.about}>About Allie K</Typography>
      </Grid>
      <Grid className={classes.contain}>
        <Grid container className={classes.container}>
          <Grid item sm={3} md={1}>
            <img draggable={false} className={classes.userIcon} src={User1} alt="profile-icon" />
          </Grid>
          <Grid item sm={7} md={10}>
            <Typography className={classes.member}>Member</Typography>
            <Typography className={classes.name}>Allie K</Typography>
            <Typography className={classes.by}>
              Member Since: Jan 24, 2017
            </Typography>
            <Typography className={classes.last}>
              Last visited: a moment ago
            </Typography>
            <Typography className={classes.profile}>
              Profile Not Public
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={4}
        paddingBottom={10}
        className={classes.mainContainer}
      >
        <Grid item sm={3} md={3} className={classes.row}>
          <ChatIcon sx={{ color: '#3D99A7', fontSize: 40 }} />
          <Typography className={classes.votes}>0 Posts</Typography>
        </Grid>
        <Grid item sm={3} md={3} className={classes.row}>
          <ThumbUpIcon sx={{ color: '#3D99A7', fontSize: 40 }} />
          <Typography className={classes.votes}>0 Upvotes</Typography>
        </Grid>
        <Grid item sm={3} md={3} className={classes.row}>
          <CheckIcon sx={{ color: '#3D99A7', fontSize: 40 }} />
          <Typography className={classes.votes}>0 Solutions</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AskQuestion;
