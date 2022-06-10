import classnames from 'classnames';
import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { Tooltip } from '@mui/material';

import css from './DFOToolbar.module.scss';
import { IToolbarItem } from '../../models/IToolbarItem';

interface IProps {
  items: IToolbarItem[];
}

const DFOToolbar = ({ items }: IProps): ReactElement => {
  return (
    <div className={css.Toolbar}>
      {items.map((item) => (
        <Tooltip key={item.url} title={item.label ?? ''}>
          <Link
            aria-label={item.label ?? ''}
            className={classnames(
              css.icon,
              item.selected ? css.selected : undefined
            )}
            to={item.url}
          >
            {item.icon}
          </Link>
        </Tooltip>
      ))}
    </div>
  );
};

export default DFOToolbar;
