import classnames from 'classnames';
import React from 'react';
import { Box, Typography, List, ListItem } from '@mui/material';
import { t } from 'i18next';

import css from './Preview.module.scss';
import Utils from '../../../common/Utils';
import { IProduct } from '../../../Nexus/entities/IProduct';
import { Parentable } from '../../../models/Parentable';
import { usePreviewState } from './PreviewContext';

interface IProps {
  parentableArray: Parentable<IProduct>[];
}

export default function PreviewSideBar({
  parentableArray
}: IProps): React.ReactElement {
  const { setSelected } = usePreviewState();
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (
    value: Parentable<IProduct> | null,
    index: number
  ) => {
    setSelectedIndex(index);
    setSelected(value);
  };

  const renderProducts = (elements: Parentable<IProduct>[]) => {
    const displayNeeds = Utils.parentable2Levelable(elements);

    return displayNeeds.map((element, index) => {
      const isParent = element.parent === '';
      const isSelected = index === selectedIndex - 1;

      return (
        <ListItem
          key={element.id}
          className={classnames(
            css.item,
            isParent ? css.parent : css.child,
            isSelected ? css.selected : undefined
          )}
          sx={{
            marginLeft: `${element.level * 2.5}rem`,
            width: `calc(100% - ${element.level * 2.5}rem)`
          }}
          onClick={() => handleListItemClick(element, index + 1)}
        >
          <Typography
            className={css.title}
            variant={element.parent === '' ? 'smBold' : 'sm'}
          >
            {element.title}
          </Typography>
        </ListItem>
      );
    });
  };

  return (
    <Box className={css.SideBar}>
      <List className={css.list}>
        <ListItem
          key="generic"
          className={classnames(
            css.item,
            css.parent,
            selectedIndex === 0 ? css.selected : undefined
          )}
          onClick={() => handleListItemClick(null, 0)}
          sx={{
            marginLeft: `2.5rem`,
            width: `calc(100% - 2.5rem)`
          }}
        >
          <Typography className={css.title} variant="smBold">
            {t('General requirements')}
          </Typography>
        </ListItem>
        {renderProducts(parentableArray)}
      </List>
    </Box>
  );
}
