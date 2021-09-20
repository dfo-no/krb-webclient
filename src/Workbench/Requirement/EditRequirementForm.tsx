import { joiResolver } from '@hookform/resolvers/joi';
import React, { ReactElement, useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { BsTrashFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import ErrorSummary from '../../Form/ErrorSummary';
import InputRow from '../../Form/InputRow';
import { PutRequirementSchema, Requirement } from '../../models/Requirement';
import { AccordionContext } from '../../NestableHierarchy/AccordionContext';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  deleteRequirement,
  editRequirementInNeed,
  putSelectedProjectThunk
} from '../../store/reducers/project-reducer';
import { selectRequirement } from '../../store/reducers/selectedRequirement-reducer';

interface IProps {
  element: Requirement;
}

export default function EditRequirementForm({ element }: IProps): ReactElement {
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
  } = useForm<Requirement>({
    resolver: joiResolver(PutRequirementSchema),
    defaultValues: element
  });

  const need = needId !== null ? needId : '';

  const onSubmit = (post: Requirement) => {
    dispatch(
      editRequirementInNeed({
        needId: need,
        requirement: post
      })
    );
    dispatch(putSelectedProjectThunk('dummy')).then(() => {
      onOpenClose('');
    });
  };

  const removeRequirement = (req: Requirement) => {
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
      <InputRow
        name="title"
        control={control}
        errors={errors}
        label={t('Title')}
      />

      <InputRow
        control={control}
        errors={errors}
        name="description"
        label="Requirement text"
      />
      <Button className="mt-2  ml-3" type="submit">
        {t('save')}
      </Button>
      <Link
        to={`/workbench/${project.id}/need/${needId}/requirement/${element.id}/edit`}
        onClick={() => dispatch(selectRequirement(element.id))}
      >
        <Button className="ml-4 mt-2 ">{t('edit')}</Button>
      </Link>
      <Button
        className="mt-2  ml-3"
        variant="danger"
        onClick={() => removeRequirement(element)}
      >
        {t('delete')} <BsTrashFill />
      </Button>
      <ErrorSummary errors={errors} />
    </Form>
  );
}
