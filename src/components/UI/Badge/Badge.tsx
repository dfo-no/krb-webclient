import React, { ReactNode } from 'react';

import css from './Badge.module.scss';

type BadgeType = 'information' | 'warning' | 'error' | 'primary';

interface BadgeProps {
  type: BadgeType;
  displayText: string;
  icon?: ReactNode;
}

export default function Badge({ type, displayText, icon }: BadgeProps) {
  return (
    <div className={css.Badge} data-badge-type={type}>
      {icon && icon}
      {displayText && <span>{displayText}</span>}
    </div>
  );
}
