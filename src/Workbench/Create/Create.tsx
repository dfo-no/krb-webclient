import { joiResolver } from '@hookform/resolvers/joi';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid/Grid';
import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import LoaderSpinner from '../../common/LoaderSpinner';
import { PutProjectSchema } from '../../models/Project';
import { IBank } from '../../Nexus/entities/IBank';
import { useGetProjectQuery } from '../../store/api/bankApi';
import theme from '../../theme';
import NeedList from './NeedList';
import NeedToolbar from './NeedToolbar';
import NewNeed from './NewNeed';
import NewRequirement from './NewRequirement';
import RequirementsList from './RequirementsList';
import { useSelectState } from './SelectContext';

interface IRouteParams {
  projectId: string;
}

export default function Create(): React.ReactElement {
  const { projectId } = useParams<IRouteParams>();
  const { data: project } = useGetProjectQuery(projectId);
  const { needIndex, setNeedIndex } = useSelectState();

  const methods = useForm<IBank>({
    resolver: joiResolver(PutProjectSchema),
    defaultValues: project
  });

  useEffect(() => {
    if (
      needIndex === null &&
      project &&
      project.needs &&
      project.needs.length > 0
    ) {
      setNeedIndex(0);
    }
  }, [needIndex, project, setNeedIndex]);

  if (!project) {
    return <LoaderSpinner />;
  }

  return (
    <Grid
      container
      spacing={2}
      sx={{
        minHeight: '100vh',
        backgroundColor: theme.palette.gray100.main
      }}
    >
      <FormProvider {...methods}>
        <Grid item xs={2}>
          <NewNeed />
          <NeedList parentables={project.needs} />
        </Grid>
        <Grid item xs={10}>
          <span>{'needIndex:' + needIndex}</span>
          <Button variant="outlined" onClick={() => setNeedIndex(1)}>
            Set selected 2
          </Button>
          {needIndex !== null ? (
            <>
              <NeedToolbar need={project.needs[needIndex]} />
              <NewRequirement />
              <RequirementsList />
            </>
          ) : (
            <div>Ingen behov valgt</div>
          )}
        </Grid>
      </FormProvider>
    </Grid>
  );
}
