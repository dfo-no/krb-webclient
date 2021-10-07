import { joiResolver } from '@hookform/resolvers/joi';
import React, { ReactElement, useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { BsTrashFill } from 'react-icons/bs';
import { v4 as uuidv4 } from 'uuid';
import AlertModal from '../../common/AlertModal';
import Utils from '../../common/Utils';
import ErrorSummary from '../../Form/ErrorSummary';
import InputRow from '../../Form/InputRow';
import { Alert } from '../../models/Alert';
import { Need, PutNeedSchema } from '../../models/Need';
import { Nestable } from '../../models/Nestable';
import { Parentable } from '../../models/Parentable';
import { AccordionContext } from '../../NestableHierarchy/AccordionContext';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addAlert } from '../../store/reducers/alert-reducer';
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
    reset,
    formState: { errors }
  } = useForm<Parentable<Need>>({
    defaultValues: element,
    resolver: joiResolver(PutNeedSchema)
  });

  useEffect(() => {
    if (element) {
      reset(JSON.parse(JSON.stringify(element)));
    }
  }, [element, reset]);

  const [modalShow, setModalShow] = useState(false);

  const onSubmit = (post: Nestable<Need>) => {
    const toParentable = { ...post };
    if (toParentable.children) {
      delete toParentable.children;
    }
    const alert: Alert = {
      id: uuidv4(),
      style: 'success',
      text: 'Successfully edited need'
    };
    dispatch(editNeed(toParentable as Parentable<Need>));
    dispatch(putSelectedProjectThunk('dummy')).then(() => {
      dispatch(addAlert({ alert }));
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
      <p>{element.title}</p>
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
