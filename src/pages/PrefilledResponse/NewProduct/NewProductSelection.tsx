import React, { ReactElement, useState } from 'react';
import { Button, List, ListItem, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import css from '../../Stylesheets/NewProductSelection.module.scss';
import theme from '../../../theme';
import { IProduct } from '../../../Nexus/entities/IProduct';
import { Parentable } from '../../../models/Parentable';
import { PrefilledResponseContainer } from '../PrefilledResponseContext';
import DFODialog from '../../../components/DFODialog/DFODialog';
import { Levelable } from '../../../models/Levelable';
import Utils from '../../../common/Utils';
import NewProduct from './NewProduct';
import {
  ModalBox,
  ModalButton,
  ModalButtonsBox,
} from '../../../components/ModalBox/ModalBox';

export default function NewProductSelection(): React.ReactElement {
  const { t } = useTranslation();
  const {
    prefilledResponse,
    setOpenProductSelection,
    setNewProductCreate,
    newProductCreate,
  } = PrefilledResponseContainer.useContainer();
  const [product, setProduct] = useState<Parentable<IProduct> | null>(null);

  const onClick = (item: Levelable<IProduct>) => {
    setNewProductCreate(true);
    setProduct(Utils.levelable2Parentable(item));
  };
  const cancel = (): void => {
    setOpenProductSelection(false);
    setNewProductCreate(false);
  };

  const nonDeletedProducts: Parentable<IProduct>[] =
    prefilledResponse.bank.products.filter((item) => !item.deletedDate);
  const levelableProducts: Levelable<IProduct>[] =
    Utils.parentable2Levelable(nonDeletedProducts);
  const modalBox = (): React.ReactElement => {
    return (
      <ModalBox>
        <Typography variant={'smBold'} color={theme.palette.primary.main}>
          {t('Choose a product type from the requirement set')}{' '}
          <i>{prefilledResponse.bank.title}</i>{' '}
          {t('that fits the product best')}
        </Typography>
        <div className={css.NewProductSelection}>
          <List>
            {levelableProducts.map((item: Levelable<IProduct>) => {
              return (
                <ListItem
                  key={item.id}
                  className={css.Product}
                  sx={{
                    marginLeft: `${(item.level - 1) * 3}%`,
                    width: `${100 - (item.level - 1) * 3}%`,
                  }}
                >
                  <Typography
                    className={css.Title}
                    variant={item.level === 1 ? 'smBold' : 'sm'}
                  >
                    {item.title}
                  </Typography>
                  <Typography className={css.Choose} variant={'sm'}>
                    <Button variant="outlined" onClick={() => onClick(item)}>
                      {t('Choose')}
                    </Button>
                  </Typography>
                </ListItem>
              );
            })}
          </List>
        </div>
        <ModalButtonsBox>
          <ModalButton variant="cancel" onClick={cancel}>
            {t('common.Cancel')}
          </ModalButton>
        </ModalButtonsBox>
      </ModalBox>
    );
  };
  const getDialog = (): ReactElement => {
    if (newProductCreate) {
      return <NewProduct product={product} handleClose={cancel} />;
    }
    return modalBox();
  };

  return (
    <DFODialog
      scroll={'paper'}
      isOpen={true}
      handleClose={cancel}
      children={getDialog()}
    />
  );
}
