import React, { ReactElement, useState } from 'react';
import { Button, List, ListItem, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import css from './NewProductSelection.module.scss';
import theme from '../../../theme';
import { IProduct } from '../../../Nexus/entities/IProduct';
import { Parentable } from '../../../models/Parentable';
import {
  ModalBox,
  ModalButton,
  ModalButtonsBox
} from '../../../components/ModalBox/ModalBox';
import DFODialog from '../../../components/DFODialog/DFODialog';
import NewProductForm from './NewProductForm';
import { Levelable } from '../../../models/Levelable';
import Utils from '../../../common/Utils';
import { useSpecificationState } from '../SpecificationContext';

export default function NewProductSelection(): React.ReactElement {
  const { t } = useTranslation();
  const {
    specification,
    newProductCreate,
    setNewProductCreate,
    setOpenProductSelection
  } = useSpecificationState();
  const [product, setProduct] = useState<Parentable<IProduct> | null>(null);
  if (specification.bank.products.length <= 0) setOpenProductSelection(false);
  const onClick = (item: Levelable<IProduct>) => {
    setNewProductCreate(true);
    setProduct(Utils.levelable2Parentable(item));
  };
  const cancel = (): void => {
    setOpenProductSelection(false);
    setNewProductCreate(false);
  };

  const nonDeletedProducts: Parentable<IProduct>[] =
    specification.bank.products.filter((item) => !item.deletedDate);
  const levelableProducts: Levelable<IProduct>[] =
    Utils.parentable2Levelable(nonDeletedProducts);

  const modalBox = (): React.ReactElement => {
    return (
      <ModalBox>
        <Typography variant={'smBold'} color={theme.palette.primary.main}>
          {t('Choose a product type from the requirement set')}{' '}
          <i>{specification.bank.title}</i> {t('that fits the product best')}
        </Typography>
        <div className={css.NewProductSelection}>
          <List>
            {levelableProducts.map((item: Levelable<IProduct>) => {
              return (
                <ListItem
                  key={item.id}
                  className={css.Product}
                  sx={{
                    marginTop:
                      item.level === 1 ? 'var(--small-gap)' : '-0.1rem',
                    marginLeft: `${(item.level - 1) * 2}%`,
                    width: `${100 - (item.level - 1) * 2}%`
                  }}
                >
                  <Typography
                    className={css.Title}
                    variant={item.level === 1 ? 'smBold' : 'sm'}
                  >
                    {item.title}
                  </Typography>
                  <Typography className={css.Description} variant={'sm'}>
                    {item.description}
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
            {t('Cancel')}
          </ModalButton>
        </ModalButtonsBox>
      </ModalBox>
    );
  };

  const getDialog = (): ReactElement => {
    if (newProductCreate) {
      return <NewProductForm specProduct={product} handleClose={cancel} />;
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
