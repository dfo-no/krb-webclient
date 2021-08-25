import { joiResolver } from '@hookform/resolvers/joi';
import React, { ReactElement, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { BsPencil } from 'react-icons/bs';
import ErrorSummary from '../../Form/ErrorSummary';
import { Bank } from '../../models/Bank';
import { PutProjectSchema } from '../../models/Project';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { postBankThunk } from '../../store/reducers/bank-reducer';
import {
  deleteProjectByIdThunk,
  putProjectByIdThunk,
  removePublicationFromProject,
  updateCurrentProjectPublication
} from '../../store/reducers/project-reducer';
import SuccessAlert from '../SuccessAlert';
import SuccessDeleteAlert from '../SuccessDeleteAlert';
import EditProjectForm from './EditProjectForm';
import PublicationsFieldArray, {
  ProjectPublicationForm
} from './PublicationsFieldArray';

function ProjectPage(): ReactElement {
  const { project } = useAppSelector((state) => state.project);
  const dispatch = useAppDispatch();

  const [showAlert, setShowAlert] = useState(false);
  const [showDeleteAlert, setDeleteAlert] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [validated] = useState(false);

  const { control, register, handleSubmit, reset, formState } =
    useForm<ProjectPublicationForm>({
      criteriaMode: 'all',
      resolver: joiResolver(PutProjectSchema),
      defaultValues: project
    });

  useEffect(() => {
    if (project) {
      reset(JSON.parse(JSON.stringify(project)));
    }
  }, [project, reset]);

  const { t } = useTranslation();

  const removePublication = async (publicationId: string) => {
    dispatch(
      removePublicationFromProject({ projectId: project.id, publicationId })
    );
    dispatch(deleteProjectByIdThunk(publicationId)).then(() => {
      dispatch(putProjectByIdThunk(project.id)).then(() => {
        setDeleteAlert(true);
      });
    });
  };

  const { errors } = formState;

  const generateBankFromProject = (item: Bank) => {
    // Shallow clone, deep not needed for now
    const newBank: Bank = { ...project };
    newBank.id = '';
    newBank.publishedDate = new Date().toJSON();
    newBank.publications = [];
    newBank.version = item.publications[0].version;
    return newBank;
  };

  const saveNewPublication = async (post: Bank) => {
    const newBank = generateBankFromProject(post);

    dispatch(postBankThunk(newBank))
      .unwrap()
      .then(async (result: Bank) => {
        dispatch(
          updateCurrentProjectPublication({
            projectId: project.id,
            publishedBank: result
          })
        );
        dispatch(putProjectByIdThunk(project.id)).then(() => {
          setShowAlert(true);
        });
      });
  };

  function editProjectForm(edit: boolean) {
    if (edit) {
      return <EditProjectForm toggleShow={setEditMode} project={project} />;
    }
    return <></>;
  }

  return (
    <div>
      <Row className="ml-1 mt-3">
        <h3> {project.title} </h3>
        <Button className="ml-3" onClick={() => setEditMode(true)}>
          <BsPencil />
        </Button>
      </Row>
      <h6 className="ml-1 mb-3">{project.description}</h6>
      {editProjectForm(editMode)}
      <h4>{t('publications')}</h4>
      {showDeleteAlert && (
        <SuccessDeleteAlert
          toggleShow={setDeleteAlert}
          text="Publication was deleted"
        />
      )}
      {showAlert && (
        <SuccessAlert toggleShow={setShowAlert} type="publication" />
      )}
      <Form
        onSubmit={handleSubmit(saveNewPublication)}
        noValidate
        validated={validated}
      >
        <PublicationsFieldArray
          control={control}
          register={register}
          formState={formState}
          projectId={project.id}
          removePublication={removePublication}
        />
      </Form>
      <ErrorSummary errors={errors} />
    </div>
  );
}

export default ProjectPage;
