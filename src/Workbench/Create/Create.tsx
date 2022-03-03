import { joiResolver } from '@hookform/resolvers/joi';
import Box from '@mui/material/Box';
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
    <Box
      sx={{
        flexGrow: 1
      }}
    >
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
          <Grid
            item
            xs={10}
            sx={{ backgroundColor: theme.palette.dfoBackgroundBlue.main }}
          >
            {needIndex !== null ? (
              <>
                <NeedToolbar need={project.needs[needIndex]} />
                <NewRequirement need={project.needs[needIndex]} />
                {project.needs[needIndex]?.requirements && (
                  <RequirementsList
                    requirements={project.needs[needIndex].requirements}
                  />
                )}
              </>
            ) : (
              <div>Ingen behov valgt</div>
            )}
          </Grid>
        </FormProvider>
      </Grid>
    </Box>
  );
}
