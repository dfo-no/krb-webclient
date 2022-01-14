import { joiResolver } from '@hookform/resolvers/joi';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { BsTrashFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import ControlledTextInput from '../Form/ControlledTextInput';
import ErrorSummary from '../Form/ErrorSummary';
import { IAlert } from '../models/IAlert';
import { PostProjectSchema } from '../models/Project';
import { IBank } from '../Nexus/entities/IBank';
import Nexus from '../Nexus/Nexus';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addAlert } from '../store/reducers/alert-reducer';
import {
  deleteProjectThunk,
  postProjectThunk,
  selectProject
} from '../store/reducers/project-reducer';

function Projects(): React.ReactElement {
  const dispatch = useAppDispatch();
  const { list } = useAppSelector((state) => state.project);
  const [showNewProjectForm, setShowNewProjectForm] = useState(false);
  const [validated] = useState(false);
  const { t } = useTranslation();
  const nexus = Nexus.getInstance();

  const defaultValues: IBank =
    nexus.projectService.generateDefaultProjectValues();

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors }
  } = useForm<Omit<IBank, 'needs'>>({
    resolver: joiResolver(PostProjectSchema),
    defaultValues
  });

  const onSubmit = (post: IBank) => {
    dispatch(postProjectThunk(post)).then(() => {
      reset();
      setShowNewProjectForm(false);
    });
    const alert: IAlert = {
      id: uuidv4(),
      style: 'success',
      text: 'Successfully updated product'
    };
    dispatch(addAlert({ alert }));
  };

  async function onDelete(project: IBank) {
    dispatch(deleteProjectThunk(project));
  }

  const renderProjects = (projectList: IBank[]) => {
    projectList
      .slice()
      .sort((a, b) => (a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1));
    const projects = projectList.map((element: IBank) => {
      return (
        <ListGroup.Item key={element.id}>
          {/* TODO: fix styling  */}
          <Row>
            <Col>
              <Link
                to={`/workbench/${element.id}`}
                onClick={() => dispatch(selectProject(element))}
              >
                <h5>{element.title}</h5>
              </Link>
            </Col>
            <Col sm={1} className="p-0">
              <Button variant="warning" onClick={() => onDelete(element)}>
                <BsTrashFill />
              </Button>
            </Col>
          </Row>
          <Row className="ml-1">
            <p>{element.description}</p>
          </Row>
        </ListGroup.Item>
      );
    });
    return <ListGroup className=" mt-5">{projects}</ListGroup>;
  };

  function projectEditor(): JSX.Element {
    if (showNewProjectForm) {
      return (
        <ListGroup className="mt-3">
          <ListGroup.Item>
            <Form
              onSubmit={handleSubmit(onSubmit)}
              autoComplete="off"
              noValidate
              validated={validated}
            >
              <ControlledTextInput
                control={control}
                name="title"
                error={errors.title}
                label={t('Title')}
              />
              <ControlledTextInput
                control={control}
                name="description"
                error={errors.description}
                label={t('Description')}
              />
              <Button variant="primary" type="submit">
                {t('save')}
              </Button>
              <Button
                variant="warning"
                onClick={() => setShowNewProjectForm(false)}
              >
                {t('cancel')}
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
      <h3 className="mt-3 ">{t('Projects')} </h3>
      <Button onClick={() => setShowNewProjectForm(true)} variant="primary">
        {t('new project')}
      </Button>
      {projectEditor()}
      {renderProjects(list)}
    </>
  );
}

export default Projects;
