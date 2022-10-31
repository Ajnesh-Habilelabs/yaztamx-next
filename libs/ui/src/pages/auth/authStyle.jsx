import makeStyles from '@mui/styles/makeStyles';
import color from './../../theme/color';
import fontStyle from './../../theme/font';

const style = makeStyles((theme) => ({
  loginRoot: {
    background: color.themeLightGray,
    minHeight: '100vh',
    '& div': {
      fontFamily: fontStyle.primaryFontFamily,
    },
    '& input:-webkit-autofill': {
      // color: `${color.primary} !important`,
      // background: `${color.themeLightGray} !important`,
      WebkitBoxShadow: `0 0 0 1000px ${color.themeLightGray} inset`,
      WebKitCSSMatrix: {
        fontFamily: fontStyle.primaryFontFamily,
        fontSize: '18px',
        color: color.primary
      },
    },
    '& input-webkit-text-fill-color': color.primary,
    // '& .MuiFormLabel-filled': {
    //   color: `${color.primary} !important`,
    // }
  },
  leftPanel: {
    background: color.themGray,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '30px 0',
    '& img': {
      maxHeight: 450,
      [theme.breakpoints.down('lg')]: {
        width: '80%',
        maxHeight: 'inherit',
      },
    },
  },
  rightPanel: {
    padding: '50px 90px !important',
    [theme.breakpoints.down('sm')]: {
      padding: '30px 15px !important',
    },
  },
  leftSpace: {
    marginLeft: 21,
    fontSize: 31,
    lineHeight: '31px',
    color: color.primary,
    fontFamily: fontStyle.primaryFontFamily,
  },
  forgotLink: {
    fontSize: 16,
    float: 'right',
    color: color.primary,
    textDecoration: 'none',
    fontFamily: fontStyle.primaryFontFamily,
  },
  signText: {
    textDecoration: 'none',
    fontWeight: 'bold',
    color: color.secondary,
    fontSize: 20,
    fontFamily: fontStyle.primaryFontFamily,
  },
  fbBtn: {
    marginRight: 30,
    cursor: 'pointer',
  },
  googleBtn: {
    cursor: 'pointer',
  },
  dFlex: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
    },
  },
  backBorder: {
    position: 'relative',
    fontFamily: fontStyle.primaryFontFamily,
    '& div': {
      background: color.themeLightGray,
      padding: '0 15px',
      position: 'relative',
      textTransform: 'uppercase',
    },
    '& span': {
      position: 'absolute',
      top: 48,
      left: '10%',
      content: '',
      borderBottom: 'solid 1px ' + color.primary,
      height: 1,
      width: '80%',
    },
  },
  phoneInput: {
    color: '#3D99A7',
    fontSize: '18px',
    borderBottom: '1px solid',
    margin: '15px 0px',
    '& input': {
      color: '#3D99A7',
      padding: '14px',
      fontSize: '18px',
      background: '#FEFBF8',
      border: 'unset',
      fontFamily: 'Montserrat, sans-serif !important',
      '& :focus': {
        border: 'unset',
        outline: 'unset !important',
      },
      '& :focus-visible': {
        border: 'unset',
        outline: 'unset !important',
      },
    },
    '& :focus-visible': {
      border: 'unset',
      outline: 'unset !important',
    },
  },
}));

export default style;
