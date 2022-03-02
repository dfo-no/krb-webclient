import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from 'react';
import { Parentable } from '../../models/Parentable';
import { INeed } from '../../Nexus/entities/INeed';
import DeleteNeed from './DeleteNeed';
import EditNeed from './EditNeed';

interface IProps {
  need: Parentable<INeed>;
}

export default function NeedToolbar({ need }: IProps): React.ReactElement {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="secondary">
        <Toolbar color="secondary">
          <Grid container>
            <Typography variant="h6" component="span">
              {need && need.title}
            </Typography>
            <span style={{ flex: '1 1 auto' }}></span>
            <EditNeed need={need} />
            <DeleteNeed need={need} />
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
