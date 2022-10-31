import makeStyles from "@mui/styles/makeStyles";
import color from "./../../../theme/color";
import fontStyle from "./../../../theme/font";

const style = makeStyles((theme) => ({
  formControl: {
    margin: "15px -14px",
    width: "calc(100% + 28px)",
    "@media (max-width: 767px)": {
      marginRight: 0,
    },
    "& .MuiInputLabel-root": {
      fontSize: 18,
      textTransform: "uppercase",
      color: color.black,
      fontFamily: fontStyle.primaryFontFamily,
    },
    "& .MuiOutlinedInput-root": {
      background: color.white,
      "& input": {
        padding: 14,
        fontSize: 18,
        color: color.primary,
        background: color.themeLightGray,
        fontFamily: fontStyle.primaryFontFamily,
        "&::placeholder": {
          textTransform: "uppercase",
          color: color.black,
          opacity: 1,
          fontWeight: "300",
        },
      },
      "& .MuiOutlinedInput-notchedOutline": {
        border: 0,
        borderBottom: "solid 1px " + color.primary,
        borderRadius: 0,
        margin: "0 14px",
      },
    },
    "& .MuiFormHelperText-contained": {
      margin: 0,
    },
  },
  root: {
    // "& .Mui-error": {
    //   color: 'green',
    // },
    "& .MuiFormHelperText-root": {
      margin: "5px 0 0 15px"
    },
  },
}));

export default style;
