import { makeStyles } from '@material-ui/core';
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import MaterialList from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import theme from '../../theme';

interface IListProps {
  list: string[];
  icon?: string;
  iconColor?: string;
  backgroundColor?: string;
  fontColor?: string;
  borderColor?: string;
  hoverColor?: string;
}

const useStyles = makeStyles({
  footerLinkList: {
    '&>:nth-child(1)': {
      borderTop: `1px solid ${theme.palette.dfoLightBlue.main}`
    }
  },
  footerLinkListItem: {
    borderBottom: `1px solid ${theme.palette.dfoLightBlue.main}`,
    '&:hover': {
      '& $footerLinkText': {
        color: theme.palette.dfoLightBlue.main
      },
      '& $footerLinkArrow': {
        color: theme.palette.dfoLightBlue.main
      }
    }
  },
  footerLinkText: {},
  footerLinkArrow: {
    color: theme.palette.dfoWhite.main
  }
});

export default function List({
  list,
  icon,
  iconColor,
  backgroundColor,
  fontColor,
  borderColor,
  hoverColor
}: IListProps): React.ReactElement {
  const classes = useStyles();

  return (
    <MaterialList
      className={classes.footerLinkList}
      component="nav"
      aria-label="footerlist"
    >
      {list.map((link) => {
        return (
          <ListItem
            component={Link}
            href="/"
            className={classes.footerLinkListItem}
            key={link}
          >
            <ListItemText>
              <Typography
                className={classes.footerLinkText}
                variant="footerLinkText"
              >
                {link}
              </Typography>
            </ListItemText>
            <ArrowForwardIos className={classes.footerLinkArrow} />
          </ListItem>
        );
      })}
    </MaterialList>
  );
}
