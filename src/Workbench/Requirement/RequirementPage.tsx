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
  FormControl,
  Form
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { BsChevronDown } from 'react-icons/bs';
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
import { selectRequirement } from '../../store/reducers/selectedRequirement-reducer';
import { selectNeed } from '../../store/reducers/selectedNeed-reducer';
import { AccordionContext } from '../../NestableHierarchy/AccordionContext';
import SuccessAlert from '../Successalert';

type FormValues = {
  title: string;
  description: string;
};

const requirementSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required()
});

export default function RequirementPage(): ReactElement {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset, errors } = useForm({
    resolver: yupResolver(requirementSchema)
  });
  const [validated] = useState(false);
  const { id } = useSelector((state: RootState) => state.selectedProject);
  const { list } = useSelector((state: RootState) => state.project);
  const [selectedNeed, setSelectedNeed] = useState<Need | undefined>(undefined);
  const [requirementList, setRequirementsList] = useState<Requirement[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [showEditor, setShowEditor] = useState(false);
  const [activeKey, setActiveKey] = useState('');
  const [showAlert, setShowAlert] = useState(false);

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

  const onOpenClose = (e: string | null) => {
    if (e) {
      setActiveKey(e);
    } else {
      setActiveKey('');
    }
  };

  const addRequirementElement = (post: FormValues) => {
    // find better solution to ts stating object might be undefined
    let needId;
    if (selectedNeed) {
      needId = selectedNeed.id;
    } else needId = '';
    const requirement: Requirement = {
      id: uuidv4(),
      title: post.title,
      description: post.description,
      needId,
      layouts: [],
      kind: 'yes/no',
      type: 'requirement'
    };
    const reqList = [...requirementList];
    reqList.push(requirement);

    setRequirementsList(reqList);
    setShowEditor(false);
    const needIndex = selectedProject.needs.findIndex(
      (need) => need.id === selectedNeed?.id
    );
    reset();
    dispatch(
      setRequirementListToNeed({
        projectId: id,
        needIndex,
        reqList
      })
    );
    dispatch(putProjectThunk(id));
    reset();
    setShowAlert(true);
  };

  const editRequirementElement = (reqId: string, index: number) => () => {
    let needId;
    if (selectedNeed) {
      needId = selectedNeed.id;
    } else needId = '';
    const reqList = [...requirementList];
    const requirement: Requirement = {
      id: reqId,
      title,
      description,
      needId,
      layouts: reqList[index].layouts,
      kind: 'yes/no',
      type: 'requirement'
    };
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
        requirement
      })
    );
    onOpenClose('');
  };

  const handleSelectedNeed = (need: Need) => {
    setSelectedNeed(need);
    setRequirementsList(need.requirements);
    dispatch(selectNeed(need.id));
  };

  const setSelectedRequirement = (reqId: string) => () => {
    dispatch(selectRequirement(reqId));
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

                <Link
                  to={`/workbench/${selectedProject.id}/requirement/${element.id}/edit`}
                  onClick={setSelectedRequirement(element.id)}
                >
                  <Button className={`${styles.newbutton} ml-4`}>Edit</Button>
                </Link>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        );
      });
      return (
        <>
          <h5>Requirements</h5>
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

  const newRequirement = (show: boolean) => {
    if (show) {
      return (
        <Card className="mb-4">
          <Card.Body>
            <Form
              onSubmit={handleSubmit(addRequirementElement)}
              autoComplete="off"
              noValidate
              validated={validated}
            >
              <Form.Group as={Row}>
                <Form.Label column sm="2">
                  Title
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    name="title"
                    ref={register}
                    isInvalid={!!errors.title}
                  />
                  {errors.title && (
                    <Form.Control.Feedback type="invalid">
                      {errors.title?.message}
                    </Form.Control.Feedback>
                  )}
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="2">
                  Requirement Text
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    name="description"
                    ref={register}
                    isInvalid={!!errors.description}
                  />
                  {errors.description && (
                    <Form.Control.Feedback type="invalid">
                      {errors.description.message}
                    </Form.Control.Feedback>
                  )}
                </Col>
              </Form.Group>
              <Row>
                <Button className="mt-2  ml-3" type="submit">
                  Save
                </Button>
                <Button
                  className="mt-2 ml-3 btn-warning"
                  onClick={() => setShowEditor(false)}
                >
                  Cancel
                </Button>
              </Row>
            </Form>
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
        <h4>{need.title}</h4>
        <h5>{need.description}</h5>
        <Button
          onClick={() => {
            setShowEditor(true);
          }}
          className="mb-4"
        >
          New Requirement
        </Button>
        {showAlert && (
          <SuccessAlert toggleShow={setShowAlert} type="requirement" />
        )}
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
            {element.title}
          </Nav.Link>
        </Nav.Item>
      );
    });
  };

  return (
    <Row>
      <Col className="col-2 p-0">
        <Nav className={`sidebar col-md-12 flex-column p-0 ${styles.sidebar}`}>
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
