import { makeStyles } from '@material-ui/core';
import { AppBar, Toolbar, Box, Typography } from '@mui/material/';
import React from 'react';
import theme from '../theme';
import { useAppSelector } from '../store/hooks';
import { useTranslation } from 'react-i18next';
import SettingsIcon from '@mui/icons-material/Settings';
import CreateIcon from '@mui/icons-material/Create';
import VisibilityIcon from '@mui/icons-material/Visibility';

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
    '&:hover': {
      color: theme.palette.dfoLightBlue.main
    }
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

  return (
    <AppBar elevation={0} position="sticky">
      <Toolbar>
        <Box className={classes.header}>
          <Box>
            {project.title && (
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
                    <SettingsIcon className={classes.icon} />
                    <CreateIcon className={classes.icon} />
                    <VisibilityIcon className={classes.icon} />
                  </Box>
                </Box>
              </Box>
            )}

            {!project.title && (
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
