import { makeStyles } from '@material-ui/core';
import { AppBar, Toolbar, Box, Typography } from '@mui/material/';
import React from 'react';
import theme from '../theme';
import { useAppSelector } from '../store/hooks';
import { useTranslation } from 'react-i18next';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ConstructionOutlinedIcon from '@mui/icons-material/ConstructionOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useRouteMatch, Link, useLocation } from 'react-router-dom';

const useStyles = makeStyles({
  header: {
    paddingTop: 10,
    paddingBottom: 6,
    marginLeft: '5%'
  },
  headerContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: 3
  },
  projectPath: {
    marginLeft: 2.5,
    [theme.breakpoints.down('header')]: {
      marginLeft: 1
    }
  },
  viewingProjectTitle: {
    display: 'flex',
    paddingBottom: 3,
    width: '90vw',
    [theme.breakpoints.down('header')]: {
      paddingBottom: 0
    }
  },
  notViewingProjectTitle: {
    paddingBottom: 3
  },
  projectData: {
    display: 'flex',
    flexGrow: 1,
    gap: 20,
    alignItems: 'center',

    [theme.breakpoints.down('header')]: {
      flexGrow: 1,
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: 0
    }
  },
  projectVersion: {
    display: 'flex',
    gap: 10,
    alignItems: 'center',
    paddingTop: 6,

    [theme.breakpoints.down('header')]: {
      paddingTop: 0,
      paddingBottom: 8
    }
  },
  projectIcons: {
    display: 'flex',
    gap: 50,
    alignItems: 'center',
    color: theme.palette.dfoBlue.main,
    height: '100%',

    [theme.breakpoints.down('header')]: {
      paddingRight: 13,
      gap: 8,
      marginTop: 20
    }
  },
  icons: {
    display: 'flex',
    alignSelf: 'center',
    justifySelf: 'flex-end'
  },
  settingsIcon: {
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.dfoLightBlue.main
    }
  },
  icon: {
    cursor: 'pointer',
    color: theme.palette.black.main,
    width: '24px !important',
    height: '40px !important',
    paddingBottom: '8px',
    paddingTop: '8px',
    '&:hover': {
      color: theme.palette.dfoLightBlue.main
    }
  },
  selectedIcon: {
    color: theme.palette.dfoBlue.main,
    width: '24px !important',
    height: '40px !important',
    paddingTop: '8px',
    paddingBottom: '4px',
    borderBottom: '4px solid'
  },
  projectTitleVersion: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    [theme.breakpoints.down('header')]: {
      flexDirection: 'column',
      gap: 0
    }
  }
});

export default function Header(): React.ReactElement {
  const classes = useStyles();
  const { t } = useTranslation();

  const project = useAppSelector((state) => state.project.project);
  const lastProjectPublication =
    project.publications[project.publications.length - 1];

  const projectTitle = project.title;
  const projectPath = 'Ansettelser.no / Kravbank';

  const location = useLocation();
  const isLocationAdmin = location.pathname.split('/').pop() === 'admin';
  const isLocationCreate = location.pathname.split('/').pop() === 'create';
  const isLocationPreview = location.pathname.split('/').pop() === 'preview';

  const baseUrl = useRouteMatch<{ projectId: string }>('/workbench/:projectId');
  const showProjectHeader = project.title && baseUrl;

  return (
    <AppBar elevation={0} position="sticky">
      <Toolbar>
        <Box className={classes.header}>
          <Box>
            {showProjectHeader && (
              <Box className={classes.headerContent}>
                <Box className={classes.projectPath}>
                  <Typography variant="small">
                    {projectPath + ' / '}
                    <Typography variant="smallUnderlineBlue">
                      {projectTitle}
                    </Typography>
                  </Typography>
                </Box>
                <Box className={classes.viewingProjectTitle}>
                  <Box className={classes.projectData}>
                    <Typography variant="bigScale">{project.title}</Typography>
                    <Box className={classes.projectVersion}>
                      <Typography variant="smallUnderline">
                        {t('Version') +
                          ' ' +
                          t('date.PP', {
                            date: new Date(
                              lastProjectPublication.date
                                ? lastProjectPublication.date
                                : ''
                            )
                          })}
                      </Typography>
                    </Box>
                  </Box>
                  <Box className={classes.projectIcons}>
                    <Link to={`${baseUrl?.url}/admin`}>
                      <SettingsOutlinedIcon
                        className={
                          isLocationAdmin ? classes.selectedIcon : classes.icon
                        }
                      />
                    </Link>
                    <Link to={`${baseUrl?.url}/create`}>
                      <ConstructionOutlinedIcon
                        className={
                          isLocationCreate ? classes.selectedIcon : classes.icon
                        }
                      />
                    </Link>
                    <Link to={`${baseUrl?.url}/preview`}>
                      <VisibilityOutlinedIcon
                        className={
                          isLocationPreview
                            ? classes.selectedIcon
                            : classes.icon
                        }
                      />
                    </Link>
                  </Box>
                </Box>
              </Box>
            )}

            {!showProjectHeader && (
              <Box className={classes.headerContent}>
                <Box className={classes.projectPath}>
                  <Typography variant="small">{projectPath}</Typography>
                </Box>
                <Box className={classes.notViewingProjectTitle}>
                  <Typography variant="big">Kravbank</Typography>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
