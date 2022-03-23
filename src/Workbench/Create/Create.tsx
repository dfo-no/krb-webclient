import { Box, Card, Typography } from '@mui/material/';
import React from 'react';
import { useParams } from 'react-router-dom';
import LoaderSpinner from '../../common/LoaderSpinner';
import { useGetProjectQuery } from '../../store/api/bankApi';
import theme from '../../theme';
import NeedToolbar from './Need/NeedToolbar';
import NewNeed from './Need/NewNeed';
import NewRequirement from './Requirement/NewRequirement';
import ProjectStart from './ProjectStart';
import Requirement from './Requirement/Requirement';
import { useSelectState } from './SelectContext';
import Sidebar from './Sidebar';
import { ScrollableContainer } from '../Components/ScrollableContainer';
import { StandardContainer } from '../Components/StandardContainer';

interface IRouteParams {
  projectId: string;
}

export default function Create(): React.ReactElement {
  const { projectId } = useParams<IRouteParams>();
  const { data: project, isLoading } = useGetProjectQuery(projectId);
  const { needIndex } = useSelectState();

  if (isLoading) {
    return <LoaderSpinner />;
  }

  if (!project) {
    return <></>;
  }

  const renderNeedCard = (index: number) => {
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
        <NeedToolbar need={project.needs[index]} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            paddingLeft: 6,
            paddingRight: 6,
            flexGrow: 1,
            minHeight: 0
          }}
        >
          <NewRequirement need={project.needs[index]} />
          <ScrollableContainer>
            {project.needs[index] &&
              project.needs[index].requirements.map((r, r_idx) => {
                return (
                  <Requirement
                    key={r.id}
                    requirementIndex={r_idx}
                    needIndex={index}
                    project={project}
                  />
                );
              })}
          </ScrollableContainer>
        </Box>
      </Card>
    );
  };

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
        <Sidebar parentables={project.needs} />
      </Box>
      <Box sx={{ height: '100%', flexGrow: 1, minWidth: 0 }}>
        {needIndex !== null ? (
          <StandardContainer sx={{ width: '90%' }}>
            {renderNeedCard(needIndex)}
          </StandardContainer>
        ) : (
          <>
            {project.needs.length >= 1 && (
              <Typography>Velg et behov</Typography>
            )}
            {project.needs.length === 0 && <ProjectStart project={project} />}
          </>
        )}
      </Box>
    </Box>
  );
}
