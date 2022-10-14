import React, { ReactElement, ReactNode } from 'react';
import { Typography } from '@mui/material';

import css from './Toolbar.module.scss';

type FontWeight = 'normal' | 'semibold' | 'bold';
type FontSize = 'small' | 'large' | 'big' | 'giant';

export interface ToolbarItemProps {
  primaryText?: string;
  secondaryText?: string;
  icon?: ReactNode;
  handleClick?: () => void;
  disablePadding?: boolean;
  fontWeight?: FontWeight;
  fontSize?: FontSize;
  disabled?: boolean;
}

export default function ToolbarItem({
  primaryText,
  secondaryText,
  icon,
  handleClick,
  fontWeight,
  fontSize,
  disabled
}: ToolbarItemProps): ReactElement {
  return (
    <div
      className={css.ToolbarItem}
      onClick={handleClick}
      data-font-weight={fontWeight}
      data-change={!!handleClick}
      data-font-size={fontSize}
      data-disabled={disabled}
      data-icon={!!icon}
    >
      {icon && icon}
      {primaryText && (
        <Typography>
          {primaryText} {icon ? '' : ': '}
        </Typography>
      )}
      {secondaryText && <span>{secondaryText}</span>}
    </div>
  );
}
