import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouteMatch } from 'react-router-dom';
import ConstructionOutlinedIcon from '@mui/icons-material/ConstructionOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

import { IToolbarItem } from '../../../models/IToolbarItem';
import DFOToolbar from '../../../components/DFOToolbar/DFOToolbar';
import { WORKBENCH } from '../../../common/PathConstants';

// export type ProjectActionsToolbarProps = {};

export function ProjectActionsToolbar(): ReactElement {
  const { t } = useTranslation();
  const baseUrl = useRouteMatch<{ projectId: string }>(
    `/${WORKBENCH}/:projectId`
  );

  const tabName = location.pathname
    .replace(baseUrl ? baseUrl.url : '', '')
    .split('/')
    .filter((elem: string) => elem !== '')
    .shift();

  const isLocationAdmin = tabName === 'admin';
  const isLocationCreate = tabName === 'create';
  const isLocationPreview = tabName === 'preview';

  const toolbarItems: IToolbarItem[] = [];

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

  return <DFOToolbar items={toolbarItems} />;
}
