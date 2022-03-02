import { joiResolver } from '@hookform/resolvers/joi';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import AlertModal from '../../common/AlertModal';
import Utils from '../../common/Utils';
import ErrorSummary from '../../Form/ErrorSummary';
import HiddenCtrl from '../../FormProvider/HiddenCtrl';
import { IAlert } from '../../models/IAlert';
import { Parentable } from '../../models/Parentable';
import { DeleteNeedSchema, INeed } from '../../Nexus/entities/INeed';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addAlert } from '../../store/reducers/alert-reducer';
import {
  deleteNeed,
  putSelectedProjectThunk
} from '../../store/reducers/project-reducer';

interface IProps {
  element: INeed;
  handleClose: () => void;
}

function DeleteNeedForm({ element, handleClose }: IProps): React.ReactElement {
  const dispatch = useAppDispatch();
  const { project } = useAppSelector((state) => state.project);

  const { t } = useTranslation();

  const methods = useForm<Parentable<INeed>>({
    defaultValues: element,
    resolver: joiResolver(DeleteNeedSchema),
    context: { needList: project.needs }
  });

  const [modalShow, setModalShow] = useState(false);

  /* const onSubmit = (post: Nestable<INeed>) => {
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
  }; */

  const onSubmit = (n: INeed) => {
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
    // TODO: fix back to commented out code
    /* if (
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
    } */
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        autoComplete="off"
        noValidate
      >
        {/*         <input
          name="hasNeeds"
          defaultValue={
            Utils.checkIfParent(project.needs, element.id) ? 'true' : 'false'
          }
        /> */}
        {/*  <HiddenCtrl name="requirements" /> */}

        <Button variant="warning" type="submit">
          <DeleteIcon />
        </Button>
        <Button variant="warning" onClick={handleClose}>
          {t('cancel')}
        </Button>
        <ErrorSummary errors={methods.formState.errors} />
        <AlertModal
          modalShow={modalShow}
          setModalShow={setModalShow}
          title="Attention"
          text="This need has one or more connected requirements or has subneeds, please remove them to be able to delete"
        />
      </form>
    </FormProvider>
  );
}

export default DeleteNeedForm;
