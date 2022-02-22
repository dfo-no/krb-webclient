import { makeStyles, Theme } from '@material-ui/core';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import Icon from '@material-ui/core/Icon';
import theme from '../../theme';

export interface DFOLinkListProps {
  list: {
    title: string;
    href: string;
  }[];
  iconType?: string;
  iconColor?: string;
  textColor?: string;
  borderColor?: string;
  borderThickness?: string;
  hoverColor?: string;
}

export interface DFOLinkListStyleProps {
  iconColor?: string;
  textColor?: string;
  borderColor?: string;
  borderThickness?: string;
  hoverColor?: string;
}

const useStyles = makeStyles<Theme, DFOLinkListStyleProps>({
  linkList: {
    '&>:nth-child(1)': {
      borderTop: ({ borderThickness, borderColor }) =>
        `${borderThickness} solid ${borderColor}`
    }
  },
  linkListItem: {
    borderBottom: ({ borderThickness, borderColor }) =>
      `${borderThickness} solid ${borderColor}`,
    '&:hover': {
      '& $linkListText': {
        color: ({ hoverColor }) => hoverColor
      },
      '& $linkListIcon': {
        color: ({ hoverColor }) => hoverColor
      }
    }
  },
  linkListText: {
    color: ({ textColor }) => textColor
  },
  linkListIcon: {
    color: ({ iconColor }) => iconColor
  }
});

export default function DFOLinkList({
  list,
  iconType,
  iconColor,
  textColor,
  borderColor,
  borderThickness,
  hoverColor
}: DFOLinkListProps): React.ReactElement {
  const styles: DFOLinkListStyleProps = {
    iconColor: iconColor || theme.palette.dfoWhite.main,
    textColor: textColor || theme.palette.dfoWhite.main,
    borderColor: borderColor || theme.palette.dfoLightBlue.main,
    borderThickness: borderThickness || '1px',
    hoverColor: hoverColor || theme.palette.dfoLightBlue.main
  };

  const classes = useStyles(styles);

  const icons = [{ name: 'arrow', object: Object(ArrowForwardIos) }];
  const useIcon = icons.find((icon) => icon.name === iconType)?.object;

  return (
    <List className={classes.linkList} component="nav" aria-label="linklist">
      {list.map((link) => {
        return (
          <ListItem
            component={Link}
            href={link.href}
            className={classes.linkListItem}
            key={link.title}
          >
            <ListItemText>
              <Typography className={classes.linkListText}>
                {link.title}
              </Typography>
            </ListItemText>
            {useIcon && (
              <Icon component={useIcon} className={classes.linkListIcon}></Icon>
            )}
          </ListItem>
        );
      })}
    </List>
  );
}
