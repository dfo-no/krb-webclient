import React from 'react';
import { Box, Typography } from '@mui/material/';
import theme from '../../../theme';
import { IRequirement } from '../../../Nexus/entities/IRequirement';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { FormIconButton } from '../../Components/Form/FormIconButton';

interface IProps {
  requirement: IRequirement;
}

export default function RequirementToolbar({
  requirement
}: IProps): React.ReactElement {
  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: theme.palette.dfoWhite.main,
        padding: 2,
        paddingBottom: 1
      }}
    >
      <Box
        sx={{
          display: 'flex',
          margin: 2,
          marginBottom: 1,
          borderBottom: '1px solid'
        }}
      >
        <Typography variant={'mediumBold'}>{requirement.title}</Typography>
        <FormIconButton sx={{ marginLeft: 'auto' }} onClick={() => {}}>
          <EditIcon />
        </FormIconButton>
        <FormIconButton
          hoverColor={theme.palette.dfoErrorRed.main}
          onClick={() => {}}
        >
          <DeleteIcon />
        </FormIconButton>
      </Box>
      <Box sx={{ display: 'flex', marginRight: 2 }}>
        <FormIconButton sx={{ marginLeft: 'auto' }} onClick={() => {}}>
          {/* Maybe add a green hover color here */}
          <AddIcon />
        </FormIconButton>
      </Box>
    </Box>
  );
}
