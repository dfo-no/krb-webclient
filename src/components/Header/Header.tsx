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
import { useTranslation } from 'react-i18next';

import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import DFOToolbar from '../DFOToolbar/DFOToolbar';
import theme from '../../theme';
import { IBank } from '../../Nexus/entities/IBank';
import { IBreadcrumb } from '../../models/IBreadcrumb';
import { IToolbarItem } from '../../models/IToolbarItem';
import { useGetProjectQuery } from '../../store/api/bankApi';
import { useAppSelector } from '../../store/hooks';

const useStyles = makeStyles({
  header: {
    width: '100%',
    maxWidth: '250rem',
    height: '100%',
    padding: '1rem var(--big-gap) 0.6rem',
    margin: '0 auto',
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
    width: '100%',
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
  const { t } = useTranslation();
  const { spec } = useAppSelector((state) => state.specification);
  const { response } = useAppSelector((state) => state.response);

  const baseUrl = useRouteMatch<{ projectId: string }>('/workbench/:projectId');
  const location = useLocation();
  const [project, setProject] = useState<IBank>();

  const breadcrumbs: IBreadcrumb[] = [
    {
      label: t('app_title'),
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

  const isWorkbench = location.pathname.startsWith('/workbench');
  const isSpecification = location.pathname.startsWith('/specification');
  const isResponse = location.pathname.startsWith('/response');
  const isLocationAdmin = tabName === 'admin';
  const isLocationCreate = tabName === 'create';
  const isLocationPreview = tabName === 'preview';

  useEffect(() => {
    setProject(fetchedProject);
  }, [fetchedProject]);

  useEffect(() => {
    setProject(baseUrl?.params.projectId ? fetchedProject : undefined);
  }, [baseUrl, fetchedProject]);

  if (isResponse) {
    breadcrumbs.push({
      label: t('Response'),
      url: '/response'
    });
  }
  if (isSpecification) {
    breadcrumbs.push({
      label: t('Requirement specification'),
      url: '/specification'
    });
  }
  if (isWorkbench) {
    breadcrumbs.push({
      label: t('Workbench'),
      url: '/workbench'
    });
  }

  if (project) {
    breadcrumbs.push({
      label: t('Project'),
      url: project.id
    });

    toolbarItems.push({
      icon: <ConstructionOutlinedIcon />,
      label: t('Tooltip-menu-Create'),
      selected: isLocationCreate,
      url: baseUrl?.url + '/create'
    });
    toolbarItems.push({
      icon: <VisibilityOutlinedIcon />,
      label: t('Tooltip-menu-Preview'),
      selected: isLocationPreview,
      url: baseUrl?.url + '/preview'
    });
    toolbarItems.push({
      icon: <SettingsOutlinedIcon />,
      label: t('Tooltip-menu-Admin'),
      selected: isLocationAdmin,
      url: baseUrl?.url + '/admin'
    });
  }

  const getTitle = (): string => {
    if (project) {
      return project.title;
    }
    if (isSpecification) {
      return spec.title;
    }
    if (isResponse) {
      return response.specification.title;
    }
    return t('app_title');
  };

  return (
    <AppBar
      elevation={0}
      position="sticky"
      sx={{
        margin: 0,
        padding: 0,
        backgroundColor: theme.palette.white.main,
        borderBottom: `0.2rem solid ${theme.palette.gray300.main}`
      }}
    >
      <Box className={classes.header}>
        <Box>
          <Box className={classes.headerContent}>
            <Breadcrumbs breadcrumbs={breadcrumbs} />
            <Box className={classes.viewingProjectTitle}>
              <Box className={classes.projectData}>
                <Typography variant="xlBold">{getTitle()}</Typography>
              </Box>
              {project && <DFOToolbar items={toolbarItems} />}
            </Box>
          </Box>
        </Box>
      </Box>
    </AppBar>
  );
}
