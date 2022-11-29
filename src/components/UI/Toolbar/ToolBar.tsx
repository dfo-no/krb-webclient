import React, { ReactElement, ReactNode } from 'react';
import classnames from 'classnames';

import css from './Toolbar.module.scss';

type SpacingType = 'around' | 'between' | 'stretch';
type GapType = 'lg' | 'md' | 'sm' | 'none';

interface ToolBarProps {
  className?: string;
  children: ReactNode;
  spacingType?: SpacingType;
  gapType?: GapType;
  hasPadding?: boolean;
}

export default function Toolbar({
  className,
  children,
  spacingType,
  gapType,
  hasPadding,
}: ToolBarProps): ReactElement {
  return (
    <div
      className={classnames(css.Toolbar, className)}
      data-spacing={spacingType}
      data-gap={gapType}
      data-padding={hasPadding}
    >
      {children}
    </div>
  );
}
