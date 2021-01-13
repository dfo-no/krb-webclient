import React, { ReactElement } from 'react';
import { Nav } from 'react-bootstrap';
import { withRouter } from 'react-router';
import styles from '../SideBar/SideBar.module.scss';

function SideBar(props: any): ReactElement {
  return (
    <Nav className="sidebar col-sm-5 flex-column vh-100" activeKey="/home">
      <Nav.Item>
        <Nav.Link href="/edit/behov" className={styles.navbartopel}>
          <p className="h2 ">Behov</p>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/edit/krav" className={styles.navbarel}>
          <p className="h2 ">Krav</p>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/edit/kodeliste" className={styles.navbarel}>
          <p className="h2 ">KodeListe</p>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item></Nav.Item>
    </Nav>
  );
}

export default withRouter(SideBar);
