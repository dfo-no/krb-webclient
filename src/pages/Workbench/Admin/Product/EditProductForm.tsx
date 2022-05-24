import { joiResolver } from '@hookform/resolvers/joi';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import { IAlert } from '../../../../models/IAlert';
import { Parentable } from '../../../../models/Parentable';
import {
  IProduct,
  BaseProductSchema
} from '../../../../Nexus/entities/IProduct';
import { useAppDispatch } from '../../../../store/hooks';
import { addAlert } from '../../../../store/reducers/alert-reducer';
import { FormItemBox } from '../../../../components/Form/FormItemBox';
import VerticalTextCtrl from '../../../../FormProvider/VerticalTextCtrl';
import { useFormStyles } from '../../../../components/Form/FormStyles';
import useProjectMutations from '../../../../store/api/ProjectMutations';
import FormButtons from '../../../../components/Form/FormButtons';

interface IProps {
  product: Parentable<IProduct>;
  handleClose: (newProduct: Parentable<IProduct> | null) => void;
}

export default function EditProductForm({
  product,
  handleClose
}: IProps): React.ReactElement {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const formStyles = useFormStyles();
  const { editProduct } = useProjectMutations();

  const methods = useForm<Parentable<IProduct>>({
    defaultValues: product,
    resolver: joiResolver(BaseProductSchema)
  });

  async function onSubmit(put: Parentable<IProduct>) {
    await editProduct(put).then(() => {
      const alert: IAlert = {
        id: uuidv4(),
        style: 'success',
        text: 'Successfully edited product'
      };
      dispatch(addAlert({ alert }));
      handleClose(put);
    });
  }

  return (
    <FormProvider {...methods}>
      <form
        className={formStyles.flexGrowForm}
        onSubmit={methods.handleSubmit(onSubmit)}
        autoComplete="off"
        noValidate
      >
        <FormItemBox>
          <VerticalTextCtrl name="title" label={t('Title')} placeholder={''} />
          <VerticalTextCtrl
            name="description"
            label={t('Description')}
            placeholder={''}
          />
          <FormButtons handleClose={() => handleClose(null)} />
        </FormItemBox>
      </form>
    </FormProvider>
  );
}
