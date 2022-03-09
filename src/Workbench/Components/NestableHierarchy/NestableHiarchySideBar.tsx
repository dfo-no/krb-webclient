import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import React, { useState } from 'react';
import 'react-nestable/dist/styles/index.css';
import Utils from '../../../common/Utils';
import { BaseModelWithTitleAndDesc } from '../../../models/BaseModelWithTitleAndDesc';
import { Nestable } from '../../../models/Nestable';
import { Parentable } from '../../../models/Parentable';
import { IBaseModel } from '../../../Nexus/entities/IBaseModel';
import theme from '../../../theme';
import NestableHierarcy from './NestableHierarcy';

interface IProps<T extends IBaseModel> {
  dispatchFunc: (items: Parentable<T>[]) => void;
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
      marginTop: '16px',
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
    width: '95%'
  },
  collapseIcon: {
    display: 'flex',
    alignSelf: 'center',
    paddingRight: '4px',
    justifySelf: 'flex-end',
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

const NestableHierarcySideBar = <T extends BaseModelWithTitleAndDesc>({
  dispatchFunc,
  selectFunc,
  inputlist,
  depth
}: IProps<T>): React.ReactElement => {
  const classes = useStyles();
  const [selected, setSelected] = useState<Parentable<T> | null>(null);

  const itemClicked = (item: Nestable<T>) => {
    const selectedParentable = item as Parentable<T>;
    selectFunc(selectedParentable);
    setSelected(selectedParentable);
  };

  const renderItem = (
    item: Nestable<T>,
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
    <NestableHierarcy
      inputlist={inputlist}
      className={classes.nestableCustom}
      renderItem={renderItem}
      dispatchfunc={dispatchFunc}
      depth={depth}
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
