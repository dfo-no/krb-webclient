import React, { ReactElement } from 'react';
import { Nav, NavLink } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import Utils from '../../../common/Utils';
import { Need } from '../../../models/Need';
import { selectNeed } from '../../../store/reducers/selectedNeed-reducer';
import styles from './NeedSidebar.module.scss';

interface IProps {
  needs: Need[];
}

export default function NeedSideBar({ needs }: IProps): ReactElement {
  const dispatch = useDispatch();
  const handleSelectedNeed = (need: Need) => {
    dispatch(selectNeed(need.id));
  };

  const childrenHierarchy = (listofneed: any[], level: number) => {
    let n = level;
    let children: any;
    const cssClass = `level${n}`;
    return listofneed.map((element: any) => {
      if (element.children.length > 0) {
        n += 1;
        children = childrenHierarchy(element.children, n);
      }
      return (
        <>
          <Nav.Item key={element.id} className={` ${styles[cssClass]} pt-0`}>
            <Nav.Link
              as={NavLink}
              role="link"
              /* TODO: activeClassName not reconized ny React */
              /* activeClassName={`${styles.sidebar__item__active}`} */
              onClick={() => handleSelectedNeed(element)}
            >
              {element.title}
            </Nav.Link>
          </Nav.Item>
          {children}
        </>
      );
    });
  };

  const needHierarchy = (needsList: Need[]) => {
    const newList = Utils.unflatten(needsList);
    let children: any;
    return newList.map((element: any) => {
      if (element.children.length > 0) {
        children = childrenHierarchy(element.children, 1);
      }
      return (
        <span key={element.id}>
          <Nav.Item className={`${styles.sidebar__item} m-0 p-0`}>
            <Nav.Link
              as={NavLink}
              role="link"
              /* TODO: activeClassName not reconized ny React */
              /* activeClassName={`${styles.sidebar__item__active}`} */
              onClick={() => handleSelectedNeed(element)}
            >
              {element.title}
            </Nav.Link>
          </Nav.Item>
          {children}
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
