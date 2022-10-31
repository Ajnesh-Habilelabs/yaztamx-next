import React from 'react';
import { TextField } from '@mui/material';
import PropTypes from 'prop-types';
import FormControl from '@mui/material/FormControl';
import style from './style';

function TextInput({
  label, name, value, onChange, InputProps, multiline, rows, onBlur,
  customFormControlCss, type, required, variant, placeholder, error,
  errorText, disable, onKeyUp, title,
}) {
  const classes = style();
  return (
    <FormControl className={classes.formControl} style={customFormControlCss}>
      <TextField
        id={name}
        value={value}
        label={label}
        onChange={onChange}
        InputProps={InputProps}
        type={type}
        required={required}
        variant={variant}
        placeholder={placeholder}
        error={error}
        helperText={errorText}
        disabled={disable}
        onKeyUp={onKeyUp}
        multiline={multiline}
        rows={rows}
        title={title}
        onBlur={onBlur}
        className={classes.root}
      />
    </FormControl>
  );
}

TextInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  InputProps: PropTypes.objectOf(Object),
  customFormControlCss: PropTypes.objectOf(Object),
  type: PropTypes.string,
  required: PropTypes.bool,
  variant: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.bool,
  errorText: PropTypes.string,
  disable: PropTypes.bool,
  onKeyUp: PropTypes.func,
  multiline: PropTypes.bool,
  rows: PropTypes.string,
  title: PropTypes.string,
  onBlur: PropTypes.func,
};

TextInput.defaultProps = {
  label: '',
  InputProps: {},
  customFormControlCss: {},
  type: 'text',
  required: true,
  variant: 'outlined',
  placeholder: '',
  error: false,
  errorText: '',
  disable: false,
  onKeyUp: '',
  multiline: false,
  rows: '',
  title: '',
  onBlur: () => {},
};

export default TextInput;
