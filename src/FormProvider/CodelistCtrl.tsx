import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { get } from 'lodash';
import React from 'react';
import { Form, FormControl } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
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
    <Form.Group controlId={name}>
      <Form.Label column sm={2}>
        {label}
      </Form.Label>
      <Col sm={10}>
        <Controller
          name={name}
          render={({ field }) => (
            <Select
              multiple
              sx={{ m: 1, minWidth: 120 }}
              {...field}
              onChange={(e) => field.onChange(e.target.value)}
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
  );
};

export default CodelistCtrl;

CodelistCtrl.defaultProps = {
  label: ''
};
