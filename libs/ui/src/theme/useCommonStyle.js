import makeStyles from '@mui/styles/makeStyles';
import color from './color';
import fontStyle from './font';

const style = makeStyles((theme) => ({
    
    loginRoot: {
        background: color.themeLightGray,
        minHeight: '100vh',
        '& div': {
            fontFamily: fontStyle.primaryFontFamily,
        },
    },
    leftPanel: {
        background: color.themGray,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '30px 0',
        '& img': {            
            [theme.breakpoints.down('lg')]: {
                width: '80%',
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
        fontSize: 24,
        fontFamily: fontStyle.primaryFontFamily,
    },
    fbBtn: {
        marginTop: 10,
        marginRight: 30,
    },
    dFlex: {
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
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
            borderBottom: 'solid 1px '+ color.primary,
            height: 1,
            width: '80%',
        }
    }
}));

export default style;
