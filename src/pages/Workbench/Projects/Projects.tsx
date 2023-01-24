import { Box, Button, List, Typography } from '@mui/material/';
import React, { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import mainIllustration from '../../../assets/images/main-illustration.svg';
import LoaderSpinner from '../../../common/LoaderSpinner';
import SearchUtils from '../../../common/SearchUtils';
import DFODialog from '../../../components/DFODialog/DFODialog';
import { DFOSearchBar } from '../../../components/DFOSearchBar/DFOSearchBar';
import { EditableProvider } from '../../../components/EditableContext/EditableContext';
import NewProjectForm from './NewProjectForm';
import { ProjectItem } from './ProjectItem';
import css from './Projects.module.scss';
import { findProjects, ProjectForm } from '../../../api/openapi-fetch';
import {
  NewButtonContainer,
  SearchContainer,
  SearchFieldContainer,
} from '../../../components/SearchContainer/SearchContainer';

export function Projects(): React.ReactElement {
  const { t } = useTranslation();
  const [projectList, setProjectList] = useState<ProjectForm[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    findProjects({}).then(async (projectsResponse) => {
      setLoading(false);
      if (projectsResponse) {
        setProjectList(projectsResponse.data);
      }
    });
  }, [setProjectList]);

  if (loading) {
    return <LoaderSpinner />;
  }

  const searchFunction = (searchString: string, list: ProjectForm[]) => {
    return SearchUtils.searchTitleAndDescription(list, searchString);
  };

  const searchFieldCallback = (result: ProjectForm[]) => {
    setProjectList(result);
  };

  const renderProjects = (list: ProjectForm[]) => {
    return list.map((element) => {
      return (
        <EditableProvider key={element.ref}>
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

  if (!projectList?.length) {
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
              list={projectList}
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
