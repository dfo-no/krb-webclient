import React, { ReactElement } from 'react';
import Alert from 'react-bootstrap/Alert';
import { FieldError, FieldErrors } from 'react-hook-form';

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

  function isFieldError(value: unknown): value is FieldError {
    return (value as FieldError)?.message !== undefined;
  }

  // TODO: remove eslint comments.
  const errorMessages = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(errors)) {
    if (Array.isArray(value)) {
      const arrayFieldError = value as FieldError[];
      // eslint-disable-next-line no-restricted-syntax
      for (const [key2, v] of Object.entries(arrayFieldError)) {
        // eslint-disable-next-line no-restricted-syntax
        for (const [key3, v2] of Object.entries(v)) {
          if (isFieldError(v2)) {
            errorMessages.push(v2.message);
          }
        }
      }
    } else {
      const f = value as FieldError;
      errorMessages.push(f.message);
    }
  }

  return (
    <Alert variant="danger">
      {errorMessages.map((msg) => (
        <div key={msg}>{msg}</div>
      ))}
    </Alert>
  );
}
