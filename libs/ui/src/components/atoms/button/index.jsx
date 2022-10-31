/* eslint-disable import/no-unresolved */
/* eslint-disable react/prop-types */
import React from 'react';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import FormControl from '@mui/material/FormControl';

import style from './style';

function ButtonAtom({
  onClick,
  label,
  customButtonCss,
  customCss,
  color,
  receipeDropdown,
  title,
  disabled,
  type,
  sx, // is for <FormControl>
  styles // is for <Button>
}) {
  const classes = style();

  return (
    <FormControl
      className={`${classes.formControl} ${
        receipeDropdown ? classes.receipeDropdown : null
      }`}
      sx={sx || {}}
    >
      <Button
        color={color}
        variant="contained"
        onClick={onClick}
        className={[classes.buttonCss, customCss]}
        style={customButtonCss}
        title={title}
        disabled={disabled}
        type={type}
        sx={styles || {}}
      >
        {label}
      </Button>
    </FormControl>
  );
}

ButtonAtom.propTypes = {
  onClick: PropTypes.func,
  label: PropTypes.string.isRequired,
  customButtonCss: PropTypes.objectOf(Object),
  color: PropTypes.string,
  title: PropTypes.string,
};

ButtonAtom.defaultProps = {
  onClick: '',
  customButtonCss: {},
  color: 'primary',
  title: '',
};

export default ButtonAtom;
