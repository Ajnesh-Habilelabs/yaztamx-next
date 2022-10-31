import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateThisPost } from '../../../../../../libs/store/src/api/forums/action';
import { Grid, Typography, Modal, Box, TextField, Button } from '@mui/material';
import color from '../../../theme/color';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import style from './style'

const PostEditModal = (props) => {
  const { open, setOpen, postId, data } = props;
  const dispatch = useDispatch();
  const classes = style();

  const [postHeading, setPostHeading] = useState('');
  const [postBody, setPostBody] = useState('');
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    setPostHeading(data.heading);
    setPostBody(data.body);
  }, [data]);
  const handlePostHeading = (event) => {
    setPostHeading(event.target.value);
  };
  const handlePostBody = (event) => {
    setPostBody(event.target.value);
  };
  const onSubmit = () => {
    const payload = {
      postSubject: postHeading,
      postBody: postBody,
    };
    dispatch(updateThisPost(postId, payload, setOpen));
    setPostHeading('');
    setPostBody('');
  };

  return (
    <Modal
      open={open}
      // onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          height: 'fit-content',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 2,
          borderRadius: '10px',
          outline: 'unset',
        }}
      >
      <HighlightOffRoundedIcon onClick={handleClose} className={classes.closePostModalButton} />
        <Grid
          sx={{
            mb: 2,
            background: color.primary,
            color: color.white,
            pl: 2,
            pr: 2,
            pt: 1,
            pb: 1,
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h1">
            Edit Post
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Best practice and advice for your peers
          </Typography>
        </Grid>
        <Grid>
          <TextField
            id="outlined-multiline-static"
            label="Title"
            // multiline
            // rows={4}
            defaultValue=""
            sx={{ width: '100%' }}
            onChange={handlePostHeading}
            value={postHeading}
          />
          {/* <MUIRichTextEditor
                // id="muirte"
                label="Start typing..."
                onChange={handlePostBodyRTE}
                defaultValue={postBody}
              /> */}
          <TextField
            id="outlined-multiline-static"
            // label=""
            multiline
            rows={12}
            defaultValue=""
            sx={{ width: '100%', mt: 1, mb: 2 }}
            onChange={handlePostBody}
            value={postBody}
          />
        </Grid>
        <Grid
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'right',
            gap: 2,
          }}
        >
          <Button
            onClick={handleClose}
            sx={{ color: color.greyColor, width: '150px' }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={onSubmit}
            sx={{
              backgroundColor: color.primary,
              color: color.white,
              borderRadius: 10,
              width: '150px',
            }}
          >
            Update
          </Button>
        </Grid>
      </Box>
    </Modal>
  );
};

export default PostEditModal;
