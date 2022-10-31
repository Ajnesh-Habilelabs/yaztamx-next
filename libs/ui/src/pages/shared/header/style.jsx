import makeStyles from '@mui/styles/makeStyles';
import color from './../../../theme/color';
import fontStyle from './../../../theme/font';

const style = makeStyles((theme) => ({
  headerRoot: {
    background: color.white,
    alignItems: 'center',
    padding: '16px 10px 15px 20px',
    boxShadow: '0px 3px 15px #00000014',
    position: 'relative',
    '& div': {
      fontFamily: fontStyle.primaryFontFamily,
    },
  },
  dflexAlign: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 0,
    '& li': {
      listStyle: 'none',
      '& a': {
        padding: '32px 27px 31px',
        textDecoration: 'none',
        fontSize: 18,
        color: color.lightBlack,
      },
    },
  },
  leftSpace: {
    marginBottom: 0,
    marginLeft: 15,
    marginRight: 40,
    fontSize: 24,
    fontWeight: 'bold',
  },
  accountName: {
    fontSize: 12,
  },
  menuTitle: {
    marginLeft: 15,
    fontSize: 18,
    color: color.primary,
    padding: '10px',
    fontFamily: fontStyle.primaryFontFamily,
  },
  username: {
    marginLeft: 20,
    fontSize: 15,
    color: color.textSecondary,
    padding: '10px',
    fontFamily: fontStyle.primaryFontFamily,
  },
  profile: {
    height: '30px',
    width: '30px',
    borderRadius: '50%',
  },
  profileImg: {
    height: '60px',
    width: '60px',
    borderRadius: '50%',
  },
  bottomSec: {
    background: color.themeLightGray,
    border: '1px solid #DE8706',
    padding: '10px',
    flexDirection: 'row',
    margin: '20px 0 0 0',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  inviteText: {
    fontSize: 12,
    color: color.primary,
    fontFamily: fontStyle.primaryFontFamily,
    textTransform: 'uppercase',
    margin: '3px 0 0 10px',
  },
  userSec: {
    flexDirection: 'row',
    margin: '0 0 0 20px',
  },
}));

export default style;
