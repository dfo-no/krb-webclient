import { joiResolver } from '@hookform/resolvers/joi';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import Utils from '../../../common/Utils';
import ErrorSummary from '../../../Form/ErrorSummary';
import { IAlert } from '../../../models/IAlert';
import { Parentable } from '../../../models/Parentable';
import { IBank } from '../../../Nexus/entities/IBank';
import { DeleteNeedSchema, INeed } from '../../../Nexus/entities/INeed';
import { usePutProjectMutation } from '../../../store/api/bankApi';
import { useAppDispatch } from '../../../store/hooks';
import { addAlert } from '../../../store/reducers/alert-reducer';
import { useSelectState } from '../SelectContext';

interface IProps {
  need: INeed;
  handleClose: () => void;
  project: IBank;
}

function DeleteNeedForm({
  need,
  project,
  handleClose
}: IProps): React.ReactElement {
  const dispatch = useAppDispatch();

  const { t } = useTranslation();
  const [putProject] = usePutProjectMutation();
  const { setNeedIndex } = useSelectState();

  const methods = useForm<Parentable<INeed>>({
    defaultValues: need,
    resolver: joiResolver(DeleteNeedSchema),
    context: { needList: project.needs }
  });

  const [modalShow, setModalShow] = useState(false);

  const onSubmit = async (deleteNeed: INeed) => {
    const foundIndex = project.needs.findIndex((n) => n.id === deleteNeed.id);

    const needs = [...project.needs];
    if (foundIndex !== -1) {
      needs.splice(foundIndex, 1);
    }
    const nextIndex = Utils.getNextIndexAfterDelete(needs, foundIndex);

    const saveProject: IBank = {
      ...project,
      needs
    };
    await putProject(saveProject)
      .unwrap()
      .then(() => {
        const alert: IAlert = {
          id: uuidv4(),
          style: 'success',
          text: 'Successfully edited need'
        };
        dispatch(addAlert({ alert }));
        handleClose();
        setNeedIndex(nextIndex);
      });

    // TODO: fix back-end to joi-check with commented out code
    // element.requirements.length > 0 || Utils.checkIfParent(project.needs, n.id)
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        autoComplete="off"
        noValidate
      >
        {/* <input
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
        {/*  <AlertModal
          modalShow={modalShow}
          setModalShow={setModalShow}
          title="Attention"
          text="This need has one or more connected requirements or has subneeds, please remove them to be able to delete"
        /> */}
      </form>
    </FormProvider>
  );
}

export default DeleteNeedForm;
