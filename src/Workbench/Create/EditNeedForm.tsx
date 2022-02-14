import { joiResolver } from '@hookform/resolvers/joi';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import AlertModal from '../../common/AlertModal';
import Utils from '../../common/Utils';
import TextCtrl from '../../FormProvider/TextCtrl';
import { IAlert } from '../../models/IAlert';
import { Nestable } from '../../models/Nestable';
import { Parentable } from '../../models/Parentable';
import { INeed, PutNeedSchema } from '../../Nexus/entities/INeed';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addAlert } from '../../store/reducers/alert-reducer';
import {
  deleteNeed,
  editNeed,
  putSelectedProjectThunk
} from '../../store/reducers/project-reducer';

interface IProps {
  element: INeed;
  handleClose: () => void;
}

function EditNeedForm({ element, handleClose }: IProps): React.ReactElement {
  const dispatch = useAppDispatch();
  // const [validated] = useState(false);
  // const { project } = useAppSelector((state) => state.project);

  const { t } = useTranslation();

  const methods = useForm<Parentable<INeed>>({
    defaultValues: element,
    resolver: joiResolver(PutNeedSchema)
  });

  // const [modalShow, setModalShow] = useState(false);

  const onEditNeedSubmit = (post: Nestable<INeed>) => {
    const postNeed = Utils.nestable2Parentable(post);
    dispatch(editNeed(postNeed));
    dispatch(putSelectedProjectThunk('dummy')).then(() => {
      const alert: IAlert = {
        id: uuidv4(),
        style: 'success',
        text: 'Successfully edited need'
      };
      dispatch(addAlert({ alert }));
      handleClose();
    });
  };

  /* const checkDeleteNeed = (n: INeed) => {
    if (
      element.requirements.length > 0 ||
      Utils.checkIfParent(project.needs, n.id)
    ) {
      setModalShow(true);
    } else {
      dispatch(deleteNeed(n));
      dispatch(putSelectedProjectThunk('dummy')).then(() => {
        const alert: IAlert = {
          id: uuidv4(),
          style: 'success',
          text: 'Successfully edited need'
        };
        dispatch(addAlert({ alert }));
        handleClose();
      });
    }
  }; */

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onEditNeedSubmit)}
        autoComplete="off"
        noValidate
      >
        <TextCtrl name="title" label={t('Title')} />
        <TextCtrl name="description" label={t('Description')} />

        <Button variant="primary" type="submit">
          {t('save')}
        </Button>
        <Button variant="warning" onClick={handleClose}>
          {t('cancel')}
        </Button>
        {/*  <Button variant="warning" onClick={() => checkDeleteNeed(element)}>
              <DeleteIcon />
            </Button>
        <AlertModal
          modalShow={modalShow}
          setModalShow={setModalShow}
          title="Attention"
          text="This need has one or more connected requirements or has subneeds, please remove them to be able to delete"
        /> */}
      </form>
    </FormProvider>
  );
}

export default EditNeedForm;
