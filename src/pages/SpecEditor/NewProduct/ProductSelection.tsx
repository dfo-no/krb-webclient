import React from 'react';
import { Controller } from 'react-hook-form';
import { List, ListItem, Typography, Radio } from '@mui/material';

import css from './NewProduct.module.scss';
import Utils from '../../../common/Utils';
import { IProduct } from '../../../Nexus/entities/IProduct';
import { Levelable } from '../../../models/Levelable';
import { Parentable } from '../../../models/Parentable';

interface IProps {
  products: Parentable<IProduct>[];
  postChange?: (selection: IProduct) => void;
}

const ProductSelection = ({
  products,
  postChange = () => {}
}: IProps): React.ReactElement => {
  const levelableProducts: Levelable<IProduct>[] =
    Utils.parentable2Levelable(products);

  const onClick = (
    item: Levelable<IProduct>,
    selected: string,
    onChange: (value: string | IProduct) => void
  ) => {
    onChange(Utils.levelable2Parentable(item));
    postChange(item);
  };

  const itemChecked = (item: IProduct, selected: IProduct) => {
    return selected.id === item.id;
  };

  return (
    <Controller
      render={({ field: { value: selected = products[0], onChange } }) => (
        <List>
          {levelableProducts.map((item: Levelable<IProduct>) => {
            return (
              <ListItem
                key={item.id}
                className={css.Product}
                sx={{
                  marginTop: item.level === 1 ? 'var(--small-gap)' : '-0.1rem',
                  marginLeft: `${(item.level - 1) * 2}%`,
                  width: `${100 - (item.level - 1) * 2}%`
                }}
                onClick={() => onClick(item, selected, onChange)}
              >
                <div className={css.Checkbox}>
                  <Radio checked={itemChecked(item, selected)} />
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
      name={'originProduct'}
    />
  );
};

export default ProductSelection;
