import { Box, Card, Divider, List, ListItem, Typography } from '@mui/material/';
import { Button } from '@mui/material/';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { RouteComponentProps, withRouter } from 'react-router';
import { useGetBankQuery } from '../../store/api/bankApi';
import { useAppSelector } from '../../store/hooks';
import theme from '../../theme';

const useStyles = makeStyles({
  specSideBar: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    width: '30vw'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    paddingRight: 40,
    paddingLeft: 40
  },
  topContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%'
  },
  projectListItemCard: {
    height: 100,
    boxShadow: 'none',
    border: `1px solid ${theme.palette.gray300.main}`,
    textDecoration: 'none',
    width: '100%',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.dfoWhite.main
    }
  },
  projectListItemCardContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
    paddingTop: 25,
    paddingLeft: 25,
    paddingRight: 70
  },
  projectListItemTitle: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    listStyle: 'none',
    width: '100%',
    alignSelf: 'center'
  },
  projectListItem: {
    padding: 0,
    paddingBottom: 10,
    textDecoration: 'none',
    width: '100%'
  },
  specSideBarContainer: {
    backgroundColor: 'blue',
    width: '100%'
  }
});

function SpecSideBar({ match }: RouteComponentProps): React.ReactElement {
  const { t } = useTranslation();
  const selectedBank = useAppSelector((state) => state.selectedBank);
  const { data: bankSelected } = useGetBankQuery(String(selectedBank.id));

  console.log(bankSelected?.products);

  const classes = useStyles();

  const products = [
    { id: '1', title: 'Produkt En', description: 'Et produkt' },
    { id: '2', title: 'Produkt To', description: 'Et produkt til' },
    { id: '3', title: 'Produkt Tre', description: 'Et produkt tall' }
  ];

  const renderProducts = () => {
    const result = Object.values(products).map((element) => {
      return (
        <ListItem className={classes.projectListItem} key={element.id}>
          <Card className={classes.projectListItemCard}>
            <Box className={classes.projectListItemCardContent}>
              <Box className={classes.projectListItemTitle}>
                <Typography variant="smediumBold">{element.title}</Typography>
              </Box>
              <Divider sx={{ color: theme.palette.gray700.main }} />
              <Typography variant="small">{element.description}</Typography>
            </Box>
          </Card>
        </ListItem>
      );
    });
    return result;
  };

  return (
    <Box className={classes.specSideBar}>
      <Box className={classes.container}>
        <Box className={classes.topContainer}>
          <Button variant="primary">Lag et nytt produkt</Button>
        </Box>

        <List className={classes.list} aria-label="products">
          {renderProducts()}
        </List>
        <Divider />
      </Box>
    </Box>
  );
}

export default withRouter(SpecSideBar);
