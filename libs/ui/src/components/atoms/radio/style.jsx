import makeStyles from '@mui/styles/makeStyles';

const style = makeStyles(() => ({
  formControlLabel: {
    fontSize: 16,
    '& span.MuiFormControlLabel-label ': {
      color: '#000',
      fontSize: 16,
      fontFamily: 'DINNextLTPro-Bold',
      letterSpacing: 2,
    },
    '& .MuiIconButton-colorSecondary': {
      color: '#000',
      '&.Mui-checked': {
        color: '#019491',
      },
    },
  },
  labelGroup: {
    flexDirection: 'row',
    padding: '10px 0',
  },
}));

export default style;