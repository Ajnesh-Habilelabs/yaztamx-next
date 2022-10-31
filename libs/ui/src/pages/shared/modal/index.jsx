import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid } from '@mui/material';
import colors from '../../../theme/color';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import useMediaQuery from '@mui/material/useMediaQuery';
import style from './style';
import {
  mobile_width,
  tab_width,
  small_screen_width,
  mobile_plus_tab
} from '../../../utils/responsiveness';

const ConfirmModal = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = style();
  const { open, setOpen, data, setData } = props;
  const mobileZone = useMediaQuery(mobile_width);
  const tabZone = useMediaQuery(tab_width);
  const smallScreenZone = useMediaQuery(small_screen_width);
  const mobilePlusTabZone = useMediaQuery(mobile_plus_tab);

  const handleClick = () => {
    switch (data.object.type) {
      case 'delete':
        switch (data.object.deleteWhat) {
          case 'comment':
            dispatch(
              data.object.method(data.object.firstId, data.object.secondId)
            );
            // dispatch(deleteThisComment(commentId, data.post.postId));
            break;
          case 'post':
            dispatch(
              data.object.method(
                data.object.firstId,
                data.object.secondId,
                navigate
              )
            );
            // dispatch(deleteThisPost(postId, categoryId, navigate));
            break;
        }
        break;
      case 'execute':
        switch (data.object.executeWhat) {
          case 'logout':
            dispatch(data.object.method(navigate));
            // dispatch(logout(navigate));
            break;
          case 'terminate-offer':
            dispatch(
              data.object.method(
                data.object.jobOfferId,
                data.object.jobStatus,
                data.object.userId,
                data.object.setOpenModal,
                navigate,
                data.object.providerId
              )
            );
            //   dispatch(
            //     terminateProviderOffer(
            //       jobOfferId,
            //       jobStatus,
            //       userId,
            //       setOpen,
            //       navigate,
            //       data.offered_to
            //     )
            //   );
            break;
          case 'make-the-offer':
            data.object.method();
            break;
        }
        break;
    }
    setOpen(false);
    setData({});
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: !mobilePlusTabZone ? '40%' : '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: !mobilePlusTabZone ? 400 : '70vw',
            bgcolor: colors.themGray,
            border: '1px solid' + colors.secondary,
            boxShadow: 24,
            borderRadius: 5,
            p: !mobilePlusTabZone ? 4 : 2,
            cursor: 'pointer',
            outline: 'unset',
          }}
        >
          <HighlightOffRoundedIcon
            onClick={handleClose}
            className={classes.closeModalChangeProviderButton}
          />
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            textAlign="center"
            className={mobilePlusTabZone && classes.responsiveYesOrNo}
          >
            {data.message}
          </Typography>
          <Grid container sx={{justifyContent: 'center'}}>
            <Grid item md={6} sx={{width: '50%'}}>
              <Typography
                onClick={handleClick}
                mt={mobilePlusTabZone ? 2 : 4}
                textAlign="center"
                variant="h6"
                component="h2"
                className={mobilePlusTabZone && classes.responsiveYesOrNo}
                sx={{ borderRight: '1px solid #DE8706'}}
              >
                YES
              </Typography>
            </Grid>
            <Grid item md={6} sx={{width: '50%'}}>
              <Typography
                onClick={handleClose}
                mt={mobilePlusTabZone ? 2 : 4}
                textAlign="center"
                variant="h6"
                component="h2"
                className={mobilePlusTabZone && classes.responsiveYesOrNo}
              >
                NO
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default ConfirmModal;
