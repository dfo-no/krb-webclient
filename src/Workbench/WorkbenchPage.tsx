import React, { ReactElement, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import { useDispatch, useSelector } from 'react-redux';
import { BsTrashFill } from 'react-icons/bs';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { RootState } from '../store/store';
import { Bank } from '../models/Bank';
import {
  deleteProjectThunk,
  getProjectsThunk,
  postProjectThunk
} from '../store/reducers/project-reducer';
import { selectProject } from '../store/reducers/selectedProject-reducer';
import SuccessAlert from './SuccessAlert';
import MODELTYPE from '../models/ModelType';
import InputRow from '../Form/InputRow';
import ErrorSummary from '../Form/ErrorSummary';

type FormValues = {
  title: string;
  description: string;
};

function WorkbenchPage(): ReactElement {
  const dispatch = useDispatch();
  const { list } = useSelector((state: RootState) => state.project);
  const [showEditor, setShowEditor] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [validated] = useState(false);

  const projectSchema = Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().allow(null, '').required()
  });

  const defaultValues = {
    title: '',
    description: ''
  };

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: joiResolver(projectSchema),
    defaultValues
  });

  const handleShowEditor = () => {
    setShowEditor(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [showAlert]);
  const onSubmit = (post: FormValues) => {
    const project: Bank = {
      id: uuidv4(),
      title: post.title,
      description: post.description,
      needs: [],
      products: [],
      codelist: [],
      version: 0,
      type: MODELTYPE.bank,
      publications: []
    };
    dispatch(postProjectThunk(project));
    reset();
    setShowEditor(false);
    setShowAlert(true);
  };

  function onSelect(project: Bank) {
    dispatch(selectProject(project.id));
  }

  async function onDelete(project: Bank) {
    // TODO: fix this logic
    // must await here otherwise the 'getProjectsThunk will fetch before delete is complete.
    await dispatch(deleteProjectThunk(project));
    dispatch(getProjectsThunk());
  }

  const renderProjects = (projectList: Bank[]) => {
    projectList
      .slice()
      .sort((a, b) => (a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1));
    const projects = projectList.map((element: Bank) => {
      return (
        <ListGroup.Item key={element.id} onClick={() => onSelect(element)}>
          {/* TODO: fix styling  */}
          <Row className="d-flex justify-content-between ml-1">
            <Link
              to={`/workbench/${element.id}`}
              onClick={() => onSelect(element)}
            >
              <h5>{element.title}</h5>
            </Link>
            <Button
              className="mr-2"
              variant="warning"
              onClick={() => onDelete(element)}
            >
              <BsTrashFill />
            </Button>
          </Row>
          <Row className="ml-1">
            <p>{element.description}</p>
          </Row>
        </ListGroup.Item>
      );
    });
    return <ListGroup className=" mt-5">{projects}</ListGroup>;
  };

  function projectEditor(show: boolean): JSX.Element {
    if (show) {
      return (
        <ListGroup className="mt-3">
          <ListGroup.Item>
            <Form
              onSubmit={handleSubmit(onSubmit)}
              autoComplete="off"
              noValidate
              validated={validated}
            >
              <InputRow
                control={control}
                name="title"
                errors={errors}
                label="Title"
              />
              <InputRow
                control={control}
                name="description"
                errors={errors}
                label="Description"
              />
              <Button className="mt-2" type="submit">
                Save
              </Button>
              <ErrorSummary errors={errors} />
            </Form>
          </ListGroup.Item>
        </ListGroup>
      );
    }
    return <></>;
  }

  return (
    <>
      <h3 className="mt-3 ">Projects </h3>
      <Button onClick={handleShowEditor} variant="primary">
        New Project
      </Button>
      {showAlert && <SuccessAlert toggleShow={setShowAlert} type="project" />}
      {projectEditor(showEditor)}
      {renderProjects(list)}
    </>
  );
}

export default WorkbenchPage;
