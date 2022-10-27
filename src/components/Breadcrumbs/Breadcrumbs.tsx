import React, { ReactElement, useEffect, useState } from 'react';
import { Link, useLocation, useRouteMatch } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/dist/query/react';
import { useTranslation } from 'react-i18next';

import css from './Breadcrumbs.module.scss';
import { IBreadcrumb } from '../../models/IBreadcrumb';
import { useHeaderState } from '../Header/HeaderContext';
import { useAppSelector } from '../../store/hooks';
import { IBank } from '../../Nexus/entities/IBank';
import { useEvaluationState } from '../../pages/Evaluation/EvaluationContext';
import { useGetProjectQuery } from '../../store/api/bankApi';
import ProjectActionsToolbar from '../../pages/Workbench/Projects/ProjectActionsToolbar';

const Breadcrumbs = (): ReactElement => {
  const { t } = useTranslation();
  const { title } = useHeaderState();
  const { response } = useAppSelector((state) => state.response);
  const { prefilledResponse } = useAppSelector(
    (state) => state.prefilledResponse
  );

  const baseUrl = useRouteMatch<{ projectId: string }>('/workbench/:projectId');
  const location = useLocation();
  const [project, setProject] = useState<IBank>();

  const { specificationUpload } = useEvaluationState(); // TODO: Needs to go

  const breadcrumbs: IBreadcrumb[] = [
    {
      label: t('app_title'),
      url: '/',
    },
  ];

  const isLast = (index: number): boolean => {
    return index === breadcrumbs.length - 1;
  };

  const { data: fetchedProject } = useGetProjectQuery(
    baseUrl?.params?.projectId ?? skipToken
  );

  const isWorkbench = location.pathname.startsWith('/workbench');
  const isSpecification = location.pathname.startsWith('/specification');
  const isResponse = location.pathname.startsWith('/response');
  const isEvaluation = location.pathname.startsWith('/evaluation');
  const isPrefilledResponse =
    location.pathname.startsWith('/prefilledresponse');

  useEffect(() => {
    setProject(fetchedProject);
  }, [fetchedProject]);

  useEffect(() => {
    setProject(baseUrl?.params.projectId ? fetchedProject : undefined);
  }, [baseUrl, fetchedProject]);

  const getTitle = (): string => {
    if (project) {
      return project.title || t('Project');
    }
    if (isSpecification) {
      return title || t('Requirement specification');
    }
    if (isResponse) {
      return response.specification.title || t('Response');
    }
    if (isEvaluation) {
      return specificationUpload.specification.title || t('Evaluation');
    }
    if (isPrefilledResponse) {
      return prefilledResponse.bank.title || t('Prefilled response');
    }
    return t('app_title');
  };

  if (isEvaluation) {
    breadcrumbs.push({
      label: `${t('Evaluation')}/ ${getTitle()}`,
      url: '/evaluering',
    });
  }

  if (isResponse) {
    breadcrumbs.push({
      label: `${t('Response')}/ ${getTitle()}`,
      url: '/response',
    });
  }

  if (isSpecification) {
    breadcrumbs.push({
      label: `${t('Requirement specification')}/ ${getTitle()}`,
      url: '/specification',
    });
  }

  if (isWorkbench) {
    breadcrumbs.push({
      label: t('Workbench'),
      url: '/workbench',
    });
  }

  if (isPrefilledResponse) {
    breadcrumbs.push({
      label: `${t('Prefilled')}/ ${getTitle()}`,
      url: '/prefilledresponse',
    });
  }

  if (project) {
    breadcrumbs.push({
      label: `${t('Project')}/ ${getTitle()}`,
      url: project.id,
    });
  }

  return (
    <div className={css.Breadcrumbs}>
      <div>
        <span>
          <a href={'https://anskaffelser.no'}>Anskaffelser.no</a>
        </span>
        {breadcrumbs.map((breadcrumb, index) => (
          <span key={'bc_' + index}>
            {!isLast(index) ? (
              <Link to={breadcrumb.url}>{breadcrumb.label}</Link>
            ) : (
              breadcrumb.label
            )}
          </span>
        ))}
      </div>
      {project && <ProjectActionsToolbar />}
    </div>
  );
};

export default Breadcrumbs;
