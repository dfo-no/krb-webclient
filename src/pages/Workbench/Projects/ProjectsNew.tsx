import React, { ReactElement, useEffect, useState } from 'react';
import { Box, Button, List, Typography } from '@mui/material/';
import { useTranslation } from 'react-i18next';
// import { RateLimit } from 'async-sema';

import css from './Projects.module.scss';
import DFODialog from '../../../components/DFODialog/DFODialog';
import { DFOSearchBar } from '../../../components/DFOSearchBar/DFOSearchBarNew';
import LoaderSpinner from '../../../common/LoaderSpinner';
import mainIllustration from '../../../assets/images/main-illustration.svg';
import NewProjectForm from './NewProjectForm';
import { ProjectItem } from './ProjectItemNew';
import SearchUtils from '../../../common/SearchUtils';
import { EditableProvider } from '../../../components/EditableContext/EditableContext';
// import { IBank } from '../../../Nexus/entities/IBank';
import {
  NewButtonContainer,
  SearchContainer,
  SearchFieldContainer,
} from '../../../components/SearchContainer/SearchContainer';
import { PAGE_SIZE } from '../../../common/Constants';
import { findProjects, ProjectForm } from '../../../api/openapi-fetch';

export function ProjectsNew(): React.ReactElement {
  // const lim = RateLimit(15, { uniformDistribution: true });
  const { t } = useTranslation();
  const [projectList, setProjectList] = useState<ProjectForm[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [allProjects, setAllProjects] = useState<ProjectForm[]>();
  const [isOpen, setOpen] = useState(false);

  // const { data: projects, isLoading } = useGetProjectsQuery({
  //   pageSize: PAGE_SIZE,
  //   page: 1,
  //   fieldName: 'title',
  //   order: 'ASC',
  // });

  useEffect(() => {
    findProjects({}).then(async (projectsResponse) => {
      setLoading(false);
      if (projectsResponse) {
        setProjectList(projectsResponse.data);
        setAllProjects(projectsResponse.data);
      }
    });
  }, [setProjectList, setAllProjects]);

  if (loading) {
    return <LoaderSpinner />;
  }

  // useEffect(() => {
  //   const x = async () => {
  //     if (!allProjects) return;
  //     console.log(`yo allprojects length: ${allProjects.length} `);
  //     for (let i = 0; i < allProjects.length; i++) {
  //       console.log(i);

  //       const project = allProjects[i];
  //       await lim();
  //       console.log('hmmm:', i);
  //       if (i < 5) continue;
  //       if (project.ref) {
  //         deleteProject({ projectRef: project.ref });
  //       }
  //     }
  //   };
  //   x();
  // }, [allProjects, lim]);

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
