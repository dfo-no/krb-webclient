import { ReactElement, ReactNode } from 'react';
import Box from '@mui/material/Box';
import classNames from 'classnames';

import css from './Panel.module.scss';

type PanelColor = 'primary' | 'secondary' | 'white' | 'error' | 'warning';

export interface IProps {
  children: ReactNode;
  panelColor?: PanelColor;
  classname?: string;
}

export default function Panel({
  children,
  panelColor,
  classname,
}: IProps): ReactElement {
  return (
    <Box className={classNames([css.Panel, classname])} data-color={panelColor}>
      <div className={css.Content}>{children}</div>
    </Box>
  );
}
