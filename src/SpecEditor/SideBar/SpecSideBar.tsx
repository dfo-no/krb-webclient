import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { useTranslation } from 'react-i18next';
import { RouteComponentProps, withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import css from './SpecSideBar.module.scss';

interface IRouteLink {
  link: string;
  name: string;
}

type TParams = { id: string };

const renderRouteLinks = (routes: IRouteLink[]) => {
  return routes.map((route) => {
    return (
      <Nav.Item key={route.name} className={`${css.sidebar__item}`}>
        <Nav.Link
          as={NavLink}
          to={route.link}
          role="link"
          exact
          activeClassName={`${css.sidebar__item__active}`}
        >
          {route.name}
        </Nav.Link>
      </Nav.Item>
    );
  });
};

function SpecSideBar({
  match
}: RouteComponentProps<TParams>): React.ReactElement {
  const { t } = useTranslation();

  const { spec } = useAppSelector((state) => state.specification);

  const routes = [
    { link: `${match.url}`, name: `${t('Specification')}: ${spec.bank.title}` },
    { link: `${match.url}/requirement`, name: t('Requirements') },
    { link: `${match.url}/download`, name: t('Download') },
    { link: `${match.url}/product`, name: t('Products') }
  ];

  return (
    <Nav className={`sidebar col-md-12 flex-column ${css.sidebar}`}>
      {renderRouteLinks(routes)}
    </Nav>
  );
}

export default withRouter(SpecSideBar);
