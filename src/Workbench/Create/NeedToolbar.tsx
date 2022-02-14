import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from 'react';
import DeleteNeed from './DeleteNeed';
import EditNeed from './EditNeed';
import { useSelectState } from './SelectContext';

export default function NeedToolbar(): React.ReactElement {
  const { need } = useSelectState();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {need?.title}
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {need?.description} Beskrivelse
          </Typography>
          {need && <EditNeed need={need} />}
          {need && <DeleteNeed need={need} />}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
