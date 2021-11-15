import { joiResolver } from '@hookform/resolvers/joi';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { BsTrashFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import ErrorSummary from '../Form/ErrorSummary';
import InputRow from '../Form/InputRow';
import { Bank } from '../models/Bank';
import { IAlert } from '../models/IAlert';
import { PostProjectSchema } from '../models/Project';
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

  const defaultValues: Bank =
    nexus.projectService.generateDefaultProjectValues();

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors }
  } = useForm<Bank>({
    resolver: joiResolver(PostProjectSchema),
    defaultValues
  });

  const onSubmit = (post: Bank) => {
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

  async function onDelete(project: Bank) {
    dispatch(deleteProjectThunk(project));
  }

  const renderProjects = (projectList: Bank[]) => {
    projectList
      .slice()
      .sort((a, b) => (a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1));
    const projects = projectList.map((element: Bank) => {
      return (
        <ListGroup.Item key={element.id}>
          {/* TODO: fix styling  */}
          <Row className="d-flex justify-content-between ml-1">
            <Col>
              <Link
                to={`/workbench/${element.id}`}
                onClick={() => dispatch(selectProject(element))}
              >
                <h5>{element.title}</h5>
              </Link>
            </Col>
            <Col sm={1} className="p-0">
              <Button
                className="mr-2"
                variant="danger"
                onClick={() => onDelete(element)}
              >
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
              <InputRow
                control={control}
                name="title"
                errors={errors}
                label={t('Title')}
              />
              <InputRow
                control={control}
                name="description"
                errors={errors}
                label={t('Description')}
              />
              <Button className="mt-2" type="submit">
                {t('save')}
              </Button>
              <Button
                className="mt-2 ml-3 btn-warning"
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
