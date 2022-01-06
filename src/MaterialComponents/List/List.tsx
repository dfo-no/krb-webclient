import { makeStyles, Theme } from '@material-ui/core';
import Link from '@mui/material/Link';
import MaterialList from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import Icon from '@material-ui/core/Icon';
import theme from '../../theme';

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
  // Standard DFO theme. Props can be passed to change theme.
  const styles: IStyleProps = {
    iconColor: iconColor || theme.palette.dfoWhite.main,
    textColor: textColor || theme.palette.dfoWhite.main,
    borderColor: borderColor || theme.palette.dfoLightBlue.main,
    borderThickness: borderThickness || '1px',
    hoverColor: hoverColor || theme.palette.dfoLightBlue.main
  };

  const classes = useStyles(styles);

  // Can add more icons here if needed.
  const icons = [{ name: 'arrow', object: Object(ArrowForwardIos) }];
  const useIcon = icons.find((icon) => icon.name === iconType)?.object;

  return (
    <MaterialList className={classes.list} component="nav" aria-label="list">
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
