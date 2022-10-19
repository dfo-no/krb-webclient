import React, { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouteMatch } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/dist/query/react';
import ConstructionOutlinedIcon from '@mui/icons-material/ConstructionOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { IBank } from '../../../Nexus/entities/IBank';
import { useGetProjectQuery } from '../../../store/api/bankApi';
import { IToolbarItem } from '../../../models/IToolbarItem';
import DFOToolbar from '../../../components/DFOToolbar/DFOToolbar';

export default function ProjectActionsToolbar(): ReactElement {
  const { t } = useTranslation();
  const [project, setProject] = useState<IBank>();
  const baseUrl = useRouteMatch<{ projectId: string }>('/workbench/:projectId');
  const { data: fetchedProject } = useGetProjectQuery(
    baseUrl?.params?.projectId ?? skipToken
  );

  useEffect(() => {
    setProject(fetchedProject);
  }, [fetchedProject]);

  useEffect(() => {
    setProject(baseUrl?.params.projectId ? fetchedProject : undefined);
  }, [baseUrl, fetchedProject]);

  const tabName = location.pathname
    .replace(baseUrl ? baseUrl.url : '', '')
    .split('/')
    .filter((elem: string) => elem !== '')
    .shift();

  const isLocationAdmin = tabName === 'admin';
  const isLocationCreate = tabName === 'create';
  const isLocationPreview = tabName === 'preview';

  const toolbarItems: IToolbarItem[] = [];

  if (project) {
    toolbarItems.push({
      icon: <ConstructionOutlinedIcon />,
      label: t('Tooltip-menu-Create'),
      selected: isLocationCreate,
      url: baseUrl?.url + '/create',
    });
    toolbarItems.push({
      icon: <VisibilityOutlinedIcon />,
      label: t('Tooltip-menu-Preview'),
      selected: isLocationPreview,
      url: baseUrl?.url + '/preview',
    });
    toolbarItems.push({
      icon: <SettingsOutlinedIcon />,
      label: t('Tooltip-menu-Admin'),
      selected: isLocationAdmin,
      url: baseUrl?.url + '/admin',
    });
  }
  if (!project) {
    return <></>;
  }

  return <DFOToolbar items={toolbarItems} />;
}
