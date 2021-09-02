import React, { ReactElement, useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { BsChevronDown } from 'react-icons/bs';
import { useRouteMatch } from 'react-router-dom';
import Utils from '../../common/Utils';
import { Bank } from '../../models/Bank';
import { Need } from '../../models/Need';
import { Requirement } from '../../models/Requirement';
import RequirementType from '../../models/RequirementType';
import { AccordionContext } from '../../NestableHierarchy/AccordionContext';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getProjectsThunk } from '../../store/reducers/project-reducer';
import { selectNeed } from '../../store/reducers/selectedNeed-reducer';
import SuccessAlert from '../SuccessAlert';
import EditRequirementForm from './EditRequirementForm';
import NeedSideBar from './NeedSideBar/NeedSidebar';
import NewRequirementForm from './NewRequirementForm';

interface RouteParams {
  projectId: string;
  needId?: string;
}

export default function RequirementPage(): ReactElement {
  const dispatch = useAppDispatch();
  const projectMatch = useRouteMatch<RouteParams>(
    '/workbench/:projectId/need/:needId/requirement'
  );

  if (projectMatch?.params.needId) {
    dispatch(selectNeed(projectMatch?.params.needId));
  }

  const { id } = useAppSelector((state) => state.selectedProject);
  const { list } = useAppSelector((state) => state.project);
  const { needId } = useAppSelector((state) => state.selectNeed);
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

  useEffect(() => {
    async function fetchEverything() {
      setTimeout(async () => {
        await dispatch(getProjectsThunk());
      }, 10);
    }
    if (!list) {
      fetchEverything();
    }
  }, [dispatch, list]);

  if (list.length === 0 || !id) {
    return <p>Loading requirement Page...</p>;
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
        <h4 className="mt-4">
          {Utils.capitalizeFirstLetter(selectedNeed.title)}
        </h4>
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
