import { joiResolver } from '@hookform/resolvers/joi';
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
import { Need, PutNeedSchema } from '../../models/Need';
import { Nestable } from '../../models/Nestable';
import { AccordionContext } from '../../NestableHierarchy/AccordionContext';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  deleteNeed,
  editNeed,
  putSelectedProjectThunk
} from '../../store/reducers/project-reducer';

interface IProps {
  element: Need;
}

function EditNeedForm({ element }: IProps): ReactElement {
  const { project } = useAppSelector((state) => state.project);
  const dispatch = useAppDispatch();
  const { onOpenClose } = useContext(AccordionContext);
  const [validated] = useState(false);
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    defaultValues: element,
    resolver: joiResolver(PutNeedSchema)
  });

  const [modalShow, setModalShow] = useState(false);

  const onSubmit = (post: Need) => {
    const parentable = { ...post } as Nestable<Need>;
    if (parentable.children) {
      delete parentable.children;
    }
    dispatch(editNeed(parentable));
    dispatch(putSelectedProjectThunk('dummy')).then(() => {
      onOpenClose('');
    });
  };

  const checkDeleteNeed = (need: Need) => {
    if (
      element.requirements.length > 0 ||
      Utils.checkIfParent(project.needs, need.id)
    ) {
      setModalShow(true);
    } else {
      dispatch(deleteNeed(need));
      dispatch(putSelectedProjectThunk('dummy')).then(() => {
        onOpenClose('');
      });
    }
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
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
      <Button
        className="mt-2 ml-1"
        variant="warning"
        onClick={() => onOpenClose('')}
      >
        {t('cancel')}
      </Button>
      <Button
        className="mt-2  ml-3"
        variant="danger"
        onClick={() => checkDeleteNeed(element)}
      >
        <BsTrashFill />
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
