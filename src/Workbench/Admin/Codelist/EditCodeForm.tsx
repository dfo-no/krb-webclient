import { joiResolver } from '@hookform/resolvers/joi';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import { Box } from '@mui/material/';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import TextCtrl from '../../../FormProvider/TextCtrl';
import { useAppDispatch } from '../../../store/hooks';
import { addAlert } from '../../../store/reducers/alert-reducer';
import {
  editCodeInCodelist,
  putSelectedProjectThunk
} from '../../../store/reducers/project-reducer';
import { IAlert } from '../../../models/IAlert';
import { Parentable } from '../../../models/Parentable';
import { BaseCodeSchema, ICode } from '../../../Nexus/entities/ICode';
import { ICodelist } from '../../../Nexus/entities/ICodelist';
import { FormIconButton } from '../../Components/Form/FormIconButton';
import { FormItemBox } from '../../Components/Form/FormItemBox';

interface IProps {
  parent: ICodelist;
  element: Parentable<ICode>;
  handleClose: (newCode: Parentable<ICode> | null) => void;
}

function EditCodeForm({
  parent,
  element,
  handleClose
}: IProps): React.ReactElement {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const methods = useForm<Parentable<ICode>>({
    defaultValues: element,
    resolver: joiResolver(BaseCodeSchema)
  });

  const onSubmit = (put: Parentable<ICode>) => {
    dispatch(editCodeInCodelist({ codelistId: parent.id, code: put }));
    dispatch(putSelectedProjectThunk('dummy')).then(() => {
      const alert: IAlert = {
        id: uuidv4(),
        style: 'success',
        text: 'Successfully edited code'
      };
      dispatch(addAlert({ alert }));
      handleClose(put);
    });
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        autoComplete="off"
        noValidate
      >
        <FormItemBox>
          <Box sx={{ alignSelf: 'center', paddingLeft: 1 }}>
            <TextCtrl name="title" label={t('Title')} />
          </Box>
          <Box sx={{ alignSelf: 'center', paddingLeft: 1, paddingRight: 1 }}>
            <TextCtrl name="description" label={t('Description')} />
          </Box>
          <FormIconButton type="submit" aria-label="save">
            <CheckIcon />
          </FormIconButton>
          <FormIconButton onClick={() => handleClose(null)} aria-label="close">
            <CloseIcon />
          </FormIconButton>
        </FormItemBox>
      </form>
    </FormProvider>
  );
}

export default EditCodeForm;
