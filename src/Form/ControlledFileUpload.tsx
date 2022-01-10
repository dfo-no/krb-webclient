import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText/FormHelperText';
import InputLabel from '@mui/material/InputLabel/InputLabel';
import MenuItem from '@mui/material/MenuItem/MenuItem';
import Select from '@mui/material/Select/Select';
import React from 'react';
import {
  Controller,
  FieldError,
  FieldValues,
  UseControllerProps
} from 'react-hook-form';

interface IProps<T> extends UseControllerProps<T> {
  error: FieldError | undefined;
  label: string;
  disabled: boolean;
}

interface IOptionsString {
  value: string;
  label: string;
}
const ControlledFileUpload = <T extends FieldValues>({
  name,
  control,
  error,
  label,
  disabled
}: IProps<T>): React.ReactElement => {
  const fileTypes: IOptionsString[] = [
    { value: 'pdf', label: 'PDF' },
    { value: 'doc', label: 'DOC' },
    { value: 'docx', label: 'DOCX' },
    { value: 'odt', label: 'ODT' },
    { value: 'ods', label: 'ODS' },
    { value: 'ppt', label: 'PPT' },
    { value: 'pptx', label: 'PPTX' }
  ];

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormControl
          sx={{ m: 1, minWidth: 120 }}
          disabled={disabled}
          error={!!error}
        >
          <InputLabel id={name}>{label}</InputLabel>
          <Select
            label={label}
            {...field}
            multiple
            variant="outlined"
            autoWidth
          >
            {fileTypes.map((fileType) => (
              <MenuItem key={fileType.value} value={fileType.value}>
                {fileType.label}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{!!error ? error.message : ''}</FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default ControlledFileUpload;

ControlledFileUpload.defaultProps = {
  label: '',
  disabled: false
};
