import makeStyles from '@mui/styles/makeStyles';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Card from '@mui/material/Card';
import mainIllustration from '../assets/images/main-illustration.svg';
import theme from '../theme';
import { useGetAllProjectsQuery } from '../store/api/bankApi';
import { IBank } from '../Nexus/entities/IBank';
import LoaderSpinner from '../common/LoaderSpinner';
import {
  SearchContainer,
  SearchFieldContainer
} from '../Workbench/Components/SearchContainer';
import DFOSearchBar from '../components/DFOSearchBar/DFOSearchBar';
import { ScrollableContainer } from '../Workbench/Components/ScrollableContainer';
import DFODialog from '../components/DFODialog/DFODialog';
import NewSpecForm from './NewSpecForm';
import { selectBank } from '../store/reducers/selectedBank-reducer';
import { useAppDispatch } from '../store/hooks';

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
    width: 1000
  },
  noProjectsContainer: {
    display: 'flex',
    textAlign: 'center',
    flexDirection: 'column',
    width: 1000,
    gap: 15
  }
});

export default function SpecPage(): React.ReactElement {
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const { data: projects, isLoading } = useGetAllProjectsQuery();

  const [isOpen, setOpen] = useState(false);

  if (isLoading) {
    return <LoaderSpinner />;
  }

  const openProjectModal = (project: any) => {
    dispatch(selectBank(project.id));
    setOpen(true);
  };

  // Implement search here
  const list: any = [];
  const searchFunction = () => {};
  const callback = () => {};

  const renderProjects = (projectList: Record<string, IBank>) => {
    const result = Object.values(projectList).map((element) => {
      return (
        <ListItem
          className={classes.projectListItem}
          key={element.id}
          onClick={() => openProjectModal(element)}
        >
          <Card className={classes.projectListItemCard}>
            <Box className={classes.projectListItemCardContent}>
              <Box className={classes.projectListItemTitleButton}>
                <Typography>{element.title}</Typography>
              </Box>
              <Divider sx={{ color: theme.palette.gray700.main }} />
              <Typography>{element.description}</Typography>
            </Box>
          </Card>
        </ListItem>
      );
    });
    return result;
  };

  return (
    <Box className={classes.projectsContainer}>
      <Box className={classes.titleImageContainer}>
        <Box className={classes.titleSubTitleContainer}>
          <Typography className={classes.title}>
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
      {projects ? (
        <Box className={classes.contentContainer}>
          <Box className={classes.topContainer}>
            <SearchContainer>
              <SearchFieldContainer>
                {' '}
                <DFOSearchBar
                  list={list}
                  placeholder={t('search for banks')}
                  callback={searchFunction}
                  searchFunction={callback}
                />
              </SearchFieldContainer>
            </SearchContainer>
          </Box>
          <ScrollableContainer>
            <List className={classes.list} aria-label="projects">
              {projects && renderProjects(projects)}
            </List>
          </ScrollableContainer>
        </Box>
      ) : (
        <Box className={classes.noProjectsContainer}>
          <Box>
            <Typography sx={{ letterSpacing: 2 }}>
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
