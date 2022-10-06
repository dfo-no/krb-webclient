import React, { ReactElement } from 'react';
import { Box, Typography } from '@mui/material/';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

import css from '../../Stylesheets/EditorFullPage.module.scss';
import DownloadButton from '../Download/DownloadButton';
import DeleteSpecProduct from '../EditProduct/DeleteSpecProduct';
import { ISpecificationProduct } from '../../../Nexus/entities/ISpecificationProduct';
import { useSelectState } from '../../Workbench/Create/SelectContext';
import { useSpecificationState } from '../SpecificationContext';
import { PRODUCTS, SPECIFICATION } from '../../../common/PathConstants';
import NewProductSelection from './NewProductSelection';
import { DFOCardHeaderIconButton } from '../../../components/DFOCard/DFOCardHeaderIconButton';
import Toolbar from '../../../components/UI/Toolbar/ToolBar';
import ToolbarItem from '../../../components/UI/Toolbar/ToolbarItem';

export default function NewProduct(): React.ReactElement {
  const { t } = useTranslation();
  const { openProductSelection, setOpenProductSelection } =
    useSpecificationState();
  const history = useHistory();
  const { setDeleteMode } = useSelectState();
  const { specification } = useSpecificationState();

  const open = (): void => {
    setOpenProductSelection(true);
  };
  const onDelete = (): void => {
    setDeleteMode('');
  };

  const productPressed = (pid: string): void => {
    history.push(`/${SPECIFICATION}/${specification.id}/${PRODUCTS}/${pid}/`);
  };

  const genericPressed = (): void => {
    history.push(`/${SPECIFICATION}/${specification.id}/${PRODUCTS}/general/`);
  };

  const editSpecification = (): void => {
    history.push(`/${SPECIFICATION}/${specification.id}/edit`);
  };

  const renderSpecificationActionsToolbar = (): ReactElement => {
    return (
      <Toolbar>
        <ToolbarItem
          primaryText={t('Edit specification')}
          icon={<EditIcon />}
          handleClick={() => editSpecification()}
        />
        <DownloadButton />
      </Toolbar>
    );
  };

  const renderSpecificationInfoToolbar = (): ReactElement => {
    return (
      <Toolbar>
        <ToolbarItem
          primaryText={t('Organization')}
          secondaryText={specification.organization}
        />
        <ToolbarItem
          primaryText={t('Case number')}
          secondaryText={specification.caseNumber}
        />
        <ToolbarItem
          primaryText={t('CURRENCY_UNIT')}
          secondaryText={t(`CURRENCY_UNIT_${specification.currencyUnit}`)}
        />
      </Toolbar>
    );
  };

  const renderProducts = (product: ISpecificationProduct): ReactElement => {
    const renderProductActionsToolbar = (): ReactElement => {
      return (
        <Toolbar>
          <ToolbarItem
            secondaryText={t('Delete product')}
            icon={<DeleteIcon />}
            handleClick={() => setDeleteMode(product.id)}
            fontSize={'small'}
          />
          <ToolbarItem
            secondaryText={t('Edit product')}
            icon={<EditIcon />}
            handleClick={() => productPressed(product.id)}
            fontSize={'small'}
          />
        </Toolbar>
      );
    };

    const renderProductInfoToolbar = (): ReactElement => {
      return (
        <Toolbar>
          <ToolbarItem
            primaryText={t('Quantity')}
            secondaryText={`${product.amount} ${product.unit}`}
            fontSize={'small'}
          />
          <ToolbarItem
            primaryText={t('Weighting')}
            secondaryText={t(`${product.weight}`)}
            fontSize={'small'}
          />
          <ToolbarItem
            primaryText={t('Type')}
            secondaryText={product.originProduct.title}
            fontSize={'small'}
          />
        </Toolbar>
      );
    };
    return (
      <li key={product.id}>
        <DeleteSpecProduct product={product} handleClose={onDelete}>
          <div className={css.CardContent}>
            <div className={css.CardTitle}>
              <Typography className={css.Text} variant="mdBold">
                {product.title}
              </Typography>
            </div>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}
            >
              <Typography className={css.Text} variant="sm">
                {product.description}
              </Typography>
              {renderProductActionsToolbar()}
            </Box>
            {renderProductInfoToolbar()}
          </div>
        </DeleteSpecProduct>
      </li>
    );
  };

  return (
    <div className={css.overview}>
      <Typography variant={'lgBold'}>{specification.title}</Typography>
      {renderSpecificationActionsToolbar()}
      {renderSpecificationInfoToolbar()}
      <Toolbar spacingType={'between'}>
        <ToolbarItem
          secondaryText={t('Products')}
          disablePadding={true}
          fontWeight={'semibold'}
        />
        <ToolbarItem
          primaryText={t('Create a new product')}
          icon={<AddIcon />}
          handleClick={open}
        />
      </Toolbar>
      <ul aria-label="products">
        <li key={'generic'}>
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
      {openProductSelection && <NewProductSelection />}
    </div>
  );
}
