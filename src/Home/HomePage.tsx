import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer';
import SearchBar from '../SearchBar/SearchBar';
import {
  useGetAlbefaticalSortedBanksQuery,
  useGetAllBanksQuery,
  useGetDateSortedBanksQuery
} from '../store/api/bankApi';
import theme from '../theme';
import FilteredList from './Components/FilteredList';

const useStyles = makeStyles({
  homepageWrapper: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    [theme.breakpoints.down('md')]: {
      flexWrap: 'wrap'
    }
  },
  actionContainer: {
    display: 'flex',
    margin: '1%',
    gap: 10
  },
  navigation: {
    flexBasis: '50%'
  }
});

export default function HomePage(): React.ReactElement {
  const { t } = useTranslation();

  const { data: latest } = useGetDateSortedBanksQuery();
  const { data: alfabetic } = useGetAlbefaticalSortedBanksQuery();
  const { data: list } = useGetAllBanksQuery();
  const classes = useStyles();

  return (
    <div className={classes.homepageWrapper}>
      <Box>
        <Box className={classes.actionContainer}>
          <Box className={classes.navigation}>
            {list && <SearchBar list={list} />}
          </Box>
          <Box className={classes.navigation}>
            <List>
              <ListItem>
                <Link to="/workbench">
                  <h5>{t('create projects')}</h5>
                </Link>
              </ListItem>
              <ListItem>
                <Link to="/response">
                  <h5>{t('create response')}</h5>
                </Link>
              </ListItem>
              <ListItem>
                <Link to="/evaluation">
                  <h5>{t('create evaluation')}</h5>
                </Link>
              </ListItem>
              <ListItem>
                <Link to="/specification">
                  <h5>{t('create specification')}</h5>
                </Link>
              </ListItem>
            </List>
          </Box>
        </Box>
        <Box className={classes.actionContainer}>
          <Box className={classes.navigation}>
            <Card>
              <CardHeader title={t('newest banks')} />
              <CardContent>
                {latest && <FilteredList list={latest} />}
              </CardContent>
            </Card>
          </Box>
          <Box className={classes.navigation}>
            <Card>
              <CardHeader title={t('Alfabetically sorted')} />
              <CardContent>
                {alfabetic && <FilteredList list={alfabetic} />}
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>
      <Footer />
    </div>
  );
}
