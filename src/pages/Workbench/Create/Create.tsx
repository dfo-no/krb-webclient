import React, { ReactElement, useEffect } from 'react';
import { Box } from '@mui/material/';
import { useParams } from 'react-router-dom';

import css from './Create.module.scss';
import CreateSideBar from './CreateSideBar';
import DeleteNeed from './Need/DeleteNeed';
import LoaderSpinner from '../../../common/LoaderSpinner';
import NeedHeader from './Need/NeedHeader';
import NewRequirement from './Requirement/NewRequirement';
import ProjectStart from './ProjectStart';
import Requirement from './Requirement/Requirement';
import { IRouteProjectParams } from '../../../models/IRouteProjectParams';
import { ScrollableContainer } from '../../../components/ScrollableContainer/ScrollableContainer';
import { useSelectState } from './SelectContext';
import { VariantProvider } from '../VariantContext';
import { HeaderContainer } from '../../../components/Header/HeaderContext';
import {
  useFindNeeds,
  useFindRequirementsForProject,
  useProject,
} from '../../../api/openapi-fetch';

export default function Create(): React.ReactElement {
  const { projectId: projectRef } = useParams<IRouteProjectParams>();
  const { needs, isLoading: needsIsLoading } = useFindNeeds(projectRef);
  const { project, isLoading: projectIsLoading } = useProject(projectRef);

  const { requirements: allRequirements } =
    useFindRequirementsForProject(projectRef);

  const { needIndex, setNeedIndex, setNeedId, setDeleteMode } =
    useSelectState();
  const { setTitle } = HeaderContainer.useContainer();

  useEffect(() => {
    if (project && !needIndex) {
      if (needs && needs.length >= 1) {
        const index = needs.findIndex((n) => n.ref === needs[0].ref);
        setNeedIndex(index);
        setNeedId(needs[index].ref);
      }
    }
  });

  useEffect(() => {
    if (project) setTitle(project?.title || '');
    return function cleanup() {
      setTitle('');
    };
  }, [project, setTitle]);

  if (projectIsLoading || needsIsLoading) {
    return <LoaderSpinner />;
  }

  if (!needs || !project) {
    return <></>;
  }

  const renderCreatePageWithContent = (
    children: ReactElement
  ): ReactElement => {
    return (
      <Box className={css.Create}>
        <CreateSideBar />
        <Box className={css.MainContent}>{children}</Box>
      </Box>
    );
  };

  if (needIndex === null || !needs[needIndex]) {
    return renderCreatePageWithContent(
      <>{needs.length === 0 && <ProjectStart project={project} />}</>
    );
  }
  const currentNeed = needs[needIndex];

  const currentRequirements = allRequirements?.filter(
    (requirement) => requirement.needRef === currentNeed.ref
  );

  const needDeleted = (): void => {
    setDeleteMode('');
    if (needs.length === 1) {
      setNeedIndex(null);
      setNeedId(undefined);
    }
    if (needIndex === needs.length - 1) {
      setNeedIndex(needIndex - 1);
      setNeedId(needs[needIndex - 1].ref);
    }
  };

  const renderNeedCard = (): ReactElement => {
    return (
      <Box className={css.Need}>
        <NeedHeader />
        <Box className={css.Requirements}>
          <NewRequirement need={needs[needIndex]} />
          <ScrollableContainer className={css.List}>
            {currentRequirements &&
              currentRequirements.map((req, index) => {
                return (
                  <VariantProvider key={req.ref}>
                    <Requirement requirementIndex={index} />
                  </VariantProvider>
                );
              })}
          </ScrollableContainer>
        </Box>
      </Box>
    );
  };

  return renderCreatePageWithContent(
    <DeleteNeed
      need={currentNeed}
      canBeDeleted={!!currentRequirements && currentRequirements.length > 0}
      handleClose={needDeleted}
    >
      {renderNeedCard()}
    </DeleteNeed>
  );
}
