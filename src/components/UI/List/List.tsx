import React, { ReactElement, ReactNode } from 'react';

import css from './List.module.scss';

interface IListProps {
  children: ReactNode;
  onClick: () => void;
}

export default function List({ children, onClick }: IListProps): ReactElement {
  return <div className={css.List}>{children}</div>;
}
