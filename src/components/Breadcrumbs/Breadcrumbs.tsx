import { ReactElement } from 'react';
import { Link, useLocation, useRouteMatch } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import css from './Breadcrumbs.module.scss';
import { IBreadcrumb } from '../../models/IBreadcrumb';
import { HeaderContainer } from '../Header/HeaderContext';
import { ProjectActionsToolbar } from '../../pages/Workbench/Projects/ProjectActionsToolbar';
import {
  EVALUATION,
  PREFILLED_RESPONSE,
  RESPONSE,
  SPECIFICATION,
  WORKBENCH,
} from '../../common/PathConstants';

const Breadcrumbs = (): ReactElement => {
  const { t } = useTranslation();
  const { title } = HeaderContainer.useContainer();

  const baseUrl = useRouteMatch<{ projectId: string }>(
    `/${WORKBENCH}/:projectId`
  );
  const location = useLocation();

  const breadcrumbs: IBreadcrumb[] = [
    {
      label: t('app_title'),
      url: '/',
    },
  ];

  const isLast = (index: number): boolean => {
    return index === breadcrumbs.length - 1;
  };

  const isWorkbench = location.pathname.startsWith(`/${WORKBENCH}`);
  const isProject = isWorkbench && !!baseUrl?.params?.projectId;

  const isSpecification = location.pathname.startsWith(`/${SPECIFICATION}`);
  const isResponse = location.pathname.startsWith(`/${RESPONSE}`);
  const isEvaluation = location.pathname.startsWith(`/${EVALUATION}`);
  const isPrefilledResponse = location.pathname.startsWith(
    `/${PREFILLED_RESPONSE}`
  );

  const getTitle = (): string => {
    if (isProject) {
      return title || t('Project');
    }
    if (isSpecification) {
      return title || t('Requirement specification');
    }
    if (isResponse) {
      return title || t('Response');
    }
    if (isEvaluation) {
      return title || t('Evaluation');
    }
    if (isPrefilledResponse) {
      return title || t('Prefilled response');
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
      label: t('common.Workbench'),
      url: `/${WORKBENCH}`,
    });
  }

  if (isPrefilledResponse) {
    breadcrumbs.push({
      label: `${t('Prefilled Response')}/ ${getTitle()}`,
      url: `/${PREFILLED_RESPONSE}`,
    });
  }

  if (isProject) {
    breadcrumbs.push({
      label: `${t('Project')}/ ${getTitle()}`,
      url: baseUrl?.params?.projectId,
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
      {isProject && <ProjectActionsToolbar />}
    </div>
  );
};

export default Breadcrumbs;
