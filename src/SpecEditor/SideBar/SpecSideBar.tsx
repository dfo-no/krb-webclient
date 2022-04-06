import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, withRouter } from 'react-router';
import LoaderSpinner from '../../common/LoaderSpinner';
import theme from '../../theme';
import { ScrollableContainer } from '../../Workbench/Components/ScrollableContainer';
import { useSpecificationState } from '../SpecificationContext';

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
      color: theme.palette.white.main
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
  const { t } = useTranslation();
  const history = useHistory();

  const classes = useStyles();
  const { specification } = useSpecificationState();

  if (!specification) {
    return <LoaderSpinner />;
  }

  const renderProducts = () => {
    if (specification.bank) {
      return specification.bank.products.map((element) => (
        <ListItem className={classes.productListItem} key={element.id}>
          <Card className={classes.productListItemCard}>
            <Box className={classes.productListItemCardContent}>
              <Typography variant="mdBold">{element.title}</Typography>
              <Divider className={classes.productListItemDivider} />
              <Typography variant="sm">{element.description}</Typography>
            </Box>
          </Card>
        </ListItem>
      ));
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
        {specification.bank.products.length > 0 && (
          <Box className={classes.listContainer}>
            <ScrollableContainer
              sx={{
                height: '66.7vh'
              }}
            >
              <List className={classes.list} aria-label="products">
                {renderProducts()}
              </List>
            </ScrollableContainer>
          </Box>
        )}
        {specification.bank.products.length === 0 && (
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
