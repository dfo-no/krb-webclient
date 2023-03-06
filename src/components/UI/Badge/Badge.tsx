import React, { ReactNode } from 'react';
import { Icon, Symbols } from '@dfo-no/components.icon';

import css from './Badge.module.scss';

export enum BadgeType {
  Information = 'information',
  Requirement = 'requirement',
  Award = 'award',
  Warning = 'warning',
  Error = 'error',
  Primary = 'primary',
  Properties = 'Properties',
}

interface BadgeProps {
  type: BadgeType;
  displayText: string;
  icon?: ReactNode;
}

export default function Badge({ type, displayText, icon }: BadgeProps) {
  const iconType = () => {
    if (type === BadgeType.Information) {
      return Symbols.InfoCircle;
    }
    if (type === BadgeType.Requirement) {
      return Symbols.Lock;
    }
    if (type === BadgeType.Award) {
      return Symbols.SortAmountDesc;
    }
    if (type === BadgeType.Properties) {
      return Symbols.Tags;
    }
  };
  return (
    <div className={css.Badge} data-badge-type={type}>
      {!icon && <Icon symbol={iconType()} />}
      {icon}
      {displayText && <span>{displayText}</span>}
    </div>
  );
}
