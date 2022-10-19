import classnames from 'classnames';
import React from 'react';
import { Controller } from 'react-hook-form';
import { List, ListItem, Typography } from '@mui/material';

import css from './ProductSelection.module.scss';
import Utils from '../../common/Utils';
import { DFOCheckbox } from '../DFOCheckbox/DFOCheckbox';
import { IProduct } from '../../Nexus/entities/IProduct';
import { Levelable } from '../../models/Levelable';
import { Parentable } from '../../models/Parentable';

interface IProps {
  name: string;
  products: Parentable<IProduct>[];
}

const MultipleProductSelection = ({
  name,
  products,
}: IProps): React.ReactElement => {
  const levelableItems: Levelable<IProduct>[] =
    Utils.parentable2Levelable(products);

  const onClick = (
    item: IProduct,
    selected: string[],
    onChange: (value: string[]) => void
  ): void => {
    if (selected.some((elem) => elem === item.id)) {
      const selectedUpdated = [...selected];
      const index = selectedUpdated.findIndex((elem) => elem === item.id);
      if (index !== -1) {
        selectedUpdated.splice(index, 1);
      }
      onChange(selectedUpdated);
    } else {
      onChange([...selected, item.id]);
    }
  };

  const productChecked = (item: IProduct, selected: string[]): boolean => {
    return selected.some((elem) => elem === item.id);
  };

  const isDeleted = (item: IProduct, selected: string[]): boolean => {
    const childrenIsDeleted = levelableItems
      .filter((child) => child.parent === item.id)
      .every((child) => isDeleted(child, selected));
    return (
      !!item.deletedDate && !productChecked(item, selected) && childrenIsDeleted
    );
  };

  return (
    <div className={css.ProductSelection}>
      <Controller
        render={({ field: { value: selected, onChange } }) => (
          <List>
            {levelableItems
              .filter((item) => !isDeleted(item, selected))
              .map((item) => {
                return (
                  <ListItem
                    key={item.id}
                    className={classnames(
                      css.Product,
                      !!item.deletedDate ? css.Deleted : undefined
                    )}
                    sx={{
                      marginTop:
                        item.level === 1 ? 'var(--small-gap)' : '-0.1rem',
                      marginLeft: `${(item.level - 1) * 2}%`,
                      width: `${100 - (item.level - 1) * 2}%`,
                    }}
                    onClick={() => onClick(item, selected, onChange)}
                  >
                    <div className={css.Checkbox}>
                      <DFOCheckbox checked={productChecked(item, selected)} />
                    </div>
                    <Typography
                      className={css.Title}
                      variant={item.level === 1 ? 'smBold' : 'sm'}
                    >
                      {item.title}
                    </Typography>
                    <Typography className={css.Description} variant={'sm'}>
                      {item.description}
                    </Typography>
                  </ListItem>
                );
              })}
          </List>
        )}
        name={name}
      />
    </div>
  );
};

export default MultipleProductSelection;
