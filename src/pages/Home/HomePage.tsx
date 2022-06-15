import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import makeStyles from '@mui/styles/makeStyles';
import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Footer from '../../Footer/Footer';
import HomeDisplayList from './HomeDisplayList';
import HomeSearchBar from './HomeSearchBar';
import ProjectSelectionModal from './ProjectSelectionModal';
import { IBank } from '../../Nexus/entities/IBank';
import { useBankState } from '../../components/BankContext/BankContext';
import { useGetBanksQuery } from '../../store/api/bankApi';

const useStyles = makeStyles({
  homepageWrapper: {
    flexGrow: 1,
    minHeight: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  content: {
    height: '100%',
    width: '100%',
    margin: '0 auto',
    padding: '2rem'
  },
  actionContainer: {
    display: 'flex',
    flexBasis: '50%',
    margin: 8,
    marginBottom: 0,
    gap: '2rem'
  },
  navigation: {
    flexBasis: '50%'
  }
});

export default function HomePage(): React.ReactElement {
  const { t } = useTranslation();
  const classes = useStyles();
  const { selectedBank } = useBankState();
  const [latestPublishedProjects, setLatestPublishedProjects] = useState<
    IBank[]
  >([]);

  const { data: list } = useGetBanksQuery({
    pageSize: 500,
    page: 1,
    fieldName: 'title',
    order: 'DESC'
  });

  useEffect(() => {
    if (list) {
      const latestPublishedMap = new Map<string, IBank>();
      Object.values(list).forEach((bank) => {
        if (!bank.publishedDate || !bank.projectId) {
          return;
        }
        if (latestPublishedMap.has(bank.projectId)) {
          const oldValue = latestPublishedMap.get(bank.projectId);
          if (oldValue && oldValue.version < bank.version) {
            latestPublishedMap.set(bank.projectId, bank);
          }
        } else {
          latestPublishedMap.set(bank.projectId, bank);
        }
      });
      setLatestPublishedProjects(Array.from(latestPublishedMap.values()));
    }
  }, [list]);

  return (
    <div className={classes.homepageWrapper}>
      <Box className={classes.content}>
        <Box className={classes.actionContainer}>
          <Box className={classes.navigation}>
            <HomeSearchBar list={latestPublishedProjects} />
          </Box>
          <Box className={classes.navigation}>
            <List>
              <ListItem>
                <Link to="/workbench">
                  <Typography variant="h5">{t('Create projects')}</Typography>
                </Link>
              </ListItem>
              <ListItem>
                <Link to="/response">
                  <Typography variant="h5">{t('Create response')}</Typography>
                </Link>
              </ListItem>
              <ListItem>
                <Link to="/evaluation">
                  <Typography variant="h5">{t('Create evaluation')}</Typography>
                </Link>
              </ListItem>
            </List>
          </Box>
        </Box>
        <Box className={classes.actionContainer}>
          <HomeDisplayList
            title={t('Newest banks')}
            list={latestPublishedProjects}
            orderedByDate={true}
          />
          <HomeDisplayList
            title={t('Alphabetically sorted')}
            list={latestPublishedProjects}
          />
        </Box>
      </Box>
      <Footer />
      {selectedBank && <ProjectSelectionModal selectedBank={selectedBank} />}
    </div>
  );
}
