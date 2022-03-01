import { joiResolver } from '@hookform/resolvers/joi';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch } from '../../../store/hooks';
import { addAlert } from '../../../store/reducers/alert-reducer';
import {
  editSelectedCodelist,
  putSelectedProjectThunk
} from '../../../store/reducers/project-reducer';
import TextCtrl from '../../../FormProvider/TextCtrl';
import { IAlert } from '../../../models/IAlert';
import { CodelistSchema, ICodelist } from '../../../Nexus/entities/ICodelist';
import { FormIconButton } from '../../Components/Form/FormIconButton';
import { FormItemBox } from '../../Components/Form/FormItemBox';
import { FormFlexBox } from '../../Components/Form/FormFlexBox';
import { useFormStyles } from '../../Components/Form/FormStyles';

interface IProps {
  element: ICodelist;
  handleClose: (newCodelist: ICodelist | null) => void;
}

export default function EditCodelistForm({
  element,
  handleClose
}: IProps): React.ReactElement {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const classes = useFormStyles();

  const methods = useForm<ICodelist>({
    defaultValues: element,
    resolver: joiResolver(CodelistSchema)
  });

  const onSubmit = (put: ICodelist) => {
    dispatch(editSelectedCodelist(put));
    dispatch(putSelectedProjectThunk('dummy')).then(() => {
      const alert: IAlert = {
        id: uuidv4(),
        style: 'success',
        text: 'Successfully edited codelist'
      };
      dispatch(addAlert({ alert }));
      handleClose(put);
    });
  };

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
            <TextCtrl name="title" label={t('Title')} />
          </FormFlexBox>
          <FormFlexBox sx={{ paddingLeft: 1, paddingRight: 1 }}>
            <TextCtrl name="description" label={t('Description')} />
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
