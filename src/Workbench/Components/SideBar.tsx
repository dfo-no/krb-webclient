import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
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
}

interface IRouteParams {
  projectId: string;
}

const useStyles = makeStyles({
  sideBar: {
    height: '100%',
    paddingTop: 45,
    [theme.breakpoints.down('md')]: {
      paddingTop: 0
    }
  },
  sideBarList: {
    backgroundColor: theme.palette.gray100.main,
    width: '15vw',
    minWidth: 230,
    height: '100vh',
    [theme.breakpoints.down('md')]: {
      height: 'auto',
      width: '100vw',
      backgroundColor: theme.palette.dfoWhite.main
    }
  },
  sideBarListItem: {
    cursor: 'pointer',
    width: 200,
    textAlign: 'center',
    '&:hover': {
      background: theme.palette.lightBlue.main,
      color: theme.palette.dfoWhite.main,

      '& $sideBarListItemText': {
        color: theme.palette.dfoWhite.main
      },

      '& $selectedSideBarListItemText': {
        color: theme.palette.dfoWhite.main
      },

      '& $selectedListItemArrow': {
        color: theme.palette.dfoWhite.main
      }
    },

    [theme.breakpoints.down('md')]: {
      backgroundColor: theme.palette.gray100.main
    }
  },
  sideBarListItemText: {
    color: theme.palette.gray700.main,
    marginLeft: 40
  },
  selectedSideBarListItemText: {
    color: theme.palette.dfoDarkBlue.main,
    marginLeft: 40
  },
  sideBarListItemPicked: {
    cursor: 'pointer',
    fontWeight: 'bold',
    '&:hover': {
      background: theme.palette.lightBlue.main,
      color: theme.palette.dfoWhite.main
    },

    [theme.breakpoints.down('md')]: {
      backgroundColor: theme.palette.gray100.main
    }
  },
  selectedListItemArrow: {
    color: theme.palette.dfoDarkBlue.main,

    [theme.breakpoints.down('md')]: {
      marginRight: 50
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
    { link: `${baseUrl?.url}/admin`, name: t('Versions') },
    { link: `${baseUrl?.url}/admin/products`, name: t('Products') },
    { link: `${baseUrl?.url}/admin/codelist`, name: t('Codelist') },
    { link: `${baseUrl?.url}/admin/inheritance`, name: t('Inheritance') },
    { link: `${baseUrl?.url}/admin/tags`, name: t('Tags') }
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
              className={classes.sideBarListItem}
            >
              <ListItemText
                className={`${
                  route.name == currentRoute
                    ? classes.selectedSideBarListItemText
                    : classes.sideBarListItemText
                }`}
              >
                <Box sx={{ fontWeight: 'bold' }}>{route.name}</Box>
              </ListItemText>
              {route.name == currentRoute && (
                <ArrowForwardIcon className={classes.selectedListItemArrow} />
              )}
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}

export default withRouter(SideBar);
