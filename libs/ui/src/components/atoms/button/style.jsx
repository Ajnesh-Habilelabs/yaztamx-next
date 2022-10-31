import makeStyles from '@mui/styles/makeStyles';
import color from './../../../theme/color';
import fontStyle from './../../../theme/font';

const style = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    marginLeft: '0px',
    width: '100%',
    '@media (max-width: 767px)': {
      marginRight: 0,
    },
  },
  buttonCss: {
    textTransform: 'uppercase',
    justifyContent: 'center',
    color: color.white,
    fontSize: 20,
    lineHeight: '54px',
    background: color.primary,
    fontFamily: fontStyle.primaryFontFamily,
    fontWeight: 'normal',
  },
  receipeDropdown: {
    minWidth: '150px !important',
    maxWidth: '180px !important',
    width: '150px !important',
    marginRight: 0,
    '@media (max-width: 767px)': {
      width: '100% !important',
      minWidth: '100% !important',
    },
    '& button': {
      width: '100% !important',
    },
  },
}));

export default style;
