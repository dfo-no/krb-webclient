import React, { ReactElement, useEffect, useState } from 'react';
import { Box, Button, List, Typography } from '@mui/material/';
import { useTranslation } from 'react-i18next';

import css from './Projects.module.scss';
import DFODialog from '../../../components/DFODialog/DFODialog';
import DFOSearchBar from '../../../components/DFOSearchBar/DFOSearchBar';
import LoaderSpinner from '../../../common/LoaderSpinner';
import mainIllustration from '../../../assets/images/main-illustration.svg';
import NewProjectForm from './NewProjectForm';
import ProjectItem from './ProjectItem';
import SearchUtils from '../../../common/SearchUtils';
import { EditableProvider } from '../../../components/EditableContext/EditableContext';
import { IBank } from '../../../Nexus/entities/IBank';
import {
  NewButtonContainer,
  SearchContainer,
  SearchFieldContainer
} from '../../../components/SearchContainer/SearchContainer';
import { PAGE_SIZE } from '../../../common/Constants';
import { useGetProjectsQuery } from '../../../store/api/bankApi';

export default function Projects(): React.ReactElement {
  const { t } = useTranslation();
  const [projectList, setProjectList] = useState<IBank[]>();
  const [allProjects, setAllProjects] = useState<IBank[]>();
  const [isOpen, setOpen] = useState(false);

  const { data: projects, isLoading } = useGetProjectsQuery({
    pageSize: PAGE_SIZE,
    page: 1,
    fieldName: 'title',
    order: 'ASC'
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

  const renderNewBankButton = (): ReactElement => {
    return (
      <Button variant="primary" onClick={() => setOpen(true)}>
        {t('Create new project')}
      </Button>
    );
  };

  const renderNewProjectDialog = (): ReactElement => {
    return (
      <DFODialog
        isOpen={isOpen}
        handleClose={() => setOpen(false)}
        children={<NewProjectForm handleClose={() => setOpen(false)} />}
      />
    );
  };

  if (!allProjects?.length) {
    return (
      <Box className={css.Projects}>
        <Box className={css.TitleContainer}>
          <Box>
            <Typography variant="h1">
              {t('Welcome to the workbench')}
            </Typography>
            <Box>
              <Typography>
                {t('In the workbench you can create new banks')}
              </Typography>
            </Box>
          </Box>
          <img src={mainIllustration} alt="main illustration" />
          <NewButtonContainer>{renderNewBankButton()}</NewButtonContainer>
        </Box>
        {renderNewProjectDialog()}
      </Box>
    );
  }

  return (
    <Box className={css.Projects}>
      <div className={css.ContentContainer}>
        <SearchContainer className={css.SearchContainer}>
          <SearchFieldContainer>
            <DFOSearchBar
              list={allProjects}
              placeholder={t('common.Search for banks')}
              callback={searchFieldCallback}
              searchFunction={searchFunction}
            />
          </SearchFieldContainer>
          <NewButtonContainer>{renderNewBankButton()}</NewButtonContainer>
        </SearchContainer>
        <div className={css.ListContainer}>
          <List className={css.List} aria-label="projects">
            {projectList && renderProjects(projectList)}
          </List>
        </div>
      </div>
      {renderNewProjectDialog()}
    </Box>
  );
}
