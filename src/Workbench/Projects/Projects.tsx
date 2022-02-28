import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import LoaderSpinner from '../../common/LoaderSpinner';
import { IAlert } from '../../models/IAlert';
import { IBank } from '../../Nexus/entities/IBank';
import {
  useDeleteProjectMutation,
  useGetAllProjectsQuery
} from '../../store/api/bankApi';
import { useAppDispatch } from '../../store/hooks';
import { addAlert } from '../../store/reducers/alert-reducer';
import NewProject from './NewProject';

function Projects(): React.ReactElement {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [deleteProject] = useDeleteProjectMutation();

  const onDelete = async (p: IBank) => {
    await deleteProject(p).then(() => {
      const alert: IAlert = {
        id: uuidv4(),
        style: 'success',
        text: 'Successfully deleted project'
      };
      dispatch(addAlert({ alert }));
    });
  };

  const { data: projects, isLoading } = useGetAllProjectsQuery();

  if (isLoading) {
    return <LoaderSpinner />;
  }

  if (!projects) {
    return <p>Ingen prosjekter</p>;
  }

  const renderProjects = (projectList: Record<string, IBank>) => {
    /* TODO: does not work as we use Record now, not array. Is this ordering really neccessary?
      Object.values(projectList)
      .slice()
      .sort((a, b) => (a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1));
    */

    const result = Object.values(projectList).map((element) => {
      return (
        <div key={element.id}>
          <ListItem alignItems="flex-start">
            <ListItemText
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {element.description}
                  </Typography>
                </React.Fragment>
              }
            >
              <Link to={`/workbench/${element.id}/admin`}>{element.title}</Link>
            </ListItemText>
            <Button variant="warning" onClick={() => onDelete(element)}>
              <DeleteIcon />
            </Button>
          </ListItem>
          <Divider />
        </div>
      );
    });
    return <List sx={{ bgcolor: 'background.paper' }}>{result}</List>;
  };

  return (
    <Container maxWidth="xl" sx={{ minHeight: '80vh' }}>
      <Typography variant="h6">{t('Projects')}</Typography>
      <NewProject />
      {/* <Button
        onClick={() => history.push('/workbench/project/new')}
        variant="primary"
      >
        {t('new project')}
      </Button> */}
      <Box sx={{ mt: 1 }}>{renderProjects(projects)}</Box>
    </Container>
  );
}

export default Projects;
