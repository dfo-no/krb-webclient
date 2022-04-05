import React from 'react';
import { Box, Typography } from '@mui/material/';
import { DFOCardHeader } from '../../../components/DFOCard/DFOCardHeader';
import { DFOHeaderContentBox } from '../../../components/DFOCard/DFOHeaderContentBox';
import { DFOCardHeaderIconButton } from '../../../components/DFOCard/DFOCardHeaderIconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import theme from '../../../theme';
import EditNeed from './EditNeed';
import { useSelectState } from '../SelectContext';
import { useParams } from 'react-router-dom';
import { useGetProjectQuery } from '../../../store/api/bankApi';
import { IRouteParams } from '../../Models/IRouteParams';

export default function NeedHeader(): React.ReactElement {
  const { projectId } = useParams<IRouteParams>();
  const { data: project } = useGetProjectQuery(projectId);
  const { needIndex, setDeleteMode } = useSelectState();

  if (!project || needIndex === null) {
    return <></>;
  }

  return (
    <DFOCardHeader>
      <DFOHeaderContentBox>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            borderBottom: '1px solid'
          }}
        >
          <Typography variant="lg" sx={{ fontWeight: 'bold' }}>
            {project.needs[needIndex] && project.needs[needIndex].title}
          </Typography>
          <EditNeed need={project.needs[needIndex]} />
          <DFOCardHeaderIconButton
            hoverColor={theme.palette.errorRed.main}
            onClick={() => setDeleteMode(project.needs[needIndex].id)}
          >
            <DeleteIcon />
          </DFOCardHeaderIconButton>
        </Box>
        <Typography variant="sm" sx={{ paddingTop: 1, fontWeight: 'bold' }}>
          {project.needs[needIndex] && project.needs[needIndex].description}
        </Typography>
      </DFOHeaderContentBox>
    </DFOCardHeader>
  );
}
