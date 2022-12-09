import React, { ReactElement, useEffect, useState } from 'react';
import { Box, Button, List, Typography } from '@mui/material/';
import { useTranslation } from 'react-i18next';
import { Fetcher } from 'openapi-typescript-fetch';

import css from './Projects.module.scss';
import DFODialog from '../../../components/DFODialog/DFODialog';
// import DFOSearchBar from '../../../components/DFOSearchBar/DFOSearchBar';
// import LoaderSpinner from '../../../common/LoaderSpinner';
import mainIllustration from '../../../assets/images/main-illustration.svg';
import NewProjectForm from './NewProjectForm';
// import ProjectItem from './ProjectItem';
// import SearchUtils from '../../../common/SearchUtils';
import { EditableProvider } from '../../../components/EditableContext/EditableContext';
// import { IBank } from '../../../Nexus/entities/IBank';
import {
  NewButtonContainer,
  SearchContainer,
  SearchFieldContainer,
} from '../../../components/SearchContainer/SearchContainer';
import { paths, components } from '../../../api/generated';
import { ProjectItemNew } from './ProjectItemNew';
// import { PAGE_SIZE } from '../../../common/Constants';
// import { useGetProjectsQuery } from '../../../store/api/bankApi';

const fetcher = Fetcher.for<paths>();

fetcher.configure({
  baseUrl: 'https://krb-backend-api.azurewebsites.net',
  // init: {
  //   headers: {
  //     ...
  // },
  // },
  // use: [...] // middlewares
});

const findProjects = fetcher.path('/api/v1/projects').method('get').create();

export type ProjectForm = components['schemas']['ProjectForm'];
export function ProjectsNew(): React.ReactElement {
  console.log('yo');
  const { t } = useTranslation();
  const [projectList, setProjectList] = useState<ProjectForm[]>();
  const [allProjects, setAllProjects] = useState<ProjectForm[]>();
  const [isOpen, setOpen] = useState(false);

  // const { data: projects, isLoading } = useGetProjectsQuery({
  //   pageSize: PAGE_SIZE,
  //   page: 1,
  //   fieldName: 'title',
  //   order: 'ASC',
  // });

  useEffect(() => {
    console.log('yo');

    findProjects({}).then((projectsResponse) => {
      if (projectsResponse) {
        setProjectList(projectsResponse.data);
        setAllProjects(projectsResponse.data);
      }
    });
  }, [setProjectList, setAllProjects]);

  // const searchFunction = (searchString: string, list: IBank[]) => {
  //   return SearchUtils.searchBaseModel(list, searchString) as IBank[];
  // };

  // const searchFieldCallback = (result: IBank[]) => {
  //   setProjectList(result);
  // };

  const renderProjects = (list: ProjectForm[]) => {
    return list.map((element) => {
      return (
        <EditableProvider key={element.ref}>
          <ProjectItemNew project={element} />
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
            {/* <DFOSearchBar
              list={allProjects}
              placeholder={t('common.Search for banks')}
              callback={searchFieldCallback}
              searchFunction={searchFunction}
            /> */}
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
