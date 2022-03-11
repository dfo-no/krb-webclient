import DeleteIcon from '@mui/icons-material/Delete';
import makeStyles from '@mui/styles/makeStyles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useTranslation } from 'react-i18next';
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
import Card from '@mui/material/Card';
import { Link } from 'react-router-dom';
import mainIllustration from '../../assets/images/main-illustration.svg';
import {
  NewButtonContainer,
  SearchContainer,
  SearchFieldContainer
} from '../Components/SearchContainer';
import DFOSearchBar from '../../components/DFOSearchBar/DFOSearchBar';
import theme from '../../theme';
import { ScrollableContainer } from '../Components/ScrollableContainer';

const useStyles = makeStyles({
  projectsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 100,
    paddingTop: 100,
    paddingLeft: 200,
    backgroundColor: theme.palette.gray100.main,
    height: '100%'
  },
  topContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 50
  },
  titleSubTitleContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 15
  },
  projectListItemCard: {
    width: '100%',
    height: 100,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.dfoWhite.main
    }
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
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    listStyle: 'none',
    height: 590,
    marginRight: 20,
    width: '100%'
  },
  projectListItem: {
    padding: 0,
    paddingBottom: 15
  },
  titleImageContainer: {
    display: 'flex',
    width: 1200,
    gap: 80
  },
  subTitle: {
    width: 600
  },
  contentContainer: {
    width: 1000
  },
  newBankButton: {
    marginRight: 26
  },
  projectLink: {
    textDecoration: 'none',
    width: '100%'
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
    return <p>Could not find projects</p>;
  }

  const list: any = [];
  const searchFunction = () => {};
  const callback = () => {};

  const renderProjects = (projectList: Record<string, IBank>) => {
    const result = Object.values(projectList).map((element) => {
      return (
        <ListItem className={classes.projectListItem}>
          <Link
            to={`/workbench/${element.id}/admin`}
            className={classes.projectLink}
          >
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
          </Link>
        </ListItem>
      );
    });
    return result;
  };

  return (
    <Box className={classes.projectsContainer}>
      <Box className={classes.titleImageContainer}>
        <Box className={classes.titleSubTitleContainer}>
          <Typography
            variant="biggerBold"
            sx={{ letterSpacing: 0.2, color: theme.palette.primary.main }}
          >
            {t('Welcome to the workbench')}
          </Typography>
          <Box className={classes.subTitle}>
            <Typography>
              {t('In the workbench you can create new banks')}
            </Typography>
          </Box>
        </Box>
        <img src={mainIllustration} alt="Illustration" />
      </Box>
      <Box className={classes.contentContainer}>
        <Box className={classes.topContainer}>
          <SearchContainer>
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
              <Button variant="primary" className={classes.newBankButton}>
                {t('create new bank')}
              </Button>
            </NewButtonContainer>
          </SearchContainer>
        </Box>
        <ScrollableContainer>
          <List className={classes.list} aria-label="codelist">
            {projects && renderProjects(projects)}
          </List>
        </ScrollableContainer>
      </Box>
    </Box>
  );
}
