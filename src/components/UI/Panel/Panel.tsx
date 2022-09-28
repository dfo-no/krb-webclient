import { ReactElement, ReactNode } from 'react';
import Box from '@mui/material/Box';
import classNames from 'classnames';

import css from './Panel.module.scss';

type PanelColor = 'primary' | 'secondary' | 'white' | 'error' | 'warning';

export interface IProps {
  children: ReactNode;
  panelColor?: PanelColor;
  sticky?: boolean;
}

export default function Panel({
  children,
  panelColor,
  sticky
}: IProps): ReactElement {
  return (
    <Box
      className={classNames([css.Panel, sticky ? css.Sticky : undefined])}
      data-color={panelColor}
    >
      <div className={css.Content}>{children}</div>
    </Box>
  );
}
