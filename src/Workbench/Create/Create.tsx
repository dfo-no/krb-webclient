import Grid from '@mui/material/Grid/Grid';
import React from 'react';
import { useAppSelector } from '../../store/hooks';
import theme from '../../theme';
import NeedList from './NeedList';
import NewNeed from './NewNeed';
import NewRequirement from './NewRequirement';
import Requirements from './Requirements';
import { useSelectState } from './SelectContext';

export default function Create(): React.ReactElement {
  const { project } = useAppSelector((state) => state.project);

  const { need } = useSelectState();

  return (
    <Grid
      container
      spacing={2}
      sx={{ minHeight: '100vh', backgroundColor: theme.palette.gray100.main }}
    >
      <Grid item xs={2}>
        <NewNeed />
        <NeedList parentables={project.needs} />
      </Grid>
      <Grid item xs={10}>
        {need ? (
          <>
            <NewRequirement />
            <Requirements />
          </>
        ) : (
          <p>Ingen behov valgt</p>
        )}
      </Grid>
    </Grid>
  );
}
