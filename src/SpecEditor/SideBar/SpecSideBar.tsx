import React, { ReactElement } from 'react';
import Nav from 'react-bootstrap/Nav';
import { withRouter } from 'react-router';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import css from './SpecSideBar.module.scss';
import { RootState } from '../../store/store';

interface IRouteLink {
  link: string;
  name: string;
}

interface RouteParams {
  projectId: string;
}

const renderRouteLinks = (routes: IRouteLink[], isProjectSelected: boolean) => {
  return routes.map((route) => {
    return (
      <Nav.Item key={route.name} className={`${css.sidebar__item}`}>
        <Nav.Link
          as={NavLink}
          to={route.link}
          role="link"
          activeClassName={`${css.sidebar__item__active}`}
          disabled={!isProjectSelected}
        >
          {route.name}
        </Nav.Link>
      </Nav.Item>
    );
  });
};

function SpecSideBar(): ReactElement {
  const { t } = useTranslation();
  const match = useRouteMatch<RouteParams>('/speceditor/:bankId');

  const { id } = useSelector((state: RootState) => state.selectedBank);
  const { list } = useSelector((state: RootState) => state.bank);

  const currentUrl = match?.url ? match.url : `/speceditor/${id}`;
  const isProjectSelected = !!id;

  const selectProject = list.find((bank) => bank.id === id);

  const displayTitle = selectProject
    ? selectProject.title
    : `<${t('none selected')}>`;

  const routes = [
    { link: `${currentUrl}`, name: `${t('Specification')}: ${displayTitle}` },
    { link: `${currentUrl}/requirement`, name: t('Requirements') },
    { link: `${currentUrl}/download`, name: t('Download') },
    { link: `${currentUrl}/product`, name: t('Products') }
  ];

  return (
    <Nav className={`sidebar col-md-12 flex-column ${css.sidebar}`}>
      {renderRouteLinks(routes, isProjectSelected)}
    </Nav>
  );
}

export default withRouter(SpecSideBar);
