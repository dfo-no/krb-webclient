import { Box, ListItem, ListItemText, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import theme from '../../theme';

export interface IProps {
  productListItem: any;
}

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

export default function NeedListItem({
  productListItem
}: IProps): React.ReactElement {
  const classes = useStyles();

  return (
    <ListItem className={classes.needListItem} key={productListItem.title}>
      <Typography variant="lgBold" className={classes.needListItemTitle}>
        {productListItem.title}
      </Typography>

      {productListItem.description && (
        <Box className={classes.needListItemDescription}>
          <ListItemText>
            <Typography variant="sm" className={classes.needListItemText}>
              {productListItem.description}
            </Typography>
          </ListItemText>
        </Box>
      )}
    </ListItem>
  );
}
