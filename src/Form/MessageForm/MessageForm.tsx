import React, { ReactNode } from 'react';

import css from './MessageForm.module.scss';
interface Props {
  children: ReactNode;
  message?: string;
  isError: boolean;
}
export default function MessageForm({ children, message, isError }: Props) {
  return (
    <div className={css.MessageForm} data-error={isError}>
      {children}
      {message && (
        <div
          className={isError ? css.MessageForm__error : css.MessageForm__info}
        >
          {message}
        </div>
      )}
    </div>
  );
}
