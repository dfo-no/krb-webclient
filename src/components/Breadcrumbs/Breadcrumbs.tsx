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
import {
  EVALUATION,
  PREFILLED_RESPONSE,
  RESPONSE,
  SPECIFICATION,
  WORKBENCH,
} from '../../common/PathConstants';

const Breadcrumbs = (): ReactElement => {
  const { t } = useTranslation();
  const { title } = useHeaderState();
  const { response } = useAppSelector((state) => state.response);
  const { prefilledResponse } = useAppSelector(
    (state) => state.prefilledResponse
  );

  const baseUrl = useRouteMatch<{ projectId: string }>(
    `/${WORKBENCH}/:projectId`
  );
  const location = useLocation();
  const [project, setProject] = useState<IBank>();

  // TODO Needs to go
  const { specificationUpload } = useEvaluationState();

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

  const isWorkbench = location.pathname.startsWith(`/${WORKBENCH}`);
  const isSpecification = location.pathname.startsWith(`/${SPECIFICATION}`);
  const isResponse = location.pathname.startsWith(`/${RESPONSE}`);
  const isEvaluation = location.pathname.startsWith(`/${EVALUATION}`);
  const isPrefilledResponse = location.pathname.startsWith(
    `/${PREFILLED_RESPONSE}`
  );

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
      url: `/${EVALUATION}`,
    });
  }

  if (isResponse) {
    breadcrumbs.push({
      label: `${t('Response')}/ ${getTitle()}`,
      url: `/${RESPONSE}`,
    });
  }

  if (isSpecification) {
    breadcrumbs.push({
      label: `${t('Requirement specification')}/ ${getTitle()}`,
      url: `/${SPECIFICATION}`,
    });
  }

  if (isWorkbench) {
    breadcrumbs.push({
      label: t('Workbench'),
      url: `/${WORKBENCH}`,
    });
  }

  if (isPrefilledResponse) {
    breadcrumbs.push({
      label: `${t('Prefilled Response')}/ ${getTitle()}`,
      url: `/${PREFILLED_RESPONSE}`,
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
