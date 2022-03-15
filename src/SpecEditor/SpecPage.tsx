import theme from '../theme';
import makeStyles from '@mui/styles/makeStyles';
import { useAppDispatch } from '../store/hooks';
import { useTranslation } from 'react-i18next';
import {
  useDeleteProjectMutation,
  useGetAllProjectsQuery
} from '../store/api/bankApi';
import { httpPost } from '../api/http';
import { AxiosResponse } from 'axios';
import { IBank } from '../Nexus/entities/IBank';
import { selectBank } from '../store/reducers/selectedBank-reducer';
import { IAlert } from '../models/IAlert';
import { addAlert } from '../store/reducers/alert-reducer';
import LoaderSpinner from '../common/LoaderSpinner';
import {
  Box,
  Button,
  Card,
  Divider,
  Link,
  List,
  ListItem,
  Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { setSpecification } from '../store/reducers/spesification-reducer';
import { v4 as uuidv4 } from 'uuid';
import {
  NewButtonContainer,
  SearchContainer,
  SearchFieldContainer
} from '../Workbench/Components/SearchContainer';
import DFOSearchBar from '../components/DFOSearchBar/DFOSearchBar';
import { ScrollableContainer } from '../Workbench/Components/ScrollableContainer';

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
    boxShadow: 'none',
    border: `1px solid ${theme.palette.gray300.main}`,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.dfoWhite.main
    }
  },
  projectListItemCardContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
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
    marginRight: 27
  },
  projectLink: {
    textDecoration: 'none',
    width: '100%'
  },
  projects: {
    display: 'flex',
    alignContent: 'center',
    marginTop: 50
  },
  noProjectsContainer: {
    display: 'flex',
    textAlign: 'center',
    flexDirection: 'column',
    width: 1000,
    gap: 15
  }
});

export default function SpecPage(): React.ReactElement {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [deleteProject] = useDeleteProjectMutation();
  const classes = useStyles();

  const onUploadSpecification = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const formData = new FormData();
    const files = event.target.files as FileList;
    for (let index = 0; index < files.length; index += 1) {
      const file = files[index];
      formData.append('file', file);
    }
    httpPost<FormData, AxiosResponse>('/java/uploadPdf', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      responseType: 'json'
    }).then((response) => {
      dispatch(selectBank(response.data.bank.id));
      dispatch(setSpecification(response.data));
      return response;
    });
  };

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

  const list: any = [];
  const searchFunction = () => {};
  const callback = () => {};

  const renderProjects = (projectList: Record<string, IBank>) => {
    const result = Object.values(projectList).map((element) => {
      return (
        <ListItem className={classes.projectListItem} key={element.id}>
          <Card className={classes.projectListItemCard}>
            <Box className={classes.projectListItemCardContent}>
              <Box className={classes.projectListItemTitleButton}>
                <Typography variant="smediumBold">{element.title}</Typography>
                <DeleteIcon />
              </Box>
              <Divider sx={{ color: theme.palette.gray700.main }} />
              <Typography variant="small">{element.description}</Typography>
            </Box>
          </Card>
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
      </Box>
      {projects ? (
        <Box className={classes.contentContainer}>
          <Box className={classes.topContainer}>
            <SearchContainer>
              <SearchFieldContainer>
                {' '}
                <DFOSearchBar
                  list={list}
                  placeholder={t('search for banks')}
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
          <Box className={classes.projects}>
            <ScrollableContainer>
              <List className={classes.list} aria-label="codelist">
                {projects && renderProjects(projects)}
              </List>
            </ScrollableContainer>
          </Box>
        </Box>
      ) : (
        <Box className={classes.noProjectsContainer}>
          <Box>
            <Typography variant="medium" sx={{ letterSpacing: 2 }}>
              {t('There is no banks')}
            </Typography>
          </Box>
          <Box>
            <Button variant="primary" sx={{ width: 170 }}>
              {t('create new bank')}
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}
