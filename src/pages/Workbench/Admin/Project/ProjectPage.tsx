import React, { useState } from 'react';
import { Button, List } from '@mui/material/';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import css from './ProjectPage.module.scss';
import LoaderSpinner from '../../../../common/LoaderSpinner';
import NewPublicationForm from './NewPublicationForm';
import PublicationItem from './PublicationItem';
import { EditableProvider } from '../../../../components/EditableContext/EditableContext';
import { FormContainerBox } from '../../../../components/Form/FormContainerBox';
import { IPublication } from '../../../../Nexus/entities/IPublication';
import { IRouteProjectParams } from '../../../../models/IRouteProjectParams';
import {
  NewButtonContainer,
  SearchContainer
} from '../../../../components/SearchContainer/SearchContainer';
import { StandardContainer } from '../../../../components/StandardContainer/StandardContainer';
import { useGetProjectQuery } from '../../../../store/api/bankApi';

function ProjectPage(): React.ReactElement {
  const { t } = useTranslation();
  const [isCreating, setCreating] = useState(false);

  const { projectId } = useParams<IRouteProjectParams>();
  const { data: project, isLoading } = useGetProjectQuery(projectId);

  if (isLoading) {
    return <LoaderSpinner />;
  }

  if (!project) {
    return <></>;
  }

  const getOrderedPublications = (): IPublication[] => {
    const publications = [...project.publications];
    publications.reverse();
    return publications;
  };

  const renderPublication = (publication: IPublication, i: number) => {
    return (
      <li key={i} className={css.Publication}>
        <PublicationItem publication={publication} />
      </li>
    );
  };

  return (
    <StandardContainer className={css.ProjectPage}>
      <SearchContainer>
        <NewButtonContainer>
          <Button
            className={isCreating ? css.Disabled : undefined}
            disabled={isCreating}
            variant="primary"
            onClick={() => setCreating(true)}
          >
            {t('New publication')}
          </Button>
        </NewButtonContainer>
      </SearchContainer>

      {isCreating && (
        <FormContainerBox>
          <NewPublicationForm
            project={project}
            handleClose={() => setCreating(false)}
          />
        </FormContainerBox>
      )}
      <EditableProvider>
        <List aria-label="publications" className={css.Publications}>
          {getOrderedPublications().map(renderPublication)}
        </List>
      </EditableProvider>
    </StandardContainer>
  );
}

export default ProjectPage;
