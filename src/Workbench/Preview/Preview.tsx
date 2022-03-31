import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import React from 'react';
import { Route, useParams } from 'react-router-dom';
import LoaderSpinner from '../../common/LoaderSpinner';
import { useGetProjectQuery } from '../../store/api/bankApi';
import theme from '../../theme';
import { IRouteParams } from '../Models/IRouteParams';
import Requirements from './Requirements';
import Sidebar from './Sidebar';

export default function Preview(): React.ReactElement {
  const { projectId } = useParams<IRouteParams>();

  const { data: project } = useGetProjectQuery(projectId);

  if (!project) {
    return <LoaderSpinner />;
  }

  return (
    <Box
      sx={{
        flex: '1',
        height: '100%',
        width: '100%'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          height: '100%',
          width: '100%'
        }}
      >
        <Sidebar parentableArray={project.products} />
        <Requirements project={project} />
      </Box>
    </Box>
  );
}
