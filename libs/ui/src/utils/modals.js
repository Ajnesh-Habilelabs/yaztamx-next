import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid } from '@mui/material';
import colors from '../theme/color';

const style = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: colors.themGray,
  border: '1px solid' + colors.secondary,
  boxShadow: 24,
  borderRadius: 5,
  p: 4,
  cursor: "pointer"
};

const Modals = (props) => {
  const { showModal, handleModal, acceptOffer } = props;

  return (
    <div>
      <Modal
        open={showModal}
        onClose={handleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            textAlign="center"
          >
            Your offer is binding upon acceptance. Are you sure you want to
            proceed?
          </Typography>
          <Grid container>
            <Grid item md={6} sm={6}>
              <Typography
                onClick={acceptOffer}
                mt={4}
                textAlign="center"
                variant="h6"
                component="h2"
                sx={{ borderRight: '1px solid #DE8706' }}
              >
                YES
              </Typography>
            </Grid>
            <Grid item md={6} sm={6}>
              <Typography
                onClick={() => handleModal()}
                mt={4}
                textAlign="center"
                variant="h6"
                component="h2"
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

export default Modals;
