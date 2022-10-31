import * as React from 'react';
import Box from '@mui/material/Box';
import { IconButton } from '@mui/material';
import Modal from '@mui/material/Modal';
import { Grid } from '@mui/material';
import colors from '../../../theme/color';
import style from './style';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';

const styles = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: colors.themGray,
  border: '1px solid' + colors.secondary,
  boxShadow: 24,
  borderRadius: 5,
  padding: '8px 32px',
  cursor: 'auto',
  outline: 'unset',
};

const ChangeProviderModal = (props) => {
  const classes = style();
  const { open, setOpen } = props;
  const navigate = useNavigate();
  const searchData = JSON.parse(sessionStorage.getItem('queryData'));
  const [arrangement, setArrangement] = React.useState(
    searchData.living_arrangement
  );
  const [skills, setSkills] = React.useState(searchData.skill);
  const [time, setTime] = React.useState(searchData.preferred_time);

  const handleClose = () => {
    setOpen(false);
  };

  const handleNewSearch = (value, arr) => {
    // var obj = {
    //     living_arrangement: value,
    //     preferred_time: "am",
    //     skill: arr
    //   }
    //   sessionStorage.getI("queryData", JSON.stringify(obj))
    navigate('/find-provider');
  };

  const handleFromSearchResults = () => {
    if (arrangement && skills.length) {
      sessionStorage.setItem(
        'queryData',
        JSON.stringify({
          living_arrangement: arrangement,
          preferred_time: time,
          skill: skills,
        })
      );
      const payload = {
        living_arrangement: arrangement ? arrangement.toUpperCase() : '',
        preferred_time: time ? time.toUpperCase() : '',
        skill: skills
          ? skills.length === 3
            ? skills?.join().toUpperCase() + ',FULL SERVICE'
            : skills?.join().toUpperCase()
          : '',
      };

      navigate('/search-result', { state: { payload: payload } });
      // console.log('payload ::::::::::::::', payload);
    } else if (skills.length == 0) {
      alert('Please Select Any one Skill.');
    } else if (arrangement == '') {
      alert('Please Select Any one Arrangement.');
    }
  };

  const handleFromPastJobs = () => {
    navigate(`/pending-offers`, { state: { changeProvider: true } });
  };
  const handleFromFavorite = () => {
    navigate(`/favorite-providers`, { state: { changeProvider: true } });
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles}>
          <Grid
            container
            sx={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <HighlightOffRoundedIcon
              onClick={handleClose}
              className={classes.closeModalChangeProviderButton}
            />
            <Grid item md={12} sm={12} sx={{ minWidth: '100%' }}>
              <IconButton
                aria-label="new search"
                component="span"
                variant="h6"
                gutterBottom
                onClick={() => {
                  handleNewSearch('livein', [
                    'cleaning',
                    'babysitting',
                    'cooking',
                    'fullService',
                  ]);
                }}
                className={classes.changeProviderOptions}
              >
                Perform a New Search
              </IconButton>
            </Grid>
            <Grid item md={12} sm={12} sx={{ minWidth: '100%' }}>
              <IconButton
                aria-label="new search"
                component="span"
                variant="h6"
                gutterBottom
                onClick={handleFromSearchResults}
                className={classes.changeProviderOptions}
                sx={{ borderBottom: 'unset !important' }}
              >
                Choose from the Search Results
              </IconButton>
            </Grid>
            {/* <Grid item md={12} sm={12} sx={{ minWidth: '100%' }}>
              <IconButton
                aria-label="new search"
                component="span"
                variant="h6"
                gutterBottom
                onClick={handleFromFavorite}
                className={classes.changeProviderOptions}
              >
                Choose from your Favourite Providers
              </IconButton>
            </Grid> */}
            {/* <Grid item md={12} sm={12} sx={{ minWidth: '100%' }}>
              <IconButton
                aria-label="new search"
                component="span"
                variant="h6"
                gutterBottom
                onClick={handleFromPastJobs}
                sx={{ borderBottom: 'unset !important' }}
                className={classes.changeProviderOptions}
              >
                Choose from your Past Jobs
              </IconButton>
            </Grid> */}
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default ChangeProviderModal;
