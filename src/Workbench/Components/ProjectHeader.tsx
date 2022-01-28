import { makeStyles } from '@material-ui/core';
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
  projectHeader: {
    display: 'flex',
    height: 40,
    marginLeft: 10,
    [theme.breakpoints.down('header')]: {
      justifyContent: 'center',
      marginLeft: 0,
      marginRight: 16
    }
  },
  projectHeaderLinks: {
    display: 'flex',
    '&>:nth-child(1)': {
      borderLeft: `1px solid ${theme.palette.gray300.main}`
    },
    '&>:nth-child(2)': {
      borderLeft: `1px solid ${theme.palette.gray300.main}`,
      borderRight: `1px solid ${theme.palette.gray300.main}`
    },
    '&>:nth-child(3)': {
      borderRight: `1px solid ${theme.palette.gray300.main}`
    }
  },
  projectHeaderLinkItem: {
    margin: 'auto',
    width: 145,
    cursor: 'pointer',
    textAlign: 'center',
    color: theme.palette.black.main,
    '&:hover': {
      color: theme.palette.lightBlue.main
    },
    [theme.breakpoints.down('header')]: {
      width: '30vw'
    }
  },
  currentRoute: {
    fontWeight: 'bold'
  },
  otherRoute: {
    textDecoration: 'none'
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
    { link: `${baseUrl?.url}/admin`, name: 'Administrere' },
    { link: `${baseUrl?.url}/create`, name: 'Lage' },
    { link: `${baseUrl?.url}/preview`, name: 'Forhåndsvisning' }
  ];

  const classes = useStyles();

  return (
    <div className={classes.projectHeader}>
      <div className={classes.projectHeaderLinks}>
        {routes.map((route) => {
          return (
            <Link
              key={route.name}
              to={route.link}
              className={`${classes.projectHeaderLinkItem} ${
                currentUrl === route.link
                  ? classes.currentRoute
                  : classes.otherRoute
              }`}
            >
              {route.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default withRouter(ProjectHeader);
