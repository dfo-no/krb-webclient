import React, { ReactElement, ReactNode } from 'react';
import { Typography } from '@mui/material';

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
}

export default function ToolbarItem({
  primaryText,
  secondaryText,
  icon,
  handleClick,
  fontWeight,
  fontSize
}: ToolbarItemProps): ReactElement {
  return (
    <div
      onClick={handleClick}
      data-font-weight={fontWeight}
      data-change={!!handleClick}
      data-font-size={fontSize}
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
