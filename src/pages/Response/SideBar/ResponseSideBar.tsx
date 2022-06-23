import classnames from 'classnames';
import React from 'react';
import { Box, Card, Divider, List, ListItem, Typography } from '@mui/material/';
import { useTranslation } from 'react-i18next';

import css from '../ResponseEditor.module.scss';
import DownloadButton from '../Download/DownloadButton';
import theme from '../../../theme';
import { ISpecificationProduct } from '../../../models/ISpecificationProduct';
import { useResponseState } from '../ResponseContext';
import { useAppSelector } from '../../../store/hooks';

function ResponseSideBar(): React.ReactElement {
  const { t } = useTranslation();

  const { response } = useAppSelector((state) => state.response);
  const { responseProductIndex, setResponseProductIndex } = useResponseState();

  const genericPressed = () => {
    setResponseProductIndex(-1);
  };

  const productPressed = (index: number) => {
    setResponseProductIndex(index);
  };

  const renderProducts = (product: ISpecificationProduct, index: number) => {
    const isSelected = index === responseProductIndex;
    return (
      <ListItem
        className={css.item}
        key={product.id}
        onClick={() => productPressed(index)}
      >
        <Card
          className={classnames(
            css.card,
            isSelected ? css.selected : undefined
          )}
        >
          <Box className={css.content}>
            <Box sx={{ display: 'flex' }}>
              <Typography variant="mdBold">{product.title}</Typography>
              <Typography
                variant="mdBold"
                sx={{
                  alignSelf: 'center',
                  marginLeft: 'auto',
                  paddingLeft: 4
                }}
              >
                {product.amount}
              </Typography>
            </Box>
            <Divider color={theme.palette.silver.main} />
            <Typography variant="sm">{product.description}</Typography>
          </Box>
        </Card>
      </ListItem>
    );
  };

  return (
    <Box className={css.sidebar}>
      <List className={css.list} aria-label="products">
        <ListItem
          className={css.item}
          key={'generic'}
          onClick={() => genericPressed()}
        >
          <Card
            className={classnames(
              css.card,
              responseProductIndex === -1 ? css.selected : undefined
            )}
          >
            <Box className={css.content}>
              <Typography variant="mdBold">
                {t('General requirements')}
              </Typography>
              <Divider color={theme.palette.silver.main} />
            </Box>
          </Card>
        </ListItem>
        <Divider color={theme.palette.silver.main} />
        {response.specification.products.map((element, index) => {
          return renderProducts(element, index);
        })}
      </List>
      <Box className={css.buttonContainer}>
        <DownloadButton />
      </Box>
    </Box>
  );
}

export default ResponseSideBar;
