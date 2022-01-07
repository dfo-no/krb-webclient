import React from 'react';
import { FormControl } from '@material-ui/core';
import { useFormContext } from 'react-hook-form';
import Box from '@mui/material/Box';
import { DFOTextField } from '../MaterialComponents/StyledComponents/DFOTextField/DFOTextField';
import { get } from 'lodash';

interface IProps {
  name: string;
  label?: string;
}

const TextCtrl = ({ name, label }: IProps): React.ReactElement => {
  const {
    register,
    formState: { errors }
  } = useFormContext();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event);
  };

  return (
    <Box component="form" noValidate autoComplete="off">
      <FormControl error variant="standard">
        <DFOTextField
          onChange={handleChange}
          aria-describedby="component-helper-text"
          label={label}
        />
        {get(errors, name)?.message}
      </FormControl>
    </Box>
  );
};
export default TextCtrl;

TextCtrl.defaultProps = {
  label: ''
};
