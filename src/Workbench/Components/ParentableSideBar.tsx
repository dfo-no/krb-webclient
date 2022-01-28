import { makeStyles } from '@material-ui/core';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Utils from '../../common/Utils';
import { Levelable } from '../../models/Levelable';
import { Parentable } from '../../models/Parentable';
import { INeed } from '../../Nexus/entities/INeed';
import { IProduct } from '../../Nexus/entities/IProduct';
import theme from '../../theme';
import styles from '../Admin/Requirement/NeedSideBar/NeedSidebar.module.scss';

interface IProps {
  parentableArray: Parentable<INeed | IProduct>[];
  updateSelectedFunction: (item: Levelable<INeed | IProduct>) => void;
}

const useStyles = makeStyles({
  sideBarList: {
    backgroundColor: theme.palette.gray100.main,
    width: '17vw',
    minWidth: 250,
    minHeight: '100vh',
    [theme.breakpoints.down('sm')]: {
      height: 'auto',
      width: '100vw',
      backgroundColor: theme.palette.dfoWhite.main
    }
  },
  sideBarListItem: {
    cursor: 'pointer',
    borderBottom: `1px solid ${theme.palette.gray300.main}`,
    '&:hover': {
      background: theme.palette.lightBlue.main,
      color: theme.palette.dfoWhite.main,

      '& $sideBarListItemText': {
        color: theme.palette.dfoWhite.main
      }
    },

    [theme.breakpoints.down('sm')]: {
      backgroundColor: theme.palette.gray100.main
    }
  },

  sideBarListItemText: {
    color: theme.palette.primary.main,
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center'
    }
  }
});

export default function ParentableSideBar({
  parentableArray,
  updateSelectedFunction
}: IProps): React.ReactElement {
  const classes = useStyles();
  const levels = (elements: Parentable<INeed | IProduct>[]) => {
    const displayNeeds = Utils.parentable2Levelable(elements);

    return displayNeeds.map((element, index) => {
      const cssClass = `level${element.level - 1}`;
      return (
        <ListItem
          key={`${index}-${element.id}`}
          className={`${styles.sidebar__item} ${styles[cssClass]} ${classes.sideBarListItem}`}
          onClick={() => updateSelectedFunction(element)}
        >
          <ListItemText className={classes.sideBarListItemText}>
            {element.title}
          </ListItemText>
        </ListItem>
      );
    });
  };

  return (
    <Nav className={`sidebar flex-column p-0 ${styles.sidebar}`}>
      <List className={classes.sideBarList}>{levels(parentableArray)}</List>
    </Nav>
  );
}
