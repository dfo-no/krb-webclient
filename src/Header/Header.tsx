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
    display: 'flex',
    alignItems: 'center',
    gap: 3,
    flexDirection: 'column',
    paddingTop: 10,
    marginLeft: '5%',
    whiteSpace: 'nowrap'
  },
  projectDisplay: {
    display: 'flex',
    paddingBottom: 3,
    width: '90vw',
    [theme.breakpoints.down('header')]: {
      paddingBottom: 0
    }
  },
  projectPath: {
    marginLeft: 2.5,
    [theme.breakpoints.down('header')]: {
      marginLeft: 1
    }
  },
  icons: {
    display: 'flex',
    alignSelf: 'center',
    justifySelf: 'flex-end'
  },
  icon: {
    color: 'red'
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
  noProjectDisplay: {
    paddingBottom: 3
  },
  projectTitleVersion: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    [theme.breakpoints.down('header')]: {
      flexDirection: 'column',
      gap: 0
    }
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
  settingsIcon: {
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.dfoLightBlue.main
    }
  },
  createIcon: {
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.dfoLightBlue.main
    }
  },
  visibilityIcon: {
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.dfoLightBlue.main
    }
  }
});

export default function Header(): React.ReactElement {
  const classes = useStyles();
  const { t } = useTranslation();

  const project = useAppSelector((state) => state.project.project);
  const lastProjectPublication =
    project.publications[project.publications.length - 1];

  const projectPath = project.title
    ? `Anskaffelser.no / Kravbank / ${project.title}`
    : 'Anskaffelser.no / Kravbank';

  return (
    <AppBar elevation={0} position="sticky">
      <Toolbar>
        <Box className={classes.header}>
          <Box>
            {project.title && (
              <Box>
                <Box className={classes.projectPath}>
                  <Typography variant="small">{projectPath}</Typography>
                </Box>
                <Box className={classes.projectDisplay}>
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
                    <SettingsIcon className={classes.settingsIcon} />
                    <CreateIcon className={classes.createIcon} />
                    <VisibilityIcon className={classes.visibilityIcon} />
                  </Box>
                </Box>
              </Box>
            )}

            {!project.title && (
              <Box>
                <Box className={classes.projectPath}>
                  <Typography variant="small">{projectPath}</Typography>
                </Box>
                <Box className={classes.noProjectDisplay}>
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
