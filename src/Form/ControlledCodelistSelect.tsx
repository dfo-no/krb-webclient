import React from 'react';
import Form from 'react-bootstrap/Form';
import {
  Controller,
  FieldError,
  FieldValues,
  UseControllerProps
} from 'react-hook-form';
import { Code } from '../models/Code';
import { Codelist } from '../models/Codelist';

interface Props<T> extends UseControllerProps<T> {
  error: FieldError | undefined;
  codelist: Codelist;
}

const ControlledCodelistSelect = <T extends FieldValues>({
  codelist,
  name,
  control
}: Props<T>): React.ReactElement => {
  const renderOptions = (codes: Code[]) => {
    return codes.map((code) => {
      return (
        <option value={code.id} key={code.id}>
          {code.title}
        </option>
      );
    });
  };

  return (
    <Form.Group controlId={name}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Form.Select {...field}>
            <option value="">Ingen valgt</option>
            {renderOptions(codelist.codes)}
          </Form.Select>
        )}
      />
    </Form.Group>
  );
};

export default ControlledCodelistSelect;
