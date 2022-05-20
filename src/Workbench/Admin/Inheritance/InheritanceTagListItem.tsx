import { Box, ListItem, ListItemText, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useState } from 'react';
import CheckboxCtrl from '../../../FormProvider/CheckboxCtrl';
import { ITag } from '../../../Nexus/entities/ITag';
import theme from '../../../theme';

export interface IProps {
  tagListItem: ITag;
}

const useStyles = makeStyles({
  tagListItem: {
    display: 'flex',
    backgroundColor: theme.palette.white.main,
    borderBottom: `1px solid ${theme.palette.silver.main}`,
    height: '42px',
    '&:hover': {
      background: theme.palette.lightBlue.main,
      '& $tagListItemText': {
        color: theme.palette.white.main
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
  }
});

export default function InheritedTagListItem({
  tagListItem
}: IProps): React.ReactElement {
  const [checkboxState, setCheckboxState] = useState(false);

  const toggleCheckbox = () => {
    if (checkboxState) {
      setCheckboxState(false);
    } else {
      setCheckboxState(true);
    }
  };

  const classes = useStyles();

  return (
    <ListItem
      className={classes.tagListItem}
      key={tagListItem.title}
      onClick={toggleCheckbox}
    >
      <Box className={classes.tagListItemCheckbox}>
        <CheckboxCtrl
          name="name"
          label={
            <Typography
              className={classes.tagListItemText}
              onClick={toggleCheckbox}
            >
              {tagListItem.title}
            </Typography>
          }
        />
      </Box>
      <Box className={classes.tagListItemDescription}>
        <ListItemText>
          <Typography variant="sm">{tagListItem.description}</Typography>
        </ListItemText>
      </Box>
    </ListItem>
  );
}
