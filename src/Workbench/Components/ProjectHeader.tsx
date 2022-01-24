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
  projectHeader: { display: 'flex', height: 50 },
  projectHeaderLinks: {
    display: 'flex',
    gap: 3,
    marginLeft: 20,
    '&>:nth-child(1)': {
      borderLeft: '1px solid #E5E5E5'
    },
    [theme.breakpoints.down('sm')]: {
      margin: 'auto'
    }
  },
  projectHeaderLinkItem: {
    margin: 'auto',
    borderRight: '1px solid #E5E5E5',
    paddingLeft: 20,
    paddingRight: 20,
    cursor: 'pointer',
    '&:hover': {
      color: '#005b91'
    }
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
    <div className={classes.projectHeader}>
      <div className={classes.projectHeaderLinks}>
        {routes.map((route) => {
          return (
            <div className={classes.projectHeaderLinkItem}>{route.name}</div>
          );
        })}
      </div>
    </div>
  );
}

export default withRouter(ProjectHeader);
