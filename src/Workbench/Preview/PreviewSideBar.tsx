import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import Utils from '../../common/Utils';
import { Parentable } from '../../models/Parentable';
import { IProduct } from '../../Nexus/entities/IProduct';
import theme from '../../theme';
import { usePreviewState } from './PreviewContext';

interface IProps {
  parentableArray: Parentable<IProduct>[];
}

const useStyles = makeStyles({
  listItem: {
    paddingBottom: 0,
    paddingTop: 0,
    paddingRight: 0,
    cursor: 'pointer'
  },
  listItemParent: {
    paddingTop: 16
  },
  listItemChild: {
    display: 'flex',
    paddingBottom: 0,
    paddingTop: 0,
    width: '95%',
    float: 'right',
    paddingRight: 0,
    cursor: 'pointer'
  },
  listItemButtonParent: {
    border: `1px solid ${theme.palette.gray400.main}`,
    minHeight: 37,
    width: '100%',
    display: 'flex',
    justifySelf: 'center',
    paddingBottom: 0,
    paddingTop: 0,
    paddingRight: 0,
    cursor: 'pointer'
  },
  listItemButtonChild: {
    borderLeft: `1px solid ${theme.palette.gray400.main}`,
    borderRight: `1px solid ${theme.palette.gray400.main}`,
    borderBottom: `1px solid ${theme.palette.gray400.main}`,
    minHeight: 37,
    width: '100%',
    display: 'flex',
    paddingBottom: 0,
    paddingTop: 0
  },
  sideBarList: {
    position: 'sticky',
    height: '100%',
    width: '100%',
    minWidth: 230,
    paddingTop: 60,
    paddingLeft: '5%'
  },
  selectedItem: {
    background: theme.palette.primary.main,
    color: theme.palette.white.main
  },
  listItemButtonSelected: {
    background: theme.palette.primary.main,
    color: theme.palette.white.main,
    '&:hover': {
      background: theme.palette.lightBlue.main,
      color: theme.palette.white.main
    }
  },
  listItemButton: {
    backgroundColor: theme.palette.white.main,
    '&:hover': {
      background: theme.palette.lightBlue.main,
      color: theme.palette.white.main
    }
  },
  itemNameText: {
    display: 'flex',
    alignSelf: 'center',
    paddingLeft: '28px'
  }
});

export default function Sidebar({
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
      const isParent = element.parent === '' ? true : false;
      const isSelected = index === selectedIndex - 1 ? true : false;

      return (
        <ListItem
          className={`${classes.listItem} ${
            isParent ? classes.listItemParent : classes.listItemChild
          }`}
        >
          <Box
            className={`${
              isParent
                ? classes.listItemButtonParent
                : classes.listItemButtonChild
            } 
                
                ${
                  isSelected
                    ? classes.listItemButtonSelected
                    : classes.listItemButton
                }`}
            onClick={() => handleListItemClick(element, index + 1)}
          >
            <Typography
              className={classes.itemNameText}
              variant={element.parent === '' ? 'smBold' : 'sm'}
            >
              {element.title}
            </Typography>
          </Box>
        </ListItem>
      );
    });
  };

  return (
    <List className={classes.sideBarList}>
      <ListItem className={classes.listItem}>
        <Box
          className={`${classes.listItemButtonParent} 
           ${
             selectedIndex === 0
               ? classes.listItemButtonSelected
               : classes.listItemButton
           }`}
          onClick={() => handleListItemClick(null, 0)}
        >
          <Typography className={classes.itemNameText} variant="smBold">
            Generiske krav
          </Typography>
        </Box>
      </ListItem>
      {renderProducts(parentableArray)}
    </List>
  );
}
