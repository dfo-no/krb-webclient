import React, { ReactElement } from 'react';
import { Nav } from 'react-bootstrap';
import { withRouter } from 'react-router';
import '../KravbankKatalogSide/KravbankKatalogSide.module.scss';

function SideBar(props: any): ReactElement {
  return (
    <Nav
      className="sidebar col-md-12 flex-column vh-100 bg-dark"
      activeKey="/home"
    >
      <Nav.Item>
        <Nav.Link href="/home">Active</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-1">Link</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-2">Link</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="disabled" disabled>
          Disabled
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default withRouter(SideBar);
