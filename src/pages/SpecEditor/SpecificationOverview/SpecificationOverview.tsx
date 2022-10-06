import React, { ReactElement, useState } from 'react';
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
import NewProductSelection from '../NewProduct/NewProductSelection';
import Toolbar from '../../../components/UI/Toolbar/ToolBar';
import ToolbarItem from '../../../components/UI/Toolbar/ToolbarItem';
import { Weighting } from '../../../Nexus/enums';
import EditSpecificationForm from '../EditSpecificationForm';

export default function SpecificationOverview(): React.ReactElement {
  const { t } = useTranslation();
  const { openProductSelection, setOpenProductSelection } =
    useSpecificationState();
  const history = useHistory();
  const { setDeleteMode } = useSelectState();
  const { specification } = useSpecificationState();
  const [editingSpecification, setEditingSpecification] = useState(false);

  const open = (): void => {
    if (!editingSpecification) {
      setOpenProductSelection(true);
    }
  };
  const onDelete = (): void => {
    setDeleteMode('');
  };

  const handleDelete = (pid: string): void => {
    if (!editingSpecification) {
      setDeleteMode(pid);
    }
  };

  const productPressed = (pid: string): void => {
    if (!editingSpecification) {
      history.push(`/${SPECIFICATION}/${specification.id}/${PRODUCTS}/${pid}/`);
    }
  };

  const genericPressed = (): void => {
    if (!editingSpecification) {
      history.push(
        `/${SPECIFICATION}/${specification.id}/${PRODUCTS}/general/`
      );
    }
  };

  const renderSpecificationActionsToolbar = (): ReactElement => {
    return (
      <Toolbar gapType={'lg'} hasPadding={true}>
        <ToolbarItem
          primaryText={t('Edit specification')}
          icon={<EditIcon />}
          handleClick={() => setEditingSpecification(true)}
        />
        <DownloadButton />
      </Toolbar>
    );
  };

  const renderSpecificationInfoToolbar = (): ReactElement => {
    return (
      <Toolbar gapType={'md'}>
        <ToolbarItem
          primaryText={t('Organization')}
          secondaryText={specification.organization}
        />
        {specification.caseNumber && (
          <ToolbarItem
            primaryText={t('Case number')}
            secondaryText={specification.caseNumber}
          />
        )}
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
        <Toolbar gapType={'md'}>
          <ToolbarItem
            secondaryText={t('Delete product')}
            icon={<DeleteIcon />}
            handleClick={() => handleDelete(product.id)}
            fontSize={'small'}
            disabled={editingSpecification}
          />
          <ToolbarItem
            secondaryText={t('Edit product')}
            icon={<EditIcon />}
            handleClick={() => productPressed(product.id)}
            fontSize={'small'}
            disabled={editingSpecification}
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
            secondaryText={t(`${Weighting[product.weight]}`)}
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
      {!editingSpecification && (
        <Typography variant={'lgBold'}>{specification.title}</Typography>
      )}
      {!editingSpecification && renderSpecificationActionsToolbar()}
      {!editingSpecification && renderSpecificationInfoToolbar()}
      {editingSpecification && (
        <EditSpecificationForm
          specification={specification}
          handleCancel={() => setEditingSpecification(false)}
        />
      )}
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
          disabled={editingSpecification}
        />
      </Toolbar>
      <ul aria-label="products">
        <li key={'generic'}>
          <div className={css.CardContent}>
            <div className={css.General}>
              <Typography variant={'mdBold'}>
                {t('General requirements')}
              </Typography>
              <Toolbar>
                <ToolbarItem
                  secondaryText={t('Edit general requirements')}
                  icon={<EditIcon />}
                  handleClick={() => genericPressed()}
                  fontSize={'small'}
                  disabled={editingSpecification}
                />
              </Toolbar>
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
