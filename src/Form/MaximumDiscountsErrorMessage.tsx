import React, { ReactElement } from 'react';
import { FieldErrors, FieldValues } from 'react-hook-form';
import { FormLabel } from '@mui/material';
import { get } from 'lodash';

type Props<T extends FieldValues> = {
  errors: FieldErrors<T>;
  path: string;
};
export default function MaximumDiscountsErrorMessage<T extends FieldValues>({
  errors,
  path,
}: Props<T>): ReactElement {
  const error = get(errors, `${path}`);
  if (error?.type === 'array.check') {
    return <FormLabel error={true}>{error?.message ?? ''}</FormLabel>;
  }
  return <></>;
}
