import makeStyles from '@mui/styles/makeStyles';
import colors from '../../theme/color';
import color from '../../theme/color';
import fontStyle from '../../theme/font';

const style = makeStyles((theme) => ({
  mainContainer: {
    margin: '0px 35px',
    display: 'flex',
    justifyContent: 'center',
  },
  contain: {
    margin: '15px 35px',
  },
  container: {
    background: color.themeLightGray,
    padding: '35px',
    border: 'solid 0.5px ' + color.greyColor,
    borderRadius: 5,
    boxShadow: '0px 15px 27px #DE87060A',
  },
  aboutSec: {
    background: colors.secondary,
    padding: '20px',
    margin: '20px 35px',
  },
  about: {
    fontSize: 18,
    fontFamily: fontStyle.primaryFontFamily,
    fontWeight: '600',
    color: '#fff',
  },
  votes: {
    fontSize: 16,
    fontFamily: fontStyle.primaryFontFamily,
    fontWeight: '700',
    color: '#5d5d5d',
    marginLeft: '10px',
  },
  name: {
    fontSize: 20,
    fontFamily: fontStyle.primaryFontFamily,
    fontWeight: '600',
    color: '#DE8706',
    marginBottom: '10px',
  },
  by: {
    fontSize: 12,
    fontFamily: fontStyle.primaryFontFamily,
    fontWeight: '300',
    color: '#4c4d4c',
    marginRight: '5px',
    marginBottom: '2px',
  },
  member: {
    fontSize: 14,
    fontFamily: fontStyle.primaryFontFamily,
    fontWeight: '600',
    color: '#919391',
    marginRight: '5px',
    marginBottom: '5px',
  },
  last: {
    fontSize: 12,
    fontFamily: fontStyle.primaryFontFamily,
    fontWeight: '300',
    color: '#4c4d4c',
    marginRight: '5px',
    borderBottom: 'solid 0.5px ' + color.greyColor,
    paddingBottom: '5px',
  },
  userIcon: {
    height: '80px',
    width: '80px',
    borderRadius: '50%',
  },
  profile: {
    background: '#f8f2e9',
    padding: '10px 30px',
    width: '128px',
    marginTop: '20px',
    fontSize: 14,
    fontFamily: fontStyle.primaryFontFamily,
    fontWeight: '600',
    color: colors.primary,
    borderRadius: 40,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
}));

export default style;
