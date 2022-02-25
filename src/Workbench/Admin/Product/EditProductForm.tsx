import { joiResolver } from '@hookform/resolvers/joi';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import { IAlert } from '../../../models/IAlert';
import { Parentable } from '../../../models/Parentable';
import { IProduct, BaseProductSchema } from '../../../Nexus/entities/IProduct';
import { useAppDispatch } from '../../../store/hooks';
import { addAlert } from '../../../store/reducers/alert-reducer';
import {
  editProduct,
  putSelectedProjectThunk
} from '../../../store/reducers/project-reducer';
import { FormItemBox } from '../../Components/Form/FormItemBox';
import { Box } from '@mui/material';
import TextCtrl from '../../../FormProvider/TextCtrl';
import { FormIconButton } from '../../Components/Form/FormIconButton';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

interface IProps {
  element: Parentable<IProduct>;
  handleClose: (newProduct: Parentable<IProduct> | null) => void;
}

export default function EditProductForm({
  element,
  handleClose
}: IProps): React.ReactElement {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const methods = useForm<Parentable<IProduct>>({
    defaultValues: element,
    resolver: joiResolver(BaseProductSchema)
  });

  const onSubmit = (put: Parentable<IProduct>) => {
    dispatch(editProduct(put));
    dispatch(putSelectedProjectThunk('dummy')).then(() => {
      const alert: IAlert = {
        id: uuidv4(),
        style: 'success',
        text: 'Successfully edited product'
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
