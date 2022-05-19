import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import ConstructionOutlinedIcon from '@mui/icons-material/ConstructionOutlined';
import makeStyles from '@mui/styles/makeStyles';
import React, { useEffect, useState } from 'react';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { skipToken } from '@reduxjs/toolkit/query/react';
import { useLocation, useRouteMatch } from 'react-router-dom';

import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import DFOToolbar from '../DFOToolbar/DFOToolbar';
import theme from '../../theme';
import { IBank } from '../../Nexus/entities/IBank';
import { IBreadcrumb } from '../../models/IBreadcrumb';
import { IToolbarItem } from '../../models/IToolbarItem';
import { useGetProjectQuery } from '../../store/api/bankApi';

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
  const [project, setProject] = useState<IBank>();

  const breadcrumbs: IBreadcrumb[] = [
    {
      label: 'Kravbank',
      url: '/'
    }
  ];
  const toolbarItems: IToolbarItem[] = [];

  const { data: fetchedProject } = useGetProjectQuery(
    baseUrl?.params?.projectId ?? skipToken
  );

  const tabName = location.pathname
    .replace(baseUrl ? baseUrl.url : '', '')
    .split('/')
    .filter((elem: string) => elem !== '')
    .shift();
  const isLocationAdmin = tabName === 'admin';
  const isLocationCreate = tabName === 'create';
  const isLocationPreview = tabName === 'preview';

  useEffect(() => {
    setProject(fetchedProject);
  }, [fetchedProject]);

  useEffect(() => {
    setProject(baseUrl?.params.projectId ? fetchedProject : undefined);
  }, [baseUrl, fetchedProject]);

  if (project) {
    breadcrumbs.push({
      label: project.title,
      url: project.id
    });

    toolbarItems.push({
      icon: <ConstructionOutlinedIcon />,
      selected: isLocationCreate,
      url: baseUrl?.url + '/create'
    });
    toolbarItems.push({
      icon: <VisibilityOutlinedIcon />,
      selected: isLocationPreview,
      url: baseUrl?.url + '/preview'
    });
    toolbarItems.push({
      icon: <SettingsOutlinedIcon />,
      selected: isLocationAdmin,
      url: baseUrl?.url + '/admin'
    });
  }

  return (
    <AppBar
      elevation={0}
      position="sticky"
      sx={{
        backgroundColor: theme.palette.white.main,
        borderBottom: `2px solid ${theme.palette.gray300.main}`
      }}
    >
      <Toolbar>
        <Box className={classes.header}>
          <Box>
            <Box className={classes.headerContent}>
              <Breadcrumbs breadcrumbs={breadcrumbs} />
              <Box className={classes.viewingProjectTitle}>
                <Box className={classes.projectData}>
                  <Typography variant="xlBold">
                    {project?.title ?? 'Kravbank'}
                  </Typography>
                </Box>
                {project && <DFOToolbar items={toolbarItems} />}
              </Box>
            </Box>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
