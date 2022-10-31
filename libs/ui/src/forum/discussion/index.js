import React, { useState, useEffect } from 'react';
import { Grid, Typography, Button, Modal, Box, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MUIRichTextEditor from 'mui-rte';
import User1 from '../../assets/images/1.jpeg';
import color from '../../theme/color';
// import User2 from '../../assets/images/2.jpeg';
// import User3 from '../../assets/images/3.jpeg';
// import User4 from '../../assets/images/4.jpeg';
// import User5 from '../../assets/images/5.jpeg';
// import User6 from '../../assets/images/6.jpeg';
// import User7 from '../../assets/images/7.jpeg';
// import User8 from '../../assets/images/8.jpeg';
// import User9 from '../../assets/images/9.jpeg';
// import User10 from '../../assets/images/10.jpeg';
import { useNavigate } from 'react-router-dom';
import style from './style';
import { useSearchParams, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import BasicPagination from '../../components/atoms/pagination';
import {
  fetchPostList,
  postNewPost,
} from '../../../../../libs/store/src/api/forums/action';
import { handleDateTime } from '../comments';
import RedirectToProfile from '../RedirectToProfile';
import DummyProfile from '../../assets/images/profile-icon.svg';
import { getLocalStorage } from 'libs/store/src/redux/localStore';
import PostModal from '../../pages/shared/modal/post-modal';

// This is the modal used in this page
// const PostModal = (props) => {
//   const { open, setOpen, categoryId } = props;
//   const dispatch = useDispatch();

//   const [postHeading, setPostHeading] = useState('');
//   const [postBody, setPostBody] = useState('');
//   const handleClose = () => {
//     setOpen(false);
//   };
//   const handlePostHeading = (event) => {
//     setPostHeading(event.target.value);
//   };
//   const handlePostBody = (event) => {
//     setPostBody(event.target.value);
//   };
//   const onSubmit = () => {
//     const payload = {
//       categoryId: categoryId,
//       postSubject: postHeading,
//       postBody: postBody,
//     };
//     dispatch(postNewPost(payload, setOpen));
//   };

//   useEffect(() => {
//     console.log('This is the post body: ', postBody);
//   }, [postBody]);
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
//             New Post
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
//             placeholder="Please write your thoughts here..."
//             multiline
//             rows={12}
//             defaultValue=""
//             sx={{ width: '100%', mt: 1, mb: 2 }}
//             onChange={handlePostBody}
//             value={postBody}
//           />
//           {/* </TextField> */}
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

const Discussion = (props) => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const classes = style();
  const { categoryId } = location.state;
  // const [searchParams] = useSearchParams();
  const dataFromStore = useSelector((state) => state.forums);
  const [toggleModal, setToggleModal] = useState(false);
  // console.log("categoryId ==> ", categoryId)
  // const data = dataFromStore.postListData
  // const listData = data.postList;

  const [page, setPage] = useState(1);
  const [data, setData] = useState({});
  const [listData, setListData] = useState([]);
  const handleOpenModal = () => setToggleModal(true);
  const userData = getLocalStorage('userData');

  const getPostsList = () => {
    if (page && categoryId) {
      // console.log('executing');
      dispatch(fetchPostList(categoryId, 5, page));
      // console.log('executed');
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getPostsList();
  }, [page, categoryId]);

  useEffect(() => {
    // console.log(dataFromStore);
    setData(dataFromStore.postListData);
  }, [dataFromStore]);

  useEffect(() => {
    setListData(data.postList);
  }, [data]);

  return (
    <Grid className={classes.container}>
      {listData?.length !== 0 ? (
        <>
          <Grid
            className={classes.arrangBtn}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'right',
            }}
          >
            {((categoryId === 2 && userData.userRole === 'CUSTOMER') ||
              (categoryId === 3 && userData.userRole === 'PROVIDER')) && (
              <Button variant="contained" onClick={handleOpenModal}>
                New Post
              </Button>
            )}
          </Grid>
          {listData?.map((item) => (
            <div
              key={item.postId}
              onClick={() =>
                navigate('/comments', {
                  state: { postId: item?.postId, categoryId: categoryId },
                })
              }
            >
              <Grid container className={classes.subContainer}>
                <Grid item md={0.7} sm={1}>
                  <RedirectToProfile
                    title={
                      <img
                        draggable={false}
                        className={classes.userIcon}
                        src={item?.profileImage || DummyProfile}
                        alt="profile-icon"
                      />
                    }
                    userId={item?.userId}
                  />
                </Grid>
                <Grid item md={9} sm={9}>
                  <Typography className={classes.title}>
                    {item.postSubject}
                  </Typography>
                  <div className={classes.subSec}>
                    <Typography className={classes.by}>by</Typography>
                    <Typography className={classes.name}>
                      <RedirectToProfile
                        title={item?.name}
                        userId={item?.userId}
                      />
                    </Typography>
                    <Typography className={classes.by}>
                      on {handleDateTime(item.postDateTime, 'd')}
                    </Typography>
                    {/* <Typography className={classes.by}>
                  • Latest post at{' '}
                  {handleDateTime(item?.lastReplyDateTime, 't')} by
                </Typography>
                <Typography className={classes.postBy}>{item.name}</Typography> */}
                  </div>
                </Grid>
                <Grid item md={1} sm={1}>
                  <Typography className={classes.count}>
                    {item.repliesCount}
                  </Typography>
                  <Typography className={classes.reply}>Reply</Typography>
                </Grid>
                <Grid item md={1} sm={1}>
                  <Typography className={classes.count}>
                    {item?.upvotes}
                  </Typography>
                  <Typography className={classes.reply}>Upvotes</Typography>
                </Grid>
                {/* <Grid item md={1} sm={1}>
              <Typography className={classes.count}>{item.views}</Typography>
              <Typography className={classes.reply}>Views</Typography>
            </Grid> */}
              </Grid>
            </div>
          ))}
          <BasicPagination
            count={data.lastPage}
            page={page}
            setPage={setPage}
          />
        </>
      ) : (
        <>
          <Grid sx={{ padding: '159px' }}>
            Nothing here...
            <Grid
              className={classes.arrangBtn}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'left',
                marginTop: '10px',
              }}
            >
              {((categoryId === 2 && userData.userRole === 'CUSTOMER') ||
                (categoryId === 3 && userData.userRole === 'PROVIDER')) && (
                <Button variant="contained" onClick={handleOpenModal}>
                  Create a New Post
                </Button>
              )}
            </Grid>
          </Grid>
        </>
      )}
      <PostModal
        open={toggleModal}
        setOpen={setToggleModal}
        categoryId={categoryId}
      />
    </Grid>
  );
};

export default Discussion;
