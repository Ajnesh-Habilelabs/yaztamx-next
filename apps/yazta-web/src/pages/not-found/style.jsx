import makeStyles from '@mui/styles/makeStyles';
import color from './../../theme/color';
import fontStyle from './../../theme/font';

const style = makeStyles((theme) => ({    
    commonRoot: {
        background: color.themeLightGray,
        minHeight: 'calc(100vh - 425px)',
        maxWidth: 1170,
        margin: '0 auto',
        '& div': {
            fontFamily: fontStyle.primaryFontFamily,
        },
        '& span': {
            fontFamily: fontStyle.primaryFontFamily,
        },
    },
    ownHour: {
        fontSize: 30,
        lineHeight: '60px',
        marginTop: 30,
    },
    ownBoss: {
        fontSize: 120,
        lineHeight: '120px',
        fontWeight: '800',
        marginBottom: 40,
    },
    startEarning: {
        fontSize: 25,
        lineHeight: '40px',
        color: color.primary,
    },
    appBox: {
        display: 'flex',
        maxWidth: 360,
        flexWrap: 'wrap',
        justifyContent: 'center',
        '& img': {
            height: 70,
            marginTop: 5,
            '&:nth-child(3)': {
                marginTop: 30,
            }
        }
    },
    providerText: {
        fontSize: 18,
        lineHeight: '40px',
        width: '100%',
        textAlign: 'center',
    },
    commonHead: {
        fontSize: 50,
        lineHeight: '61px',
        color: color.lightBlack,
        fontWeight: '600',
        textAlign: 'center',
        position: 'relative',
        paddingBottom: 20,
        '&:after': {
            position: 'absolute',
            left: '50%',
            bottom: 10,
            content: `''`,
            width: 74,
            height: 4,
            background: color.secondary,
            transform: 'translateX(-50%)',
        }
    },
    commonPara: {
        fontSize: 20,
        lineHeight: '28px',
        maxWidth: 788,
        color: color.btnText,
        textAlign: 'center',
        margin: '0 auto',
        fontWeight: 'normal',
        fontFamily: fontStyle.primaryFontFamily
    },
    clickSection: {
        maxWidth: '100%',
        flexWrap: 'nowrap',
        alignItems: 'center',
        borderTop: 'solid 1px '+ color.secondary,
        marginTop: 40,
        paddingTop: 40,
        '& div': {
            width: 'auto',
            '& button': {
                padding: '0 20px',
                whiteSpace: 'nowrap',
                marginLeft: 10,
                fontSize: 18,
                borderRadius: 10,
                fontWeight: 'normal',
            }
        }
    },
    bookNowBtn: {
        '& div': {
            '& button': {
                padding: '0 20px',
                whiteSpace: 'nowrap',
                margin: '35px auto',
                fontSize: 18,
                borderRadius: 10,
                fontWeight: 'normal',
            }
        }
    },
    arrangBtn: {
        '& div': {
            width: '100%',
        },
        '& button': {
            width: '100%',
            fontSize: 35,
            lineHeight: '85px',
            boxShadow: '0px 10px 15px #1213133B',
            borderRadius: 10,
            fontWeight: 'normal',
            margin: 25,
            border: 'solid 1px '+ color.primary,
            '& + button': {
                marginLeft: 'auto',
            },
            '&.Mui-selected': {
                background: color.primary,
                color: color.white,
            }
        },
        '& .MuiTabs-indicator': {
            height: 0,
        }
    },
    activeBtn: {
        '& button': {
            background: color.white,
            color: color.black,
        }
    },
    commonHeadFontSize: {
        fontSize: 40,
    },
    changeFontSizeColor: {
        fontSize: 45,
        color: color.primary,
    },
    cokkingText: {
        fontSize: 20,
        color: color.primary,
        fontWeight: 'normal',
        textAlign: 'center',
        paddingBottom: 40,
    },
    lessPadding: {
        maxWidth: 1130,
    },
    tetimonialBox: {
        border: 'solid 1px '+ color.secondary,
        boxShadow: '0px 10px 20px #4343431C',
        borderRadius: 10,
        padding: '15px 14px 14px 23px',
        margin: '0 22px',
        '& img': {
            margin: '-35px 21px 0 -35px',
            float: 'left',
        }
    },
    titleText: {
        fontSize: 15,
        lineHeight: '15px',
    },
    subTitleText: {
        fontSize: 10,
        color: color.primary,
    },
    contentText: {
        fontSize: 10,
        color: color.btnText,
        paddingTop: 15,
    },
    commonHeadStyle: {
        fontSize: 35,
        textAlign: 'left',
        '&:after': {
            left: 40,
        }
    },
    subCommonPara: {
        textAlign: 'left',
    },
    marginRightAuto: {
        '& div': {
            '& button': {
                marginRight: 'auto',
                marginLeft: 0,
            }
        }
    },
    surfUpDownArrow: {
        position: 'fixed',
        left: '20px',
        bottom: '80px',
        width: '50px',
        height: '65px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        background: color.primary,
        fontFamily: fontStyle.primaryFontFamily,
        '& svg': {
            width: '20px',
            height: '20px',
            color: color.white,
            transition: '0.5s',
        }
    }
}));

export default style;
