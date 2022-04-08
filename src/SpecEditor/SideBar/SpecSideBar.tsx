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
import LoaderSpinner from '../../common/LoaderSpinner';
import theme from '../../theme';
import { ScrollableContainer } from '../../Workbench/Components/ScrollableContainer';
import { useSpecificationState } from '../SpecificationContext';

const useStyles = makeStyles({
  specSideBar: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    width: '25vw',
    height: '100%',
    alignItems: 'center',
    paddingTop: 20
  },
  list: {
    display: 'flex',
    gap: 10,
    flexDirection: 'column',
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
      backgroundColor: theme.palette.lightBlue.main,
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
  noProductsMessage: {
    textAlign: 'center',
    height: '100%',
    paddingTop: 20
  }
});

function SpecSideBar(): React.ReactElement {
  const { t } = useTranslation();

  const classes = useStyles();
  const { specification, setCreate } = useSpecificationState();

  if (!specification) {
    return <LoaderSpinner />;
  }

  const renderProducts = () => {
    if (specification) {
      return specification.products.map((element) => (
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
      <Box className={classes.buttonContainer}>
        <Button variant="primary" onClick={() => setCreate(true)}>
          {t('create a new product')}
        </Button>
      </Box>
      {specification.products.length > 0 && (
        <ScrollableContainer sx={{ marginBottom: 8 }}>
          <List className={classes.list} aria-label="products">
            {renderProducts()}
          </List>
        </ScrollableContainer>
      )}
      {specification.products.length === 0 && (
        <Box className={classes.noProductsMessage}>
          <Typography>{t('This specification has no products yet')}</Typography>
        </Box>
      )}
    </Box>
  );
}

export default SpecSideBar;
