import TextField from '@material-ui/core/TextField';
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

  /*   return (
    <Form.Group controlId={name}>
      <Form.Label column sm={2}>
        {label}
      </Form.Label>
      <Col sm={10}>
        <Controller
          name={name}
          render={({ field }) => (
            <Select
              sx={{ minWidth: '100%' }}
              onBlur={field.onBlur}
              value={field.value}
              onChange={(e) => {
                // console.log(e.target.value);
                const i = codelists.findIndex((c) => c.id === e.target.value);
                if (i !== -1) {
                  field.onChange(codelists[i]);
                }
              }}
            >
              {codelists.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.title}
                </MenuItem>
              ))}
            </Select>
          )}
        />
        <FormControl.Feedback type="invalid">
          {get(errors, name)?.message ?? ''}
        </FormControl.Feedback>
      </Col>
    </Form.Group>
  ); */
};

export default CodelistCtrl;

CodelistCtrl.defaultProps = {
  label: ''
};
