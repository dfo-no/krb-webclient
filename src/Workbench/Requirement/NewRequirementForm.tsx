import { joiResolver } from '@hookform/resolvers/joi';
import { get } from 'lodash';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { FieldError, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import ControlledTextInput from '../../Form/ControlledTextInput';
import ErrorSummary from '../../Form/ErrorSummary';
import { IAlert } from '../../models/IAlert';
import ModelType from '../../models/ModelType';
import RequirementType from '../../models/RequirementType';
import {
  IRequirement,
  PostRequirementSchema
} from '../../Nexus/entities/IRequirement';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addAlert } from '../../store/reducers/alert-reducer';
import {
  addRequirementToNeed,
  putSelectedProjectThunk
} from '../../store/reducers/project-reducer';

function NewRequirementForm(): React.ReactElement {
  const dispatch = useAppDispatch();
  const { project } = useAppSelector((state) => state.project);
  const [validated] = useState(false);
  const { t } = useTranslation();

  const { needId } = useAppSelector((state) => state.selectNeed);

  const [show, setShow] = useState(false);

  const need = needId !== null ? needId : '';

  const defaultValues: IRequirement = {
    id: '',
    title: '',
    description: '',
    needId: need,
    tags: [],
    variants: [],
    type: ModelType.requirement,
    requirement_Type: RequirementType.requirement,
    sourceOriginal: project.id,
    sourceRel: null
  };

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm<IRequirement>({
    resolver: joiResolver(PostRequirementSchema),
    defaultValues
  });

  const onNewRequirementSubmit = (post: IRequirement) => {
    const requirement = { ...post };
    requirement.id = uuidv4();
    dispatch(
      addRequirementToNeed({
        needId: need,
        requirement
      })
    );
    const alert: IAlert = {
      id: uuidv4(),
      style: 'success',
      text: 'Successfully created new requirement'
    };
    dispatch(putSelectedProjectThunk('dummy')).then(() => {
      dispatch(addAlert({ alert }));
      setShow(false);
      reset();
    });
  };

  return (
    <>
      <Button
        variant="primary"
        onClick={() => {
          setShow(true);
          setValue('requirement_Type', RequirementType.requirement);
        }}
      >
        New Requirement
      </Button>
      <Button
        onClick={() => {
          setValue('requirement_Type', RequirementType.info);
          setShow(true);
        }}
      >
        New Info field
      </Button>
      {show && (
        <Card className="mb-4">
          <Card.Body>
            <Form
              onSubmit={handleSubmit(onNewRequirementSubmit)}
              autoComplete="off"
              noValidate
              validated={validated}
            >
              <ControlledTextInput
                name="title"
                control={control}
                error={get(errors, `title`) as FieldError}
                label={t('Title')}
              />
              <ControlledTextInput
                name="description"
                control={control}
                error={get(errors, `description`) as FieldError}
                label={t('Description')}
              />
              <Button variant="primary" type="submit">
                {t('save')}
              </Button>
              <Button variant="warning" onClick={() => setShow(false)}>
                {t('cancel')}
              </Button>
              <ErrorSummary errors={errors} />
            </Form>
          </Card.Body>
        </Card>
      )}
    </>
  );
}

export default NewRequirementForm;
