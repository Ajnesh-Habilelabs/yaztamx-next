import React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';

// type={snackbar.type}
// open={snackbar.open}
// message={snackbar.message}

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackbarBackground = (props) => {
  const [messageText, setMessageText] = React.useState('');
  const [openSnack, setOpenSnack] = React.useState(false);
  const [type, setType] = React.useState('');

  const snackbar = useSelector((state) => state.auth.snackbar);

  React.useEffect(() => {
    setMessageText(snackbar.message);
    setType(snackbar.type);
    setOpenSnack(snackbar.open);
  }, [snackbar])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnack(false);
    setMessageText('');
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar
        open={openSnack}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
          {messageText}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default SnackbarBackground;
