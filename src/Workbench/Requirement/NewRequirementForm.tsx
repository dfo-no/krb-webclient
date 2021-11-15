import { joiResolver } from '@hookform/resolvers/joi';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import ErrorSummary from '../../Form/ErrorSummary';
import InputRow from '../../Form/InputRow';
import { IAlert } from '../../models/IAlert';
import ModelType from '../../models/ModelType';
import { PostRequirementSchema, Requirement } from '../../models/Requirement';
import RequirementType from '../../models/RequirementType';
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

  const defaultValues: Requirement = {
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
  } = useForm<Requirement>({
    resolver: joiResolver(PostRequirementSchema),
    defaultValues
  });

  const onNewRequirementSubmit = (post: Requirement) => {
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
        onClick={() => {
          setShow(true);
          setValue('requirement_Type', RequirementType.requirement);
        }}
        className="mb-4 mr-3"
      >
        New Requirement
      </Button>
      <Button
        onClick={() => {
          setValue('requirement_Type', RequirementType.info);
          setShow(true);
        }}
        className="mb-4 mr-3"
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
              <InputRow
                name="title"
                control={control}
                label={t('Title')}
                errors={errors}
              />
              <InputRow
                name="description"
                control={control}
                label={t('Description')}
                errors={errors}
              />
              <Button className="mt-2  ml-3" type="submit">
                {t('save')}
              </Button>
              <Button
                className="mt-2 ml-3 btn-warning"
                onClick={() => setShow(false)}
              >
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
