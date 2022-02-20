import { Box, ListItem, ListItemText, Typography } from '@mui/material';
import { makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import CheckboxCtrl from '../../../FormProvider/CheckboxCtrl';
import theme from '../../../theme';

export interface IProps {
  tagListItem: any;
}

const useStyles = makeStyles({
  tagListItem: {
    display: 'flex',
    backgroundColor: theme.palette.dfoWhite.main,
    borderBottom: `1px solid ${theme.palette.silver.main}`,
    height: '42px',
    cursor: 'pointer',
    '&:hover': {
      background: theme.palette.lightBlue.main,
      '& $tagListItemText': {
        color: theme.palette.dfoWhite.main
      }
    }
  },
  tagListItemCheckbox: {
    width: '40%',
    paddingRight: 10
  },
  tagListItemText: {
    color: theme.palette.gray700.main
  },
  tagListItemDescription: {
    display: 'flex',
    alignItems: 'center',
    borderLeft: `1px solid ${theme.palette.silver.main}`,
    paddingLeft: 10,
    width: '90%',
    height: '42px'
  },
  inheritanceTagList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    margin: 'auto',
    border: `2px solid ${theme.palette.dfoBlue.main}`,
    backgroundColor: theme.palette.gray200.main,
    width: '50vw',
    padding: 30
  },
  topContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  searchContainer: {
    width: '25vw'
  },
  tagsList: {
    border: `1px solid ${theme.palette.silver.main}`,
    '&:last-child': {
      borderBottom: 'none'
    },
    '& .MuiList-root': {
      paddingTop: 0,
      paddingBottom: 0
    }
  }
});

export default function InheritedTagListItem({
  tagListItem
}: IProps): React.ReactElement {
  const [checkCheckbox, setCheckCheckbox] = useState(false);
  const [checkboxVariant, setCheckboxVariant] = useState('blueBorder');

  const toggleCheckbox = () => {
    if (checkCheckbox) {
      setCheckCheckbox(false);
    } else {
      setCheckCheckbox(true);
    }
  };

  const listItemOnMouseEnter = () => {
    setCheckboxVariant('white');
  };

  const listItemOnMouseLeave = () => {
    setCheckboxVariant('blueBorder');
  };

  const classes = useStyles();

  return (
    <ListItem
      className={classes.tagListItem}
      key={tagListItem.title}
      onClick={toggleCheckbox}
      onMouseEnter={listItemOnMouseEnter}
      onMouseLeave={listItemOnMouseLeave}
    >
      <Box className={classes.tagListItemCheckbox} onClick={toggleCheckbox}>
        <CheckboxCtrl
          variant={checkboxVariant}
          value={checkCheckbox}
          name="name"
          label={
            <Typography className={classes.tagListItemText} variant="smallGray">
              {tagListItem.title}
            </Typography>
          }
        />
      </Box>
      <Box className={classes.tagListItemDescription}>
        <ListItemText>
          <Typography variant="smallGray" className={classes.tagListItemText}>
            {tagListItem.description}
          </Typography>
        </ListItemText>
      </Box>
    </ListItem>
  );
}
