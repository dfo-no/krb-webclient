import Box from '@mui/material/Box';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LoaderSpinner from '../../common/LoaderSpinner';
import { useGetProjectQuery } from '../../store/api/bankApi';
import theme from '../../theme';
import NeedList from './Need/NeedList';
import NeedToolbar from './Need/NeedToolbar';
import NewNeed from './Need/NewNeed';
import NewRequirement from './Requirement/NewRequirement';
import RequirementsList from './Requirement/RequirementsList';
import { useSelectState } from './SelectContext';
import { StandardContainer } from '../Components/StandardContainer';
import { Card } from '@mui/material/';
import DeleteNeedForm from './Need/DeleteNeedForm';
import { ScrollableContainer } from '../Components/ScrollableContainer';

interface IRouteParams {
  projectId: string;
}

export default function Create(): React.ReactElement {
  const { projectId } = useParams<IRouteParams>();
  const { data: project, isLoading } = useGetProjectQuery(projectId);
  const { needIndex, setNeedIndex, setDeletingNeed } = useSelectState();

  useEffect(() => {
    if (
      needIndex === null &&
      project &&
      project.needs &&
      project.needs.length > 0
    ) {
      setNeedIndex(0);
    }
  }, [needIndex, project, setNeedIndex]);

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
          backgroundColor: theme.palette.gray300.main,
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
            {project.needs[index]?.requirements && (
              <RequirementsList
                requirements={project.needs[index].requirements}
              />
            )}
          </ScrollableContainer>
        </Box>
      </Card>
    );
  };

  return (
    <Box sx={{ display: 'flex', width: '100%', height: '100%' }}>
      <Box
        sx={{
          width: '25%',
          height: '100%',
          backgroundColor: theme.palette.dfoWhite.main
        }}
      >
        <NewNeed />
        <NeedList parentables={project.needs} />
      </Box>
      <Box sx={{ height: '100%', flexGrow: 1, minWidth: 0 }}>
        {needIndex !== null ? (
          <StandardContainer>
            <DeleteNeedForm
              child={renderNeedCard(needIndex)}
              project={project}
              need={project.needs[needIndex]}
              handleClose={() => setDeletingNeed(false)}
            />
          </StandardContainer>
        ) : (
          <div>Ingen behov valgt</div>
        )}
      </Box>
    </Box>
  );
}
