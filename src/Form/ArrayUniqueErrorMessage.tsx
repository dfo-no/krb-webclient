import React from 'react';
import { FieldErrors, FieldValues } from 'react-hook-form';
import { FormLabel } from '@mui/material';
import { get } from 'lodash';

type Props<T extends FieldValues> = {
  errors: FieldErrors<T>;
  path: string;
  length: number;
};
export default function ArrayUniqueErrorMessage<T extends FieldValues>({
  errors,
  path,
  length,
}: Props<T>): React.ReactElement {
  const errorMessage = Array.from(Array(length).keys())
    .map((idx) => get(errors, `${path}.${idx}`))
    .find((error) => error && error.type === 'array.unique');
  return <FormLabel error={true}>{errorMessage?.message ?? ''}</FormLabel>;
}
