import makeStyles from '@mui/styles/makeStyles';
import color from '../../theme/color';
import fontStyle from '../../theme/font';

const style = makeStyles((theme) => ({
  container: {
    padding: '0px 35px',
  },
  reply: {
    fontSize: 15,
    fontFamily: fontStyle.primaryFontFamily,
    fontWeight: '600',
    color: '#5d5d5d',
    lineHeight: 2,
    marginLeft: '35px',
  },
  by: {
    fontSize: 18,
    fontFamily: fontStyle.primaryFontFamily,
    fontWeight: '600',
    color: '#5d5d5d',
    textTransform: 'uppercase',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
}));

export default style;
