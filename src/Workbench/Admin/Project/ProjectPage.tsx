import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Button,
  Card,
  CardContent,
  List,
  Typography
} from '@mui/material/';
import makeStyles from '@mui/styles/makeStyles';
import ProjectHeader from './ProjectHeader';
import DFOSearchBar from '../../../components/DFOSearchBar/DFOSearchBar';
import { IPublication } from '../../../Nexus/entities/IPublication';
import { PlainListBox } from '../../Components/PlainListBox';
import EditProjectForm from './EditProjectForm';
import { useParams } from 'react-router-dom';
import { useGetProjectQuery } from '../../../store/api/bankApi';
import LoaderSpinner from '../../../common/LoaderSpinner';
import { IRouteParams } from '../../Models/IRouteParams';
import NewPublicationForm from './NewPublicationForm';
import { StandardContainer } from '../../Components/StandardContainer';
import {
  NewButtonContainer,
  SearchContainer,
  SearchFieldContainer
} from '../../Components/SearchContainer';
import { DFOCardHeader } from '../../../components/DFOCard/DFOCardHeader';
import { ScrollableContainer } from '../../Components/ScrollableContainer';

const useStyles = makeStyles({
  versionText: {
    alignSelf: 'center',
    paddingLeft: 15,
    paddingRight: 15
  },
  commentText: {
    display: 'flex',
    height: '100%',
    paddingLeft: 15,
    borderLeft: '1px solid',
    marginLeft: 'auto',
    width: '40vw'
  }
});

function ProjectPage(): React.ReactElement {
  const classes = useStyles();
  const { t } = useTranslation();
  const [isEditing, setEditing] = useState(false);
  const [isCreating, setCreating] = useState(false);

  const { projectId } = useParams<IRouteParams>();
  const { data: project, isLoading } = useGetProjectQuery(projectId);
  const [publications, setPublications] = useState<IPublication[]>([]);

  useEffect(() => {
    if (project && project.publications) {
      setPublications(project.publications);
    }
  }, [project]);

  if (isLoading) {
    return <LoaderSpinner />;
  }

  if (!project) {
    return <p>Finner ikke prosjekt</p>;
  }

  const searchFieldCallback = (result: IPublication[]) => {
    setPublications(result);
  };

  const versionSearch = (searchString: string, list: IPublication[]) => {
    // Filters only versions with match in title or version number
    return list.filter((aPub) => {
      return (
        aPub.comment.toLowerCase().includes(searchString.toLowerCase()) ||
        String(aPub.version).includes(searchString)
      );
    });
  };

  const renderItem = (item: IPublication, i: number) => {
    return (
      <Box key={i}>
        <PlainListBox>
          <Box className={classes.versionText}>
            <Typography variant="smallBold">{`${t('Versjon')} ${
              item.version
            }`}</Typography>
          </Box>
          <Box className={classes.commentText}>
            <Typography sx={{ alignSelf: 'center' }} variant="small">
              {item.comment}
            </Typography>
          </Box>
        </PlainListBox>
      </Box>
    );
  };

  return (
    <StandardContainer>
      <Card>
        <DFOCardHeader>
          <ProjectHeader editButtonOnClick={() => setEditing(true)} />
        </DFOCardHeader>
        {isEditing && (
          <EditProjectForm
            project={project}
            handleClose={() => setEditing(false)}
          />
        )}
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            flexGrow: 1,
            minHeight: 0
          }}
        >
          <SearchContainer>
            <SearchFieldContainer>
              {' '}
              <DFOSearchBar
                list={project.publications}
                label={t('search for version')}
                callback={searchFieldCallback}
                searchFunction={versionSearch}
              />
            </SearchFieldContainer>
            <NewButtonContainer>
              <Button variant="primary" onClick={() => setCreating(true)}>
                {t('new publication')}
              </Button>
            </NewButtonContainer>
          </SearchContainer>

          {isCreating && (
            <Box sx={{ marginBottom: 3 }}>
              <NewPublicationForm
                project={project}
                handleClose={() => setCreating(false)}
              />
            </Box>
          )}
          <ScrollableContainer>
            <List aria-label="publications">
              {publications.map(renderItem)}
            </List>
          </ScrollableContainer>
        </CardContent>
      </Card>
    </StandardContainer>
  );
}

export default ProjectPage;
