import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import mainIllustration from '../../assets/images/main-illustration.svg';
import LoaderSpinner from '../../common/LoaderSpinner';
import { useGetProjectQuery } from '../../store/api/bankApi';
import theme from '../../theme';
import NeedToolbar from './NeedToolbar';
import NewNeed from './NewNeed';
import NewRequirement from './NewRequirement';
import Requirement from './Requirement';
import { useSelectState } from './SelectContext';
import Sidebar from './Sidebar';

interface IRouteParams {
  projectId: string;
}

export default function Create(): React.ReactElement {
  const { projectId } = useParams<IRouteParams>();
  const { data: project } = useGetProjectQuery(projectId);
  const { needIndex, setNeedIndex } = useSelectState();

  /* const methods = useForm<IBank>({
    resolver: joiResolver(PutProjectSchema),
    defaultValues: project
  }); */

  /* useEffect(() => {
    if (
      needIndex === null &&
      project &&
      project.needs &&
      project.needs.length > 0
    ) {
      setNeedIndex(0);
    }
  }, [needIndex, project, setNeedIndex]); */

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
          backgroundColor: theme.palette.gray100.main,
          marginRight: '1rem'
        }}
      >
        <Grid item xs={2}>
          <NewNeed />
          <Sidebar parentables={project.needs} />
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
              {project.needs[needIndex] &&
                project.needs[needIndex].requirements &&
                project.needs[needIndex].requirements.map((r, index) => {
                  return (
                    <Requirement
                      key={r.id}
                      requirementIndex={index}
                      needIndex={needIndex}
                      project={project}
                    />
                  );
                })}
            </>
          ) : (
            <Card>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <CardMedia
                  component="img"
                  alt=""
                  image={mainIllustration}
                  sx={{
                    maxWidth: 500,
                    mt: 4
                  }}
                />
              </div>
              <CardContent component={Stack}>
                <Typography variant="h3" alignSelf="center">
                  {project.title}
                </Typography>
                <Typography variant="subtitle1" alignSelf="center">
                  Du er nå i gang med å bygge et nytt kravsett.
                </Typography>
                <Typography variant="subtitle1" alignSelf="center">
                  Start med å definere behov som skal treffe brukerne av dette
                  kravsettet.
                </Typography>
                <Typography variant="subtitle1" alignSelf="center">
                  Organiser behovene i hierarki og formuler krav som hører til
                  de ulike behovene.
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center' }}>
                {/*  <NewNeed buttonText="Lag ditt første behov" /> */}
              </CardActions>
            </Card>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
