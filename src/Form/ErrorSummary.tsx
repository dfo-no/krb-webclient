import Alert from '@mui/material/Alert';
import React from 'react';
import { FieldError, FieldErrors, FieldValues } from 'react-hook-form';

import Utils from '../common/Utils';

/*
 * Test class used to show errormessages under development
 */

function isFieldError(object: unknown): object is FieldError {
  return (
    Object.prototype.hasOwnProperty.call(object, 'message') &&
    Object.prototype.hasOwnProperty.call(object, 'type') &&
    Object.prototype.hasOwnProperty.call(object, 'ref')
  );
}

type ErrorSummaryProps<T extends FieldValues> = {
  errors: FieldErrors<T>;
};
export default function ErrorSummary<T extends FieldValues>({
  errors,
}: ErrorSummaryProps<T>): React.ReactElement | null {
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  if (Object.keys(errors).length === 0) {
    return null;
  }

  const errorMessages: string[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function traverse(o: unknown) {
    // eslint-disable-next-line no-restricted-syntax
    if (Utils.isRecord(o)) {
      for (const i in o) {
        const property = o[i];
        if (!!property && typeof property === 'object') {
          if (!isFieldError(property)) {
            traverse(property);
          } else {
            if (property.message !== undefined) {
              errorMessages.push(property.message);
            }
          }
        }
      }
    }
  }
  traverse(errors);

  return (
    <Alert severity="error">
      {errorMessages.map((msg) => (
        <div key={msg}>{msg}</div>
      ))}
    </Alert>
  );
}
