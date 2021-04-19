import React, { ReactElement } from 'react';
import Nav from 'react-bootstrap/Nav';
import { withRouter } from 'react-router';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
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
  const { id } = useSelector((state: RootState) => state.selectedBank);

  const { list } = useSelector((state: RootState) => state.bank);

  const match = useRouteMatch<RouteParams>('/speceditor/:bankId');

  const currentUrl = match?.url ? match.url : `/speceditor/${id}`;
  const isProjectSelected = !!id;

  const selectProject = list.find((bank) => bank.id === id);

  const displayTitle = selectProject ? selectProject.title : '<None selected>';

  const routes = [
    { link: `${currentUrl}`, name: `Spesification: ${displayTitle}` },
    { link: `${currentUrl}/requirement`, name: 'Requirements' },
    { link: `${currentUrl}/download`, name: 'Download' },
    { link: `${currentUrl}/product`, name: 'Products' }
  ];

  return (
    <Nav className={`sidebar col-md-12 flex-column ${css.sidebar}`}>
      {renderRouteLinks(routes, isProjectSelected)}
    </Nav>
  );
}

export default withRouter(SpecSideBar);
