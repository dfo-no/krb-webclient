import React, { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useParams } from 'react-router-dom';
import Utils from '../../../common/Utils';
import { AccordionContext } from '../../../NestableHierarchy/AccordionContext';
import { IRequirement } from '../../../Nexus/entities/IRequirement';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { selectNeed } from '../../../store/reducers/selectedNeed-reducer';
import EditRequirementForm from './EditRequirementForm';
import NeedSideBar from './NeedSideBar/NeedSidebar';
import NewRequirementForm from './NewRequirementForm';

interface IRouteParams {
  projectId: string;
  needId?: string;
}

export default function RequirementPage(): React.ReactElement {
  const dispatch = useAppDispatch();

  const { needId } = useParams<IRouteParams>();
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

  const renderAccordion = (element: IRequirement) => {
    return (
      <Accordion.Item eventKey={element.id} key={element.id}>
        <h2 className="accordion-header">
          <Accordion.Button>
            {Utils.capitalizeFirstLetter(element.title)}
          </Accordion.Button>
        </h2>
        <Accordion.Collapse eventKey={element.id}>
          <Accordion.Body>
            {element.sourceRel === null && (
              <EditRequirementForm element={element} />
            )}
            {element.sourceRel !== null && (
              <>
                <p>{element.description}</p>
                <p>This item is inherited and readonly </p>
              </>
            )}
          </Accordion.Body>
        </Accordion.Collapse>
      </Accordion.Item>
    );
  };

  const requirements = (reqs: IRequirement[]) => {
    if (reqs.length > 0) {
      const filteredList = reqs.filter(
        (element) => element.requirement_Type === 'requirement'
      );
      const jsx = filteredList.map((element: IRequirement) =>
        renderAccordion(element)
      );
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

  const info = (reqs: IRequirement[]) => {
    if (reqs.length > 0) {
      const filteredList = reqs.filter(
        (element) => element.requirement_Type === 'info'
      );
      const jsx = filteredList.map((element: IRequirement) =>
        renderAccordion(element)
      );
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
