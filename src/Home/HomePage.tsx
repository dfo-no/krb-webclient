import { Box } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
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
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap'
    }
  },
  actionContainer: {
    display: 'flex',
    margin: '1%'
  },
  navigation: {
    flexBasis: '50%'
  },
  footer: {
    width: '100%',
    alignSelf: 'flex-end'
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
            <ListGroup variant="flush">
              <ListGroup.Item className="mt-1 ">
                <Link to="/workbench">
                  <h5>{t('create projects')}</h5>
                </Link>
              </ListGroup.Item>
              <ListGroup.Item className="mt-1 ">
                <Link to="/response">
                  <h5>{t('create response')}</h5>
                </Link>
              </ListGroup.Item>
              <ListGroup.Item className="mt-1 ">
                <Link to="/evaluation">
                  <h5>{t('create evaluation')}</h5>
                </Link>
              </ListGroup.Item>
              <ListGroup.Item className="mt-1 ">
                <Link to="/specification">
                  <h5>{t('create specification')}</h5>
                </Link>
              </ListGroup.Item>
            </ListGroup>
          </Box>
        </Box>
        <Box className={classes.actionContainer}>
          <Box className={classes.navigation}>
            {latest && (
              <FilteredList list={latest} filterTitle={t('newest banks')} />
            )}
          </Box>
          <Box className={classes.navigation}>
            {alfabetic && (
              <FilteredList
                list={alfabetic}
                filterTitle={t('Alfabetically sorted')}
              />
            )}
          </Box>
        </Box>
      </Box>
      <Box className={classes.footer}>
        <Footer />
      </Box>
    </div>
  );
}
