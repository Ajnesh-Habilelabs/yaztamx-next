import makeStyles from '@mui/styles/makeStyles';
import color from '../../theme/color';
import fontStyle from '../../theme/font';

const style = makeStyles((theme) => ({
  container: {
    background: color.themeLightGray,
    padding: '35px',
    margin: '35px',
    border: 'solid 0.5px ' + color.greyColor,
    borderRadius: 5,
    boxShadow: '0px 15px 27px #DE87060A',
  },
  title: {
    fontSize: 13,
    fontFamily: fontStyle.primaryFontFamily,
    fontWeight: '600',
    color: '#001E00',
    marginBottom: '30px',
    marginTop: '15px',
    lineHeight: 2,
  },
  subSec: {
    display: 'flex',
    flexDirection: 'row',
    borderBottom: 'solid 0.5px ' + color.secondary,
    padding: '10px 0px',
  },
  by: {
    fontSize: 12,
    fontFamily: fontStyle.primaryFontFamily,
    fontWeight: '300',
    color: '#001E00',
    marginRight: '5px',
  },
  guideline: {
    fontSize: 20,
    fontFamily: fontStyle.primaryFontFamily,
    fontWeight: '600',
    color: '#3D99A7',
    marginTop: '22px',
    marginBottom: '20px',
    marginLeft: '20px',
  },
  postBy: {
    fontSize: 12,
    fontFamily: fontStyle.primaryFontFamily,
    fontWeight: '600',
    color: '#DE8706',
  },
  name: {
    fontSize: 15,
    fontFamily: fontStyle.primaryFontFamily,
    fontWeight: '600',
    color: '#3D99A7',
    marginBottom: '6px',
  },
  userIcon: {
    height: '50px',
    width: '50px',
    borderRadius: '50%',
  },
  votes: {
    fontSize: 16,
    fontFamily: fontStyle.primaryFontFamily,
    fontWeight: '700',
    color: '#5d5d5d',
    marginLeft: '10px',
  },
  reply: {
    fontSize: 12,
    fontFamily: fontStyle.primaryFontFamily,
    fontWeight: '600',
    color: '#5d5d5d',
    lineHeight: 2,
  },
  replies: {
    fontSize: 14,
    fontFamily: fontStyle.primaryFontFamily,
    fontWeight: '800',
    color: '#5d5d5d',
    padding: '10px 20px',
    borderRadius: 20,
    border: 'solid 0.5px ' + color.greyColor,
    width: '100px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbBg: {
    padding: '8px 10px',
    borderRadius: 5,
    border: 'solid 0.5px ' + color.greyColor,
  },
  subContainer: {
    borderBottom: 'solid 0.5px ' + color.secondary,
    padding: '30px 40px',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
}));

export default style;
