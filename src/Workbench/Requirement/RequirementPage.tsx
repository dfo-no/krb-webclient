import React, { ReactElement, useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { BsChevronDown } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import Utils from '../../common/Utils';
import { Requirement } from '../../models/Requirement';
import { AccordionContext } from '../../NestableHierarchy/AccordionContext';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectNeed } from '../../store/reducers/selectedNeed-reducer';
import EditRequirementForm from './EditRequirementForm';
import NeedSideBar from './NeedSideBar/NeedSidebar';
import NewRequirementForm from './NewRequirementForm';

interface RouteParams {
  projectId: string;
  needId?: string;
}

export default function RequirementPage(): ReactElement {
  const dispatch = useAppDispatch();

  const { needId } = useParams<RouteParams>();
  const { needId: selectedNeedId } = useAppSelector(
    (state) => state.selectNeed
  );
  useEffect(() => {
    if (needId && needId !== selectedNeedId) {
      dispatch(selectNeed(needId));
    }
  }, [needId, selectedNeedId, dispatch]);

  const { project } = useAppSelector((state) => state.project);
  const selectedNeed = project.needs.find((elem) => elem.id === selectedNeedId);
  const [activeKey, setActiveKey] = useState('');

  if (!project.needs) {
    return (
      <p>The project has no needs, add one to continue with requirements</p>
    );
  }

  if (!selectedNeed) {
    return (
      <Row>
        <Col className="col-3 p-0">
          <NeedSideBar />
        </Col>
        <Col>
          You have not selected a Need, select one to work with requirement
        </Col>
      </Row>
    );
  }

  const onOpenClose = (e: string | null) => {
    if (e) {
      setActiveKey(e);
    } else {
      setActiveKey('');
    }
  };

  const requirements = (reqs: Requirement[]) => {
    if (reqs.length > 0) {
      const filteredList = reqs.filter(
        (element) => element.requirement_Type === 'requirement'
      );
      const jsx = filteredList.map((element: Requirement) => {
        return (
          <Accordion.Item eventKey={element.id}>
            <Card key={element.id} className="d-flex justify-content-between">
              <Card.Header>
                <Row className="d-flex justify-content-between">
                  <h6 className="ml-2 mt-2">
                    {Utils.capitalizeFirstLetter(element.title)}
                  </h6>
                  <Accordion.Header as={Button} variant="link">
                    <BsChevronDown />
                  </Accordion.Header>
                </Row>
              </Card.Header>
              <Accordion.Collapse eventKey={element.id}>
                <Card.Body>
                  <EditRequirementForm element={element} />
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion.Item>
        );
      });
      return (
        <>
          {filteredList.length > 0 && <h5 className="mt-4">Requirements: </h5>}
          <AccordionContext.Provider value={{ onOpenClose }}>
            <Accordion activeKey={activeKey} onSelect={(e) => onOpenClose(e)}>
              {jsx}
            </Accordion>
          </AccordionContext.Provider>
        </>
      );
    }
    return <p>This need has no requirements, add one</p>;
  };

  const info = (reqs: Requirement[]) => {
    if (reqs.length > 0) {
      const filteredList = reqs.filter(
        (element) => element.requirement_Type === 'info'
      );
      const jsx = filteredList.map((element: Requirement) => {
        return (
          <Card key={element.id}>
            <Card.Header className="d-flex justify-content-between">
              <h6 className="mt-2">{element.title}</h6>
              <Accordion.Header
                as={Button}
                variant="link"
                eventKey={element.id}
              >
                <BsChevronDown />
              </Accordion.Header>
            </Card.Header>
            <Accordion.Collapse eventKey={element.id}>
              <Card.Body>
                <EditRequirementForm element={element} />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        );
      });
      return (
        <>
          {filteredList.length > 0 && <h5 className="mt-4">Info fields:</h5>}
          <AccordionContext.Provider value={{ onOpenClose }}>
            <Accordion activeKey={activeKey} onSelect={(e) => onOpenClose(e)}>
              {jsx}
            </Accordion>
          </AccordionContext.Provider>
        </>
      );
    }
    return null;
  };

  return (
    <Row>
      <Col className="col-3 p-0">
        <NeedSideBar />
      </Col>
      <Col>
        <h4 className="mt-4">
          {Utils.capitalizeFirstLetter(selectedNeed.title)}
        </h4>
        <h5>{selectedNeed.description}</h5>

        <NewRequirementForm />
        {info(selectedNeed.requirements)}
        {requirements(selectedNeed.requirements)}
      </Col>
    </Row>
  );
}
