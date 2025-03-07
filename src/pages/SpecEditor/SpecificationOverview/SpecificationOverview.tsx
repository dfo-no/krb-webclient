import React, { ReactElement, useState } from 'react';
import { Box, Typography } from '@mui/material/';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

import css from '../../Stylesheets/EditorFullPage.module.scss';
import DownloadToolbarItem from '../Download/DownloadToolbarItem';
import DeleteSpecProduct from '../EditProduct/DeleteSpecProduct';
import { ISpecificationProduct } from '../../../Nexus/entities/ISpecificationProduct';
import { useSelectState } from '../../Workbench/Create/SelectContext';
import { useSpecificationState } from '../SpecificationContext';
import {
  GENERAL,
  PRODUCTS,
  SPECIFICATION,
} from '../../../common/PathConstants';
import NewProductSelection from '../NewProduct/NewProductSelection';
import Toolbar from '../../../components/UI/Toolbar/ToolBar';
import ToolbarItem from '../../../components/UI/Toolbar/ToolbarItem';
import EditSpecificationForm from '../EditSpecificationForm';
import Utils from '../../../common/Utils';
import { ISpecification } from '../../../Nexus/entities/ISpecification';
import SupplierInfoToolbar from './element/SupplierInfoToolbar';

export const chosenRequirements = (
  specification: ISpecification,
  specProduct: ISpecificationProduct
): string | undefined => {
  const needs = Utils.findVariantsUsedByProduct(
    specProduct.originProduct,
    specification.bank
  );
  if (needs.length > 0) {
    const totalProductRequirements = needs
      .map((need) => need.requirements.length)
      .reduce((previousValue, currentValue) => previousValue + currentValue, 0);
    const answeredRequirements = specProduct?.requirements.length;
    return `${answeredRequirements}/${totalProductRequirements}`;
  }
};

export default function SpecificationOverview(): React.ReactElement {
  const { t } = useTranslation();
  const { specification, openProductSelection, setOpenProductSelection } =
    useSpecificationState();
  const history = useHistory();
  const { setDeleteCandidateId } = useSelectState();
  const [editingSpecification, setEditingSpecification] = useState(false);

  const open = (): void => {
    if (!editingSpecification) {
      setOpenProductSelection(true);
    }
  };

  const onFinished = (): void => {
    setDeleteCandidateId('');
  };

  const handleDelete = (pid: string): void => {
    if (!editingSpecification) {
      setDeleteCandidateId(pid);
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
        `/${SPECIFICATION}/${specification.id}/${PRODUCTS}/${GENERAL}/`
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
        <DownloadToolbarItem />
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
            secondaryText={t('Edit the product')}
            icon={<EditIcon />}
            handleClick={() => productPressed(product.id)}
            fontSize={'small'}
            disabled={editingSpecification}
          />
        </Toolbar>
      );
    };

    const renderProductInfoToolbar = (): ReactElement => {
      const hasRequirements =
        chosenRequirements(specification, product) !== undefined;
      return (
        <Toolbar>
          <ToolbarItem
            primaryText={t('Quantity')}
            secondaryText={`${product.amount} ${product.unit}`}
            fontSize={'small'}
          />
          <ToolbarItem
            primaryText={t('Type')}
            secondaryText={product.originProduct.title}
            fontSize={'small'}
          />
          {hasRequirements && (
            <ToolbarItem
              primaryText={t('Chosen requirements')}
              secondaryText={chosenRequirements(specification, product)}
              fontSize={'small'}
            />
          )}
        </Toolbar>
      );
    };
    return (
      <li key={product.id}>
        <DeleteSpecProduct
          product={product}
          handleClose={onFinished}
          handleCancel={onFinished}
        >
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
                justifyContent: 'space-between',
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
      <div className={css.overview__content}>
        {!editingSpecification && (
          <Typography variant={'lgBold'}>{specification.title}</Typography>
        )}
        {!editingSpecification && renderSpecificationActionsToolbar()}
        {!editingSpecification && (
          <SupplierInfoToolbar
            orgName={specification.organization}
            currencyUnit={specification.currencyUnit}
            caseNumber={specification?.caseNumber}
          />
        )}
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
          {specification.bank.products.length > 0 && (
            <ToolbarItem
              primaryText={t('Create a new product')}
              icon={<AddIcon />}
              handleClick={open}
              disabled={editingSpecification}
            />
          )}
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
    </div>
  );
}
