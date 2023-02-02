import { Box, Typography } from '@mui/material/';
import DeleteIcon from '@mui/icons-material/Delete';

import theme from '../../../../theme';
import EditNeed from './EditNeed';
import { DFOCardHeader } from '../../../../components/DFOCard/DFOCardHeader';
import { DFOCardHeaderIconButton } from '../../../../components/DFOCard/DFOCardHeaderIconButton';
import { DFOHeaderContentBox } from '../../../../components/DFOCard/DFOHeaderContentBox';
import { useSelectState } from '../SelectContext';
import { NeedForm, ProjectForm } from '../../../../api/nexus2';

type Props = {
  project: ProjectForm;
  needs: NeedForm[];
};

export default function NeedHeader({
  project,
  needs,
}: Props): React.ReactElement {
  const { needIndex, setDeleteMode } = useSelectState();

  if (!project || needIndex === null) {
    return <></>;
  }
  console.log('rgghserth');

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
            {needs[needIndex] && needs[needIndex].title}
          </Typography>
          {/* <EditNeed need={needs[needIndex]} /> TODO: Fix */}
          <DFOCardHeaderIconButton
            hoverColor={theme.palette.errorRed.main}
            onClick={() => setDeleteMode(needs[needIndex].ref)}
            sx={{ alignSelf: 'baseline' }}
          >
            <DeleteIcon />
          </DFOCardHeaderIconButton>
        </Box>
        <Typography
          variant="smBold"
          sx={{ paddingTop: 1, fontFamily: 'var(--header-font)' }}
        >
          {needs[needIndex] && needs[needIndex].description}
        </Typography>
      </DFOHeaderContentBox>
    </DFOCardHeader>
  );
}
