import React, { ReactNode } from 'react';

import css from './ValidationMessageForm.module.scss';
interface Props {
  children: ReactNode;
  message?: string;
  isError: boolean;
}
export default function ValidationMessageForm({
  children,
  message,
  isError,
}: Props) {
  return (
    <div className={css.ValidationMessageForm} data-error={isError}>
      {children}
      {message && (
        <div
          className={
            isError
              ? css.ValidationMessageForm__error
              : css.ValidationMessageForm__info
          }
        >
          {message}
        </div>
      )}
    </div>
  );
}
