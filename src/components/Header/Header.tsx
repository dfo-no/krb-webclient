import ConstructionOutlinedIcon from '@mui/icons-material/ConstructionOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import { skipToken } from '@reduxjs/toolkit/query/react';
import React from 'react';
import { Link, useLocation, useRouteMatch } from 'react-router-dom';
import { useGetProjectQuery } from '../../store/api/bankApi';
import theme from '../../theme';

const useStyles = makeStyles({
  header: {
    height: '100%',
    paddingTop: 10,
    paddingBottom: 6,
    marginLeft: '5%',
    color: theme.palette.black.main
  },
  headerContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: 3
  },
  projectPath: {
    marginLeft: 2.5,
    color: theme.palette.black.main,
    [theme.breakpoints.down('mddd')]: {
      marginLeft: 1
    }
  },
  projectPathTitle: {
    textDecoration: 'underline',
    fontWeight: 'bold',
    color: theme.palette.dfoDarkBlue.main
  },
  viewingProjectTitle: {
    display: 'flex',
    paddingBottom: 3,
    width: '90vw',
    [theme.breakpoints.down('mddd')]: {
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

    [theme.breakpoints.down('mddd')]: {
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

    [theme.breakpoints.down('mddd')]: {
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

    [theme.breakpoints.down('mddd')]: {
      paddingRight: 13,
      gap: 20
    }
  },
  icon: {
    '& .MuiSvgIcon-root': {
      cursor: 'pointer',
      color: theme.palette.black.main,
      width: '24px',
      height: '40px',
      paddingBottom: '8px',
      paddingTop: '8px',
      '&:hover': {
        color: theme.palette.dfoLightBlue.main
      }
    }
  },
  selectedIcon: {
    '& .MuiSvgIcon-root': {
      color: theme.palette.dfoBlue.main,
      width: '24px',
      height: '40px',
      paddingTop: '8px',
      paddingBottom: '4px',
      borderBottom: '4px solid'
    }
  },
  projectTitleVersion: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    [theme.breakpoints.down('mddd')]: {
      flexDirection: 'column',
      gap: 0
    }
  }
});

export default function Header(): React.ReactElement {
  const classes = useStyles();

  const baseUrl = useRouteMatch<{ projectId: string }>('/workbench/:projectId');
  const location = useLocation();

  const { data: project } = useGetProjectQuery(
    baseUrl?.params?.projectId ?? skipToken
  );

  const projectPath = 'Anskaffelser.no / Kravbank';

  if (!project) {
    return (
      <AppBar
        elevation={0}
        position="sticky"
        sx={{
          backgroundColor: theme.palette.dfoWhite.main,
          borderBottom: `2px solid ${theme.palette.gray300.main}`
        }}
      >
        <Toolbar>
          <Box className={classes.header}>
            <Box className={classes.headerContent}>
              <Box className={classes.projectPath}>
                <Typography variant="sm">{projectPath}</Typography>
              </Box>
              <Box className={classes.notViewingProjectTitle}>
                <Typography variant="xl" sx={{ fontWeight: 'bold' }}>
                  Kravbank
                </Typography>
              </Box>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    );
  }

  const projectTitle = project.title;

  const tabName = location.pathname
    .replace(baseUrl ? baseUrl.url : '', '')
    .split('/')
    .filter((elem) => elem !== '')
    .shift();
  const isLocationAdmin = tabName === 'admin';
  const isLocationCreate = tabName === 'create';
  const isLocationPreview = tabName === 'preview';

  return (
    <AppBar
      elevation={0}
      position="sticky"
      sx={{
        backgroundColor: theme.palette.dfoWhite.main,
        borderBottom: `2px solid ${theme.palette.gray300.main}`
      }}
    >
      <Toolbar>
        <Box className={classes.header}>
          <Box>
            <Box className={classes.headerContent}>
              <Box className={classes.projectPath}>
                <Typography variant="sm">
                  {projectPath + ' / '}
                  <Typography variant="sm" className={classes.projectPathTitle}>
                    {projectTitle}
                  </Typography>
                </Typography>
              </Box>
              <Box className={classes.viewingProjectTitle}>
                <Box className={classes.projectData}>
                  <Typography variant="xl" sx={{ fontWeight: 'bold' }}>
                    {project.title}
                  </Typography>
                </Box>
                <Box className={classes.projectIcons}>
                  <Link
                    to={`${baseUrl?.url}/create`}
                    className={
                      isLocationCreate ? classes.selectedIcon : classes.icon
                    }
                  >
                    <ConstructionOutlinedIcon />
                  </Link>
                  <Link
                    to={`${baseUrl?.url}/preview`}
                    className={
                      isLocationPreview ? classes.selectedIcon : classes.icon
                    }
                  >
                    <VisibilityOutlinedIcon />
                  </Link>
                  <Link
                    to={`${baseUrl?.url}/admin`}
                    className={
                      isLocationAdmin ? classes.selectedIcon : classes.icon
                    }
                  >
                    <SettingsOutlinedIcon />
                  </Link>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
