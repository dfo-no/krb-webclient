import React from 'react';
import { Box, Typography } from '@mui/material';
import { DFOCardHeaderIconButton } from '../../../components/DFOCard/DFOCardHeaderIconButton';
import EditIcon from '@mui/icons-material/Edit';
import { useParams } from 'react-router-dom';
import { useGetProjectQuery } from '../../../store/api/bankApi';
import { IRouteParams } from '../../Models/IRouteParams';
import { DFOHeaderContentBox } from '../../../components/DFOCard/DFOHeaderContentBox';

interface IProps {
  editButtonOnClick: () => void;
}

function ProjectHeader({ editButtonOnClick }: IProps): React.ReactElement {
  const { projectId } = useParams<IRouteParams>();
  const { data: project } = useGetProjectQuery(projectId);

  if (!project) {
    return <></>;
  }

  return (
    <DFOHeaderContentBox>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Typography variant="bigBold">{project.title}</Typography>
        <DFOCardHeaderIconButton
          sx={{ marginLeft: 'auto' }}
          onClick={editButtonOnClick}
        >
          <EditIcon />
        </DFOCardHeaderIconButton>
      </Box>
      <Typography
        variant="small"
        sx={{ borderTop: '1px solid', paddingTop: 1 }}
      >
        {project.description}
      </Typography>
    </DFOHeaderContentBox>
  );
}

export default ProjectHeader;
