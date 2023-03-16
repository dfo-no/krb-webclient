import classnames from 'classnames';
import React from 'react';
import { Controller } from 'react-hook-form';
import { List, ListItem, Typography } from '@mui/material';

import css from './ProductSelection.module.scss';
// import Utils from '../../common/Utils';
import { DFOCheckbox } from '../DFOCheckbox/DFOCheckbox';
// import { Levelable, LevelableKRB858 } from '../../models/Levelable';
import { ProductForm } from '../../api/nexus2';

interface Props {
  name: string;
  products: ProductForm[];
}


export const MultipleProductSelection = ({
  name,
  products,
}: Props): React.ReactElement => {
  // const levelableItems: LevelableKRB858<ProductForm>[] =// TODO Fix
  //   Utils.parentable2LevelableKRB858(products);

  const onClick = (
    item: ProductForm,
    selected: string[],
    onChange: (value: string[]) => void
  ): void => {
    if (selected.some((elem) => elem === item.ref)) {
      const selectedUpdated = [...selected];
      const index = selectedUpdated.findIndex((elem) => elem === item.ref);
      if (index !== -1) {
        selectedUpdated.splice(index, 1);
      }
      onChange(selectedUpdated);
    } else {
      onChange([...selected, item.ref]);
    }
  };

  products.map((p) => {
    console.log(p);
  });

  const productChecked = (item: ProductForm, selected: string[]): boolean => {
    return selected ? selected.some((elem) => elem === item.ref) : false;
  };

  // const isDeleted = (item: ProductForm, selected: string[]): boolean => {
  //   const childrenIsDeleted = levelableItems
  //     .filter((child) => child.parent === item.ref)
  //     .every((child) => isDeleted(child, selected));
  //   return (
  //     !!item.deletedDate && !productChecked(item, selected) && childrenIsDeleted
  //   );
  // };


  return (
    <div className={css.ProductSelection}>
      <Controller
        render={({ field: { value: selected, onChange } }) => (
          <List>
            {/* {levelableItems */}
            {products
              // .filter((product) => !isDeleted(product, selected))
              .map((product) => {
                return (
                  <ListItem
                    key={product.ref}
                    className={classnames(
                      css.Product // ,
                      // !!product.deletedDate ? css.Deleted : undefined
                    )}
                    sx={{
                      // marginTop:
                      //   product.level === 1 ? 'var(--small-gap)' : '-0.1rem',
                      // marginLeft: `${(product.level - 1) * 2}%`,
                      // width: `${100 - (product.level - 1) * 2}%`,
                      marginTop: '-0.1rem',
                      marginLeft: 0,
                      width: '100%',
                    }}
                    onClick={() => onClick(product, selected, onChange)}
                  >
                    <div className={css.Checkbox}>
                      <DFOCheckbox
                        checked={productChecked(product, selected)}
                      />
                    </div>
                    <Typography
                      className={css.Title}
                      // variant={product.level === 1 ? 'smBold' : 'sm'}
                      variant="smBold"
                    >
                      {product.title}
                    </Typography>
                    <Typography className={css.Description} variant={'sm'}>
                      {product.description}
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
