import { joiResolver } from '@hookform/resolvers/joi';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import TextCtrl from '../../../FormProvider/HorizontalTextCtrl';
import { IAlert } from '../../../models/IAlert';
import { Parentable } from '../../../models/Parentable';
import { BaseCodeSchema, ICode } from '../../../Nexus/entities/ICode';
import { ICodelist } from '../../../Nexus/entities/ICodelist';
import useProjectMutations from '../../../store/api/ProjectMutations';
import { useAppDispatch } from '../../../store/hooks';
import { addAlert } from '../../../store/reducers/alert-reducer';
import { FormFlexBox } from '../../Components/Form/FormFlexBox';
import { FormIconButton } from '../../Components/Form/FormIconButton';
import { FormItemBox } from '../../Components/Form/FormItemBox';
import { useFormStyles } from '../../Components/Form/FormStyles';

interface IProps {
  codelist: ICodelist;
  code: Parentable<ICode>;
  handleClose: (newCode: Parentable<ICode> | null) => void;
}

function EditCodeForm({
  codelist,
  code,
  handleClose
}: IProps): React.ReactElement {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const classes = useFormStyles();
  const { editCode } = useProjectMutations();

  const methods = useForm<Parentable<ICode>>({
    defaultValues: code,
    resolver: joiResolver(BaseCodeSchema)
  });

  async function onSubmit(put: Parentable<ICode>) {
    await editCode(put, codelist).then(() => {
      const alert: IAlert = {
        id: uuidv4(),
        style: 'success',
        text: 'Successfully edited code'
      };
      dispatch(addAlert({ alert }));
      handleClose(put);
    });
  }

  return (
    <FormProvider {...methods}>
      <form
        className={classes.form}
        onSubmit={methods.handleSubmit(onSubmit)}
        autoComplete="off"
        noValidate
      >
        <FormItemBox>
          <FormFlexBox sx={{ paddingLeft: 1 }}>
            <TextCtrl name="title" placeholder={t('Title')} />
          </FormFlexBox>
          <FormFlexBox sx={{ paddingLeft: 1, paddingRight: 1 }}>
            <TextCtrl name="description" placeholder={t('Description')} />
          </FormFlexBox>
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
