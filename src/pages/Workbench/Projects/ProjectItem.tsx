import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import DeleteIcon from '@mui/icons-material/Delete';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import makeStyles from '@mui/styles/makeStyles';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

import DeleteProjectForm from './DeleteProjectForm';
import theme from '../../../theme';
import { FormIconButton } from '../../../components/Form/FormIconButton';
import { IBank } from '../../../Nexus/entities/IBank';
import { useEditableState } from '../../../components/EditableContext/EditableContext';

interface IProps {
  project: IBank;
}

const useStyles = makeStyles({
  projectListItemCard: {
    height: 100,
    boxShadow: 'none',
    border: `0.1rem solid ${theme.palette.gray300.main}`,
    textDecoration: 'none',
    width: '100%',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.white.main
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
  projectListItemDivider: {
    color: theme.palette.gray300.main
  },
  projectLink: {
    textDecoration: 'none',
    width: '100%'
  },
  projectListItem: {
    padding: 0,
    textDecoration: 'none',
    width: '100%'
  }
});

const ProjectItem = ({ project }: IProps) => {
  const classes = useStyles();

  const { setDeleteMode } = useEditableState();

  const handleCloseDelete = () => {
    setDeleteMode('');
  };

  const enterDeleteMode = (item: IBank) => {
    setDeleteMode(item.id);
  };

  return (
    <DeleteProjectForm bank={project} handleClose={handleCloseDelete}>
      <ListItem
        className={classes.projectListItem}
        key={project.id}
        secondaryAction={
          <FormIconButton
            hoverColor={theme.palette.errorRed.main}
            edge="end"
            aria-label="delete"
            onClick={() => enterDeleteMode(project)}
          >
            <DeleteIcon color="inherit" />
          </FormIconButton>
        }
      >
        <Link
          to={`/workbench/${project.id}/create`}
          className={classes.projectLink}
        >
          <Card className={classes.projectListItemCard}>
            <Box className={classes.projectListItemCardContent}>
              <Box className={classes.projectListItemTitleButton}>
                <Typography
                  variant="mdBold"
                  sx={{
                    fontFamily: 'var(--header-font)',
                    fontSize: '2.2rem'
                  }}
                >
                  {project.title}
                </Typography>
              </Box>
              <Divider className={classes.projectListItemDivider} />
              <Typography variant="sm">{project.description}</Typography>
            </Box>
          </Card>
        </Link>
      </ListItem>
    </DeleteProjectForm>
  );
};

export default ProjectItem;
