import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import Utils from '../../../common/Utils';
import { INeed } from '../../../models/INeed';
import { Parentable } from '../../../models/Parentable';
import { useAppSelector } from '../../../store/hooks';
import styles from './NeedSidebar.module.scss';

export default function NeedSideBar(): React.ReactElement {
  const { project } = useAppSelector((state) => state.project);
  const { needs } = project;

  const needLevels = (elements: Parentable<INeed>[]) => {
    const displayNeeds = Utils.parentable2Levelable(elements);
    return displayNeeds.map((element) => {
      const cssClass = `level${element.level - 1}`;
      return (
        <Nav.Item
          className={`${styles.sidebar__item} ${styles[cssClass]}`}
          key={element.id}
        >
          <Nav.Link
            as={NavLink}
            // TODO: activeClassName not reconized ny React
            // activeClassName={`${styles.sidebar__item__active}`}
            to={`/workbench/${project.id}/need/${element.id}/requirement`}
            role="link"
          >
            {element.title}
          </Nav.Link>
        </Nav.Item>
      );
    });
  };

  return (
    <Nav className={`sidebar flex-column p-0 ${styles.sidebar}`}>
      {needLevels(needs)}
    </Nav>
  );
}
