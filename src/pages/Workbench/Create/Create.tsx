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
  RequirementForm,
  useFindNeeds,
  useFindRequirements,
  useProject,
} from '../../../api/nexus2';

export default function Create(): React.ReactElement {
  const { projectId: projectRef } = useParams<IRouteProjectParams>();
  const { needs, isLoading: needsIsLoading } = useFindNeeds(projectRef);
  const { project, isLoading: projectIsLoading } = useProject(projectRef);
  const [needsWithParent, setNeedsWithParent] = useState<Need[]>([]);

  const { needIndex, setNeedIndex, setNeedId, setDeleteCandidateId } =
    useSelectState();
  const { setTitle } = HeaderContainer.useContainer();

  const currentNeed = needIndex !== null ? needs?.[needIndex] : undefined;

  const {
    currentRequirements,
    isLoading, // TODO
    isError, // TODO
  } = useFindRequirements(projectRef, currentNeed?.ref || '');

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
    return (
      <Box className={css.Need}>
        <NeedHeader project={project} need={currentNeed} />
        <Box className={css.Requirements}>
          <NewRequirement
            projectRef={projectRef}
            needRef={currentNeed?.ref || ''}
          />
          <ScrollableContainer className={css.List}>
            {currentRequirements &&
              currentRequirements.map(
                (
                  req:
                    | { ref: string; title: string; description: string }
                    | undefined
                ) => {
                  if (!req) return null;
                  return (
                    <VariantProvider key={req.ref}>
                      <Requirement
                        projectRef={projectRef}
                        needRef={currentNeed?.ref || ''}
                        requirement={req}
                      />
                    </VariantProvider>
                  );
                }
              )}
          </ScrollableContainer>
        </Box>
      </Box>
    );
  };

  return (
    <Box className={css.Create}>
      <CreateSideBar project={project} needs={needsWithParent} />
      <Box className={css.MainContent}>
        {currentNeed ? (
          <DeleteNeed
            need={currentNeed}
            canBeDeleted={
              !!currentRequirements && currentRequirements.length > 0
            }
            handleClose={needDeleted}
          >
            {renderNeedCard()}
          </DeleteNeed>
        ) : (
          <>{renderNeedCard()}</>
        )}
      </Box>
    </Box>
  );
}
