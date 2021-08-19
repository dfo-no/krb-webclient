import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import React, { ReactElement, useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { BsTrashFill } from 'react-icons/bs';
import AlertModal from '../../common/AlertModal';
import Utils from '../../common/Utils';
import ErrorSummary from '../../Form/ErrorSummary';
import InputRow from '../../Form/InputRow';
import { Bank } from '../../models/Bank';
import { Need } from '../../models/Need';
import { AccordionContext } from '../../NestableHierarchy/AccordionContext';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  deleteNeed,
  editNeed,
  putProjectByIdThunk
} from '../../store/reducers/project-reducer';

type FormValues = {
  id: string;
  title: string;
  description: string;
};
interface IProps {
  element: Need;
}

const needSchema = Joi.object().keys({
  id: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().allow(null, '').required()
});

function EditNeedForm({ element }: IProps): ReactElement {
  const { id } = useAppSelector((state) => state.selectedProject);
  const { list } = useAppSelector((state) => state.project);
  const dispatch = useAppDispatch();
  const { onOpenClose } = useContext(AccordionContext);
  const [validated] = useState(false);
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      id: element.id,
      title: element.title,
      description: element.description
    },
    resolver: joiResolver(needSchema)
  });

  const [modalShow, setModalShow] = useState(false);
  if (!id) {
    return <p>No project selected</p>;
  }

  const project = Utils.ensure(list.find((bank: Bank) => bank.id === id));

  const onEditNeedSubmit = (post: FormValues) => {
    dispatch(
      editNeed({
        projectId: id,
        needId: post.id,
        title: post.title,
        description: post.description
      })
    );
    dispatch(putProjectByIdThunk(id));

    // Close accordion via useContext
    onOpenClose('');
  };

  const removeNeed = () => {
    if (
      element.requirements.length > 0 ||
      Utils.checkIfParent(project.needs, element.id)
    ) {
      setModalShow(true);
    } else {
      dispatch(deleteNeed({ projectId: id, needId: element.id }));
      dispatch(putProjectByIdThunk(id));
    }
    onOpenClose('');
  };

  return (
    <Form
      onSubmit={handleSubmit((e) => onEditNeedSubmit(e))}
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

      <Form.Control type="hidden" {...register('id')} />
      <Button className="mt-2" type="submit">
        {t('save')}
      </Button>
      <Button className="mt-2  ml-3" variant="warning" onClick={removeNeed}>
        {t('delete')} <BsTrashFill />
      </Button>
      <ErrorSummary errors={errors} />
      <AlertModal
        modalShow={modalShow}
        setModalShow={setModalShow}
        title="Attention"
        text="This product has one or more connected requirements or has subneeds, please remove them to be able to delete"
      />
    </Form>
  );
}

export default EditNeedForm;
