import React, { ReactElement, useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { RouteComponentProps, useHistory, useParams } from 'react-router-dom';
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

type AnswerProductMatchParams = { productId: string };
type Props = RouteComponentProps<AnswerProductMatchParams>;

export default function AnswerProduct({ match }: Props): React.ReactElement {
  const { t } = useTranslation();
  const history = useHistory();
  const { prefilledResponse, product, setProduct } =
    PrefilledResponseContainer.useContainer();
  const { productId } = useParams<PrefilledResponseRouteParams>();
  const paramsProductId = match.params.productId;
  console.log('paramasProductIndex: ', paramsProductId);

  // const productIndex = Utils.isNumeric(paramsProductIndex)
  //   ? Number(paramsProductIndex)
  //   : -1;
  const [editingProduct, setEditingProduct] = useState(false);
  //   const product = prefilledResponse.products[productIndex];

  useEffect(() => {
    setProduct(
      prefilledResponse.products.find((prod) => prod.id === productId)
    );
    return function cleanup() {
      setProduct(undefined);
    };
  }, [prefilledResponse.products, productId, setProduct]);

  const originProduct = product?.originProduct;
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

  const renderProductInfoToolbar = (): ReactElement => {
    return (
      <Toolbar gapType={'md'}>
        <ToolbarItem
          primaryText={t('From product type')}
          secondaryText={originProduct?.title} // TODO: I don't like this
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
