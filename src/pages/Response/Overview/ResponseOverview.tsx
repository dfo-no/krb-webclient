import React from 'react';
import { Box, Divider, Typography } from '@mui/material/';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';

import css from '../../Stylesheets/EditorFullPage.module.scss';
import DownloadButton from '../Download/DownloadButton';
import theme from '../../../theme';
import { ISpecificationProduct } from '../../../Nexus/entities/ISpecificationProduct';
import { useProductIndexState } from '../../../components/ProductIndexContext/ProductIndexContext';
import { PRODUCTS, RESPONSE } from '../../../common/PathConstants';
import { FormIconButton } from '../../../components/Form/FormIconButton';
import Panel from '../../../components/UI/Panel/Panel';
import { useResponseState } from '../ResponseContext';

function ResponseOverview(): React.ReactElement {
  const { t } = useTranslation();
  const history = useHistory();
  const { response } = useResponseState();
  const { setProductIndex } = useProductIndexState();
  const genericPressed = () => {
    setProductIndex(-1);
    history.push(`/${RESPONSE}/${response.id}/${PRODUCTS}/general/`);
  };

  const productPressed = (index: number) => {
    setProductIndex(index);
    history.push(
      `/${RESPONSE}/${response.id}/${PRODUCTS}/${response.products[index].id}/`
    );
  };

  const renderProducts = (product: ISpecificationProduct, index: number) => {
    return (
      <li key={product.id}>
        <div className={css.CardContent}>
          <div className={css.CardTitle}>
            <Typography className={css.Text} variant="mdBold">
              {product.title}
            </Typography>
            <FormIconButton
              sx={{ marginLeft: 'auto', paddingRight: 2 }}
              onClick={() => productPressed(index)}
            >
              <EditIcon />
            </FormIconButton>
          </div>
          <Divider color={theme.palette.silver.main} />
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Typography className={css.Text} variant="sm">
              {product.description}
            </Typography>
            <Typography
              sx={{ marginLeft: 'auto', paddingRight: 0.5 }}
              variant="mdBold"
            >
              {product.amount}
            </Typography>
            <Typography sx={{ paddingRight: 2 }} variant="mdBold">
              {product.unit}
            </Typography>
          </Box>
        </div>
      </li>
    );
  };

  return (
    <div className={css.overview}>
      <div className={css.overview__content}>
        <ul aria-label="products">
          <li className={css.Active} key={'generic'}>
            <div className={css.CardContent}>
              <div className={css.CardTitle}>
                <Typography variant="mdBold">
                  {t('General requirements')}
                </Typography>
                <FormIconButton
                  sx={{ marginLeft: 'auto', paddingRight: 2 }}
                  onClick={() => genericPressed()}
                >
                  <EditIcon />
                </FormIconButton>
              </div>
              <Divider color={theme.palette.silver.main} />
            </div>
          </li>
        </ul>
        {response.specification.products.length > 0 && (
          <ul>
            {response.specification.products.map((element, index) => {
              return renderProducts(element, index);
            })}
          </ul>
        )}
      </div>
      <Panel panelColor={'white'} children={<DownloadButton />} />
    </div>
  );
}

export default ResponseOverview;
