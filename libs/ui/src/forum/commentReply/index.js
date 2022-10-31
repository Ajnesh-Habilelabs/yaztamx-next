import React, { useEffect, useState } from 'react';
import { Grid, Typography, TextField, Button, Modal, Box } from '@mui/material';
import color from '../../theme/color';
import User1 from '../../assets/images/10.jpeg';
import style from './style';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import SiteLogo from '../../assets/images/auth-logo.svg';
import { handleDateTime } from '../comments';
import { useDispatch } from 'react-redux';
import { deleteThisComment } from '../../../../../libs/store/src/api/forums/action';
import RedirectToProfile from '../RedirectToProfile';
import DummyProfile from '../../assets/images/profile-icon.svg';
import { getLocalStorage } from 'libs/store/src/redux/localStore';
import CommentEditModal from '../../pages/shared/modal/comment-edit-modal';
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

// const CommentEditModal = (props) => {
//   const { open, setOpen, commentData, postId } = props;
//   const { data, commentId } = commentData;
//   const dispatch = useDispatch();

//   const [commentText, setCommentText] = useState('');
//   useEffect(() => {
//     setCommentText(data);
//   }, [data]);
//   const handleClose = () => {
//     setOpen(false);
//   };
//   const handleChange = (event) => {
//     setCommentText(event.target.value);
//   };
//   const onSubmit = () => {
//     const payload = {
//       comment: commentText,
//     };
//     dispatch(updateThisComment(commentId, payload, setOpen, postId));
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
//             Edit Reply
//           </Typography>
//           <Typography id="modal-modal-description" sx={{ mt: 1 }}>
//             Best practice and advice for your peers
//           </Typography>
//         </Grid>
//         <Grid>
//           <TextField
//             id="outlined-multiline-static"
//             // label="Multiline"
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
//             sx={{ color: color.greyColor, width: '150px' }}
//             onClick={handleClose}
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
//             Update reply
//           </Button>
//         </Grid>
//       </Box>
//     </Modal>
//   );
// };

const CommentReply = (props) => {
  const classes = style();
  const { data } = props;
  const dispatch = useDispatch();
  const [postReplies, setPostReplies] = React.useState([]);
  const [toggleEditModal, setToggleEditModal] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [confirmModalData, setConfirmModalData] = useState({});
  const [commentData, setCommentData] = useState({});
  const isAuthenticated = getLocalStorage('Token') ? true : false;
  const userData = getLocalStorage('userData');

  React.useEffect(() => {
    setPostReplies(data?.postReplies);
  }, [data]);

  const openEditModal = (commData) => {
    setCommentData(commData);
    setToggleEditModal(true);
  };

  const deleteReply = (commentId) => {
    // setConfirmModalData('Are you sure you want to delete this reply ?');
    // setData({ commentId });
    setConfirmModalData({
      message: 'Are you sure you want to delete this reply?',
      object: {
        type: 'delete',
        deleteWhat: 'comment',
        firstId: commentId,
        secondId: data.post.postId,
        method: deleteThisComment
      }
    })
    setConfirmModalOpen(true);
    // confirm()
  };

  return (
    <>
      {/* {console.log("post before replies working !!!!!", postReplies)} */}
      {postReplies?.map((reply) => (
        <>
          <Grid className={classes.container} key={reply?.id}>
            <Grid container>
              <Grid item md={0.7} sm={0.7}>
                <RedirectToProfile
                  title={
                    <img
                      draggable={false}
                      className={classes.userIcon}
                      src={reply?.profileImage || DummyProfile}
                      alt="profile-icon"
                    />
                  }
                  userId={reply?.userId}
                />
              </Grid>
              <Grid item md={10} sm={10} sx={{ maxWidth: '1000px !important' }}>
                <Typography className={classes.name}>
                  <RedirectToProfile
                    title={reply?.name}
                    userId={reply?.userId}
                  />{' '}
                </Typography>
                <Typography className={classes.by}>
                  {reply?.userRole}
                </Typography>
              </Grid>
              {isAuthenticated && (
                <Grid item md={1.3} sm={1.3} className={classes.row}>
                  <Typography className={classes.by}>
                    {reply?.userId === userData.id && (
                      <Button
                        variant="text"
                        onClick={openEditModal.bind(this, {
                          data: reply?.comment,
                          commentId: reply?.id,
                        })}
                        sx={{
                          backgroundColor: color.primary,
                          color: color.white,
                          borderRadius: 10,
                          width: '100px',
                        }}
                      >
                        Edit
                      </Button>
                    )}
                  </Typography>
                  <Typography className={classes.by}>
                    {(reply?.userId === userData.id ||
                      reply?.userId === data.post.userId) && (
                      <Button
                        variant="text"
                        onClick={deleteReply.bind(this, reply?.id)}
                        sx={{
                          backgroundColor: color.red,
                          color: color.white,
                          borderRadius: 10,
                          width: '100px',
                        }}
                      >
                        Delete
                      </Button>
                    )}
                  </Typography>
                </Grid>
              )}
            </Grid>

            <Grid container>
              <Grid item md={12} sm={12}>
                <div className={classes.subSec}>
                  <Typography className={classes.by}>
                    {handleDateTime(reply?.commentDateTime, 'd')} •{' '}
                  </Typography>
                  <Typography className={classes.by}>
                    {handleDateTime(reply?.commentDateTime, 't')} • by{' '}
                  </Typography>
                  <Typography className={classes.postBy}>
                    <RedirectToProfile
                      title={reply?.name}
                      userId={reply?.userId}
                    />
                  </Typography>
                </div>
                {/* <Typography className={classes.title}>Hi Naveen,</Typography> */}
              </Grid>
              <Grid item md={12} sm={12}>
                <Typography
                  className={classes.reply}
                  paragraph={true}
                  variant="body1"
                  style={{ whiteSpace: 'pre-line' }}
                >
                  {reply?.comment}
                </Typography>
                {/* <Typography className={classes.reply}>Thank You,</Typography> */}
                <Typography className={classes.title}>
                  Thank You, <br />
                  {data?.post?.name}
                </Typography>
              </Grid>
            </Grid>

            <Grid container>
              <Grid item md={10} sm={10} className={classes.row}>
                <img draggable={false} src={SiteLogo} alt="Left Img" height={47} />
                <Typography className={classes.guideline}>Yazta</Typography>
              </Grid>
            </Grid>
          </Grid>{' '}
          <CommentEditModal
            open={toggleEditModal}
            setOpen={setToggleEditModal}
            commentData={commentData}
            postId={data.post.postId}
          />
          <ConfirmModal
            open={confirmModalOpen}
            setOpen={setConfirmModalOpen}
            data={confirmModalData}
            setData={setConfirmModalData}
          />
        </>
      ))}{' '}
    </>
  );
};

export default CommentReply;
