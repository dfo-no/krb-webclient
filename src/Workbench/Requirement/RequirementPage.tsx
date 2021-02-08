/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ReactElement, useState } from 'react';
import {
  Row,
  Col,
  Nav,
  NavLink,
  Accordion,
  Card,
  Button,
  InputGroup,
  FormControl
} from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import {
  editRequirementInNeed,
  putProjectThunk,
  setRequirementListToNeed
} from '../../store/reducers/project-reducer';
import styles from './RequirementPage.module.scss';
import { Requirement } from '../../models/Requirement';
import { Need } from '../../models/Need';
import Utils from '../../common/Utils';
import { Bank } from '../../models/Bank';

export default function RequirementPage(): ReactElement {
  const dispatch = useDispatch();
  const { id } = useSelector((state: RootState) => state.selectedProject);
  const { list } = useSelector((state: RootState) => state.project);
  const [selectedNeed, setSelectedNeed] = useState<Need | undefined>(undefined);
  const [requirementList, setRequirementsList] = useState<Requirement[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [showEditor, setShowEditor] = useState(false);
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

  const handleTitleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setDescription(event.target.value);
  };

  const addRequirementElement = () => {
    const requirement = {
      id: Utils.getRandomNumber(),
      title,
      description,
      needId: selectedNeed?.id,
      type: 'yes/no'
    };
    const reqList = [...requirementList];
    reqList.push(requirement);

    setRequirementsList(reqList);
    setShowEditor(false);
    const needIndex = selectedProject.needs.findIndex(
      (need) => need.id === selectedNeed?.id
    );
    dispatch(
      setRequirementListToNeed({
        projectId: id,
        needIndex,
        reqList
      })
    );
    dispatch(putProjectThunk(id));
  };

  const editRequirementElement = (reqId: number, index: number) => () => {
    const requirement = {
      id: reqId,
      title,
      description,
      needId: selectedNeed?.id,
      type: 'yes/no'
    };
    const reqList = [...requirementList];
    reqList[index] = requirement;
    setRequirementsList(reqList);
    const needIndex = Utils.ensure(
      selectedProject.needs.findIndex((need) => {
        if (selectedNeed && selectedNeed.id) return need.id === selectedNeed.id;
        return 0;
      })
    );
    dispatch(
      editRequirementInNeed({
        projectId: id,
        needIndex,
        reqId: requirement.id,
        requirement
      })
    );
  };

  const handleSelectedNeed = (need: Need) => {
    setSelectedNeed(need);
    setRequirementsList(need.requirements);
  };

  const requirements = (reqs: Requirement[]) => {
    if (!selectedNeed) {
      return (
        <p>
          You have not selected a need, select one to work with requirements
        </p>
      );
    }
    if (reqs.length > 0) {
      const jsx = reqs.map((element: Requirement, index) => {
        return (
          <Card key={element.id}>
            <Card.Header>
              <Accordion.Toggle
                as={Button}
                variant="link"
                eventKey={index.toString()}
              >
                {element.title}
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey={index.toString()}>
              <Card.Body>
                <>
                  <label htmlFor="title">Title</label>
                  <InputGroup className="mb-3 30vw">
                    <FormControl
                      name="title"
                      defaultValue={element.title}
                      onChange={(e) => handleTitleChange(e)}
                    />
                  </InputGroup>
                  <label htmlFor="title">Requirement text</label>
                  <InputGroup className="mb-3 30vw">
                    <FormControl
                      name="description"
                      defaultValue={element.description}
                      onChange={(e) => handleDescriptionChange(e)}
                    />
                  </InputGroup>
                  <Button
                    className={styles.newbutton}
                    onClick={editRequirementElement(element.id, index)}
                  >
                    Save
                  </Button>
                </>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        );
      });
      return (
        <>
          <h5>Requirements</h5>
          <Accordion>{jsx}</Accordion>
        </>
      );
    }
    return <p>This need has no requirements, add one</p>;
  };

  const newRequirement = (show: boolean) => {
    if (show) {
      return (
        <Card className={styles.headerSection__requirement}>
          <Card.Body>
            <label htmlFor="title">Title</label>
            <InputGroup className="mb-3 30vw">
              <FormControl name="title" onChange={handleTitleChange} />
            </InputGroup>
            <label htmlFor="title">Requirement text</label>
            <InputGroup className="mb-3 30vw">
              <FormControl
                name="description"
                onChange={handleDescriptionChange}
              />
            </InputGroup>
            <Button
              className={styles.newbutton}
              onClick={() => addRequirementElement()}
            >
              Create
            </Button>
          </Card.Body>
        </Card>
      );
    }
    return <></>;
  };

  const header = (need: Need | undefined) => {
    if (need === undefined) {
      return <></>;
    }
    return (
      <div className={styles.headerSection}>
        <h4>{need.tittel}</h4>
        <h5>{need.beskrivelse}</h5>
        <Button
          onClick={() => {
            setShowEditor(true);
          }}
          className={styles.headersection__addButton}
        >
          New Requirement
        </Button>
        {newRequirement(showEditor)}
      </div>
    );
  };

  const needList = (needsList: Need[]) => {
    return needsList.map((element: Need) => {
      return (
        <Nav.Item key={element.id} className={`${styles.sidebar__item}`}>
          <Nav.Link
            as={NavLink}
            role="link"
            /* TODO: activeClassName not reconized ny React */
            /* activeClassName={`${styles.sidebar__item__active}`} */
            onClick={() => handleSelectedNeed(element)}
          >
            {element.tittel}
          </Nav.Link>
        </Nav.Item>
      );
    });
  };

  return (
    <Row>
      <Col className="col-2 p-0">
        <Nav className={`sidebar flex-column vh-100 p-0 ${styles.sidebar}`}>
          {needList(needs)}
        </Nav>
      </Col>
      <Col>
        {header(selectedNeed)}
        {requirements(requirementList)}
      </Col>
    </Row>
  );
}
