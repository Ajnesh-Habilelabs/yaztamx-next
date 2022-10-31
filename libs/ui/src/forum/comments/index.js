import React from 'react';
import { Grid, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import style from './style';
import CommentUser from '../commentUser';
import CommentReply from '../commentReply';
import { useSelector, useDispatch } from 'react-redux';
import BasicPagination from '../../components/atoms/pagination';
import { fetchPostWithComments, fetchIfLikedOrNot } from '../../../../../libs/store/src/api/forums/action';


export const handleDateTime = (value, type) => {
  const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const timeOptions = { timeZone: 'UTC', timeZoneName: 'short' };
  if (type === "d") {
    return new Date(String(value)).toLocaleDateString(undefined, dateOptions)
  } else if (type === "t") {
    return new Date(String(value)).toLocaleTimeString('en-US', timeOptions)
  }
}
// const data = {
//   post: {
//     postId: 2,
//     userId: 111,
//     userRole: 'CUSTOMER',
//     name: 'Muskan Client',
//     profileImage:
//       'https://vasttestdata.s3.us-west-1.amazonaws.com/image/111-1658119983624-index.jpeg?AWSAccessKeyId=AKIAQ5WDBYNBJHMCTQ57&Expires=1689655983&Signature=U8N9siJZDrC%2BV7uax%2FEMCSi7H10%3D',
//     postSubject: 'Looking for a Pro',
//     postBody: 'I am looking for Babysitting Provider',
//     postDateTime: '2022-05-30T14:38:57.146Z',
//     upvotes: 0,
//     repliesCount: 2,
//   },
//   lastPage: 1,
//   pageNumbers: [1],
//   postReplies: [
//     {
//       id: 7,
//       userId: 111,
//       userRole: 'CUSTOMER',
//       name: 'Muskan Client',
//       profileImage:
//         'https://vasttestdata.s3.us-west-1.amazonaws.com/image/111-1658119983624-index.jpeg?AWSAccessKeyId=AKIAQ5WDBYNBJHMCTQ57&Expires=1689655983&Signature=U8N9siJZDrC%2BV7uax%2FEMCSi7H10%3D',
//       comment: 'khushboo saini',
//       commentDateTime: '2022-06-08T15:24:36.318Z',
//     },
//     {
//       id: 6,
//       userId: 111,
//       userRole: 'CUSTOMER',
//       name: 'Muskan Client',
//       profileImage:
//         'https://vasttestdata.s3.us-west-1.amazonaws.com/image/111-1658119983624-index.jpeg?AWSAccessKeyId=AKIAQ5WDBYNBJHMCTQ57&Expires=1689655983&Signature=U8N9siJZDrC%2BV7uax%2FEMCSi7H10%3D',
//       comment: 'khushboo',
//       commentDateTime: '2022-06-08T13:46:43.265Z',
//     },
//   ],
// };

const Comments = () => {
  const classes = style();
  const dispatch = useDispatch();
  const location = useLocation();
  const { postId, categoryId } = location.state;
  const dataFromStore = useSelector((state) => state.forums)

  const [page, setPage] = React.useState(1);
  const [data, setData] = React.useState({});

  React.useEffect(() => {
    window.scrollTo(0, 0);
    getPostWithcomm();
  }, [page, postId]);

  const getPostWithcomm = async () => {
    dispatch(fetchPostWithComments(postId, 5, page));
  };

  React.useEffect(() => {
    console.log("dataFromStore boy ------------------------------------------", dataFromStore);
    setData(dataFromStore.currentPostWithComments);
  }, [dataFromStore])

  return (
    <>
      <CommentUser data={data} categoryId={categoryId} />
      <Grid container>
        <Grid item md={7} sm={12} className={classes.container}>
          <Typography className={classes.by}>{data?.post?.repliesCount} Reply</Typography>
        </Grid>
        {/* <Grid item md={5} sm={12} className={classes.row}>
          <Typography className={classes.reply}>All Forum Topics</Typography>
          <Typography className={classes.reply}>
            {'< Previous Topic'}
          </Typography>
          <Typography className={classes.reply}>{'Next Topic >'}</Typography>
        </Grid> */}
      </Grid>
      <CommentReply data={data} />
      <BasicPagination count={data?.lastPage} page={page} setPage={setPage} />
    </>
  );
};

export default Comments;
