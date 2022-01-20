import { makeStyles, Toolbar } from '@material-ui/core';
import React from 'react';
import { withRouter } from 'react-router';
import { Link, useRouteMatch } from 'react-router-dom';
import theme from '../../theme';

interface IRouteLink {
  link: string;
  name: string;
}

interface IRouteParams {
  projectId: string;
}

const useStyles = makeStyles({
  sideBarItem: {
    cursor: 'pointer',
    color: theme.palette.primary.main,
    margin: '0 10px 0 0',

    '&:hover': {
      fontWeight: 'bold'
    },
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center'
    }
  },
  sideBarItemBold: {
    cursor: 'pointer',
    margin: '0 10px 0 0',
    color: theme.palette.primary.main,

    fontWeight: 'bold'
  }
});

function ProjectHeader(): React.ReactElement {
  const baseUrl = useRouteMatch<IRouteParams>('/workbench/:projectId');
  const adminMatch = useRouteMatch<IRouteParams>('/workbench/:projectId/admin');
  const createMatch = useRouteMatch<IRouteParams>(
    '/workbench/:projectId/create'
  );
  const previewMatch = useRouteMatch<IRouteParams>(
    '/workbench/:projectId/preview'
  );

  const findCurrentUrl = () => {
    let url = adminMatch?.url;
    if (createMatch) {
      url = createMatch.url;
    }
    if (previewMatch) {
      url = previewMatch.url;
    }
    return url;
  };
  const currentUrl = findCurrentUrl();

  const routes: IRouteLink[] = [
    { link: `${baseUrl?.url}/admin`, name: 'Adminstrasjon' },
    { link: `${baseUrl?.url}/create`, name: 'Lage' },
    { link: `${baseUrl?.url}/preview`, name: 'Forhåndsvisning' }
  ];

  const classes = useStyles();

  return (
    <Toolbar>
      {routes.map((route) => {
        return (
          <Link key={route.name} to={route.link}>
            <p
              className={
                currentUrl === route.link
                  ? classes.sideBarItemBold
                  : classes.sideBarItem
              }
            >
              {route.name}
            </p>
          </Link>
        );
      })}
    </Toolbar>
  );
}

export default withRouter(ProjectHeader);
