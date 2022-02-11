import React, { useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useParams } from 'react-router-dom';
import Utils from '../../../common/Utils';
import { IRequirement } from '../../../Nexus/entities/IRequirement';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { selectNeed } from '../../../store/reducers/selectedNeed-reducer';
import EditRequirementForm from './EditRequirementForm';
import NeedSideBar from './NeedSideBar/NeedSidebar';
import NewRequirementForm from './NewRequirementForm';
import {
  DFOAccordionElement,
  DFOAccordionProvider
} from '../../../components/DFOAccordion/DFOAccordion';

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

  const renderAccordion = (element: IRequirement) => {
    return (
      <DFOAccordionElement
        key={element.id}
        eventKey={element.id}
        header={<div>{Utils.capitalizeFirstLetter(element.title)} </div>}
        body={
          <div>
            {element.sourceRel === null && (
              <EditRequirementForm element={element} />
            )}
            {element.sourceRel !== null && (
              <>
                <p>{element.description}</p>
                <p>This item is inherited and readonly </p>
              </>
            )}
          </div>
        }
      />
    );
  };

  const requirements = (reqs: IRequirement[]) => {
    if (reqs.length > 0) {
      const filteredList = reqs.filter(
        (element) => element.requirement_Type === 'requirement'
      );
      return (
        <>
          {filteredList.length > 0 && <h5 className="mt-4">Requirements: </h5>}
          <div>
            {filteredList.map((element: IRequirement) =>
              renderAccordion(element)
            )}
          </div>
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
      return (
        <>
          {filteredList.length > 0 && <h5 className="mt-4">Info fields:</h5>}
          <div>
            {filteredList.map((element: IRequirement) =>
              renderAccordion(element)
            )}
          </div>
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
        <DFOAccordionProvider
          body={
            <>
              {info(selectedNeed.requirements)}
              {requirements(selectedNeed.requirements)}
            </>
          }
        />
      </Col>
    </Row>
  );
}
