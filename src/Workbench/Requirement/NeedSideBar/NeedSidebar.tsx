import React, { ReactElement } from 'react';
import Nav from 'react-bootstrap/Nav';
import { NavLink, useRouteMatch } from 'react-router-dom';

import Utils from '../../../common/Utils';
import { Nestable } from '../../../models/Nestable';
import { Need } from '../../../models/Need';
import styles from './NeedSidebar.module.scss';

interface IProps {
  needs: Nestable<Need>[];
}

interface RouteParams {
  projectId: string;
  requirementId: string;
}

export default function NeedSideBar({ needs }: IProps): ReactElement {
  const projectMatch = useRouteMatch<RouteParams>('/workbench/:projectId');

  if (!projectMatch?.params.projectId) {
    return <p>No project selected</p>;
  }

  const childrenHierarchy = (listOfNeed: Nestable<Need>[], level: number) => {
    let n = level;
    let children: JSX.Element[];
    const cssClass = `level${n}`;
    return listOfNeed.map((element) => {
      if (element.children && element.children.length > 0) {
        n += 1;
        children = childrenHierarchy(element.children, n);
      }
      return (
        <span key={element.id}>
          <Nav.Item key={element.id} className={` ${styles[cssClass]} pt-0`}>
            <Nav.Link
              as={NavLink}
              // TODO: activeClassName not reconized ny React
              // activeClassName={`${styles.sidebar__item__active}`}
              to={`/workbench/${projectMatch?.params.projectId}/need/${element.id}/requirement`}
              role="link"
            >
              {element.title}
            </Nav.Link>
          </Nav.Item>
          {element.children && element.children.length > 0 && children}
        </span>
      );
    });
  };

  const needHierarchy = (needsList: Nestable<Need>[]) => {
    const newList = Utils.unflatten(needsList)[0];
    let children: JSX.Element[];
    return newList.map((element) => {
      if (element.children && element.children.length > 0) {
        children = childrenHierarchy(element.children, 1);
      }
      return (
        <span key={element.id}>
          <Nav.Item className={`${styles.sidebar__item} m-0 p-0`}>
            <Nav.Link
              as={NavLink}
              // TODO: activeClassName not reconized ny React
              // activeClassName={`${styles.sidebar__item__active}`}
              to={`/workbench/${projectMatch?.params.projectId}/need/${element.id}/requirement`}
              role="link"
            >
              {element.title}
            </Nav.Link>
          </Nav.Item>
          {element.children && element.children.length > 0 && children}
        </span>
      );
    });
  };

  return (
    <Nav className={`sidebar flex-column p-0 ${styles.sidebar}`}>
      {needHierarchy(needs)}
    </Nav>
  );
}
