import makeStyles from '@mui/styles/makeStyles';
import color from './../../../theme/color';
import fontStyle from './../../../theme/font';

const style = makeStyles((theme) => ({
  paginationGrid: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    // background: color.primary,
    fontFamily: fontStyle.primaryFontFamily,
    margin: theme.spacing(1),
    marginLeft: '0px',
    width: '100%',
    '@media (max-width: 767px)': {
      marginRight: 0,
    },
  },
}));

export default style;
