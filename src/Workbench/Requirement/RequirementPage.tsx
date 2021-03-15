/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ReactElement, useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useRouteMatch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { BsChevronDown } from 'react-icons/bs';
import { RootState } from '../../store/store';
import { Requirement } from '../../models/Requirement';
import { Need } from '../../models/Need';
import Utils from '../../common/Utils';
import { Bank } from '../../models/Bank';
import { AccordionContext } from '../../NestableHierarchy/AccordionContext';
import SuccessAlert from '../SuccessAlert';
import NewRequirementForm from './NewRequirementForm';
import EditRequirementForm from './EditRequirementForm';
import NeedSideBar from './NeedSideBar/NeedSidebar';
import RequirementType from '../../models/RequirementType';
import { selectNeed } from '../../store/reducers/selectedNeed-reducer';

interface RouteParams {
  projectId: string;
  needId: string;
}

export default function RequirementPage(): ReactElement {
  const dispatch = useDispatch();
  const projectMatch = useRouteMatch<RouteParams>(
    '/workbench/:projectId/need/:needId/requirement'
  );

  if (projectMatch?.params.needId) {
    dispatch(selectNeed(projectMatch?.params.needId));
  }

  const { id } = useSelector((state: RootState) => state.selectedProject);
  const { list } = useSelector((state: RootState) => state.project);
  const { needId } = useSelector((state: RootState) => state.selectNeed);
  const [activeKey, setActiveKey] = useState('');
  const [toggleEditor, setToggleEditor] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [requirementType, setRequirementType] = useState<RequirementType>(
    RequirementType.requirement
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [showAlert]);

  if (!id) {
    return <p>No project selected</p>;
  }

  const selectedProject = Utils.ensure(
    list.find((project: Bank) => project.id === id)
  );

  if (!selectedProject.needs) {
    return (
      <p>The project has no needs, add one to continue with requirements</p>
    );
  }
  const { needs } = selectedProject;

  if (!needId) {
    return (
      <Row>
        <Col className="col-3 p-0">
          <NeedSideBar needs={needs} />
        </Col>
        <Col>
          You have not selected a Need, select one to work with requirement
        </Col>
      </Row>
    );
  }

  const selectedNeed = Utils.ensure(
    needs.find((need: Need) => need.id === needId)
  );

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
      const jsx = filteredList.map((element: Requirement, index) => {
        return (
          <Card key={element.id}>
            <Card.Header className="d-flex justify-content-between">
              <h6 className="mt-2">{element.title}</h6>
              <Accordion.Toggle
                as={Button}
                variant="link"
                eventKey={element.id}
              >
                <BsChevronDown />
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey={element.id}>
              <Card.Body>
                <EditRequirementForm
                  index={index}
                  element={element}
                  needList={needs}
                  need={selectedNeed}
                />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
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
      const jsx = filteredList.map((element: Requirement, index) => {
        return (
          <Card key={element.id}>
            <Card.Header className="d-flex justify-content-between">
              <h6 className="mt-2">{element.title}</h6>
              <Accordion.Toggle
                as={Button}
                variant="link"
                eventKey={element.id}
              >
                <BsChevronDown />
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey={element.id}>
              <Card.Body>
                <EditRequirementForm
                  index={index}
                  element={element}
                  needList={needs}
                  need={selectedNeed}
                />
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
        <NeedSideBar needs={needs} />
      </Col>
      <Col>
        <h4 className="mt-4">Need: {selectedNeed.title}</h4>
        <h5>{selectedNeed.description}</h5>
        <Row className="flex justify-content-end">
          <Button
            onClick={() => {
              setToggleEditor(true);
              setRequirementType(RequirementType.requirement);
            }}
            className="mb-4 mr-3"
          >
            New Requirement
          </Button>
          <Button
            onClick={() => {
              setToggleEditor(true);
              setRequirementType(RequirementType.info);
            }}
            className="mb-4 mr-3"
          >
            New Info field
          </Button>
        </Row>

        {showAlert && (
          <SuccessAlert toggleShow={setShowAlert} type="requirement" />
        )}
        {toggleEditor && (
          <NewRequirementForm
            toggleAlert={setShowAlert}
            toggleShow={setToggleEditor}
            need={selectedNeed}
            needList={needs}
            type={requirementType}
          />
        )}
        {info(selectedNeed.requirements)}
        {requirements(selectedNeed.requirements)}
      </Col>
    </Row>
  );
}
