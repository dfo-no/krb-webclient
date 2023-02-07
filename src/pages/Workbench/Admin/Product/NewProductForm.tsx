import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';

import FormButtons from '../../../../components/Form/FormButtons';
import Nexus from '../../../../Nexus/Nexus';
import ProductService from '../../../../Nexus/services/ProductService';
import useProjectMutations from '../../../../store/api/ProjectMutations';
import VerticalTextCtrl from '../../../../FormProvider/VerticalTextCtrl';
import { FormItemBox } from '../../../../components/Form/FormItemBox';
import { Alert } from '../../../../models/Alert';
import { IProduct } from '../../../../Nexus/entities/IProduct';
import { IRouteProjectParams } from '../../../../models/IRouteProjectParams';
import { ModelType } from '../../../../Nexus/enums';
import { Parentable } from '../../../../models/Parentable';
import { useFormStyles } from '../../../../components/Form/FormStyles';
import { AlertsContainer } from '../../../../components/Alert/AlertContext';

interface Props {
  handleClose: () => void;
}

export default function NewProductForm({
  handleClose,
}: Props): React.ReactElement {
  const { addAlert } = AlertsContainer.useContainer();
  const { t } = useTranslation();
  const nexus = Nexus.getInstance();
  const formStyles = useFormStyles();
  const { projectId } = useParams<IRouteProjectParams>();
  const { addProduct } = useProjectMutations();

  const defaultValues: Parentable<IProduct> =
    ProductService.defaultProduct(projectId);

  const methods = useForm<Parentable<IProduct>>({
    resolver: nexus.resolverService.postResolver(ModelType.product),
    defaultValues,
  });

  async function onSubmit(post: Parentable<IProduct>) {
    const newProduct = nexus.productService.createProductWithId(post);
    await addProduct(newProduct).then(() => {
      const alert: Alert = {
        id: uuidv4(),
        style: 'success',
        text: 'Successfully created product',
      };
      addAlert(alert);
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
          <VerticalTextCtrl name="unit" label={t('Unit')} placeholder={''} />
          <FormButtons handleClose={() => handleClose()} />
        </FormItemBox>
      </form>
    </FormProvider>
  );
}
