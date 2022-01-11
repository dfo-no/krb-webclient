import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText/FormHelperText';
import InputLabel from '@mui/material/InputLabel/InputLabel';
import MenuItem from '@mui/material/MenuItem/MenuItem';
import Select from '@mui/material/Select/Select';
import { get } from 'lodash';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface IProps {
  name: string;
  label?: string;
}

export interface IOptionsString {
  value: string;
  label: string;
}

const FileUploadCtrl = ({ name, label }: IProps): React.ReactElement => {
  const {
    formState: { errors }
  } = useFormContext();

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
      name={name}
      render={({ field }) => (
        <FormControl sx={{ m: 1, minWidth: 120 }} error={!!get(errors, name)}>
          <InputLabel id={name}>{label}</InputLabel>
          <Select label={label} {...field} multiple variant="outlined">
            {fileTypes.map((fileType) => (
              <MenuItem key={fileType.value} value={fileType.value}>
                {fileType.label}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{get(errors, name)?.message ?? ''}</FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default FileUploadCtrl;

FileUploadCtrl.defaultProps = {
  label: ''
};
