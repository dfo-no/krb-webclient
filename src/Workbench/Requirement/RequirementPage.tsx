import { ReactElement, useState } from 'react';
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

import { RootState } from '../../store/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import {
  addRequirementToSelectedNeed,
  editRequirementToSelected
} from '../../store/reducers/kravbank-reducer';
import styles from './RequirementPage.module.scss';
import { Requirement } from '../../models/Requirement';
import { Need } from '../../models/Need';
import { Utils } from '../../common/Utils';

export default function RequirementPage(): ReactElement {
  const dispatch = useDispatch();
  const { selectedProject } = useSelector((state: RootState) => state.kravbank);
  const [selectedNeed, setSelectedNeed] = useState<Need | undefined>(undefined);
  const [requirementList, setRequirementsLIst] = useState<Requirement[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [showEditor, setShowEditor] = useState(false);
  if (!selectedProject) {
    return <p>No project selected</p>;
  }

  if (!selectedProject.needs) {
    return (
      <p>The project has no needs, add one to continue with requirements</p>
    );
  }

  const needs = selectedProject.needs;

  const handleTitleChange = (event: any) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event: any) => {
    setDescription(event.target.value);
  };

  const addRequirementElement = () => () => {
    let requirement = {
      id: Utils.getRandomNumber(),
      title: title,
      description: description,
      needId: selectedNeed?.id,
      type: 'yes/no'
    };
    let reqList = [...requirementList];
    reqList.push(requirement);
    setRequirementsLIst(reqList);
    const needIndex = selectedProject.needs.findIndex(
      (need) => need.id === selectedNeed?.id
    );
    setShowEditor(false);
    dispatch(
      addRequirementToSelectedNeed({
        requirement: requirement,
        needIndex: needIndex
      })
    );
  };
  const editRequirementElement = (id: number) => () => {
    let requirement = {
      id: id,
      title: title,
      description: description,
      needId: selectedNeed?.id,
      type: 'yes/no'
    };
    let reqList = [...requirementList];
    reqList.push(requirement);
    setRequirementsLIst(reqList);
    const needIndex = selectedProject.needs.findIndex(
      (need) => need.id === selectedNeed?.id
    );
    const reqIndex = selectedProject.needs[needIndex].requirements.findIndex(
      (req) => req.id === id
    );
    dispatch(
      editRequirementToSelected({
        requirement: requirement,
        needIndex: needIndex,
        requirementIndex: reqIndex
      })
    );
  };

  const handleSelectedNeed = (need: Need) => {
    setSelectedNeed(need);
    setRequirementsLIst(need.requirements);
  };

  const requirements = (requirements: Requirement[]) => {
    if (selectedNeed === undefined) {
      return (
        <p>
          You have not selected a need, select one to work with requirements
        </p>
      );
    } else {
      if (requirements.length > 0) {
        const jsx = requirements.map((element: Requirement, index) => {
          return (
            <Card>
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
                        onChange={handleTitleChange}
                      />
                    </InputGroup>
                    <label htmlFor="title">Requirement text</label>
                    <InputGroup className="mb-3 30vw">
                      <FormControl
                        name="description"
                        defaultValue={element.description}
                        onChange={handleDescriptionChange}
                      />
                    </InputGroup>
                    <Button
                      className={styles.newbutton}
                      onClick={editRequirementElement(element.id)}
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
      } else {
        return <p>This need has no requirements, add one</p>;
      }
    }
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
              onClick={addRequirementElement()}
            >
              Create
            </Button>
          </Card.Body>
        </Card>
      );
    }
  };

  const header = (need: Need | undefined) => {
    if (need === undefined) {
      return <></>;
    } else {
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
    }
  };

  const needList = (needs: Need[]) => {
    return needs.map((element: Need) => {
      return (
        <Nav.Item key={element.id} className={`${styles.sidebar__item}`}>
          <Nav.Link
            as={NavLink}
            role="link"
            activeClassName={`${styles.sidebar__item__active}`}
            onClick={() => handleSelectedNeed(element)}
          >
            {element.tittel}
          </Nav.Link>
        </Nav.Item>
      );
    });
  };

  return (
    <>
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
    </>
  );
}
