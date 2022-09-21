import React, { ReactElement } from 'react';
import { Box, Divider, Typography } from '@mui/material/';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import DeleteSpecProduct from '../EditProduct/DeleteSpecProduct';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import css from '../../Stylesheets/Editor.module.scss';
import DownloadButton from '../Download/DownloadButton';
import theme from '../../../theme';
import { ISpecificationProduct } from '../../../Nexus/entities/ISpecificationProduct';
import {
  IRouteSpecificationParams,
  SpecificationProductPath
} from '../../../models/IRouteSpecificationParams';
import { useSelectState } from '../../Workbench/Create/SelectContext';
import { useSpecificationState } from '../SpecificationContext';
import { PRODUCTS, SPECIFICATION } from '../../../common/PathConstants';
import NewProductButton from '../NewProduct/NewProductButton';
import { DFOCardHeaderIconButton } from '../../../components/DFOCard/DFOCardHeaderIconButton';
import { FormIconButton } from '../../../components/Form/FormIconButton';

export default function NewProduct(): React.ReactElement {
  const { t } = useTranslation();
  const history = useHistory();
  const { setDeleteMode } = useSelectState();
  const { specification } = useSpecificationState();
  const routeMatch = useRouteMatch<IRouteSpecificationParams>(
    SpecificationProductPath
  );
  const productId = routeMatch?.params?.productId;

  const onDelete = (): void => {
    setDeleteMode('');
  };

  const genericPressed = (): void => {
    history.push(`/${SPECIFICATION}/${specification.id}/${PRODUCTS}/general/`);
  };

  const productPressed = (pid: string): void => {
    history.push(`/${SPECIFICATION}/${specification.id}/${PRODUCTS}/${pid}/`);
  };

  const isGeneric = (): boolean => {
    return specification.products.every((product) => product.id !== productId);
  };

  const renderProducts = (product: ISpecificationProduct): ReactElement => {
    const isSelected = product.id === productId;
    return (
      <li className={isSelected ? css.Active : undefined} key={product.id}>
        <DeleteSpecProduct product={product} handleClose={onDelete}>
          <div className={css.CardContent}>
            <div className={css.CardTitle}>
              <Typography className={css.Text} variant="mdBold">
                {product.title}
              </Typography>
              <FormIconButton
                sx={{ marginLeft: 'auto', paddingRight: 0 }}
                onClick={() => setDeleteMode(product.id)}
              >
                <DeleteIcon />
              </FormIconButton>
              <FormIconButton onClick={() => productPressed(product.id)}>
                <EditIcon />
              </FormIconButton>
            </div>
            <Divider color={theme.palette.silver.main} />
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <Typography className={css.Text} variant="sm">
                {product.description}
              </Typography>
              <Typography
                sx={{ marginLeft: 'auto', paddingRight: 3 }}
                variant="mdBold"
              >
                {product.amount}
              </Typography>
            </Box>
          </div>
        </DeleteSpecProduct>
      </li>
    );
  };

  return (
    <div className={css.overview}>
      <ul aria-label="products">
        <li className={isGeneric() ? css.Active : undefined} key={'generic'}>
          <div className={css.CardContent}>
            <div className={css.CardTitle}>
              <Typography variant="mdBold">
                {t('General requirements')}
              </Typography>
              <DFOCardHeaderIconButton
                sx={{ marginLeft: 'auto', paddingRight: 2 }}
                onClick={() => genericPressed()}
              >
                <EditIcon />
              </DFOCardHeaderIconButton>
            </div>
            <Divider color={theme.palette.silver.main} />
          </div>
        </li>
      </ul>
      {specification.products.length > 0 && (
        <ul>
          {specification.products.map((element) => {
            return renderProducts(element);
          })}
        </ul>
      )}
      <Box
        className={css.Button}
        sx={{
          display: 'flex',
          flexDirection: 'row-reverse',
          borderTop: '2px solid black'
        }}
      >
        <NewProductButton label={t('Create a new product')} />
        <DownloadButton />
      </Box>
    </div>
  );
}
