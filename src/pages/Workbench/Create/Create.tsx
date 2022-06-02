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
import { useGetProjectQuery } from '../../../store/api/bankApi';
import { useSelectState } from './SelectContext';
import { VariantProvider } from '../VariantContext';

export default function Create(): React.ReactElement {
  const { projectId } = useParams<IRouteProjectParams>();
  const { data: project, isLoading } = useGetProjectQuery(projectId);
  const { needIndex, setNeedIndex, setNeedId, setDeleteMode } =
    useSelectState();

  useEffect(() => {
    if (project && !needIndex) {
      if (project.needs.length >= 1) {
        const index = project.needs.findIndex(
          (n) => n.id === project.needs[0].id
        );
        setNeedIndex(index);
        setNeedId(project.needs[index].id);
      }
    }
  });

  if (isLoading) {
    return <LoaderSpinner />;
  }

  if (!project) {
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

  if (needIndex === null || !project.needs[needIndex]) {
    return renderCreatePageWithContent(
      <>{project.needs.length === 0 && <ProjectStart project={project} />}</>
    );
  }

  const needDeleted = (): void => {
    setDeleteMode('');
    if (project.needs.length === 1) {
      setNeedIndex(null);
      setNeedId(null);
    }
    if (needIndex === project.needs.length - 1) {
      setNeedIndex(needIndex - 1);
      setNeedId(project.needs[needIndex - 1].id);
    }
  };

  const renderNeedCard = (): ReactElement => {
    return (
      <Box className={css.Need}>
        <NeedHeader />
        <Box className={css.Requirements}>
          <NewRequirement need={project.needs[needIndex]} />
          <ScrollableContainer className={css.List}>
            {project.needs[needIndex] &&
              project.needs[needIndex].requirements.map((req, index) => {
                return (
                  <VariantProvider key={req.id}>
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
    <Box>
      <DeleteNeed
        children={renderNeedCard()}
        need={project.needs[needIndex]}
        handleClose={needDeleted}
      />
    </Box>
  );
}
