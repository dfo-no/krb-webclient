import React from 'react';
import { Parentable } from '../../../models/Parentable';
import { BaseTagSchema, ITag } from '../../../Nexus/entities/ITag';
import useProjectMutations from '../../../store/api/ProjectMutations';
import { FormProvider, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { v4 as uuidv4 } from 'uuid';
import Typography from '@mui/material/Typography';
import { IAlert } from '../../../models/IAlert';
import { addAlert } from '../../../store/reducers/alert-reducer';
import { useAppDispatch } from '../../../store/hooks';
import { FormDeleteBox } from '../../Components/Form/FormDeleteBox';
import { FormTextButton } from '../../Components/Form/FormTextButton';
import { useTranslation } from 'react-i18next';
import theme from '../../../theme';
import { useParams } from 'react-router-dom';
import { IRouteParams } from '../../Models/IRouteParams';
import { useGetProjectQuery } from '../../../store/api/bankApi';
import Utils from '../../../common/Utils';
import { FormCantDeleteBox } from '../../Components/Form/FormCantDeleteBox';
import { useEditableState } from '../../Components/EditableContext';
import { BaseProductSchema, IProduct } from '../../../Nexus/entities/IProduct';

interface IProps {
  child: React.ReactElement;
  product: Parentable<IProduct>;
  handleClose: () => void;
}

export default function DeleteProductForm({
  child,
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
    return <>{child}</>;
  }

  if (!project) {
    return <></>;
  }

  const hasChildren = Utils.checkIfHasChildren(product, project.products);

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
              hoverColor={theme.palette.dfoErrorRed.main}
              type="submit"
              aria-label="delete"
            >
              {t('delete')}
            </FormTextButton>
            <FormTextButton
              hoverColor={theme.palette.gray500.main}
              onClick={() => handleClose()}
              aria-label="close"
            >
              {t('cancel')}
            </FormTextButton>
            {child}
          </FormDeleteBox>
        )}
        {hasChildren && (
          <FormCantDeleteBox>
            <Typography variant={'smallBold'}>
              {t('cant delete this tag')}
            </Typography>
            <FormTextButton
              hoverColor={theme.palette.gray500.main}
              onClick={() => handleClose()}
              aria-label="close"
            >
              {t('cancel')}
            </FormTextButton>
            {child}
          </FormCantDeleteBox>
        )}
      </form>
    </FormProvider>
  );
}
