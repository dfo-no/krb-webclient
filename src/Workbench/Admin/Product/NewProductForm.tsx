import React from 'react';
import { IProduct, PostProductSchema } from '../../../Nexus/entities/IProduct';
import { v4 as uuidv4 } from 'uuid';
import { IAlert } from '../../../models/IAlert';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  addProduct,
  putSelectedProjectThunk
} from '../../../store/reducers/project-reducer';
import TextCtrl from '../../../FormProvider/TextCtrl';
import { useTranslation } from 'react-i18next';
import { FormProvider, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Nexus from '../../../Nexus/Nexus';
import { addAlert } from '../../../store/reducers/alert-reducer';
import { FormItemBox } from '../../Components/Form/FormItemBox';
import { FormIconButton } from '../../Components/Form/FormIconButton';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Parentable } from '../../../models/Parentable';
import { useFormStyles } from '../../Components/Form/FormStyles';
import { FormFlexBox } from '../../Components/Form/FormFlexBox';

interface IProps {
  handleClose: (newProduct: Parentable<IProduct> | null) => void;
}

export default function NewProductForm({
  handleClose
}: IProps): React.ReactElement {
  const dispatch = useAppDispatch();
  const { project } = useAppSelector((state) => state.project);
  const { t } = useTranslation();
  const nexus = Nexus.getInstance();
  const classes = useFormStyles();

  const defaultValues: Parentable<IProduct> =
    nexus.productService.generateDefaultProductValues(project.id);

  const methods = useForm<Parentable<IProduct>>({
    resolver: joiResolver(PostProductSchema),
    defaultValues
  });

  const onSubmit = (post: Parentable<IProduct>) => {
    const newProduct = nexus.productService.createProductWithId(post);
    dispatch(addProduct(newProduct));
    dispatch(putSelectedProjectThunk('dummy')).then(() => {
      const alert: IAlert = {
        id: uuidv4(),
        style: 'success',
        text: 'Successfully created product'
      };
      dispatch(addAlert({ alert }));
      methods.reset();
      handleClose(newProduct);
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
