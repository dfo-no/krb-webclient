import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CodeIcon from '@mui/icons-material/Code';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Box, List, ListItem, ListItemText } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { withRouter } from 'react-router';
import { Link, useRouteMatch } from 'react-router-dom';
import theme from '../../theme';

interface IRouteLink {
  link: string;
  name: string;
  icon?: React.ReactElement;
}

interface IRouteParams {
  projectId: string;
}

const useStyles = makeStyles({
  sideBar: {
    height: '100%',
    [theme.breakpoints.down('md')]: {
      paddingTop: 0
    }
  },
  sideBarList: {
    position: 'sticky',
    backgroundColor: theme.palette.gray100.main,
    height: '100%',
    width: '18vw',
    minWidth: 230,
    paddingTop: 60,
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
    paddingLeft: 30,
    '&:hover': {
      background: theme.palette.primary.main,
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

  const propertiesMatch = useRouteMatch<IRouteParams>(
    '/workbench/:projectId/admin/properties'
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

    if (propertiesMatch) {
      url = propertiesMatch?.url;
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
      icon: <ContentCopyIcon />
    },
    {
      link: `${baseUrl?.url}/admin/products`,
      name: t('Products'),
      icon: <Inventory2Icon />
    },
    {
      link: `${baseUrl?.url}/admin/codelist`,
      name: t('Codelist'),
      icon: <CodeIcon />
    },
    /*  {
      link: `${baseUrl?.url}/admin/inheritance`,
      name: t('Inheritance'),
      icon: <LinkIcon />
    }, */
    {
      link: `${baseUrl?.url}/admin/tags`,
      name: t('Tags'),
      icon: <LocalOfferIcon />
    },
    {
      link: `${baseUrl?.url}/admin/properties`,
      name: t('Properties'),
      icon: <SettingsOutlinedIcon />
    }
  ];

  const classes = useStyles();

  return (
    <Box className={classes.sideBar}>
      <List className={classes.sideBarList}>
        {routes.map((route) => {
          return (
            <ListItem
              sx={
                route.name === currentRoute
                  ? { color: theme.palette.black.main }
                  : { color: theme.palette.gray700.main }
              }
              key={route.name}
              component={Link}
              to={route.link}
              className={classes.sideBarListItem}
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
