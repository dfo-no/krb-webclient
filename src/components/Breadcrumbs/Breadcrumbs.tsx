import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import css from './Breadcrumbs.module.scss';
import { IBreadcrumb } from '../../models/IBreadcrumb';

interface IProps {
  breadcrumbs: IBreadcrumb[];
}

const Breadcrumbs = ({ breadcrumbs }: IProps): ReactElement => {
  const isLast = (index: number): boolean => {
    return index === breadcrumbs.length - 1;
  };

  return (
    <div className={css.Breadcrumbs}>
      <span>
        <a href={'https://anskaffelser.no'}>Anskaffelser.no</a>
      </span>
      {breadcrumbs.map((breadcrumb, index) => (
        <span key={'bc_' + index}>
          {!isLast(index) ? (
            <Link to={breadcrumb.url}>{breadcrumb.label}</Link>
          ) : (
            breadcrumb.label
          )}
        </span>
      ))}
    </div>
  );
};

export default Breadcrumbs;
