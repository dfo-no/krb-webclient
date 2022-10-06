import React, { ReactElement, ReactNode } from 'react';

import css from './Toolbar.module.scss';

type SpacingType = 'around' | 'between' | 'stretch';

interface ToolBarProps {
  children: ReactNode;
  spacingType?: SpacingType;
}

export default function Toolbar({
  children,
  spacingType
}: ToolBarProps): ReactElement {
  return (
    <div className={css.Toolbar} data-spacing={spacingType}>
      {children}
    </div>
  );
}
