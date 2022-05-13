import { joiResolver } from '@hookform/resolvers/joi';
import Typography from '@mui/material/Typography';
import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Utils from '../../../common/Utils';
import { IAlert } from '../../../models/IAlert';
import { Parentable } from '../../../models/Parentable';
import { BaseProductSchema, IProduct } from '../../../Nexus/entities/IProduct';
import { useGetProjectQuery } from '../../../store/api/bankApi';
import useProjectMutations from '../../../store/api/ProjectMutations';
import { useAppDispatch } from '../../../store/hooks';
import { addAlert } from '../../../store/reducers/alert-reducer';
import theme from '../../../theme';
import { useEditableState } from '../../Components/EditableContext';
import { FormCantDeleteBox } from '../../Components/Form/FormCantDeleteBox';
import { FormDeleteBox } from '../../Components/Form/FormDeleteBox';
import { FormTextButton } from '../../Components/Form/FormTextButton';
import { IRouteParams } from '../../Models/IRouteParams';

interface IProps {
  children: React.ReactNode;
  product: Parentable<IProduct>;
  handleClose: () => void;
}

export default function DeleteProductForm({
  children,
  product,
  handleClose
}: IProps): React.ReactElement {
  const { deleteProduct } = useProjectMutations();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { deleteMode } = useEditableState();

  const methods = useForm<Parentable<IProduct>>({
    defaultValues: product,
    resolver: joiResolver(BaseProductSchema)
  });

  useEffect(() => {
    if (product !== methods.getValues()) {
      methods.reset(product);
    }
  }, [product, methods]);

  const { projectId } = useParams<IRouteParams>();
  const { data: project } = useGetProjectQuery(projectId);

  if (deleteMode !== product.id) {
    return <>{children}</>;
  }

  if (!project) {
    return <></>;
  }

  const hasChildren = Utils.checkIfHasChildren(product, project.products);
  const isInUse = Utils.productUsedInVariants(product, project);

  async function onSubmit(put: Parentable<IProduct>) {
    await deleteProduct(put).then(() => {
      const alert: IAlert = {
        id: uuidv4(),
        style: 'success',
        text: 'Successfully deleted product'
      };
      dispatch(addAlert({ alert }));
      handleClose();
    });
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        autoComplete="off"
        noValidate
      >
        {!hasChildren && (
          <FormDeleteBox>
            <FormTextButton
              hoverColor={theme.palette.errorRed.main}
              type="submit"
              aria-label="delete"
            >
              {isInUse
                ? `${t('product has connected requirements')} ${t(
                    'delete anyways'
                  )}`
                : t('Delete')}
            </FormTextButton>
            <FormTextButton
              hoverColor={theme.palette.gray400.main}
              onClick={() => handleClose()}
              aria-label="close"
            >
              {t('Cancel')}
            </FormTextButton>
            {children}
          </FormDeleteBox>
        )}
        {hasChildren && (
          <FormCantDeleteBox>
            <Typography variant="smBold" sx={{ paddingLeft: 1 }}>
              {t('Cant delete this product')}{' '}
              {hasChildren ? t('product has children') : ''}
            </Typography>
            <FormTextButton
              hoverColor={theme.palette.gray400.main}
              onClick={() => handleClose()}
              aria-label="close"
            >
              {t('Cancel')}
            </FormTextButton>
            {children}
          </FormCantDeleteBox>
        )}
      </form>
    </FormProvider>
  );
}
