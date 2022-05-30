import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';
import mainIllustration from '../../../assets/images/main-illustration.svg';
import { IBank } from '../../../Nexus/entities/IBank';
import NewNeed from './Need/NewNeed';

interface IProps {
  project: IBank;
}

const ProjectStart = ({ project }: IProps) => {
  return (
    <Card sx={{ width: '100%', margin: 16 }}>
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
          Organiser behovene i hierarki og formuler krav som hører til de ulike
          behovene.
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'center' }}>
        <NewNeed buttonText="Lag ditt første behov" />
      </CardActions>
    </Card>
  );
};

export default ProjectStart;
