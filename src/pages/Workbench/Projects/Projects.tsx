import { Box, Button, List, Typography } from '@mui/material/';
import makeStyles from '@mui/styles/makeStyles';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import DFODialog from '../../../components/DFODialog/DFODialog';
import DFOSearchBar from '../../../components/DFOSearchBar/DFOSearchBar';
import theme from '../../../theme';
import LoaderSpinner from '../../../common/LoaderSpinner';
import mainIllustration from '../../../assets/images/main-illustration.svg';
import NewProjectForm from './NewProjectForm';
import ProjectItem from './ProjectItem';
import SearchUtils from '../../../common/SearchUtils';
import { EditableProvider } from '../../../components/EditableContext/EditableContext';
import { IBank } from '../../../Nexus/entities/IBank';
import { PAGE_SIZE } from '../../../common/Constants';
import { ScrollableContainer } from '../../../components/ScrollableContainer/ScrollableContainer';
import {
  NewButtonContainer,
  SearchContainer,
  SearchFieldContainer
} from '../../../components/SearchContainer/SearchContainer';
import { useGetProjectsQuery } from '../../../store/api/bankApi';

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
  const [projectList, setProjectList] = useState<IBank[]>();
  const [allProjects, setAllProjects] = useState<IBank[]>();
  const [isOpen, setOpen] = useState(false);

  const { data: projects, isLoading } = useGetProjectsQuery({
    pageSize: PAGE_SIZE,
    page: 1,
    fieldName: 'title',
    order: 'DESC'
  });

  useEffect(() => {
    if (projects) {
      setProjectList(Object.values(projects));
      setAllProjects(Object.values(projects));
    }
  }, [setProjectList, setAllProjects, projects]);

  if (isLoading) {
    return <LoaderSpinner />;
  }

  const searchFunction = (searchString: string, list: IBank[]) => {
    return SearchUtils.searchBaseModel(list, searchString) as IBank[];
  };

  const searchFieldCallback = (result: IBank[]) => {
    setProjectList(result);
  };

  const renderProjects = (list: IBank[]) => {
    return list.map((element) => {
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
        {t('Create new project')}
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
      {allProjects && (
        <Box className={classes.contentContainer}>
          <SearchContainer sx={{ marginBottom: 1 }}>
            <SearchFieldContainer>
              <DFOSearchBar
                list={allProjects}
                placeholder={t('Search for banks')}
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
      )}

      <DFODialog
        isOpen={isOpen}
        handleClose={() => setOpen(false)}
        children={<NewProjectForm handleClose={() => setOpen(false)} />}
      />
    </Box>
  );
}
