import makeStyles from '@mui/styles/makeStyles';
import color from './../../theme/color';
import fontStyle from './../../theme/font';

const style = makeStyles((theme) => ({    
    commonRoot: {
        background: color.themeLightGray,
        minHeight: 'calc(100vh - 425px)',
        maxWidth: 1266,
        margin: '0 auto',
        '& div': {
            fontFamily: fontStyle.primaryFontFamily,
        },
        '& span': {
            fontFamily: fontStyle.primaryFontFamily,
        },
        '& p': {
            fontFamily: fontStyle.primaryFontFamily,
        },
    },
    accordianSection: {
        '& .MuiPaper-root': {
            background: color.primary,
            color: color.white,
            marginBottom: 14,
            borderRadius: 10,
            padding: '8px 10px',
            '& p': {
                fontSize: 25,
                fontWeight: 'normal',
            },
            '& svg': {
                fontSize: 25,
                fill: color.white,
            },
            '&:before': {
                height: 0,
            }
        }
    },
    innerHeading: {
        fontSize: 40,
        textAlign: 'center',
        fontWeight: '600',
    },
    paginationUI: {
        '& ul': {
            justifyContent: 'center',
        }
    }
}));

export default style;
