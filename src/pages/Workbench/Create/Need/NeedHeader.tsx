import { Box, Typography } from '@mui/material/';
import { useParams } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

import theme from '../../../../theme';
import EditNeed from './EditNeed';
import { DFOCardHeader } from '../../../../components/DFOCard/DFOCardHeader';
import { DFOCardHeaderIconButton } from '../../../../components/DFOCard/DFOCardHeaderIconButton';
import { DFOHeaderContentBox } from '../../../../components/DFOCard/DFOHeaderContentBox';
import { IRouteProjectParams } from '../../../../models/IRouteProjectParams';
import { useGetProjectQuery } from '../../../../store/api/bankApi';
import { useSelectState } from '../SelectContext';

export default function NeedHeader(): React.ReactElement {
  const { projectId } = useParams<IRouteProjectParams>();
  const { data: project } = useGetProjectQuery(projectId);
  const { needIndex, setDeleteCandidateId } = useSelectState();

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
            paddingBottom: 0.5,
            borderBottom: `0.1rem solid ${theme.palette.silver.main}`,
          }}
        >
          <Typography
            variant="lgBold"
            sx={{ fontFamily: 'var(--header-font)' }}
          >
            {project.needs[needIndex] && project.needs[needIndex].title}
          </Typography>
          <EditNeed need={project.needs[needIndex]} />
          <DFOCardHeaderIconButton
            hoverColor={theme.palette.errorRed.main}
            onClick={() => setDeleteCandidateId(project.needs[needIndex].id)}
            sx={{ alignSelf: 'baseline' }}
          >
            <DeleteIcon />
          </DFOCardHeaderIconButton>
        </Box>
        <Typography
          variant="smBold"
          sx={{ paddingTop: 1, fontFamily: 'var(--header-font)' }}
        >
          {project.needs[needIndex] && project.needs[needIndex].description}
        </Typography>
      </DFOHeaderContentBox>
    </DFOCardHeader>
  );
}
