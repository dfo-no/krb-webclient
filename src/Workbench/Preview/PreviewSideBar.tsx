import { Box, Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import makeStyles from '@mui/styles/makeStyles';
import { t } from 'i18next';
import React from 'react';
import Utils from '../../common/Utils';
import { Parentable } from '../../models/Parentable';
import { IProduct } from '../../Nexus/entities/IProduct';
import theme from '../../theme';
import { ScrollableContainer } from '../Components/ScrollableContainer';
import { usePreviewState } from './PreviewContext';

interface IProps {
  parentableArray: Parentable<IProduct>[];
}

const useStyles = makeStyles({
  sideBarList: {
    position: 'sticky',
    height: '100%',
    width: '100%',
    minWidth: 230,
    paddingLeft: '5%',
    paddingTop: 0
  },
  listItem: {
    cursor: 'pointer',
    minHeight: 36,
    background: theme.palette.white.main,
    '&:hover': {
      background: theme.palette.lightBlue.main,
      color: theme.palette.white.main
    }
  },
  listItemParent: {
    border: `1px solid ${theme.palette.gray400.main}`,
    '&:not(:first-child)': {
      marginTop: '16px'
    }
  },
  listItemChild: {
    borderLeft: `1px solid ${theme.palette.gray400.main}`,
    borderRight: `1px solid ${theme.palette.gray400.main}`,
    borderBottom: `1px solid ${theme.palette.gray400.main}`
  },
  selectedListItem: {
    background: theme.palette.primary.main,
    color: theme.palette.white.main
  },
  itemNameText: {
    display: 'flex',
    alignSelf: 'center'
  }
});

export default function PreviewSideBar({
  parentableArray
}: IProps): React.ReactElement {
  const { setSelected } = usePreviewState();
  const classes = useStyles();
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
          className={`${classes.listItem} 
                      ${
                        isParent
                          ? classes.listItemParent
                          : classes.listItemChild
                      } 
                      ${isSelected ? classes.selectedListItem : ''}`}
          sx={{
            marginLeft: `${element.level * 25}px`,
            width: `calc(100% - ${element.level * 25}px)`
          }}
          onClick={() => handleListItemClick(element, index + 1)}
        >
          <Typography
            className={classes.itemNameText}
            variant={element.parent === '' ? 'smBold' : 'sm'}
          >
            {element.title}
          </Typography>
        </ListItem>
      );
    });
  };

  return (
    <Box
      sx={{ paddingBottom: 5, paddingTop: 5, height: '100%', width: '100%' }}
    >
      <ScrollableContainer sx={{ height: '100%' }}>
        <List className={classes.sideBarList}>
          <ListItem
            key="generic"
            className={`${classes.listItem} ${
              classes.listItemParent
            }            
            ${selectedIndex === 0 ? classes.selectedListItem : ''}`}
            onClick={() => handleListItemClick(null, 0)}
            sx={{
              marginLeft: `${1 * 25}px`,
              width: `calc(100% - ${1 * 25}px)`
            }}
          >
            <Typography className={classes.itemNameText} variant="smBold">
              {t('General requirements')}
            </Typography>
          </ListItem>
          {renderProducts(parentableArray)}
        </List>
      </ScrollableContainer>
    </Box>
  );
}
