import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import React, { ReactElement, useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { BsTrashFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ErrorSummary from '../../Form/ErrorSummary';
import InputRow from '../../Form/InputRow';
import { Need } from '../../models/Need';
import { Requirement } from '../../models/Requirement';
import { AccordionContext } from '../../NestableHierarchy/AccordionContext';
import {
  deleteRequirement,
  editRequirementInNeed,
  putProjectThunk
} from '../../store/reducers/project-reducer';
import { selectRequirement } from '../../store/reducers/selectedRequirement-reducer';
import { RootState } from '../../store/store';

interface IProps {
  element: Requirement;
  index: number;
  need: Need;
  needList: Need[];
}

type FormInput = {
  title: string;
  description: string;
};

const reqSchema = Joi.object().keys({
  title: Joi.string().required(),
  description: Joi.string().allow(null, '').required()
});

export default function EditRequirementForm({
  element,
  index,
  need,
  needList
}: IProps): ReactElement {
  const { id } = useSelector((state: RootState) => state.selectedProject);
  const dispatch = useDispatch();
  const { onOpenClose } = useContext(AccordionContext);
  const [validated] = useState(false);
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormInput>({
    resolver: joiResolver(reqSchema),
    defaultValues: {
      title: element.title,
      description: element.description
    }
  });
  if (!id) {
    return <p>No project selected</p>;
  }

  const edit = (post: FormInput) => {
    const reqList = [...need.requirements];
    const requirement: Requirement = {
      ...element
    };
    requirement.title = post.title;
    requirement.description = post.description;
    reqList[index] = requirement;
    dispatch(
      editRequirementInNeed({
        projectId: id,
        oldNeedId: need.id,
        needId: need.id,
        requirement,
        requirementIndex: index
      })
    );
    dispatch(putProjectThunk(id));
    onOpenClose('');
  };

  const removeRequirement = () => {
    const needIndex = needList.findIndex(
      (needElement) => needElement.id === need.id
    );
    dispatch(
      deleteRequirement({
        id,
        needIndex,
        requirementIndex: index
      })
    );
    dispatch(putProjectThunk(id));
  };

  return (
    <Form
      onSubmit={handleSubmit(edit)}
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
      <Row>
        <Button className="mt-2  ml-3" type="submit">
          {t('save')}
        </Button>
        <Link
          to={`/workbench/${id}/need/${need.id}/requirement/${element.id}/edit`}
          onClick={() => dispatch(selectRequirement(element.id))}
        >
          <Button className="ml-4 mt-2 ">{t('edit')}</Button>
        </Link>
        <Button
          className="mt-2  ml-3"
          variant="warning"
          onClick={removeRequirement}
        >
          {t('delete')} <BsTrashFill />
        </Button>
      </Row>
      <ErrorSummary errors={errors} />
    </Form>
  );
}
