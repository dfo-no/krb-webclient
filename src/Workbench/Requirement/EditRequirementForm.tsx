import { joiResolver } from '@hookform/resolvers/joi';
import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { BsTrashFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import ErrorSummary from '../../Form/ErrorSummary';
import InputRow from '../../Form/InputRow';
import { IAlert } from '../../models/IAlert';
import { IRequirement, PutRequirementSchema } from '../../models/IRequirement';
import { AccordionContext } from '../../NestableHierarchy/AccordionContext';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addAlert } from '../../store/reducers/alert-reducer';
import {
  deleteRequirement,
  editRequirementInNeed,
  putSelectedProjectThunk
} from '../../store/reducers/project-reducer';
import { selectRequirement } from '../../store/reducers/selectedRequirement-reducer';

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
