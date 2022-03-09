import DeleteIcon from '@mui/icons-material/Delete';
import makeStyles from '@mui/styles/makeStyles';
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
import { StandardContainer } from '../Components/StandardContainer';
import Card from '@mui/material/Card';

import mainIllustration from '../../assets/images/main-illustration.svg';
import {
  NewButtonContainer,
  SearchContainer,
  SearchFieldContainer
} from '../Components/SearchContainer';
import DFOSearchBar from '../../components/DFOSearchBar/DFOSearchBar';
import theme from '../../theme';

const useStyles = makeStyles({
  projectsContainer: {
    backgroundColor: theme.palette.gray100.main,
    height: '100%',
    width: '100%',
    paddingTop: 40
  },
  topContainer: {
    display: 'flex',
    gap: 150
  },
  titleSubTitleContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 15
  },
  projectList: {
    backgroundColor: 'red'
  },
  projectListItem: { padding: 0, marginBottom: 20 },
  projectListItemCard: {
    width: '100%',
    height: 100
  },
  projectListItemCardContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    width: '90%',
    paddingTop: 25,
    paddingLeft: 25
  },
  projectListItemTitleButton: {
    display: 'flex',
    justifyContent: 'space-between'
  }
});

export default function Projects(): React.ReactElement {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [deleteProject] = useDeleteProjectMutation();
  const classes = useStyles();

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

  const list: any = [];
  const searchFunction = () => {};
  const callback = () => {};

  const renderProjects = (projectList: Record<string, IBank>) => {
    const result = Object.values(projectList).map((element) => {
      return (
        <ListItem className={classes.projectListItem} sx={{ width: '91%' }}>
          <Card className={classes.projectListItemCard}>
            <Box className={classes.projectListItemCardContent}>
              <Box className={classes.projectListItemTitleButton}>
                <Typography variant="smediumBold">{element.title}</Typography>
                <DeleteIcon />
              </Box>
              <Divider />
              <Typography variant="small">{element.description}</Typography>
            </Box>
          </Card>
        </ListItem>
      );
    });
    return <List>{result}</List>;
  };

  return (
    <Box className={classes.projectsContainer}>
      <StandardContainer sx={{ width: '80%' }}>
        <Box className={classes.topContainer}>
          <Box className={classes.titleSubTitleContainer}>
            <Typography variant="biggerBold" sx={{ letterSpacing: 0.2 }}>
              Velkommen til arbeidsbenken
            </Typography>
            <Box sx={{ width: 499 }}>
              <Typography>
                {t('In the workbench you can create new banks')}
              </Typography>
            </Box>
          </Box>
          <img src={mainIllustration} alt="Illustration" />
        </Box>
        <Box className={classes.projectsContainer}>
          <SearchContainer sx={{ width: '90.9%' }}>
            <SearchFieldContainer>
              {' '}
              <DFOSearchBar
                list={list}
                label={t('search for banks')}
                callback={searchFunction}
                searchFunction={callback}
              />
            </SearchFieldContainer>
            <NewButtonContainer>
              <Button variant="primary">{t('create new bank')}</Button>
            </NewButtonContainer>
          </SearchContainer>
        </Box>
        <Box>{renderProjects(projects)}</Box>
      </StandardContainer>
    </Box>
  );
}
