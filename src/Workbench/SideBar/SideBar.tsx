import React from 'react';

import { useTranslation } from 'react-i18next';
import { withRouter } from 'react-router';
import { useRouteMatch, Link } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { makeStyles } from '@material-ui/core';
import ListItemText from '@mui/material/ListItemText';
import theme from '../../theme';

interface IRouteLink {
  link: string;
  name: string;
}

interface IRouteParams {
  projectId: string;
}

const useStyles = makeStyles({
  sideBarList: {
    backgroundColor: theme.palette.gray100.main,
    width: '17vw',
    minWidth: 250,
    height: 'auto',
    [theme.breakpoints.down('sm')]: {
      width: '100vw'
    }
  },
  sideBarListItem: {
    cursor: 'pointer',
    borderBottom: `1px solid ${theme.palette.gray300.main}`,
    '&:hover': {
      background: theme.palette.lightBlue.main,
      color: theme.palette.dfoWhite.main,

      '& $sideBarListItemText': {
        color: theme.palette.dfoWhite.main
      }
    }
  },
  sideBarListItemDisabled: {
    borderBottom: `1px solid ${theme.palette.gray300.main}`,
    pointerEvents: 'none'
  },
  sideBarListItemText: {
    color: theme.palette.primary.main,
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center'
    }
  }
});

function SideBar(): React.ReactElement {
  const match = useRouteMatch<IRouteParams>('/workbench/:projectId');
  const { t } = useTranslation();

  const currentUrl = match?.url ? match.url : '/workbench';
  const selectProject = useAppSelector((state) => state.project.project);
  const isProjectSelected = !!selectProject.id;
  const displayTitle = selectProject.id
    ? selectProject.title
    : `<${t('none selected')}>`;

  const routes: IRouteLink[] = [
    { link: `${currentUrl}`, name: `${t('Workbench')}: ${displayTitle}` },
    { link: `${currentUrl}/need`, name: t('Need') },
    { link: `${currentUrl}/need/requirement`, name: t('Requirement') },
    { link: `${currentUrl}/codelist`, name: t('Codelist') },
    { link: `${currentUrl}/product`, name: t('Products') },
    { link: `${currentUrl}/tags`, name: t('Tags') },
    { link: `${currentUrl}/inheritance`, name: t('Inheritance') }
  ];

  const classes = useStyles();

  console.log(isProjectSelected);

  return (
    <List className={classes.sideBarList}>
      {routes.map((route) => {
        return (
          <ListItem
            className={`${
              isProjectSelected
                ? classes.sideBarListItem
                : classes.sideBarListItemDisabled
            }`}
            component={Link}
            to={route.link}
            disabled={!isProjectSelected}
          >
            <ListItemText className={classes.sideBarListItemText}>
              {route.name}
            </ListItemText>
          </ListItem>
        );
      })}
    </List>
  );
}

export default withRouter(SideBar);
