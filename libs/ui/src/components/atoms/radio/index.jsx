/* eslint-disable max-len */
import React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import PropTypes from 'prop-types';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import style from './style';

function RadioButtons({
  label, name, value, onChange, options,
}) {
  const classes = style();
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup aria-label={name} name={name} value={value} onChange={onChange} className={classes.labelGroup}>
        {options.map((option) => (
          <FormControlLabel
            className={classes.formControlLabel}
            value={option.value}
            control={<Radio />}
            label={option.label}
            disabled={option.disabled || false}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

RadioButtons.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(Object),
};

RadioButtons.defaultProps = {
  options: [],
};

export default RadioButtons;
