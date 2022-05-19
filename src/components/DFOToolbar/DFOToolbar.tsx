import classnames from 'classnames';
import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import css from './DFOToolbar.module.scss';
import { IToolbarItem } from '../../models/IToolbarItem';

interface IProps {
  items: IToolbarItem[];
}

const DFOToolbar = ({ items }: IProps): ReactElement => {
  return (
    <div className={css.Toolbar}>
      {items.map((item) => (
        <Link
          key={item.url}
          to={item.url}
          className={classnames(
            css.icon,
            item.selected ? css.selected : undefined
          )}
        >
          {item.icon ?? <></>}
        </Link>
      ))}
    </div>
  );
};

export default DFOToolbar;
