import { ErrorMessage } from '@hookform/error-message';
import React from 'react';
import { FieldErrors } from 'react-hook-form';

type ErrorSummaryProps<T> = {
  errors: FieldErrors<T>;
};
export default function ErrorSummary<T>({ errors }: ErrorSummaryProps<T>) {
  if (Object.keys(errors).length === 0) {
    console.log('no errors');
    return null;
  }
  return (
    <div>
      {Object.keys(errors).map((fieldName) => (
        <ErrorMessage
          errors={errors}
          name={fieldName as any}
          render={({ messages }) =>
            messages &&
            Object.entries(messages).map(([type, message]) => (
              <p key={type}>{message}</p>
            ))
          }
        />
      ))}
    </div>
  );
}
