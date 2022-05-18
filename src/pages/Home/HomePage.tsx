import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Footer from '../../Footer/Footer';
import HomeSearchBar from './HomeSearchBar';
import { useGetBanksQuery } from '../../store/api/bankApi';
import { ScrollableContainer } from '../../Workbench/Components/ScrollableContainer';
import HomeDisplayList from './HomeDisplayList';
import ProjectSelectionModal from './ProjectSelectionModal';
import { useBankState } from '../../components/BankContext/BankContext';
import { IBank } from '../../Nexus/entities/IBank';

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
      <ScrollableContainer>
        <Box className={classes.scrollableContent}>
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
                    <Typography variant="h5">
                      {t('Create evaluation')}
                    </Typography>
                  </Link>
                </ListItem>
              </List>
            </Box>
          </Box>
          <Box className={classes.actionContainer}>
            <Box className={classes.navigation}>
              <Card>
                <CardHeader title={t('Newest banks')} />
                <CardContent>
                  <HomeDisplayList
                    list={latestPublishedProjects}
                    orderedByDate={true}
                  />
                </CardContent>
              </Card>
            </Box>
            <Box className={classes.navigation}>
              <Card>
                <CardHeader title={t('Alfabetically sorted')} />
                <CardContent>
                  <HomeDisplayList list={latestPublishedProjects} />
                </CardContent>
              </Card>
            </Box>
          </Box>
        </Box>
      </ScrollableContainer>
      <Footer />
      {selectedBank && <ProjectSelectionModal selectedBank={selectedBank} />}
    </div>
  );
}
