import { Typography, Box, List } from '@mui/material/';
import { useTranslation } from 'react-i18next';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import theme from '../../theme';
import { IProduct } from '../../Nexus/entities/IProduct';
import NeedListItem from './NeedListItem';
import { Parentable } from '../../models/Parentable';
import Utils from '../../common/Utils';
import { INeed } from '../../Nexus/entities/INeed';
import { useAppSelector } from '../../store/hooks';

const useStyles = makeStyles({
  newProductNeedList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    border: `1px solid ${theme.palette.lightBlue.main}`,
    backgroundColor: theme.palette.gray200.main,
    width: '100%',
    padding: 30,
    marginTop: 8
  },
  topContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  needsList: {
    border: `1px solid ${theme.palette.silver.main}`,
    '&:last-child': {
      borderBottom: 'none'
    },
    '& .MuiList-root': {
      paddingTop: 0,
      paddingBottom: 0
    }
  }
});

interface IProps {
  product: Parentable<IProduct>;
}

export default function NeedList({ product }: IProps): React.ReactElement {
  const classes = useStyles();
  const { t } = useTranslation();
  const { spec } = useAppSelector((state) => state.specification);

  if (!spec.bank || !product) {
    return <></>;
  }

  const needs = Utils.findVariantsUsedByProduct(product, spec.bank);

  const renderList = () => {
    return (
      <List>
        {needs.map((need: Parentable<INeed>, index: number) => {
          return <NeedListItem need={need} key={index} />;
        })}
      </List>
    );
  };

  return (
    <>
      <Typography variant="smBold" color={theme.palette.primary.main}>
        {t('Requirement you find under')} <i>{product.title}</i>
      </Typography>
      <Box className={classes.newProductNeedList}>
        <Box className={classes.needsList}>{renderList()}</Box>
      </Box>
    </>
  );
}
