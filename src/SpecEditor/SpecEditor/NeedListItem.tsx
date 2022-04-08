import { Box, ListItem, ListItemText, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import theme from '../../theme';
import { INeed } from '../../Nexus/entities/INeed';
import { Parentable } from '../../models/Parentable';

const useStyles = makeStyles({
  needListItem: {
    backgroundColor: theme.palette.white.main,
    borderBottom: `1px solid ${theme.palette.silver.main}`,
    cursor: 'pointer',
    '&:hover': {
      background: theme.palette.lightBlue.main,
      '& $needListItemText': {
        color: theme.palette.white.main
      }
    }
  },
  needListItemTitle: {
    flexBasis: '50%',
    paddingLeft: 40
  },
  needListItemText: {
    color: theme.palette.gray700.main
  },
  needListItemDescription: {
    display: 'flex',
    flexBasis: '50%',
    borderLeft: `1px solid ${theme.palette.silver.main}`,
    paddingLeft: 20
  }
});

export interface IProps {
  need: Parentable<INeed>;
}

export default function NeedListItem({ need }: IProps): React.ReactElement {
  const classes = useStyles();

  return (
    <ListItem className={classes.needListItem} key={need.id}>
      <Typography variant="lgBold" className={classes.needListItemTitle}>
        {need.title}
      </Typography>

      {need.description && (
        <Box className={classes.needListItemDescription}>
          <ListItemText>
            <Typography variant="sm" className={classes.needListItemText}>
              {need.description}
            </Typography>
          </ListItemText>
        </Box>
      )}
    </ListItem>
  );
}
