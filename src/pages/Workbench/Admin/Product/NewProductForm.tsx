import React from 'react';
import { IProduct } from '../../../../Nexus/entities/IProduct';
import { v4 as uuidv4 } from 'uuid';
import { IAlert } from '../../../../models/IAlert';
import { useAppDispatch } from '../../../../store/hooks';
import { useTranslation } from 'react-i18next';
import { FormProvider, useForm } from 'react-hook-form';
import Nexus from '../../../../Nexus/Nexus';
import { addAlert } from '../../../../store/reducers/alert-reducer';
import { FormItemBox } from '../../../../components/Form/FormItemBox';
import { Parentable } from '../../../../models/Parentable';
import { useFormStyles } from '../../../../components/Form/FormStyles';
import useProjectMutations from '../../../../store/api/ProjectMutations';
import { useParams } from 'react-router-dom';
import { IRouteProjectParams } from '../../../../models/IRouteProjectParams';
import VerticalTextCtrl from '../../../../FormProvider/VerticalTextCtrl';
import FormButtons from '../../../../components/Form/FormButtons';
import { ModelType } from '../../../../Nexus/enums';

interface IProps {
  handleClose: () => void;
}

export default function NewProductForm({
  handleClose
}: IProps): React.ReactElement {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const nexus = Nexus.getInstance();
  const formStyles = useFormStyles();
  const { projectId } = useParams<IRouteProjectParams>();
  const { addProduct } = useProjectMutations();

  const defaultValues: Parentable<IProduct> =
    nexus.productService.generateDefaultProductValues(projectId);

  const methods = useForm<Parentable<IProduct>>({
    resolver: nexus.resolverService.postResolver(ModelType.product),
    defaultValues
  });

  async function onSubmit(post: Parentable<IProduct>) {
    const newProduct = nexus.productService.createProductWithId(post);
    await addProduct(newProduct).then(() => {
      const alert: IAlert = {
        id: uuidv4(),
        style: 'success',
        text: 'Successfully created product'
      };
      dispatch(addAlert({ alert }));
      methods.reset();
      handleClose();
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
          <VerticalTextCtrl
            name="title"
            label={t('Title')}
            placeholder={''}
            autoFocus
          />
          <VerticalTextCtrl
            name="description"
            label={t('Description')}
            placeholder={''}
          />
          <FormButtons handleClose={() => handleClose()} />
        </FormItemBox>
      </form>
    </FormProvider>
  );
}
