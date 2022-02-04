import { Box, makeStyles } from '@material-ui/core';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Utils from '../../common/Utils';
import { Levelable } from '../../models/Levelable';
import { Parentable } from '../../models/Parentable';
import { INeed } from '../../Nexus/entities/INeed';
import { IProduct } from '../../Nexus/entities/IProduct';
import theme from '../../theme';
import styles from '../Admin/Requirement/NeedSideBar/NeedSidebar.module.scss';
import { IRequirement } from '../../Nexus/entities/IRequirement';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const useStyles = makeStyles({
  sideBarList: {
    paddingLeft: '5%'
  },
  sideBarListItem: {
    cursor: 'pointer',
    backgroundColor: theme.palette.dfoWhite.main,
    height: '35px',
    border: `1px solid ${theme.palette.gray500.main}`,
    '&:hover': {
      background: theme.palette.lightBlue.main,
      color: theme.palette.dfoWhite.main,

      '& $sideBarListItemText': {
        color: theme.palette.dfoWhite.main
      }
    },
    paddingRight: '8px !important'
  },
  noTopBorder: {
    borderTop: '0 transparent'
  },
  noBotBorder: {
    borderBottom: '0 transparent'
  },
  sideBarListItemText: {
    color: theme.palette.primary.main
  },
  selectedItem: {
    background: theme.palette.dfoDarkBlue.main,

    '& $sideBarListItemText': {
      color: theme.palette.dfoWhite.main
    }
  },
  collapseIcon: {
    display: 'flex',
    marginLeft: 'auto',
    color: theme.palette.dfoWhite.main
  }
});

interface IProps {
  parentableArray: Parentable<INeed | IProduct>[];
  updateSelectedFunction: (
    isRequirement: boolean,
    selectedRequirement: null | IRequirement,
    selectedProduct: null | Levelable<IProduct>
  ) => void;
}

export default function PreviewSideBar({
  parentableArray,
  updateSelectedFunction
}: IProps): React.ReactElement {
  const classes = useStyles();
  const [selected, setSelected] = useState<Levelable<INeed | IProduct> | null>(
    null
  );
  const [isGenericSelected, setGenericSelected] = useState(false);

  const genericClicked = () => {
    updateSelectedFunction(true, null, null);
    setSelected(null);
    setGenericSelected(true);
  };

  const itemClicked = (element: Levelable<INeed | IProduct>) => {
    updateSelectedFunction(false, null, element);
    setSelected(element);
    setGenericSelected(false);
  };

  const levels = (elements: Parentable<INeed | IProduct>[]) => {
    const displayNeeds = Utils.parentable2Levelable(elements);
    return displayNeeds.map((element, index) => {
      const prevLevel = index !== 0 ? displayNeeds[index - 1].level : 1;
      const nextLevel =
        index !== displayNeeds.length - 1 ? displayNeeds[index + 1].level : 1;
      const topBorder = prevLevel < element.level ? classes.noTopBorder : '';
      const botBorder =
        nextLevel <= element.level && nextLevel !== 1
          ? classes.noBotBorder
          : '';
      const isSelected = selected && selected.id === element.id;

      const cssClass = `level${element.level - 1}`;

      return (
        <ListItem
          key={`${index}-${element.id}`}
          className={`${styles.sidebar__item} ${styles[cssClass]} ${
            classes.sideBarListItem
          } ${topBorder} ${botBorder} ${
            isSelected ? classes.selectedItem : ''
          }`}
          onClick={() => itemClicked(element)}
        >
          <ListItemText className={classes.sideBarListItemText}>
            {element.title}
          </ListItemText>
          {isSelected && (
            <Box className={classes.collapseIcon}>
              <ArrowForwardIcon />
            </Box>
          )}
        </ListItem>
      );
    });
  };

  return (
    <Nav className={`sidebar flex-column p-0 ${styles.sidebar}`}>
      <Box className={classes.sideBarList}>
        <List>
          <ListItem
            className={`${classes.sideBarListItem} ${styles.level0} ${
              isGenericSelected ? classes.selectedItem : ''
            }`}
            onClick={() => genericClicked()}
          >
            <ListItemText className={classes.sideBarListItemText}>
              Generiske krav
            </ListItemText>
            {isGenericSelected && (
              <Box className={classes.collapseIcon}>
                <ArrowForwardIcon />
              </Box>
            )}
          </ListItem>
          {levels(parentableArray)}
        </List>
      </Box>
    </Nav>
  );
}
