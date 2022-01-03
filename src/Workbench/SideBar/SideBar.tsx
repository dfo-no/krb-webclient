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
  sideBarLinkList: {
    backgroundColor: theme.palette.gray100.main,
    width: '100%',
    height: '100vh',
    minWidth: 200
  },
  linkListItem: {
    cursor: 'pointer',
    borderBottom: `2px solid ${theme.palette.dfoWhite.main}`,
    '&:hover': {
      background: theme.palette.lightBlue.main,
      color: 'white',

      '& $linkListItemText': {
        color: 'white'
      }
    }
  },
  linkListItemText: {
    color: 'black'
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

  return (
    <List className={classes.sideBarLinkList}>
      {routes.map((route) => {
        return (
          <ListItem
            component={Link}
            to={route.link}
            className={classes.linkListItem}
          >
            <ListItemText className={classes.linkListItemText}>
              {route.name}
            </ListItemText>
          </ListItem>
        );
      })}
    </List>
  );
}

export default withRouter(SideBar);
