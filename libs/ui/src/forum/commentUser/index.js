import React, { useEffect, useState } from 'react';
import { Grid, Typography, Modal, Box, TextField, Button } from '@mui/material';
import color from '../../theme/color';
// import User1 from '../../assets/images/3.jpeg';
import style from './style';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { useNavigate, useLocation } from 'react-router-dom';
import { handleDateTime } from '../comments';
import {
  deleteThisPost,
  likeUnlikePost,
  postComment,
  updateThisPost,
} from '../../../../../libs/store/src/api/forums/action';
import { useDispatch } from 'react-redux';
import RedirectToProfile from '../RedirectToProfile';
import DummyProfile from '../../assets/images/profile-icon.svg';
import { getLocalStorage } from 'libs/store/src/redux/localStore';
import PostEditModal from '../../pages/shared/modal/post-edit-modal';
import CommentModal from '../../pages/shared/modal/comment-modal';
import ConfirmModal from '../../pages/shared/modal';

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

// const PostEditModal = (props) => {
//   const { open, setOpen, postId, data } = props;
//   const dispatch = useDispatch();

//   const [postHeading, setPostHeading] = useState('');
//   const [postBody, setPostBody] = useState('');
//   const handleClose = () => {
//     setOpen(false);
//   };
//   useEffect(() => {
//     setPostHeading(data.heading);
//     setPostBody(data.body);
//   }, [data]);
//   const handlePostHeading = (event) => {
//     setPostHeading(event.target.value);
//   };
//   const handlePostBody = (event) => {
//     setPostBody(event.target.value);
//   };
//   const onSubmit = () => {
//     const payload = {
//       postSubject: postHeading,
//       postBody: postBody,
//     };
//     dispatch(updateThisPost(postId, payload, setOpen));
//     setPostHeading('');
//     setPostBody('');
//   };

//   return (
//     <Modal
//       open={open}
//       // onClose={handleClose}
//       aria-labelledby="modal-modal-title"
//       aria-describedby="modal-modal-description"
//     >
//       <Box
//         sx={{
//           position: 'absolute',
//           top: '50%',
//           left: '50%',
//           transform: 'translate(-50%, -50%)',
//           width: '90%',
//           height: 'fit-content',
//           bgcolor: 'background.paper',
//           boxShadow: 24,
//           p: 2,
//           borderRadius: '10px',
//         }}
//       >
//         <Grid
//           sx={{
//             mb: 2,
//             background: color.primary,
//             color: color.white,
//             pl: 2,
//             pr: 2,
//             pt: 1,
//             pb: 1,
//             borderTopLeftRadius: 5,
//             borderTopRightRadius: 5,
//           }}
//         >
//           <Typography id="modal-modal-title" variant="h6" component="h1">
//             Edit Post
//           </Typography>
//           <Typography id="modal-modal-description" sx={{ mt: 1 }}>
//             Best practice and advice for your peers
//           </Typography>
//         </Grid>
//         <Grid>
//           <TextField
//             id="outlined-multiline-static"
//             label="Title"
//             // multiline
//             // rows={4}
//             defaultValue=""
//             sx={{ width: '100%' }}
//             onChange={handlePostHeading}
//             value={postHeading}
//           />
//           {/* <MUIRichTextEditor
//               // id="muirte"
//               label="Start typing..."
//               onChange={handlePostBodyRTE}
//               defaultValue={postBody}
//             /> */}
//           <TextField
//             id="outlined-multiline-static"
//             // label=""
//             multiline
//             rows={12}
//             defaultValue=""
//             sx={{ width: '100%', mt: 1, mb: 2 }}
//             onChange={handlePostBody}
//             value={postBody}
//           />
//         </Grid>
//         <Grid
//           sx={{
//             display: 'flex',
//             flexDirection: 'row',
//             justifyContent: 'right',
//             gap: 2,
//           }}
//         >
//           <Button
//             onClick={handleClose}
//             sx={{ color: color.greyColor, width: '150px' }}
//           >
//             Cancel
//           </Button>
//           <Button
//             variant="contained"
//             onClick={onSubmit}
//             sx={{
//               backgroundColor: color.primary,
//               color: color.white,
//               borderRadius: 10,
//               width: '150px',
//             }}
//           >
//             Update
//           </Button>
//         </Grid>
//       </Box>
//     </Modal>
//   );
// };

// const CommentModal = (props) => {
//   const { open, setOpen, postId } = props;
//   const dispatch = useDispatch();

//   const [commentText, setCommentText] = useState('');
//   const handleClose = () => {
//     setOpen(false);
//   };
//   const handleChange = (event) => {
//     setCommentText(event.target.value);
//   };
//   const onSubmit = () => {
//     const payload = {
//       postId: postId,
//       comment: commentText,
//     };
//     dispatch(postComment(payload, setOpen));
//     setCommentText('');
//   };
//   return (
//     <Modal
//       open={open}
//       // onClose={handleClose}
//       aria-labelledby="modal-modal-title"
//       aria-describedby="modal-modal-description"
//     >
//       <Box
//         sx={{
//           position: 'absolute',
//           top: '50%',
//           left: '50%',
//           transform: 'translate(-50%, -50%)',
//           width: '70%',
//           height: 'fit-content',
//           bgcolor: 'background.paper',
//           boxShadow: 24,
//           p: 2,
//           borderRadius: '10px',
//         }}
//       >
//         <Grid
//           sx={{
//             mb: 2,
//             background: color.primary,
//             color: color.white,
//             pl: 2,
//             pr: 2,
//             pt: 1,
//             pb: 1,
//             borderTopLeftRadius: 5,
//             borderTopRightRadius: 5,
//           }}
//         >
//           <Typography id="modal-modal-title" variant="h6" component="h2">
//             Reply
//           </Typography>
//           <Typography id="modal-modal-description" sx={{ mt: 1 }}>
//             Best practice and advice for your peers
//           </Typography>
//         </Grid>
//         <Grid>
//           <TextField
//             id="outlined-multiline-static"
//             // label="Multiline"
//             placeholder="Please write your reply here..."
//             multiline
//             rows={8}
//             defaultValue=""
//             sx={{ width: '100%', mt: 1, mb: 2 }}
//             onChange={handleChange}
//             value={commentText}
//           />
//         </Grid>
//         <Grid
//           sx={{
//             display: 'flex',
//             flexDirection: 'row',
//             justifyContent: 'right',
//             gap: 2,
//           }}
//         >
//           <Button
//             onClick={handleClose}
//             sx={{ color: color.greyColor, width: '150px' }}
//           >
//             Cancel
//           </Button>
//           <Button
//             variant="contained"
//             onClick={onSubmit}
//             sx={{
//               backgroundColor: color.primary,
//               color: color.white,
//               borderRadius: 10,
//               width: '150px',
//             }}
//           >
//             Submit
//           </Button>
//         </Grid>
//       </Box>
//     </Modal>
//   );
// };

const CommentUser = (props) => {
  let navigate = useNavigate();
  const { data, categoryId } = props;
  const dispatch = useDispatch();
  const location = useLocation();
  const classes = style();
  const userData = getLocalStorage('userData');
  const isAuthenticated = getLocalStorage('Token') ? true : false;

  const [postData, setPostData] = useState({});
  const [toggleModal, setToggleModal] = useState(false);
  const [toggleEditModal, setToggleEditModal] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [confirmModalData, setConfirmModalData] = useState({});

  useEffect(() => {
    setPostData(data?.post);
    // console.log("data.post ++++++++++++++++++???????????????", data.post?.profileImage)
  }, [data]);

  const handleLike = (initialState, postId) => {
    var payload;
    if (initialState !== undefined) {
      payload = {
        postId: postId,
        isLike: !initialState,
      };
    } else {
      payload = {
        postId: postId,
        isLike: true,
      };
    }
    dispatch(likeUnlikePost(payload));
    // console.log()
  };

  const deletePost = (postId) => {
    setConfirmModalData({
      message: 'Are you sure you want to delete this post?',
      object: {
        type: 'delete',
        deleteWhat: 'post',
        firstId: postId,
        secondId: categoryId,
        method: deleteThisPost,
      },
    });
    setConfirmModalOpen(true);
    // const bang = confirm('Are you sure you want to delete this post ?');
    // if (bang) {
    //   dispatch(deleteThisPost(postId, categoryId, navigate));
    // }
  };

  return (
    <Grid className={classes.container}>
      <Grid container>
        <Grid item md={0.7} sm={0.7}>
          <RedirectToProfile
            title={
              <img
                draggable={false}
                className={classes.userIcon}
                src={postData?.profileImage || DummyProfile}
                alt=""
              />
            }
            userId={postData?.userId}
          />
        </Grid>
        <Grid item md={10} sm={10}>
          <Typography className={classes.name}>
            <RedirectToProfile
              title={postData?.name}
              userId={postData?.userId}
            />
          </Typography>
          <Typography className={classes.by}>{postData?.userRole}</Typography>
        </Grid>
        {userData?.id === postData?.userId && (
          <Grid item md={1.3} sm={1.3} className={classes.row}>
            <Typography className={classes.by}>
              <Button
                variant="text"
                onClick={() => {
                  setToggleEditModal(true);
                }}
                sx={{
                  backgroundColor: color.primary,
                  color: color.white,
                  borderRadius: 10,
                  width: '100px',
                }}
              >
                Edit
              </Button>
            </Typography>
            <Typography className={classes.by}>
              <Button
                variant="text"
                onClick={deletePost.bind(this, postData?.postId)}
                sx={{
                  backgroundColor: color.red,
                  color: color.white,
                  borderRadius: 10,
                  width: '100px',
                }}
              >
                Delete
              </Button>
            </Typography>
            <DragIndicatorIcon />
          </Grid>
        )}
      </Grid>

      <Grid container>
        <Grid item md={12} sm={12}>
          <div className={classes.subSec}>
            <Typography className={classes.by}>
              {handleDateTime(postData?.postDateTime, 'd')} •{' '}
            </Typography>
            <Typography className={classes.by}>
              {handleDateTime(postData?.postDateTime, 't')}
            </Typography>
            {/* <Typography className={classes.by}>Edited • </Typography>
            <Typography className={classes.by}>May 14, 2022 • </Typography>
            <Typography className={classes.by}>10:52 PM by</Typography>
            <Typography className={classes.postBy}>Pradeep H</Typography> */}
          </div>
          <Typography className={classes.title}>
            {postData?.postSubject}
          </Typography>
        </Grid>
        <Grid item md={12} sm={12}>
          <Typography
            className={classes.reply}
            paragraph={true}
            variant="body1"
            style={{ whiteSpace: 'pre-line' }}
          >
            {postData?.postBody}
          </Typography>
        </Grid>
      </Grid>

      <Grid container sx={{ mt: 8 }}>
        <Grid
          item
          md={10}
          sm={10}
          className={classes.row}
          sx={{ justifyContent: 'left !important' }}
        >
          {postData?.isLiked !== undefined && (
            <div
              className={classes.thumbBg}
              onClick={() => handleLike(postData?.isLiked, postData?.postId)}
            >
              <ThumbUpIcon
                style={postData?.isLiked ? { color: color.primary } : {}}
              />
            </div>
          )}
          <Typography className={classes.votes}>
            {postData?.upvotes} Upvotes
          </Typography>
        </Grid>
        {/* <Grid item md={2} sm={2} onClick={() => navigate('/profile-forum')}> */}
        {console.log(
          'Please  ===========================> isAuthenticated:',
          isAuthenticated
        )}
        {isAuthenticated && (
          <Grid item md={2} sm={2} onClick={() => setToggleModal(true)}>
            <Typography className={classes.replies}>Reply</Typography>
          </Grid>
        )}
      </Grid>
      {console.log(' postData?.postId:', postData?.postId)}
      <PostEditModal
        open={toggleEditModal}
        setOpen={setToggleEditModal}
        postId={postData?.postId}
        data={{ heading: postData?.postSubject, body: postData?.postBody }}
      />
      <CommentModal
        open={toggleModal}
        setOpen={setToggleModal}
        postId={postData?.postId}
      />

      <ConfirmModal
        open={confirmModalOpen}
        setOpen={setConfirmModalOpen}
        data={confirmModalData}
        setData={setConfirmModalData}
      />
    </Grid>
  );
};

export default CommentUser;
