import makeStyles from '@mui/styles/makeStyles';
import color from '../../../theme/color';
import fontStyle from '../../../theme/font';

const style = makeStyles((theme) => ({
  commonRoot: {
    background: color.themeLightGray,
    minHeight: 'calc(100vh - 425px)',
    maxWidth: 1200,
    margin: '0 auto',
    '& div': {
      fontFamily: fontStyle.primaryFontFamily,
    },
    '& span': {
      fontFamily: fontStyle.primaryFontFamily,
    },
  },
  searchResult: {
    textAlign: 'center',
    color: color.primary,
    fontSize: 25,
    marginTop: 30,
    fontWeight: 'bold',
  },
  dateAndLength: {
    marginTop: 0,
    paddingTop: 10,
    paddingBottom: 10,
  },
  dateTime: {
    color: color.primary,
    fontSize: 25,
    marginTop: 30,
  },
  profileBox: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: 45,
    '& img': {
      marginBottom: 21,
    },
  },
  leftAlignText: {
    textAlign: 'left',
  },
  weeksTouchHead: {
    margin: 0,
    color: color.textTertiary,
    marginLeft: '60px',
  },
  weeksHeadWith: {
    display: 'flex',
    // justifyContent: 'space-between',
    alignItems: 'center',
    // borderTop: 'solid 1px ' + color.primary,
    borderBottom: 'solid 1px ' + color.secondary,
  },
  allButtons: {
    '& button': {
      width: '90%',
    },
  },
  alignItemsLeft: {
    '& div': {
      alignItems: 'start',
    },
  },
  alignItemsCenter: {
    '& div': {
      alignItems: 'center',
    },
  },
  alignItemsRight: {
    '& div': {
      alignItems: 'end',
    },
  },
  dateSvgBg: {
    background: color.primary,
    padding: 15,
    borderRadius: '50%',
    fill: color.white,
    width: 42,
    height: 42,
  },
  providerDetailsText: {
    fontSize: 25,
    color: color.primary,
    display: 'flex',
    alignItems: 'center',
    padding: '24px 0 0 0',
    justifyContent: 'center',
    '& img': {
      // marginRight: 20,
      display: 'none',
    },
  },
  providerDetailsHelpText: {
    fontSize: 15,
    color: color.primary /*primary color is green*/,
    display: 'flex',
    alignItems: 'center',
    padding: '5px 0',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  payoutSumSubbox: {
    padding: '0px 32px',
  },
  addBtmBdr: {
    borderBottom: 'solid 1px ' + color.lighterGray,
    padding: '10px 10px 10px',
    '&:last-child': {
      borderBottom: 0,
    },
    '&:nth-last-child(2)': {
      borderBottom: 0,
    },
  },
  personalLabel: {
    fontSize: 20,
    color: color.textTertiary,
    minWidth: 150,
    fontWeight: 'bold',
  },
  personalLabelDetail: {
    fontSize: 20,
    color: color.textSecondary,
    fontWeight: 'bold',
  },
  engageLengthText: {
    fontSize: 30,
    textAlign: 'center',
    borderTop: 'solid 1px ' + color.secondary,
    borderBottom: 'solid 1px ' + color.secondary,
    color: color.primary,
    padding: '30px 0',
    marginTop: 30,
  },
  headColText: {
    fontSize: 20,
    color: color.secondary,
    textAlign: 'center',
  },
  headColDisabledText: {
    fontSize: 20,
    color: color.textTertiary,
    textAlign: 'center',
  },
  startDateAndTime: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  headColSubText: {
    fontSize: 20,
    color: color.textSecondary,
    textAlign: 'center',
  },
  headColSubSubText: {
    fontSize: 25,
    color: color.textSecondary,
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
  },
  addLeftRightBder: {
    borderLeft: 'solid 1px ' + color.secondary,
    borderRight: 'solid 1px ' + color.secondary,
  },
  summarySection: {
    background: color.white,
    border: 'solid 1px ' + color.secondary,
    borderRadius: '10px',
    boxShadow: '0px 15px 27px #de870621;',
  },
  summaryHeadText: {
    fontSize: 33,
    lineHeight: '30px',
    fontWeight: 'bold',
    color: color.primary,
    textAlign: 'center',
    paddingTop: 35,
  },
  summaryContentText: {
    fontSize: 20,
    lineHeight: '50px',
    margin: 0,
  },
  extraMrgnTop: {
    marginTop: 40,
  },
  confirmBtn: {
    '& button': {
      textTransform: 'inherit',
      lineHeight: '60px',
      borderRadius: 45,
      fontWeight: 'bold',
    },
  },
  declineBtn: {
    '& button': {
      background: color.decline,
      textTransform: 'inherit',
      lineHeight: '60px',
      borderRadius: 45,
      fontWeight: 'bold',
    },
  },
  cancelBtn: {
    '& button': {
      background: color.cancelColor,
      textTransform: 'inherit',
      lineHeight: '60px',
      borderRadius: 45,
      fontWeight: 'bold',
    },
  },
  modifyBtn: {
    '& button': {
      background: color.modifyColor,
      fontWeight: 'bold',
      color: color.black,
      textTransform: 'inherit',
      lineHeight: '60px',
      borderRadius: 45,
    },
  },
  chatBtn: {
    '& button': {
      background: color.secondary,
      textTransform: 'inherit',
      lineHeight: '60px',
      borderRadius: 45,
      fontWeight: 'bold',
    },
  },
  topBdr: {
    borderBottom: 'solid 1px #DE8706',
  },
  bottomBdr: {
    borderTop: 'solid 1px #DE8706',
  },
  textInput: {
    width: '80%',
    height: '50px',
  },
  divOnPasswordResetModal: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 'calc(100% + 2px)',
    background: 'rgba(61, 153, 167, 0.8)',
    zIndex: 3,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  changeProviderOptions: {
    borderBottom: '1px solid #DE8706',
    borderRadius: 'unset',
    cursor: 'pointer',
    padding: '20px 0',
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
    fontSize: 18,
  },
  closeModalButton: {
    position: 'absolute',
    top: '18px',
    right: '18px',
    width: '40px',
    height: '40px',
    color: color.secondary,
    cursor: 'pointer'
  },
  closePostModalButton: {
    position: 'absolute',
    top: '18px',
    right: '18px',
    width: '40px',
    height: '40px',
    color: color.white,
    cursor: 'pointer'
  },
  closeChangePasswordButton: {
    position: 'absolute',
    top: '-30px',
    right: '-30px',
    width: '40px',
    height: '40px',
    color: color.white,
    cursor: 'pointer'
  },
  closeModalChangeProviderButton: {
    position: 'absolute',
    top: '-30px',
    right: '-30px',
    width: '40px',
    height: '40px',
    color: color.secondary,
    cursor: 'pointer'
  },
  responsiveYesOrNo: { 
    fontSize: '16px'
  },
}));

export default style;
