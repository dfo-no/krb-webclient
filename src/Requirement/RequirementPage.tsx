import { ReactElement, useState } from 'react';
import { Behov } from '../models/Behov';
import { Row, Container, Col, ListGroup } from 'react-bootstrap';
import Sidebar from '../SideBar/SideBar';
import { RootState } from '../store/configureStore';
import { useSelector } from 'react-redux';

export default function RequirementPage(): ReactElement {
  const { projects, selectedProject } = useSelector(
    (state: RootState) => state.kravbank
  );

  const behovList = projects
  const [need, setNeed] = useState();
  const requirementEditor = (need?: Behov) => {
    if (need !== undefined) {
      const jsx = need.krav?.map(element:Requirement) {
        
      };
      return;
    } else {
      const jsx = <p></p>;
    }
    return <ListGroup>{jsx}</ListGroup>;
  };

  const needs = () => {};

  return (
    <Container fluid>
      <Row>
        <Col>
          <Sidebar />
        </Col>
        <Col>{needs()}</Col>
        <Col>{requirementEditor(need)}</Col>
      </Row>
    </Container>
  );
}
