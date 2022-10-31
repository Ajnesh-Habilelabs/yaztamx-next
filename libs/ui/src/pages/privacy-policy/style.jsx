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
    },
    innerHeading: {
        fontSize: 40,
        textAlign: 'center',
        fontWeight: '600',
    },
    innerPagePara: {
        fontSize: 20,
        lineHeight: '28px',
        textAlign: 'justify',
    },
    reactMarkdown: {
        textAlign: 'justify',
    },
}));

export default style;
