import { Box, Typography } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import { DFOHeaderContentBox } from '../../../components/DFOCard/DFOHeaderContentBox';
import { useGetProjectQuery } from '../../../store/api/bankApi';
import theme from '../../../theme';
import { IRouteParams } from '../../Models/IRouteParams';

function ProjectHeader(): React.ReactElement {
  const { projectId } = useParams<IRouteParams>();
  const { data: project } = useGetProjectQuery(projectId);

  if (!project) {
    return <></>;
  }

  return (
    <DFOHeaderContentBox>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Typography variant="lgBold">{project.title}</Typography>
      </Box>
      <Typography
        variant={'sm'}
        sx={{
          borderTop: `0.1rem solid ${theme.palette.silver.main}`,
          paddingTop: 1
        }}
      >
        {project.description}
      </Typography>
    </DFOHeaderContentBox>
  );
}

export default ProjectHeader;
