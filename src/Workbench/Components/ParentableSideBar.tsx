import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import Utils from '../../common/Utils';
import { Levelable } from '../../models/Levelable';
import { Parentable } from '../../models/Parentable';
import { INeed } from '../../Nexus/entities/INeed';
import { IProduct } from '../../Nexus/entities/IProduct';
import styles from './NeedSidebar.module.scss';

interface IProps {
  parentableArray: Parentable<INeed | IProduct>[];
  updateSelectedFunction: (item: Levelable<INeed | IProduct>) => void;
}

export default function ParentableSideBar(): React.ReactElement {
  const needLevels = (elements: Parentable<INeed>[]) => {
    const displayNeeds = Utils.parentable2Levelable(elements);
    return displayNeeds.map((element) => {
      const cssClass = `level${element.level - 1}`;
      return (
        <Button
          className={`${styles.sidebar__item} ${styles[cssClass]}`}
          key={element.id}
        >
          {element.title}
        </Button>
      );
    });
  };

  return (
    <Nav className={`sidebar flex-column p-0 ${styles.sidebar}`}>
      {needLevels(needs)}
    </Nav>
  );
}
