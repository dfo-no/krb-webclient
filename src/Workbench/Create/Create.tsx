import { Box, Card } from '@mui/material/';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LoaderSpinner from '../../common/LoaderSpinner';
import { useGetProjectQuery } from '../../store/api/bankApi';
import theme from '../../theme';
import NeedHeader from './Need/NeedHeader';
import NewNeed from './Need/NewNeed';
import NewRequirement from './Requirement/NewRequirement';
import ProjectStart from './ProjectStart';
import Requirement from './Requirement/Requirement';
import { useSelectState } from './SelectContext';
import { ScrollableContainer } from '../Components/ScrollableContainer';
import { StandardContainer } from '../Components/StandardContainer';
import DeleteNeed from './Need/DeleteNeed';
import CreateSideBar from './CreateSideBar';
import { VariantProvider } from '../Components/VariantContext';
import { IRouteParams } from '../Models/IRouteParams';

export default function Create(): React.ReactElement {
  const { projectId } = useParams<IRouteParams>();
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

  const renderCreatePageWithContent = (children: React.ReactNode) => {
    return (
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          height: '100%',
          backgroundColor: theme.palette.gray100.main
        }}
      >
        <Box sx={{ width: '25%', height: '100%' }}>
          <NewNeed buttonText={'Legg til nytt behov'} />
          <CreateSideBar />
        </Box>
        <Box sx={{ height: '100%', flexGrow: 1, minWidth: 0 }}>{children}</Box>
      </Box>
    );
  };

  if (needIndex === null || !project.needs[needIndex]) {
    return renderCreatePageWithContent(
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          height: '100%',
          backgroundColor: theme.palette.gray100.main
        }}
      >
        <>{project.needs.length === 0 && <ProjectStart project={project} />}</>
      </Box>
    );
  }

  const needDeleted = () => {
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

  const renderNeedCard = () => {
    return (
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: theme.palette.gray200.main,
          height: '100%',
          paddingBottom: 2
        }}
      >
        <NeedHeader />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            paddingLeft: 6,
            paddingRight: 6,
            flexGrow: 1,
            minHeight: 0,
            width: '100%'
          }}
        >
          <NewRequirement need={project.needs[needIndex]} />
          <ScrollableContainer>
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
      </Card>
    );
  };

  return renderCreatePageWithContent(
    <StandardContainer sx={{ width: '90%', maxHeight: '100%' }}>
      <DeleteNeed
        children={renderNeedCard()}
        need={project.needs[needIndex]}
        handleClose={needDeleted}
      />
    </StandardContainer>
  );
}
