import ConstructionOutlinedIcon from '@mui/icons-material/ConstructionOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { AppBar, Box, Toolbar, Typography } from '@mui/material/';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import { Link, useLocation, useRouteMatch } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import theme from '../../theme';

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
    [theme.breakpoints.down('mddd')]: {
      marginLeft: 1
    }
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

  const project = useAppSelector((state) => state.project.project);

  const projectTitle = project.title;
  const projectPath = 'Anskaffelser.no / Kravbank';

  const baseUrl = useRouteMatch<{ projectId: string }>('/workbench/:projectId');
  const location = useLocation();
  const tabName = location.pathname
    .replace(baseUrl ? baseUrl.url : '', '')
    .split('/')
    .filter((elem) => elem !== '')
    .shift();
  const isLocationAdmin = tabName === 'admin';
  const isLocationCreate = tabName === 'create';
  const isLocationPreview = tabName === 'preview';

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
                    <Typography variant="big">{project.title}</Typography>
                  </Box>
                  <Box className={classes.projectIcons}>
                    <Link
                      to={`${baseUrl?.url}/admin`}
                      className={
                        isLocationAdmin ? classes.selectedIcon : classes.icon
                      }
                    >
                      <SettingsOutlinedIcon />
                    </Link>
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
