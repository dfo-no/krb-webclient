import { joiResolver } from '@hookform/resolvers/joi';
import React from 'react';
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
import { useEditableState } from '../../Components/EditableContext';
import { IRouteParams } from '../../Models/IRouteParams';
import DeleteFrame from '../../../components/DeleteFrame/DeleteFrame';

interface IProps {
  children: React.ReactElement;
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

  const { projectId } = useParams<IRouteParams>();
  const { data: project } = useGetProjectQuery(projectId);

  if (deleteMode !== product.id) {
    return children;
  }

  if (!project) {
    return <></>;
  }

  const hasChildren = Utils.checkIfHasChildren(product, project.products);
  const isInUse = Utils.productUsedInVariants(product, project);

  const infoText =
    hasChildren || isInUse
      ? `${t('cant delete this product')} ${
          isInUse ? t('product has connected requirements') : ''
        } ${hasChildren ? t('product has children') : ''}`
      : '';

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
        <DeleteFrame
          children={children}
          canBeDeleted={!hasChildren && !isInUse}
          infoText={infoText}
          handleClose={handleClose}
        />
      </form>
    </FormProvider>
  );
}
