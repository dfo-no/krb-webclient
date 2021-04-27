/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ReactElement, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import formatISO from 'date-fns/formatISO';
import { useFieldArray, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

import { BsPencil } from 'react-icons/bs';
import { RootState } from '../../store/store';
import { Publication, PublicationSchema } from '../../models/Publication';
import {
  putProjectThunk,
  addPublication,
  incrementProjectVersion
} from '../../store/reducers/project-reducer';
import { postBankThunk } from '../../store/reducers/bank-reducer';
import Utils from '../../common/Utils';
import EditProjectForm from './EditProjectForm';
import SuccessAlert from '../SuccessAlert';
import { Bank } from '../../models/Bank';
import PublicationList from './PublicationList';

function ProjectPage(): ReactElement {
  const dispatch = useDispatch();
  const { id } = useSelector((state: RootState) => state.selectedProject);

  const { list } = useSelector((state: RootState) => state.project);
  const [showAlert, setShowAlert] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [validated] = useState(false);

  const project = Utils.ensure(list.find((element) => element.id === id));

  const projectSchema = Joi.object().keys({
    id: Joi.string().required(),
    publications: Joi.array()
      .items(PublicationSchema)
      .unique('id')
      .messages({
        'array.unique': 'Id must be unique'
      })
      .unique('version')
      .messages({
        'array.unique': 'Version must be unique'
      })
      .unique('date')
  });

  // TODO: fix any useFieldArray typing
  const defaultValues = {
    id: project.id,
    publications: project.publications
  } as any;

  const {
    control,
    register,
    handleSubmit,
    setValue,
    getValues,
    formState
  } = useForm({
    resolver: joiResolver(projectSchema),
    defaultValues
  });

  const { remove } = useFieldArray({
    keyName: 'guid',
    control,
    name: 'publication'
  });

  const publishProject = async (e: any) => {
    // Publication is always first in array because we prepend
    const publication: Publication = e.publications[0];

    const projectToBePublished: Bank = { ...project };

    /* Date from form is may have been stale (i.e waiting before clicking), update to now */
    const convertedDate = formatISO(new Date());
    projectToBePublished.publishedDate = convertedDate;
    projectToBePublished.id = '';
    delete projectToBePublished.publications;
    projectToBePublished.version = publication.version;

    // TODO: fix this any and figure out why we must use await
    const result: any = await dispatch(postBankThunk(projectToBePublished));

    // update root project with new values
    publication.bankId = result.payload.id;
    publication.date = convertedDate;

    dispatch(addPublication({ projectId: project.id, publication }));
    dispatch(incrementProjectVersion(project.id));
    dispatch(putProjectThunk(project.id));
    setShowAlert(true);
  };

  function editProjectForm(edit: boolean) {
    if (edit) {
      return <EditProjectForm toggleShow={setEditMode} project={project} />;
    }
    return <></>;
  }

  return (
    <>
      <Row className="ml-1 mt-3">
        <h3> {project.title} </h3>
        <Button className="ml-3" onClick={() => setEditMode(true)}>
          <BsPencil />
        </Button>
      </Row>
      <h6 className="ml-1 mb-3">{project.description}</h6>
      {editProjectForm(editMode)}
      <h4>Publications</h4>
      {showAlert && (
        <SuccessAlert toggleShow={setShowAlert} type="publication" />
      )}
      <Form
        onSubmit={handleSubmit((e) => publishProject(e))}
        noValidate
        validated={validated}
      >
        <Form.Control readOnly type="hidden" as="input" {...register('id')} />
        <PublicationList
          {...{
            control,
            register,
            setValue,
            getValues,
            formState,
            defaultValues
          }}
          {...{
            remove
          }}
        />
      </Form>
    </>
  );
}

export default ProjectPage;
