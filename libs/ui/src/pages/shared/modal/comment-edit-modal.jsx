import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateThisComment } from '../../../../../../libs/store/src/api/forums/action';
import { Grid, Typography, Modal, Box, TextField, Button } from '@mui/material';
import color from '../../../theme/color';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import style from './style';

const CommentEditModal = (props) => {
  const { open, setOpen, commentData, postId } = props;
  const { data, commentId } = commentData;
  const dispatch = useDispatch();
  const classes = style();

  const [commentText, setCommentText] = useState('');
  useEffect(() => {
    setCommentText(data);
  }, [data]);
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event) => {
    setCommentText(event.target.value);
  };
  const onSubmit = () => {
    const payload = {
      comment: commentText,
    };
    dispatch(updateThisComment(commentId, payload, setOpen, postId));
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
            Edit Reply
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Best practice and advice for your peers
          </Typography>
        </Grid>
        <Grid>
          <TextField
            id="outlined-multiline-static"
            // label="Multiline"
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
            sx={{ color: color.greyColor, width: '150px' }}
            onClick={handleClose}
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
            Update reply
          </Button>
        </Grid>
      </Box>
    </Modal>
  );
};

export default CommentEditModal;
