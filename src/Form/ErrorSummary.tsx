import React, { ReactElement } from 'react';
import Alert from 'react-bootstrap/Alert';
import { FieldError, FieldErrors } from 'react-hook-form';

function isFieldError(object: unknown): object is FieldError {
  return (
    Object.prototype.hasOwnProperty.call(object, 'message') &&
    Object.prototype.hasOwnProperty.call(object, 'type') &&
    Object.prototype.hasOwnProperty.call(object, 'ref')
  );
}

type ErrorSummaryProps<T> = {
  errors: FieldErrors<T>;
};
export default function ErrorSummary<T>({
  errors
}: ErrorSummaryProps<T>): ReactElement | null {
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  if (Object.keys(errors).length === 0) {
    return null;
  }

  const errorMessages: string[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function traverse(o: any) {
    // eslint-disable-next-line no-restricted-syntax
    for (const i in o) {
      if (!!o[i] && typeof o[i] === 'object') {
        if (!isFieldError(o[i])) {
          traverse(o[i]);
        } else {
          errorMessages.push(o[i].message);
        }
      }
    }
  }
  traverse(errors);

  return (
    <Alert variant="danger">
      {errorMessages.map((msg) => (
        <div key={msg}>{msg}</div>
      ))}
    </Alert>
  );
}
