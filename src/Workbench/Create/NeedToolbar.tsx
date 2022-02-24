import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
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
        <Toolbar color="secondary">
          <Grid container>
            <Typography variant="h6" component="span">
              {need?.title}
            </Typography>
            <span style={{ flex: '1 1 auto' }}></span>
            {need && <EditNeed need={need} />}
            {need && <DeleteNeed need={need} />}
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
