import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
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
import { ScrollableContainer } from '../Workbench/Components/ScrollableContainer';
import FilteredList from './Components/FilteredList';

const useStyles = makeStyles({
  homepageWrapper: {
    flexGrow: 1,
    minHeight: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  scrollableContent: {
    height: '100%',
    width: '100%'
  },
  actionContainer: {
    display: 'flex',
    margin: 8,
    marginBottom: 0,
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
      <ScrollableContainer>
        <Box className={classes.scrollableContent}>
          <Box className={classes.actionContainer}>
            <Box className={classes.navigation}>
              {list && <SearchBar list={list} />}
            </Box>
            <Box className={classes.navigation}>
              <List>
                <ListItem>
                  <Link to="/workbench">
                    <Typography variant="h5">{t('create projects')}</Typography>
                  </Link>
                </ListItem>
                <ListItem>
                  <Link to="/response">
                    <Typography variant="h5">{t('create response')}</Typography>
                  </Link>
                </ListItem>
                <ListItem>
                  <Link to="/evaluation">
                    <Typography variant="h5">
                      {t('create evaluation')}
                    </Typography>
                  </Link>
                </ListItem>
                <ListItem>
                  <Link to="/specification">
                    <Typography variant="h5">
                      {t('create specification')}
                    </Typography>
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
      </ScrollableContainer>
      <Footer />
    </div>
  );
}
