import Grid from '@mui/material/Grid';
import React from 'react';
import { useParams } from 'react-router-dom';
import LoaderSpinner from '../../common/LoaderSpinner';
import { useGetProjectQuery } from '../../store/api/bankApi';
import theme from '../../theme';
import PreviewSideBar from './PreviewSideBar';
import Requirements from './Requirements';

interface IRouteParams {
  projectId: string;
}

export default function Preview(): React.ReactElement {
  const { projectId } = useParams<IRouteParams>();

  const { data: project } = useGetProjectQuery(projectId);

  if (!project) {
    return <LoaderSpinner />;
  }

  return (
    <Grid
      container
      spacing={2}
      sx={{
        flex: '1',
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: theme.palette.gray100.main,
        pr: 1
      }}
    >
      <Grid item xs={3}>
        <PreviewSideBar parentableArray={project.products} />
      </Grid>
      <Grid
        item
        xs={9}
        sx={{ backgroundColor: theme.palette.dfoBackgroundBlue.main }}
      >
        <Requirements project={project} />
      </Grid>
    </Grid>
  );
}
