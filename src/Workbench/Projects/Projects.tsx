import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import mainIllustration from '../../assets/images/main-illustration.svg';
import { PAGE_SIZE } from '../../common/Constants';
import LoaderSpinner from '../../common/LoaderSpinner';
import DFODialog from '../../components/DFODialog/DFODialog';
import DFOSearchBar from '../../components/DFOSearchBar/DFOSearchBar';
import { IAlert } from '../../models/IAlert';
import { IBank } from '../../Nexus/entities/IBank';
import {
  useDeleteProjectMutation,
  useGetProjectsQuery
} from '../../store/api/bankApi';
import { useAppDispatch } from '../../store/hooks';
import { addAlert } from '../../store/reducers/alert-reducer';
import theme from '../../theme';
import { ScrollableContainer } from '../Components/ScrollableContainer';
import {
  NewButtonContainer,
  SearchContainer,
  SearchFieldContainer
} from '../Components/SearchContainer';
import NewProjectForm from './NewProjectForm';

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
    height: 100,
    boxShadow: 'none',
    border: `1px solid ${theme.palette.gray300.main}`,
    textDecoration: 'none',
    width: '100%',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.dfoWhite.main
    }
  },
  projectListItemCardContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
    paddingTop: 25,
    paddingLeft: 25,
    paddingRight: 70
  },
  projectListItemTitleButton: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    paddingTop: 0,
    gap: 15,
    listStyle: 'none'
  },
  projectListItem: {
    padding: 0,
    textDecoration: 'none',
    width: '100%'
  },
  projectListItemDivider: {
    color: theme.palette.gray300.main
  },
  projectLink: {
    textDecoration: 'none',
    width: '100%'
  },
  titleImageContainer: {
    display: 'flex',
    gap: 80
  },
  subTitle: {
    width: 600
  },
  subTitleTwo: {
    marginTop: 5
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    minHeight: 0,
    marginBottom: 16,
    width: 1000
  },
  noProjectsContainer: {
    display: 'flex',
    textAlign: 'center',
    flexDirection: 'column',
    width: 1000,
    gap: 15
  }
});

export default function Projects(): React.ReactElement {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [deleteProject] = useDeleteProjectMutation();
  const classes = useStyles();
  const [projectList, setProjectList] = useState<Record<string, IBank>>();
  const [isOpen, setOpen] = useState(false);

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

  const { data: projects, isLoading } = useGetProjectsQuery({
    pageSize: PAGE_SIZE,
    page: 1,
    fieldName: 'title',
    order: 'DESC'
  });

  useEffect(() => {
    if (projects) {
      setProjectList(projects);
    }
  }, [setProjectList, projects]);

  if (isLoading) {
    return <LoaderSpinner />;
  }

  const searchFunction = (searchString: string, list: IBank[]) => {
    return Object.values(list).filter((project: IBank) => {
      if (project.title.toLowerCase().includes(searchString.toLowerCase())) {
        return project;
      }
    });
  };
  const searchFieldCallback = (result: Record<string, IBank>) => {
    setProjectList(result);
  };

  const renderProjects = (list: Record<string, IBank>) => {
    return Object.values(list).map((element) => {
      return (
        <ListItem className={classes.projectListItem} key={element.id}>
          <Link
            to={`/workbench/${element.id}/admin`}
            className={classes.projectLink}
          >
            <Card className={classes.projectListItemCard}>
              <Box className={classes.projectListItemCardContent}>
                <Box className={classes.projectListItemTitleButton}>
                  <Typography variant="md" sx={{ fontWeight: 'bold' }}>
                    {element.title}
                  </Typography>
                  <DeleteIcon />
                </Box>
                <Divider className={classes.projectListItemDivider} />
                <Typography variant="sm" sx={{ fontWeight: 'bold' }}>
                  {element.description}
                </Typography>
              </Box>
            </Card>
          </Link>
        </ListItem>
      );
    });
  };

  const renderNewBankButton = () => {
    return (
      <Button variant="primary" onClick={() => setOpen(true)}>
        {t('create new bank')}
      </Button>
    );
  };

  return (
    <Box className={classes.projectsContainer}>
      <Box className={classes.titleImageContainer}>
        <Box className={classes.titleSubTitleContainer}>
          <Typography
            variant="xl"
            sx={{
              letterSpacing: 0.2,
              color: theme.palette.primary.main,
              fontWeight: 'bold'
            }}
          >
            {t('Welcome to the workbench')}
          </Typography>
          <Box className={classes.subTitle}>
            <Typography>
              {t('In the workbench you can create new banks')}
            </Typography>
          </Box>
        </Box>
        <img src={mainIllustration} alt="main illustration" />
      </Box>
      {projectList ? (
        <Box className={classes.contentContainer}>
          <SearchContainer sx={{ marginBottom: 1 }}>
            <SearchFieldContainer>
              {' '}
              <DFOSearchBar
                list={Object(projects)}
                placeholder={t('search for banks')}
                callback={searchFieldCallback}
                searchFunction={searchFunction}
              />
            </SearchFieldContainer>
            <NewButtonContainer>{renderNewBankButton()}</NewButtonContainer>
          </SearchContainer>
          <ScrollableContainer>
            <List className={classes.list} aria-label="projects">
              {projectList && renderProjects(projectList)}
            </List>
          </ScrollableContainer>
        </Box>
      ) : (
        <Box className={classes.noProjectsContainer}>
          <Box>
            <Typography variant="md" sx={{ letterSpacing: 2 }}>
              {t('There is no banks')}
            </Typography>
          </Box>
          <Box>{renderNewBankButton()}</Box>
        </Box>
      )}

      <DFODialog
        isOpen={isOpen}
        handleClose={() => setOpen(false)}
        children={<NewProjectForm handleClose={() => setOpen(false)} />}
      />
    </Box>
  );
}
