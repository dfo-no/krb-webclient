import { makeStyles } from '@material-ui/core';
import { AppBar, Toolbar, Box, Typography } from '@mui/material/';
import React from 'react';
import theme from '../theme';
import { useAppSelector } from '../store/hooks';
import { useTranslation } from 'react-i18next';

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
    paddingBottom: 3,
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
  projectData: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,

    [theme.breakpoints.down('header')]: {
      flexDirection: 'column',
      gap: 0
    }
  },
  projectStatus: {
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
                    <Box className={classes.projectStatus}>
                      <Typography variant="smallUnderline">
                        {'Versjon' +
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
