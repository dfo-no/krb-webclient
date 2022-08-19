import { FieldErrors } from 'react-hook-form';
import React from 'react';
import { FormLabel } from '@mui/material';
import { get } from 'lodash';

type Props<T> = {
  errors: FieldErrors<T>;
  path: string;
  length: number;
};
export default function ArrayUniqueErrorMessage<T>({
  errors,
  path,
  length
}: Props<T>): React.ReactElement {
  const errorMessage = Array.from(Array(length).keys())
    .map((idx) => get(errors, `${path}.${idx}`))
    .find((error) => error && error.type === 'array.unique');
  return <FormLabel error={true}>{errorMessage?.message ?? ''}</FormLabel>;
}
