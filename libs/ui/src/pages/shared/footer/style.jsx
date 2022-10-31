import makeStyles from '@mui/styles/makeStyles';
import color from './../../../theme/color';
import fontStyle from './../../../theme/font';

const style = makeStyles((theme) => ({    
    footerRoot: {
        background: color.lightSecondary,
        padding: '50px 0',
        '& div': {
            fontFamily: fontStyle.primaryFontFamily,
        },
    },
    container: {
        maxWidth: 1920,
        float: 'none',
        margin: 'auto',
        width: '100%',
        padding: '0 15px',
    },
    copyRight: {
        background: color.secondary,
    },
    copyRightText: {
        textAlign: 'center',
        fontSize: 14,
        color: color.white,
        opacity: 0.5,
        fontFamily: fontStyle.primaryFontFamily,
        margin: 0,
        lineHeight: '60px',
    },
    footerWidget: {
        borderRight: 'solid 1px '+ color.secondary,
        paddingLeft: 100,
        '& div': {
            fontSize: 18,
            color: color.primary,
            fontFamily: fontStyle.primaryFontFamily,
            margin: 0,
        },
        '& ul': {
            padding: 0,
            '& li': {
                listStyle: 'none',
                '& a': {
                    textDecoration: 'none',
                    color: color.textTertiary,
                    lineHeight: '30px',
                }
            },
        },
        '&:last-child': {
            borderRight: 0,
        },
    },
    socialIcons: {
        '& img': {
            marginRight: 15,
            marginTop: 15,
            width: 39,
            height: 39,
        }
    }
}));

export default style;
