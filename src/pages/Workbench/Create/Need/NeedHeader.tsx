import { Box, Typography } from '@mui/material/';
import DeleteIcon from '@mui/icons-material/Delete';

import theme from '../../../../theme';
import { EditNeed } from './EditNeed';
import { DFOCardHeader } from '../../../../components/DFOCard/DFOCardHeader';
import { DFOCardHeaderIconButton } from '../../../../components/DFOCard/DFOCardHeaderIconButton';
import { DFOHeaderContentBox } from '../../../../components/DFOCard/DFOHeaderContentBox';
import { useSelectState } from '../SelectContext';
import { NeedForm, ProjectForm } from '../../../../api/nexus2';

type Props = {
  project: ProjectForm; // TODO: only needs ref
  need: NeedForm;
};

export function NeedHeader({ project, need }: Props): React.ReactElement {
  const { needIndex, setDeleteCandidateId } = useSelectState();

  if (!project || needIndex === null) {
    // TODO: not needed
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
            {need && need.title}
          </Typography>
          <EditNeed projectRef={project.ref} need={need} />
          <DFOCardHeaderIconButton
            hoverColor={theme.palette.errorRed.main}
            onClick={() => setDeleteCandidateId(need.ref)}
            sx={{ alignSelf: 'baseline' }}
          >
            <DeleteIcon />
          </DFOCardHeaderIconButton>
        </Box>
        <Typography
          variant="smBold"
          sx={{ paddingTop: 1, fontFamily: 'var(--header-font)' }}
        >
          {need && need.description}
        </Typography>
      </DFOHeaderContentBox>
    </DFOCardHeader>
  );
}
