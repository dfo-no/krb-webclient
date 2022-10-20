import React, { ReactElement, ReactNode } from 'react';

import css from './Toolbar.module.scss';

type SpacingType = 'around' | 'between' | 'stretch';
type GapType = 'lg' | 'md' | 'sm' | 'none';

interface ToolBarProps {
  children: ReactNode;
  spacingType?: SpacingType;
  gapType?: GapType;
  hasPadding?: boolean;
}

export default function Toolbar({
  children,
  spacingType,
  gapType,
  hasPadding,
}: ToolBarProps): ReactElement {
  return (
    <div
      className={css.Toolbar}
      data-spacing={spacingType}
      data-gap={gapType}
      data-padding={hasPadding}
    >
      {children}
    </div>
  );
}
