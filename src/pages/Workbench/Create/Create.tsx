import React, { ReactElement, useEffect, useState } from 'react';
import { Box } from '@mui/material/';
import { useParams } from 'react-router-dom';

import css from './Create.module.scss';
import CreateSideBar from './CreateSideBar';
import DeleteNeed from './Need/DeleteNeed';
import LoaderSpinner from '../../../common/LoaderSpinner';
import { NeedHeader } from './Need/NeedHeader';
import { NewRequirement } from './Requirement/NewRequirement';
import ProjectStart from './ProjectStart';
import Requirement from './Requirement/Requirement';
import { IRouteProjectParams } from '../../../models/IRouteProjectParams';
import { ScrollableContainer } from '../../../components/ScrollableContainer/ScrollableContainer';
import { useSelectState } from './SelectContext';
import { VariantProvider } from '../VariantContext';
import { HeaderContainer } from '../../../components/Header/HeaderContext';
import {
  Need,
  useFindNeeds,
  useFindRequirementsForProject,
  useProject,
} from '../../../api/nexus2';

export default function Create(): React.ReactElement {
  const { projectId: projectRef } = useParams<IRouteProjectParams>();
  const { needs, isLoading: needsIsLoading } = useFindNeeds(projectRef);
  const { project, isLoading: projectIsLoading } = useProject(projectRef);
  const [needsWithParent, setNeedsWithParent] = useState<Need[]>([]);

  const { requirements: allRequirements } =
    useFindRequirementsForProject(projectRef);

  const { needIndex, setNeedIndex, setNeedId, setDeleteCandidateId } =
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
    if (needs) {
      setNeedsWithParent(needs.map((need) => ({ ...need, parent: '' })));
    }
  }, [needs]);

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

  if (needIndex === null || !needs[needIndex]) {
    return (
      <Box className={css.Create}>
        <CreateSideBar project={project} needs={needsWithParent} />
        <Box className={css.MainContent}>
          <>
            {needs.length === 0 && (
              <ProjectStart needs={needs} project={project} />
            )}
          </>
        </Box>
      </Box>
    );
  }
  const currentNeed = needs[needIndex];

  const currentRequirements = allRequirements?.filter(
    (requirement) => requirement.needRef === currentNeed.ref
  );

  const needDeleted = (): void => {
    setDeleteCandidateId('');
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
    console.log('gserghrt');

    return (
      <Box className={css.Need}>
        <NeedHeader project={project} need={currentNeed} />
        <Box className={css.Requirements}>
          <NewRequirement projectRef={projectRef} need={currentNeed} />
          <ScrollableContainer className={css.List}>
            {currentRequirements &&
              currentRequirements.map((req) => {
                return (
                  <VariantProvider key={req.ref}>
                    <Requirement projectRef={projectRef} requirement={req} />
                  </VariantProvider>
                );
              })}
          </ScrollableContainer>
        </Box>
      </Box>
    );
  };

  return (
    <Box className={css.Create}>
      <CreateSideBar project={project} needs={needsWithParent} />
      <Box className={css.MainContent}>
        <DeleteNeed
          need={currentNeed}
          canBeDeleted={!!currentRequirements && currentRequirements.length > 0}
          handleClose={needDeleted}
        >
          {renderNeedCard()}
        </DeleteNeed>
      </Box>
    </Box>
  );
}
