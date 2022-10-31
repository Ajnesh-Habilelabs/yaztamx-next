import makeStyles from '@mui/styles/makeStyles';
import color from '../../theme/color';
import fontStyle from '../../theme/font';

const style = makeStyles((theme) => ({
  container: {
    background: color.white,
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontFamily: fontStyle.primaryFontFamily,
    fontWeight: '600',
    color: '#001E00',
    marginBottom: '10px',
  },
  newPostButton: {
    width: '100%',
    height: '50px',
  },
  arrangBtn: {
    '& div': {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center'
    },
    '& button': {
      width: '300px',
      fontSize: 20,
      lineHeight: '43px',
      boxShadow: '0px 10px 15px #1213133B',
      borderRadius: '111px',
      fontWeight: 'normal',
      background: color.primary,
      color: color.white,
      // margin: 25,
      '& + button': {
        marginLeft: 'auto',
      },
      '&.Mui-selected': {
        background: color.secondary,
        color: color.white,
      },
    },
    '& .MuiTabs-indicator': {
      height: 0,
    },
  },
  subSec: {
    display: 'flex',
    flexDirection: 'row',
  },
  by: {
    fontSize: 12,
    fontFamily: fontStyle.primaryFontFamily,
    fontWeight: '300',
    color: '#001E00',
    marginRight: '5px',
  },
  name: {
    fontSize: 12,
    fontFamily: fontStyle.primaryFontFamily,
    fontWeight: '600',
    color: '#DE8706',
    marginRight: '5px',
  },
  postBy: {
    fontSize: 12,
    fontFamily: fontStyle.primaryFontFamily,
    fontWeight: '600',
    color: '#3D99A7',
  },
  userIcon: {
    height: '50px',
    width: '50px',
    borderRadius: '50%',
  },
  count: {
    fontSize: 15,
    fontFamily: fontStyle.primaryFontFamily,
    fontWeight: '300',
    color: '#5d5d5d',
    textAlign: 'center',
    marginBottom: '10px',
  },
  reply: {
    fontSize: 15,
    fontFamily: fontStyle.primaryFontFamily,
    fontWeight: '600',
    color: '#5d5d5d',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  subContainer: {
    borderBottom: 'solid 0.5px ' + color.secondary,
    padding: '30px 40px',
    cursor: 'pointer',
  },
}));

export default style;
