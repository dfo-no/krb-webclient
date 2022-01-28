import { joiResolver } from '@hookform/resolvers/joi';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import { get } from 'lodash';
import React, { useContext, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { FieldError, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import ControlledTextInput from '../../../Form/ControlledTextInput';
import ErrorSummary from '../../../Form/ErrorSummary';
import { IAlert } from '../../../models/IAlert';
import { AccordionContext } from '../../../NestableHierarchy/AccordionContext';
import {
  IRequirement,
  PutRequirementSchema
} from '../../../Nexus/entities/IRequirement';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { addAlert } from '../../../store/reducers/alert-reducer';
import {
  deleteRequirement,
  editRequirementInNeed,
  putSelectedProjectThunk
} from '../../../store/reducers/project-reducer';
import { selectRequirement } from '../../../store/reducers/selectedRequirement-reducer';

interface IProps {
  element: IRequirement;
}

export default function EditRequirementForm({
  element
}: IProps): React.ReactElement {
  const { project } = useAppSelector((state) => state.project);
  const { needId } = useAppSelector((state) => state.selectNeed);
  const dispatch = useAppDispatch();
  const { onOpenClose } = useContext(AccordionContext);
  const [validated] = useState(false);
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<IRequirement>({
    resolver: joiResolver(PutRequirementSchema),
    defaultValues: element
  });

  const need = needId !== null ? needId : '';

  const onSubmit = (post: IRequirement) => {
    dispatch(
      editRequirementInNeed({
        needId: need,
        requirement: post
      })
    );
    const alert: IAlert = {
      id: uuidv4(),
      style: 'success',
      text: 'successfully updated requirement'
    };
    dispatch(putSelectedProjectThunk('dummy')).then(() => {
      dispatch(addAlert({ alert }));
      onOpenClose('');
    });
  };

  const removeRequirement = (req: IRequirement) => {
    dispatch(
      deleteRequirement({
        needId: need,
        requirement: req
      })
    );
    dispatch(putSelectedProjectThunk('dummy'));
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
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
        control={control}
        error={get(errors, `description`) as FieldError}
        name="description"
        label="Requirement text"
      />
      <Button variant="primary" type="submit">
        {t('save')}
      </Button>
      <Link
        to={`/workbench/${project.id}/need/${needId}/requirement/${element.id}/edit`}
        onClick={() => dispatch(selectRequirement(element.id))}
      >
        <Button className="ml-4 mt-2 ">{t('edit')}</Button>
      </Link>
      <Button variant="warning" onClick={() => removeRequirement(element)}>
        {t('delete')} <DeleteIcon />
      </Button>
      <ErrorSummary errors={errors} />
    </Form>
  );
}
