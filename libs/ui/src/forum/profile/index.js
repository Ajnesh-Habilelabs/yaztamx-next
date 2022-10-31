import React from 'react';
import { Grid, Typography } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ChatIcon from '@mui/icons-material/Chat';
import CheckIcon from '@mui/icons-material/Check';
import style from './style';
import User1 from '../../assets/images/user-icon.png';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfileForums } from '../../../../../libs/store/src/api/forums/action';
import DummyProfile from '../../assets/images/profile-icon.svg';

const dtaa = {
  "id": 111,
  "userRole": "CUSTOMER",
  "name": "Muskan Client",
  "profileImage": "https://vasttestdata.s3.us-west-1.amazonaws.com/image/111-1658119983624-index.jpeg?AWSAccessKeyId=AKIAQ5WDBYNBJHMCTQ57&Expires=1689655983&Signature=U8N9siJZDrC%2BV7uax%2FEMCSi7H10%3D",
  "posts": 24,
  "upvotes": 13,
  "replies": 17
}


const Profile = () => {
  const classes = style();
  const location = useLocation();
  const { userId } = location.state;
  const dispatch = useDispatch();
  const dataFromStore = useSelector((state) => state.forums);
  const [userDetails, setUserDetails] = React.useState({});

  React.useEffect(() => {
    dispatch(getUserProfileForums(userId))
  }, [userId])

  React.useEffect(() => {
    setUserDetails(dataFromStore.currentUserProfile);
  }, [dataFromStore])

  return (
    <Grid>
      <Grid className={classes.aboutSec} marginTop={2}>
        <Typography className={classes.about}>About Allie K</Typography>
      </Grid>
      <Grid className={classes.contain}>
        <Grid container className={classes.container}>
          <Grid item sm={3} md={1}>
            <img draggable={false} className={classes.userIcon} src={userDetails?.profileImage || DummyProfile} alt="profile-icon" />
          </Grid>
          <Grid item sm={7} md={10}>
            <Typography className={classes.member}>{userDetails?.userRole}</Typography>
            <Typography className={classes.name}>{userDetails?.name}</Typography>
            {/* <Typography className={classes.by}>
              Member Since: Jan 24, 2017
            </Typography> */}
            {/* <Typography className={classes.last}>
              Last visited: a moment ago
            </Typography> */}
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
          <Typography className={classes.votes}>{userDetails?.posts} Posts</Typography>
        </Grid>
        <Grid item sm={3} md={3} className={classes.row}>
          <ThumbUpIcon sx={{ color: '#3D99A7', fontSize: 40 }} />
          <Typography className={classes.votes}>{userDetails?.upvotes} Upvotes</Typography>
        </Grid>
        <Grid item sm={3} md={3} className={classes.row}>
          <CheckIcon sx={{ color: '#3D99A7', fontSize: 40 }} />
          <Typography className={classes.votes}>{userDetails?.replies} Replies</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Profile;
