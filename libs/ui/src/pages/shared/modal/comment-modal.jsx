import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { postComment } from '../../../../../../libs/store/src/api/forums/action';
import { Grid, Typography, Modal, Box, TextField, Button } from '@mui/material';
import color from '../../../theme/color';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import style from './style';

const CommentModal = (props) => {
  const { open, setOpen, postId } = props;
  const dispatch = useDispatch();
  const classes = style();

  const [commentText, setCommentText] = useState('');
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event) => {
    setCommentText(event.target.value);
  };
  const onSubmit = () => {
    const payload = {
      postId: postId,
      comment: commentText,
    };
    dispatch(postComment(payload, setOpen));
    setCommentText('');
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
          width: '70%',
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
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Reply
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Best practice and advice for your peers
          </Typography>
        </Grid>
        <Grid>
          <TextField
            id="outlined-multiline-static"
            // label="Multiline"
            placeholder="Please write your reply here..."
            multiline
            rows={8}
            defaultValue=""
            sx={{ width: '100%', mt: 1, mb: 2 }}
            onChange={handleChange}
            value={commentText}
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
            Submit
          </Button>
        </Grid>
      </Box>
    </Modal>
  );
};

export default CommentModal;
