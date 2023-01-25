import { ReactElement, ReactNode } from 'react';

import css from './FlexRowBox.module.scss';

interface Props {
  children: ReactNode;
}

export default function FlexRowBox({ children }: Props): ReactElement {
  return <div className={css.FlexRowBox}>{children}</div>;
}
