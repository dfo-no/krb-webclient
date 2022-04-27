import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import mainIllustration from '../../assets/images/main-illustration.svg';
import { PAGE_SIZE } from '../../common/Constants';
import LoaderSpinner from '../../common/LoaderSpinner';
import DFODialog from '../../components/DFODialog/DFODialog';
import DFOSearchBar from '../../components/DFOSearchBar/DFOSearchBar';
import { IBank } from '../../Nexus/entities/IBank';
import { useGetProjectsQuery } from '../../store/api/bankApi';
import theme from '../../theme';
import { EditableProvider } from '../Components/EditableContext';
import { ScrollableContainer } from '../Components/ScrollableContainer';
import {
  NewButtonContainer,
  SearchContainer,
  SearchFieldContainer
} from '../Components/SearchContainer';
import NewProjectForm from './NewProjectForm';
import ProjectItem from './ProjectItem';

const useStyles = makeStyles({
  projectsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 100,
    paddingTop: 100,
    paddingLeft: 200,
    backgroundColor: theme.palette.gray100.main,
    height: '100%'
  },
  titleSubTitleContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 15
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    paddingTop: 0,
    gap: 15,
    listStyle: 'none'
  },
  titleImageContainer: {
    display: 'flex',
    gap: 80
  },
  subTitle: {
    width: 600
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

export default function Projects(): React.ReactElement {
  const { t } = useTranslation();
  const classes = useStyles();
  const [projectList, setProjectList] = useState<Record<string, IBank>>();
  const [isOpen, setOpen] = useState(false);

  const { data: projects, isLoading } = useGetProjectsQuery({
    pageSize: PAGE_SIZE,
    page: 1,
    fieldName: 'title',
    order: 'DESC'
  });

  useEffect(() => {
    if (projects) {
      setProjectList(projects);
    }
  }, [setProjectList, projects]);

  if (isLoading) {
    return <LoaderSpinner />;
  }

  const searchFunction = (searchString: string, list: IBank[]) => {
    return Object.values(list).filter((project: IBank) => {
      if (project.title.toLowerCase().includes(searchString.toLowerCase())) {
        return project;
      }
    });
  };

  const searchFieldCallback = (result: Record<string, IBank>) => {
    setProjectList(result);
  };

  const renderProjects = (list: Record<string, IBank>) => {
    return Object.values(list).map((element) => {
      return (
        <EditableProvider key={element.id}>
          <ProjectItem project={element} />
        </EditableProvider>
      );
    });
  };

  const renderNewBankButton = () => {
    return (
      <Button variant="primary" onClick={() => setOpen(true)}>
        {t('create new bank')}
      </Button>
    );
  };

  return (
    <Box className={classes.projectsContainer}>
      <Box className={classes.titleImageContainer}>
        <Box className={classes.titleSubTitleContainer}>
          <Typography
            variant="xlBold"
            color={theme.palette.primary.main}
            sx={{
              letterSpacing: 0.2
            }}
          >
            {t('Welcome to the workbench')}
          </Typography>
          <Box className={classes.subTitle}>
            <Typography>
              {t('In the workbench you can create new banks')}
            </Typography>
          </Box>
        </Box>
        <img src={mainIllustration} alt="main illustration" />
      </Box>
      {projectList ? (
        <Box className={classes.contentContainer}>
          <SearchContainer sx={{ marginBottom: 1 }}>
            <SearchFieldContainer sx={{ width: 500 }}>
              {' '}
              <DFOSearchBar
                list={Object(projects)}
                placeholder={t('search for banks')}
                callback={searchFieldCallback}
                searchFunction={searchFunction}
              />
            </SearchFieldContainer>
            <NewButtonContainer>{renderNewBankButton()}</NewButtonContainer>
          </SearchContainer>
          <ScrollableContainer>
            <List className={classes.list} aria-label="projects">
              {projectList && renderProjects(projectList)}
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
          <Box>{renderNewBankButton()}</Box>
        </Box>
      )}

      <DFODialog
        isOpen={isOpen}
        handleClose={() => setOpen(false)}
        children={<NewProjectForm handleClose={() => setOpen(false)} />}
      />
    </Box>
  );
}
