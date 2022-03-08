import React, { useState } from 'react';
import { Parentable } from '../../../models/Parentable';
import { INeed } from '../../../Nexus/entities/INeed';
import { Box, Typography } from '@mui/material/';
import { DFOCardHeader } from '../../../components/DFOCard/DFOCardHeader';
import { DFOHeaderContentBox } from '../../../components/DFOCard/DFOHeaderContentBox';
import { DFOCardHeaderIconButton } from '../../../components/DFOCard/DFOCardHeaderIconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '../../../components/DFODialog/DFODialog';
import EditNeedForm from './EditNeedForm';
import theme from '../../../theme';
import { useSelectState } from '../SelectContext';
import EditNeed from './EditNeed';

interface IProps {
  need: Parentable<INeed>;
}

export default function NeedToolbar({ need }: IProps): React.ReactElement {
  const { setDeletingNeed } = useSelectState();

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
          <Typography variant="bigBold">{need && need.title}</Typography>
          <EditNeed need={need} />
          <DFOCardHeaderIconButton
            hoverColor={theme.palette.dfoErrorRed.main}
            onClick={() => setDeletingNeed(true)}
          >
            <DeleteIcon />
          </DFOCardHeaderIconButton>
        </Box>
        <Typography variant="smallBold" sx={{ paddingTop: 1 }}>
          {need && need.description}
        </Typography>
      </DFOHeaderContentBox>
    </DFOCardHeader>
  );
}
