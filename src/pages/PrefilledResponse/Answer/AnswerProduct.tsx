import React, { ReactElement, useState } from 'react';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import { Button, Variant } from '@dfo-no/components.button';

import ProductNeed from './ProductNeed';
import Utils from '../../../common/Utils';
import { AccordionProvider } from '../../../components/DFOAccordion/AccordionContext';
import { PrefilledResponseContainer } from '../PrefilledResponseContext';
import { useProductIndexState } from '../../../components/ProductIndexContext/ProductIndexContext';
import css from '../../Stylesheets/EditorFullPage.module.scss';
import Panel from '../../../components/UI/Panel/Panel';
import { PREFILLED_RESPONSE } from '../../../common/PathConstants';
import Toolbar from '../../../components/UI/Toolbar/ToolBar';
import ToolbarItem from '../../../components/UI/Toolbar/ToolbarItem';
import EditProductForm from '../EditProduct/EditProductForm';

export default function AnswerProduct(): React.ReactElement {
  const { t } = useTranslation();
  const history = useHistory();
  const { prefilledResponse } = PrefilledResponseContainer.useContainer();
  const { productIndex } = useProductIndexState();
  const [editingProduct, setEditingProduct] = useState(false);
  const product = prefilledResponse.products[productIndex];
  const originProduct = prefilledResponse.products[productIndex]?.originProduct;
  const renderNeeds = (): ReactElement[] => {
    if (productIndex === -1) {
      return Utils.findVariantsUsedBySpecification(prefilledResponse.bank).map(
        (need) => {
          return <ProductNeed key={need.id} need={need} />;
        }
      );
    } else {
      return Utils.findVariantsUsedByProduct(
        prefilledResponse.products[productIndex].originProduct,
        prefilledResponse.bank,
        prefilledResponse.products[productIndex].relatedProducts
      ).map((need) => {
        return <ProductNeed key={need.id} need={need} />;
      });
    }
  };

  const renderProductActionsToolbar = (): ReactElement => {
    return (
      <Toolbar gapType={'lg'} hasPadding={true}>
        <ToolbarItem
          primaryText={t('Edit product details')}
          icon={<EditIcon />}
          handleClick={() => setEditingProduct(true)}
        />
      </Toolbar>
    );
  };

  const renderProductInfoToolbar = (): ReactElement => {
    return (
      <Toolbar gapType={'md'}>
        <ToolbarItem
          primaryText={t('From product type')}
          secondaryText={originProduct.title}
        />
      </Toolbar>
    );
  };

  const toOverviewPage = (): void => {
    history.push(`/${PREFILLED_RESPONSE}/${prefilledResponse.id}`);
  };

  return (
    <div className={css.ProductOverview}>
      <div className={css.overview__content}>
        {!product && (
          <Typography variant="lgBold">{t('General requirement')}</Typography>
        )}
        {product && !editingProduct && (
          <>
            <Typography variant="lgBold">{product?.title}</Typography>
            {renderProductActionsToolbar()}
            {renderProductInfoToolbar()}
            <Typography variant="md">{product?.description}</Typography>
          </>
        )}
        {product && editingProduct && (
          <EditProductForm
            prefilledResponseProduct={product}
            handleClose={() => setEditingProduct(false)}
          />
        )}
        <AccordionProvider>{renderNeeds()}</AccordionProvider>
      </div>
      <Panel
        classname={css.Actions}
        panelColor={'white'}
        children={
          <div className={css.formButtons}>
            <Button
              variant={Variant.Action}
              onClick={toOverviewPage}
              disabled={editingProduct}
              className={editingProduct ? css.Actions__disabled : ''}
            >
              {t('Save product')}
            </Button>
            <Button variant={Variant.Inverted} onClick={toOverviewPage}>
              {t('common.Cancel')}
            </Button>
          </div>
        }
      />
    </div>
  );
}
