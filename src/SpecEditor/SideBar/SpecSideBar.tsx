import { Box, Card, Divider, List, ListItem, Typography } from '@mui/material/';
import { Button } from '@mui/material/';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { withRouter } from 'react-router';
import { useGetBankQuery } from '../../store/api/bankApi';
import { useAppSelector } from '../../store/hooks';
import theme from '../../theme';
import { ScrollableContainer } from '../../Workbench/Components/ScrollableContainer';
import { useHistory } from 'react-router';

const useStyles = makeStyles({
  specSideBar: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    width: '30vw',
    paddingTop: 20
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    margin: '0 auto',
    alignItems: 'center',
    width: '90%'
  },
  topContainer: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  productContainer: {
    width: '100%'
  },
  list: {
    display: 'flex',
    gap: 10,
    flexDirection: 'column',
    flexGrow: 1,
    listStyle: 'none',
    alignSelf: 'center',
    height: '100%'
  },
  productListItem: {
    padding: 0,
    textDecoration: 'none'
  },
  productListItemCard: {
    height: 100,
    boxShadow: 'none',
    border: `1px solid ${theme.palette.gray300.main}`,
    width: '100%',
    cursor: 'pointer',

    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.dfoWhite.main
    }
  },
  productListItemCardContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
    paddingTop: 25,
    paddingLeft: 25,
    paddingRight: 70
  },
  productListItemDivider: {
    color: theme.palette.gray700.main
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%'
  },
  listContainer: {
    width: '100%'
  },
  noProductsMessage: {
    textAlign: 'center',
    height: '100%',
    paddingTop: 20
  }
});

function SpecSideBar(): React.ReactElement {
  const selectedBank = useAppSelector((state) => state.selectedBank);
  const { data: bankSelected } = useGetBankQuery(String(selectedBank.id));
  const { t } = useTranslation();
  const history = useHistory();

  const classes = useStyles();

  const renderProducts = () => {
    if (bankSelected) {
      const result = Object.values(bankSelected.products).map((element) => {
        return (
          <ListItem className={classes.productListItem} key={element.id}>
            <Card className={classes.productListItemCard}>
              <Box className={classes.productListItemCardContent}>
                <Typography>{element.title}</Typography>
                <Divider className={classes.productListItemDivider} />
                <Typography>{element.description}</Typography>
              </Box>
            </Card>
          </ListItem>
        );
      });
      return result;
    }
  };

  return (
    <Box className={classes.specSideBar}>
      <Box className={classes.container}>
        <Box className={classes.buttonContainer}>
          <Button
            variant="primary"
            onClick={() => history.push('/specification/:id/createProduct')}
          >
            {t('create a new product')}
          </Button>
        </Box>
        {bankSelected && bankSelected?.products.length > 0 && (
          <Box className={classes.listContainer}>
            <ScrollableContainer
              sx={{
                paddingRight: bankSelected.products.length > 6 ? 2 : 0,
                height: '66.7vh'
              }}
            >
              <List className={classes.list} aria-label="products">
                {renderProducts()}
              </List>
            </ScrollableContainer>
          </Box>
        )}
        {bankSelected?.products.length === 0 && (
          <Box className={classes.noProductsMessage}>
            <Typography>
              {t('This specification has no products yet')}
            </Typography>
          </Box>
        )}
        <Divider />
      </Box>
    </Box>
  );
}

export default withRouter(SpecSideBar);
