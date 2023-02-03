import { useState } from 'react';
import classnames from 'classnames';
import { Box, Typography, List, ListItem } from '@mui/material';
import { t } from 'i18next';

import css from './Preview.module.scss';
import Utils from '../../../common/Utils';
import { IProduct } from '../../../Nexus/entities/IProduct';
import { Parentable } from '../../../models/Parentable';
import { usePreviewState } from './PreviewContext';

interface Props {
  parentableArray: Parentable<IProduct>[];
}

export default function PreviewSideBar({
  parentableArray,
}: Props): React.ReactElement {
  const { setSelected } = usePreviewState();
  const [selectedIndex, setSelectedIndex] = useState(0);

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
      const itemWidth = (element.level - 1) * 1.6;

      return (
        <ListItem
          key={element.id}
          className={classnames(
            css.item,
            isParent ? css.parent : css.child,
            isSelected ? css.selected : undefined
          )}
          sx={{
            marginLeft: `${itemWidth}rem`,
            width: `calc(100% - ${itemWidth}rem)`,
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
