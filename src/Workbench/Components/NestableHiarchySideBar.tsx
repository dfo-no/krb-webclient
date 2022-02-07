import React, { useState } from 'react';
import Nestable, { Item } from 'react-nestable';
import 'react-nestable/dist/styles/index.css';
import Utils from '../../common/Utils';
import { Parentable } from '../../models/Parentable';
import { IBaseModel } from '../../Nexus/entities/IBaseModel';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { makeStyles, Box } from '@material-ui/core';
import { Typography } from '@mui/material';
import theme from '../../theme';

interface IProps<T extends IBaseModel> {
  listOrderFunc: (itemlist: Parentable<T>[]) => void;
  selectFunc: (item: Parentable<T>) => void;
  inputlist: Parentable<T>[];
  depth: number;
}

const useStyles = makeStyles({
  nestableItemCustom: {
    display: 'flex',
    cursor: 'pointer',
    backgroundColor: theme.palette.dfoWhite.main,
    verticalAlign: 'middle',
    height: '35px',
    borderLeft: `1px solid ${theme.palette.gray500.main}`,
    borderRight: `1px solid ${theme.palette.gray500.main}`,
    '&:hover': {
      background: theme.palette.lightBlue.main,
      color: theme.palette.dfoWhite.main
    }
  },
  nestableCustom: {
    '& .nestable-item': {
      marginTop: '40px',
      '& .nestable-item-name': {
        borderTop: `1px solid ${theme.palette.gray500.main}`,
        borderBottom: `1px solid ${theme.palette.gray500.main}`
      }
    },
    '& .nestable-list > .nestable-item > .nestable-list': {
      margin: '0',
      '& .nestable-item': {
        margin: '0',
        '& .nestable-item-name': {
          marginTop: '-1px'
        }
      }
    },
    width: '95%',
    paddingLeft: '5%',
    paddingBottom: '5%'
  },
  itemNameText: {
    display: 'flex',
    alignSelf: 'center',
    width: '90%'
  },
  collapseIcon: {
    display: 'flex',
    alignSelf: 'center',
    justifySelf: 'flex-end',
    paddingRight: '8px',
    marginLeft: 'auto'
  },
  handlerIcon: {
    display: 'flex',
    alignSelf: 'center',
    justifySelf: 'flex-end'
  },
  selectedItem: {
    background: theme.palette.dfoDarkBlue.main,
    color: theme.palette.dfoWhite.main
  }
});

const NestableHierarcySideBar = <T extends IBaseModel>({
  listOrderFunc,
  selectFunc,
  inputlist,
  depth
}: IProps<T>): React.ReactElement => {
  const classes = useStyles();
  const [selected, setSelected] = useState<Parentable<T> | null>(null);

  const convertTreeToList = (tree: Item, key: string, collection: Item[]) => {
    if ((!tree[key] || tree[key].length === 0) && collection.includes(tree)) {
      const copiedTree = { ...tree };
      delete copiedTree.children;
      collection.push(copiedTree);
      return;
    }
    if (!collection.includes(tree)) {
      const copiedTree = { ...tree };
      delete copiedTree.children;
      collection.push(copiedTree);
    }
    for (let i = 0; i < tree[key].length; i += 1) {
      const child = tree[key][i];
      child.parent = tree.id === undefined ? '' : tree.id;
      convertTreeToList(child, key, collection);
    }
  };

  const flatten = (list: {
    items: Item[];
    dragItem?: Item;
    targetPath?: number[];
  }) => {
    const flattenedCollection: Item[] = [];
    list.items.forEach((element) => {
      const copy = element;
      copy.parent = '';
      convertTreeToList(element, 'children', flattenedCollection);
    });
    return flattenedCollection;
  };

  const hierarchyList = Utils.parentable2Nestable(inputlist);

  const onChange = (items: {
    items: Item[];
    dragItem: Item;
    targetPath: number[];
  }) => {
    const itemList = flatten(items);
    const returnList: Parentable<T>[] = [];
    itemList.forEach((elem) => {
      const clone = { ...elem };
      delete clone.level;
      returnList.push(clone as Parentable<T>);
    });
    listOrderFunc(returnList);
  };

  const itemClicked = (item: Item) => {
    const selectedParentable = item as Parentable<T>;
    selectFunc(selectedParentable);
    setSelected(selectedParentable);
  };

  const renderItem = (
    item: Item,
    handler: React.ReactNode,
    collapseIcon: React.ReactNode
  ) => {
    return (
      <Box
        className={`${classes.nestableItemCustom} ${
          selected && selected.id === item.id ? classes.selectedItem : ''
        }`}
        onClick={() => itemClicked(item)}
      >
        <Box className={classes.collapseIcon}>{handler}</Box>
        <Typography className={classes.itemNameText}>
          {Utils.capitalizeFirstLetter(item.title ? item.title : '')}
        </Typography>
        <Box className={classes.collapseIcon}>{collapseIcon}</Box>
        {selected && selected.id === item.id && (
          <Box className={classes.collapseIcon}>
            <ArrowForwardIcon />
          </Box>
        )}
      </Box>
    );
  };

  return (
    <Nestable
      items={hierarchyList}
      className={classes.nestableCustom}
      renderItem={({ item, collapseIcon, handler }) =>
        renderItem(item, handler, collapseIcon)
      }
      onChange={(items) => onChange(items)}
      maxDepth={depth}
      handler={<DragIndicatorIcon />}
      renderCollapseIcon={({ isCollapsed }) => {
        return isCollapsed ? (
          <KeyboardArrowRightIcon />
        ) : (
          <KeyboardArrowDownIcon />
        );
      }}
    />
  );
};

export default NestableHierarcySideBar;
