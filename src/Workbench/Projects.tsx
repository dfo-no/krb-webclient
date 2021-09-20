import { joiResolver } from '@hookform/resolvers/joi';
import React, { ReactElement, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { BsTrashFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import ErrorSummary from '../Form/ErrorSummary';
import InputRow from '../Form/InputRow';
import { Bank } from '../models/Bank';
import ModelType from '../models/ModelType';
import { PostProjectSchema } from '../models/Project';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  deleteProjectThunk,
  postProjectThunk,
  selectProject
} from '../store/reducers/project-reducer';
import SuccessAlert from './SuccessAlert';

function Projects(): ReactElement {
  const dispatch = useAppDispatch();
  const { list } = useAppSelector((state) => state.project);
  const [showNewProjectForm, setShowNewProjectForm] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [validated] = useState(false);
  const { t } = useTranslation();

  const defaultValues: Bank = {
    id: '',
    title: '',
    description: '',
    needs: [],
    codelist: [],
    products: [],
    publications: [],
    tags: [],
    version: 0,
    publishedDate: '',
    type: ModelType.bank
  };

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors }
  } = useForm<Bank>({
    resolver: joiResolver(PostProjectSchema),
    defaultValues
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [showAlert]);

  const onSubmit = (post: Bank) => {
    dispatch(postProjectThunk(post)).then(() => {
      reset();
      setShowNewProjectForm(false);
      setShowAlert(true);
    });
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
      {showAlert && <SuccessAlert toggleShow={setShowAlert} type="project" />}
      {projectEditor()}
      {renderProjects(list)}
    </>
  );
}

export default Projects;
