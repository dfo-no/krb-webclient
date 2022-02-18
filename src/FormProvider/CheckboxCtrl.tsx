import { makeStyles } from '@material-ui/core';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup/RadioGroup';
import { get } from 'lodash';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { DFOCheckbox } from '../components/DFOCheckbox/DFOCheckbox';

interface IProps {
  name: string;
  label: string;
  variant?: string;
}

const useStyles = makeStyles({
  label: {
    marginTop: 13,
    whiteSpace: 'nowrap'
  }
});

const CheckboxCtrl = ({ name, label, variant }: IProps): React.ReactElement => {
  const {
    formState: { errors }
  } = useFormContext();

  const classes = useStyles();

  return (
    <FormControl error={!!get(errors, name)}>
      <Controller
        name={name}
        render={({ field }) => (
          <RadioGroup row={true} {...field}>
            <FormControlLabel
              control={<DFOCheckbox variant={variant} />}
              label={<p className={classes.label}>{label}</p>}
            />
          </RadioGroup>
        )}
      />
      {!!get(errors, name) && (
        <FormLabel>{get(errors, name)?.message ?? ''}</FormLabel>
      )}
    </FormControl>
  );
};

export default CheckboxCtrl;
