import makeStyles from '@mui/styles/makeStyles';
import color from '../../theme/color';
import fontStyle from '../../theme/font';

const style = makeStyles((theme) => ({
  container: {
    marginBottom: '60px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  offersCardUi: {
    background: '#f8f2e9',
    padding: '50px 18px 40px 18px',
    borderRadius: 20,
    cursor: 'pointer',
  },
  card: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  title: {
    fontSize: 20,
    fontFamily: fontStyle.primaryFontFamily,
    fontWeight: '600',
    color: '#DE8706',
    margin: '15px 0px',
  },
  subTitle: {
    fontSize: 14,
    fontFamily: fontStyle.primaryFontFamily,
    fontWeight: '600',
    color: '#5e6d55',
    textAlign: 'center',
    padding: '0px 10px',
    minHeight: '42px',
  },
}));

export default style;
