import { joiResolver } from '@hookform/resolvers/joi';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import { get } from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { FieldError, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import AlertModal from '../../../common/AlertModal';
import Utils from '../../../common/Utils';
import ControlledTextInput from '../../../Form/ControlledTextInput';
import ErrorSummary from '../../../Form/ErrorSummary';
import { IAlert } from '../../../models/IAlert';
import { Nestable } from '../../../models/Nestable';
import { Parentable } from '../../../models/Parentable';
import { AccordionContext } from '../../../components/DFOAccordion/AccordionContext';
import { INeed, PutNeedSchema } from '../../../Nexus/entities/INeed';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { addAlert } from '../../../store/reducers/alert-reducer';
import {
  deleteNeed,
  editNeed,
  putSelectedProjectThunk
} from '../../../store/reducers/project-reducer';

interface IProps {
  element: Parentable<INeed>;
}

/**
 * @deprecated use Admin/Create/EditNeedForm instead
 */
function EditNeedForm({ element }: IProps): React.ReactElement {
  const { project } = useAppSelector((state) => state.project);
  const dispatch = useAppDispatch();
  const { onOpenClose } = useContext(AccordionContext);
  const [validated] = useState(false);
  const { t } = useTranslation();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<Parentable<INeed>>({
    defaultValues: element,
    resolver: joiResolver(PutNeedSchema)
  });

  useEffect(() => {
    if (element) {
      reset(JSON.parse(JSON.stringify(element)));
    }
  }, [element, reset]);

  const [modalShow, setModalShow] = useState(false);

  const onEditNeedSubmit = (post: Nestable<INeed>) => {
    const postNeed = { ...post };
    if (postNeed.children) {
      delete postNeed.children;
    }
    if (postNeed.level) {
      delete postNeed.level;
    }
    dispatch(editNeed(postNeed as Parentable<INeed>));
    dispatch(putSelectedProjectThunk('dummy')).then(() => {
      const alert: IAlert = {
        id: uuidv4(),
        style: 'success',
        text: 'Successfully edited need'
      };
      dispatch(addAlert({ alert }));
      onOpenClose('');
    });
  };

  const checkDeleteNeed = (need: INeed) => {
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
      onSubmit={handleSubmit(onEditNeedSubmit)}
      autoComplete="off"
      noValidate
      validated={validated}
    >
      <ControlledTextInput
        control={control}
        name="title"
        error={get(errors, `title`) as FieldError}
        label={t('Title')}
      />

      <ControlledTextInput
        control={control}
        name="description"
        error={get(errors, `description`) as FieldError}
        label={t('Description')}
      />

      <Button variant="primary" type="submit">
        {t('save')}
      </Button>
      <Button variant="warning" onClick={() => onOpenClose('')}>
        {t('cancel')}
      </Button>
      <Button variant="warning" onClick={() => checkDeleteNeed(element)}>
        <DeleteIcon />
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
