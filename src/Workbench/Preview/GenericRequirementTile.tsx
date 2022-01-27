import { List, ListItem, ListItemText, makeStyles } from '@material-ui/core';
import { Margin } from '@mui/icons-material';
import React, { useState } from 'react';
import { IRequirement } from '../../Nexus/entities/IRequirement';
import theme from '../../theme';

interface IProps {
  updateSelectedFunction: () => void;
}

const useStyles = makeStyles({
  sideBarList: {
    backgroundColor: theme.palette.gray100.main,
    width: '17vw',
    minWidth: 250,
    marginBottom: 30
  },
  sideBarListItem: {
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

export default function GenericRequirementTile({
  updateSelectedFunction
}: IProps): React.ReactElement {
  const classes = useStyles();

  return (
    <div className={classes.sideBarList}>
      <List>
        <ListItem
          className={classes.sideBarListItem}
          onClick={() => updateSelectedFunction()}
        >
          <ListItemText className={classes.sideBarListItemText}>
            Generiske krav
          </ListItemText>
        </ListItem>
      </List>
    </div>
  );
}
