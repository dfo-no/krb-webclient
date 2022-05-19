import { ReactElement } from 'react';

export interface IToolbarItem {
  icon?: ReactElement;
  label?: string;
  selected: boolean;
  url: string;
}
