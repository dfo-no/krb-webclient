import React, { ReactElement } from 'react';
import { Box, Button, Divider, Typography } from '@mui/material/';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import DeleteSpecProduct from '../EditProduct/DeleteSpecProduct';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import css from '../../Stylesheets/EditorFullPage.module.scss';
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
import { FormIconButton } from '../../../components/Form/FormIconButton';
import NewProductSelection from './NewProductSelection';
import { ISpecification } from '../../../Nexus/entities/ISpecification';

export default function NewProduct(): React.ReactElement {
  const { t } = useTranslation();
  const { openProductSelection, setOpenProductSelection } =
    useSpecificationState();
  const history = useHistory();
  const { setDeleteMode } = useSelectState();
  const { specification } = useSpecificationState();
  const routeMatch = useRouteMatch<IRouteSpecificationParams>(
    SpecificationProductPath
  );
  const productId = routeMatch?.params?.productId;

  const open = (): void => {
    setOpenProductSelection(true);
  };
  const onDelete = (): void => {
    setDeleteMode('');
  };

  const productPressed = (pid: string): void => {
    history.push(`/${SPECIFICATION}/${specification.id}/${PRODUCTS}/${pid}/`);
  };

  const isGeneric = (): boolean => {
    return specification.products.every((product) => product.id !== productId);
  };

  const editSpecification = (): void => {
    history.push(`/${SPECIFICATION}/${specification.id}/edit`);
  };

  const renderEditSpecifcationBar = (spec: ISpecification): ReactElement => {
    return (
      <Box
        className={css.Button}
        sx={{
          display: 'flex',
          flexDirection: 'row-reverse'
        }}
      >
        <Typography
          className={css.editLink}
          variant="md"
          onClick={() => editSpecification()}
        >
          {t('Edit')}
        </Typography>
        <Typography sx={{ paddingRight: 2 }} variant="md">
          {spec.organization}
        </Typography>
      </Box>
    );
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
              <Typography sx={{ paddingRight: 2 }} variant="mdBold">
                {product.unit}
              </Typography>
            </Box>
          </div>
        </DeleteSpecProduct>
      </li>
    );
  };

  return (
    <div className={css.overview}>
      {renderEditSpecifcationBar(specification)}
      <ul aria-label="products">
        <li className={isGeneric() ? css.Active : undefined} key={'generic'}>
          <div className={css.CardContent}>
            <div className={css.CardTitle}>
              <Typography variant="mdBold">
                {t('General requirements')}
              </Typography>
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
          flexDirection: 'row-reverse'
        }}
      >
        <Button
          sx={{
            marginLeft: 2
          }}
          variant="primary"
          onClick={open}
        >
          {t('Create a new product')}
        </Button>
        <DownloadButton />
        {openProductSelection && <NewProductSelection />}
      </Box>
    </div>
  );
}
