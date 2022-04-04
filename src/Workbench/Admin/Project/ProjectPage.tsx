import { Box, Button, List, Typography, styled } from '@mui/material/';
import makeStyles from '@mui/styles/makeStyles';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import LoaderSpinner from '../../../common/LoaderSpinner';
import { IPublication } from '../../../Nexus/entities/IPublication';
import { useGetProjectQuery } from '../../../store/api/bankApi';
import { ScrollableContainer } from '../../Components/ScrollableContainer';
import {
  NewButtonContainer,
  SearchContainer
} from '../../Components/SearchContainer';
import { StandardContainer } from '../../Components/StandardContainer';
import { IRouteParams } from '../../Models/IRouteParams';
import NewPublicationForm from './NewPublicationForm';
import { FormContainerBox } from '../../Components/Form/FormContainerBox';

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

const PlainListBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  height: 60,
  width: '100%',
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft: 15,
  paddingRight: 15,
  marginBottom: 15,
  backgroundColor: theme.palette.white.main,
  border: `1px solid ${theme.palette.gray500.main}`
}));

function ProjectPage(): React.ReactElement {
  const classes = useStyles();
  const { t } = useTranslation();
  const [isCreating, setCreating] = useState(false);

  const { projectId } = useParams<IRouteParams>();
  const { data: project, isLoading } = useGetProjectQuery(projectId);

  if (isLoading) {
    return <LoaderSpinner />;
  }

  if (!project) {
    return <></>;
  }

  const renderItem = (item: IPublication, i: number) => {
    return (
      <Box key={i}>
        <PlainListBox>
          <Box className={classes.versionText}>
            <Typography variant="smallBold">{`${t('Version')} ${
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
      <SearchContainer>
        <NewButtonContainer>
          <Button variant="primary" onClick={() => setCreating(true)}>
            {t('new publication')}
          </Button>
        </NewButtonContainer>
      </SearchContainer>

      {isCreating && (
        <FormContainerBox>
          <NewPublicationForm
            project={project}
            handleClose={() => setCreating(false)}
          />
        </FormContainerBox>
      )}
      <ScrollableContainer>
        <List aria-label="publications">
          {project.publications.map(renderItem)}
        </List>
      </ScrollableContainer>
    </StandardContainer>
  );
}

export default ProjectPage;
