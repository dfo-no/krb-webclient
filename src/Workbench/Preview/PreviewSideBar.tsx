import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import makeStyles from '@mui/styles/makeStyles';
import React, { useState } from 'react';
import Utils from '../../common/Utils';
import { Levelable } from '../../models/Levelable';
import { Parentable } from '../../models/Parentable';
import { INeed } from '../../Nexus/entities/INeed';
import { IProduct } from '../../Nexus/entities/IProduct';
import { IRequirement } from '../../Nexus/entities/IRequirement';
import theme from '../../theme';
import styles from './PreviewSideBar.module.scss';

const useStyles = makeStyles({
  sideBarList: {
    paddingLeft: '5%',
    '& .MuiList-root': {
      '& .MuiListItem-root': {
        paddingRight: '4px'
      }
    }
  },
  sideBarListItem: {
    cursor: 'pointer',
    backgroundColor: theme.palette.white.main,
    height: '35px',
    border: `1px solid ${theme.palette.gray500.main}`,
    '&:hover': {
      background: theme.palette.lightBlue.main,
      color: theme.palette.white.main,
      '& $sideBarListItemText': {
        color: theme.palette.white.main
      }
    }
  },
  sideBarListItemText: {
    color: theme.palette.primary.main
  },
  selectedItem: {
    background: theme.palette.primary.main,
    '& $sideBarListItemText': {
      color: theme.palette.white.main
    }
  },
  collapseIcon: {
    display: 'flex',
    marginLeft: 'auto',
    color: theme.palette.white.main
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
      const isSelected = selected && selected.id === element.id;
      const cssClass = `level${element.level - 1}`;

      return (
        <ListItem
          key={`${index}-${element.id}`}
          className={`${styles[cssClass]} ${classes.sideBarListItem} ${
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
    <div className={`${styles.sidebar}`}>
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
    </div>
  );
}
