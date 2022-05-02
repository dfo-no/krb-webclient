import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import mainIllustration from '../assets/images/main-illustration.svg';
import { PAGE_SIZE } from '../common/Constants';
import LoaderSpinner from '../common/LoaderSpinner';
import DFODialog from '../components/DFODialog/DFODialog';
import DFOSearchBar from '../components/DFOSearchBar/DFOSearchBar';
import { IBank } from '../Nexus/entities/IBank';
import { IBaseModel } from '../Nexus/entities/IBaseModel';
import SpecificationStoreService from '../Nexus/services/SpecificationStoreService';
import { useGetBanksQuery } from '../store/api/bankApi';
import theme from '../theme';
import { ScrollableContainer } from '../Workbench/Components/ScrollableContainer';
import {
  SearchContainer,
  SearchFieldContainer
} from '../Workbench/Components/SearchContainer';
import NewSpecForm from './NewSpecForm';
import { useAppDispatch } from '../store/hooks';
import { setSpecification } from '../store/reducers/spesification-reducer';

const useStyles = makeStyles({
  projectsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 100,
    paddingTop: 100,
    paddingLeft: 200,
    backgroundColor: theme.palette.gray100.main,
    flexGrow: 1,
    minHeight: 0
  },
  topContainer: {
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: 20
  },
  titleSubTitleContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 15
  },
  title: {
    letterSpacing: 0.2,
    color: theme.palette.primary.main
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
      color: theme.palette.white.main
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
  projectListItemTitleButton: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    paddingTop: 0,
    gap: 15,
    listStyle: 'none',
    marginRight: 20
  },
  projectListItem: {
    padding: 0,
    textDecoration: 'none',
    width: '100%'
  },
  titleImageContainer: {
    display: 'flex',
    gap: 80
  },
  specPageText: {
    width: 600
  },
  specPageTextTwo: {
    marginTop: 5
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    minHeight: 0,
    marginBottom: 16,
    width: '70%'
  },
  noProjectsContainer: {
    display: 'flex',
    textAlign: 'center',
    flexDirection: 'column',
    width: '70%',
    gap: 15
  }
});

// specification
export default function SpecPage(): React.ReactElement {
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const [latestPublishedBanks, setLatestPublishedBanks] = useState<IBank[]>([]);

  const { data: banks, isLoading } = useGetBanksQuery({
    pageSize: PAGE_SIZE,
    page: 1,
    fieldName: 'title',
    order: 'DESC'
  });

  const searchFunction = (searchString: string, list: IBaseModel[]) => {
    return list;
  };
  const callback = (list: IBaseModel[]) => {
    return list;
  };

  useEffect(() => {
    if (banks) {
      setLatestPublishedBanks(
        Object.values(banks)
          .filter((bank: IBank) => bank.publishedDate)
          .reduce((prev: IBank[], current: IBank) => {
            const existingBank = prev.find(
              (bank) => bank.projectId === current.projectId
            );
            if (existingBank) {
              if (
                existingBank.publishedDate &&
                current.publishedDate &&
                existingBank.publishedDate < current.publishedDate
              ) {
                const prevWithoutBank = prev.filter(
                  (bank) => bank.id !== existingBank.id
                );
                return [current, ...prevWithoutBank];
              } else {
                return prev;
              }
            }
            return [current, ...prev];
          }, [])
      );
    }
  }, [banks]);

  const [isOpen, setOpen] = useState(false);

  if (isLoading) {
    return <LoaderSpinner />;
  }

  const openProjectModal = (bank: IBank) => {
    const newSpec = SpecificationStoreService.getSpecificationFromBank(bank);
    dispatch(setSpecification(newSpec));
    setOpen(true);
  };

  const renderProjects = () => {
    return latestPublishedBanks.map((element) => {
      return (
        <ListItem
          className={classes.projectListItem}
          key={element.id}
          onClick={() => openProjectModal(element)}
        >
          <Card className={classes.projectListItemCard}>
            <Box className={classes.projectListItemCardContent}>
              <Box className={classes.projectListItemTitleButton}>
                <Typography variant="mdBold">{element.title}</Typography>
              </Box>
              <Divider sx={{ color: theme.palette.gray700.main }} />
              <Typography variant="sm">{element.description}</Typography>
            </Box>
          </Card>
        </ListItem>
      );
    });
  };

  return (
    <Box className={classes.projectsContainer}>
      <Box className={classes.titleImageContainer}>
        <Box className={classes.titleSubTitleContainer}>
          <Typography className={classes.title} variant="xlBold">
            {t('Welcome to the builder')}
          </Typography>
          <Box className={classes.specPageText}>
            <Typography>{t('In the builder you can pick a bank')}</Typography>
          </Box>
          <Box className={classes.specPageTextTwo}>
            <Typography>{t('Pick a project to start')}</Typography>
          </Box>
        </Box>
        <img
          src={mainIllustration}
          alt="Illustration"
          height="222"
          width="518"
        />
      </Box>
      {latestPublishedBanks ? (
        <Box className={classes.contentContainer}>
          <Box className={classes.topContainer}>
            <SearchContainer sx={{ marginBottom: 1 }}>
              {/*  TODO: replace with 'AutoComplete' from @mui */}
              <SearchFieldContainer sx={{ width: 500 }}>
                {' '}
                <DFOSearchBar
                  list={[]}
                  placeholder={t('search for banks')}
                  callback={callback}
                  searchFunction={searchFunction}
                />
              </SearchFieldContainer>
            </SearchContainer>
          </Box>
          <ScrollableContainer>
            <List className={classes.list} aria-label="projects">
              {renderProjects()}
            </List>
          </ScrollableContainer>
        </Box>
      ) : (
        <Box className={classes.noProjectsContainer}>
          <Box>
            <Typography variant="md" sx={{ letterSpacing: 2 }}>
              {t('There is no banks')}
            </Typography>
          </Box>
        </Box>
      )}
      <DFODialog
        isOpen={isOpen}
        handleClose={() => setOpen(false)}
        children={<NewSpecForm handleClose={() => setOpen(false)} />}
      />
    </Box>
  );
}
