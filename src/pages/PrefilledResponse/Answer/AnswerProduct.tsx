import React, { ReactElement, useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { RouteComponentProps } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import { Button, Variant } from '@dfo-no/components.button';

import ProductNeed from './ProductNeed';
import Utils from '../../../common/Utils';
import { AccordionProvider } from '../../../components/DFOAccordion/AccordionContext';
import { PrefilledResponseContainer } from '../PrefilledResponseContext';
import css from '../../Stylesheets/EditorFullPage.module.scss';
import Panel from '../../../components/UI/Panel/Panel';
import { PREFILLED_RESPONSE } from '../../../common/PathConstants';
import Toolbar from '../../../components/UI/Toolbar/ToolBar';
import ToolbarItem from '../../../components/UI/Toolbar/ToolbarItem';
import EditProductForm from '../EditProduct/EditProductForm';
import { PrefilledResponseRouteParams } from '../../../models/PrefilledResponseRouteParams';

type Props = RouteComponentProps<PrefilledResponseRouteParams>;

export default function AnswerProduct({
  match,
  history,
}: Props): React.ReactElement {
  const { t } = useTranslation();
  const { prefilledResponse, product, setProduct } =
    PrefilledResponseContainer.useContainer();

  const paramsProductId = match.params.productId;
  const [editingProduct, setEditingProduct] = useState(false);

  useEffect(() => {
    setProduct(
      prefilledResponse.products.find((prod) => prod.id === paramsProductId)
    );
    return function cleanup() {
      setProduct(undefined);
    };
  }, [prefilledResponse.products, paramsProductId, setProduct]);

  const renderNeeds = (): ReactElement[] => {
    if (!product) {
      return Utils.findVariantsUsedBySpecification(prefilledResponse.bank).map(
        (need) => {
          return <ProductNeed key={need.id} need={need} />;
        }
      );
    } else {
      return Utils.findVariantsUsedByProduct(
        product.originProduct,
        prefilledResponse.bank,
        product.relatedProducts
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

  const renderProductInfoToolbar = (
    originProductTitle: string
  ): ReactElement => {
    return (
      <Toolbar gapType={'md'}>
        <ToolbarItem
          primaryText={t('From product type')}
          secondaryText={originProductTitle}
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
            {renderProductInfoToolbar(product.originProduct.title)}
            <Typography variant="md">{product?.description}</Typography>
          </>
        )}
        {product && editingProduct && (
          <EditProductForm
            product={product}
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
