import React, { ReactElement, useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { BsTrashFill } from 'react-icons/bs';

import { useTranslation } from 'react-i18next';
import { Need } from '../../models/Need';
import {
  deleteNeed,
  editNeed,
  putProjectThunk
} from '../../store/reducers/project-reducer';
import { AccordionContext } from '../../NestableHierarchy/AccordionContext';
import { RootState } from '../../store/store';
import Utils from '../../common/Utils';
import { Bank } from '../../models/Bank';
import InputRow from '../../Form/InputRow';
import ErrorSummary from '../../Form/ErrorSummary';
import AlertModal from '../../common/AlertModal';

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
  const { id } = useSelector((state: RootState) => state.selectedProject);
  const { list } = useSelector((state: RootState) => state.project);
  const dispatch = useDispatch();
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
    dispatch(putProjectThunk(id));

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
      dispatch(putProjectThunk(id));
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
      <InputRow control={control} name="title" errors={errors} label="Title" />

      <InputRow
        control={control}
        name="description"
        errors={errors}
        label="Description"
      />

      <Form.Control type="hidden" {...register('id')} />
      <Button className="mt-2" type="submit">
        {t('save')}
      </Button>
      <Button className="mt-2  ml-3" variant="warning" onClick={removeNeed}>
        Delete <BsTrashFill />
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
