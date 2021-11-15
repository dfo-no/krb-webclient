import React from 'react';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import {
  Controller,
  FieldError,
  FieldValues,
  UseControllerProps
} from 'react-hook-form';
import { ICode } from '../Nexus/entities/ICode';
import { ICodelist } from '../Nexus/entities/ICodelist';

interface IProps<T> extends UseControllerProps<T> {
  error: FieldError | undefined;
  codelist: ICodelist;
}

const ControlledCodelistSelect = <T extends FieldValues>({
  codelist,
  name,
  control,
  error
}: IProps<T>): React.ReactElement => {
  const renderOptions = (codes: ICode[]) => {
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
          <Form.Select {...field} isInvalid={!!error}>
            <option value="">Ingen valgt</option>
            {renderOptions(codelist.codes)}
          </Form.Select>
        )}
      />
      <FormControl.Feedback type="invalid">
        {error?.message}
      </FormControl.Feedback>
    </Form.Group>
  );
};

export default ControlledCodelistSelect;
