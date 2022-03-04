import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Box, List, ListItem, ListItemText } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { withRouter } from 'react-router';
import { Link, useRouteMatch } from 'react-router-dom';
import theme from '../../theme';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import CodeIcon from '@mui/icons-material/Code';
import LinkIcon from '@mui/icons-material/Link';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

interface IRouteLink {
  link: string;
  name: string;
  icon?: object;
}

interface IRouteParams {
  projectId: string;
}

const useStyles = makeStyles({
  sideBar: {
    height: '100%',
    paddingTop: 75,
    [theme.breakpoints.down('md')]: {
      paddingTop: 0
    }
  },
  sideBarList: {
    backgroundColor: theme.palette.gray100.main,
    width: '18vw',
    minWidth: 230,
    height: '100vh',
    [theme.breakpoints.down('md')]: {
      height: 'auto',
      width: '100vw',
      backgroundColor: theme.palette.dfoWhite.main
    }
  },
  sideBarListItem: {
    display: 'flex',
    gap: 5,
    cursor: 'pointer',
    width: '100%',
    paddingLeft: 45,
    color: theme.palette.gray700.main,
    '&:hover': {
      background: theme.palette.lightBlue.main,
      color: theme.palette.dfoWhite.main
    }
  },
  selectedSideBarListItem: {
    display: 'flex',
    gap: 5,
    cursor: 'pointer',
    width: '100%',
    paddingLeft: 45,
    color: theme.palette.black.main,
    '&:hover': {
      background: theme.palette.lightBlue.main,
      color: theme.palette.dfoWhite.main
    }
  }
});

function SideBar(): React.ReactElement {
  const { t } = useTranslation();

  const baseUrl = useRouteMatch<IRouteParams>('/workbench/:projectId');
  const productMatch = useRouteMatch<IRouteParams>(
    '/workbench/:projectId/admin/products'
  );
  const codelistMatch = useRouteMatch<IRouteParams>(
    '/workbench/:projectId/admin/codelist'
  );
  const inheritanceMatch = useRouteMatch<IRouteParams>(
    '/workbench/:projectId/admin/inheritance'
  );

  const tagsMatch = useRouteMatch<IRouteParams>(
    '/workbench/:projectId/admin/tags'
  );

  const getCurrentRoute = () => {
    let url;

    if (productMatch) {
      url = productMatch?.url;
    }

    if (codelistMatch) {
      url = codelistMatch?.url;
    }

    if (inheritanceMatch) {
      url = inheritanceMatch?.url;
    }

    if (tagsMatch) {
      url = tagsMatch?.url;
    }

    if (!url) return t('Versions');

    const shortenedPath = url?.substring(url?.lastIndexOf('/') + 1);
    const shortenedPathCapitalized =
      shortenedPath[0].toUpperCase() + shortenedPath.slice(1);

    return t(shortenedPathCapitalized);
  };

  const currentRoute = getCurrentRoute();

  const routes: IRouteLink[] = [
    {
      link: `${baseUrl?.url}/admin`,
      name: t('Versions'),
      icon: Object(<ContentCopyIcon />)
    },
    {
      link: `${baseUrl?.url}/admin/products`,
      name: t('Products'),
      icon: Object(<Inventory2Icon />)
    },
    {
      link: `${baseUrl?.url}/admin/codelist`,
      name: t('Codelist'),
      icon: Object(<CodeIcon />)
    },
    {
      link: `${baseUrl?.url}/admin/inheritance`,
      name: t('Inheritance'),
      icon: Object(<LinkIcon />)
    },
    {
      link: `${baseUrl?.url}/admin/tags`,
      name: t('Tags'),
      icon: Object(<LocalOfferIcon />)
    }
  ];

  const classes = useStyles();

  return (
    <Box className={classes.sideBar}>
      <List className={classes.sideBarList}>
        {routes.map((route) => {
          return (
            <ListItem
              key={route.name}
              component={Link}
              to={route.link}
              className={`${
                route.name == currentRoute
                  ? classes.selectedSideBarListItem
                  : classes.sideBarListItem
              }`}
            >
              <Box>{route.icon}</Box>
              <ListItemText sx={{ marginLeft: 5 }}>
                <Box sx={{ fontWeight: 'bold' }}>{route.name}</Box>
              </ListItemText>
              {route.name == currentRoute && <ArrowForwardIcon />}
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}

export default withRouter(SideBar);
