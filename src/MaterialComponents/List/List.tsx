import { makeStyles, Theme } from '@material-ui/core';
import Link from '@mui/material/Link';
import MaterialList from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import Icon from '@material-ui/core/Icon';

interface IListProps {
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

interface IStyleProps {
  iconColor?: string;
  textColor?: string;
  borderColor?: string;
  borderThickness?: string;
  hoverColor?: string;
}

const useStyles = makeStyles<Theme, IStyleProps>({
  list: {
    '&>:nth-child(1)': {
      borderTop: ({ borderThickness, borderColor }) =>
        `${borderThickness} solid ${borderColor}`
    }
  },
  listItem: {
    borderBottom: ({ borderThickness, borderColor }) =>
      `${borderThickness} solid ${borderColor}`,
    '&:hover': {
      '& $listLinkText': {
        color: ({ hoverColor }) => hoverColor
      },
      '& $listIcon': {
        color: ({ hoverColor }) => hoverColor
      }
    }
  },
  listLinkText: {
    color: ({ textColor }) => textColor
  },
  listIcon: {
    color: ({ iconColor }) => iconColor
  }
});

export default function List({
  list,
  iconType,
  iconColor,
  textColor,
  borderColor,
  borderThickness,
  hoverColor
}: IListProps): React.ReactElement {
  // Not sure of this. Maybe it could be passed/destructed in a different way!
  const styles: IStyleProps = {
    iconColor: iconColor || 'gray',
    textColor: textColor || 'gray',
    borderColor: borderColor || 'gray',
    borderThickness: borderThickness || '1px',
    hoverColor: hoverColor || 'gray'
  };

  const classes = useStyles(styles);
  const useIcon = iconType == 'arrow' ? Object(ArrowForwardIos) : '';

  return (
    <MaterialList
      className={classes.list}
      component="nav"
      aria-label="linkList"
    >
      {list.map((link) => {
        return (
          <ListItem
            component={Link}
            href={link.href}
            className={classes.listItem}
            key={link.title}
          >
            <ListItemText>
              <Typography className={classes.listLinkText}>
                {link.title}
              </Typography>
            </ListItemText>
            {useIcon && (
              <Icon component={useIcon} className={classes.listIcon}></Icon>
            )}
          </ListItem>
        );
      })}
    </MaterialList>
  );
}
