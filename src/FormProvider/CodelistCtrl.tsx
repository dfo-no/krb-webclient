import TextField from '@mui/material/TextField';
import { Autocomplete } from '@mui/material';
import { get } from 'lodash';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { ICodelist } from '../Nexus/entities/ICodelist';

interface IProps {
  name: string;
  codelists: ICodelist[];
  label?: string;
}

const CodelistCtrl = ({
  name,
  codelists,
  label
}: IProps): React.ReactElement => {
  const {
    formState: { errors }
  } = useFormContext<ICodelist>();

  return (
    <Controller
      name={name}
      render={({ field }) => (
        <Autocomplete
          options={codelists}
          value={field.value}
          getOptionLabel={(option) => option.title}
          isOptionEqualToValue={(option, value) => {
            if (option.title === value.title) {
              return true;
            }
            return false;
          }}
          renderInput={(params) => (
            <TextField
              label={label}
              {...params}
              error={!!get(errors, name)}
              helperText={get(errors, name)?.message ?? ''}
            />
          )}
        />
      )}
    />
  );
};

export default CodelistCtrl;

CodelistCtrl.defaultProps = {
  label: ''
};
