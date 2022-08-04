import Card from '@mui/material/Card';
import DeleteIcon from '@mui/icons-material/Delete';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

import css from './Projects.module.scss';
import DeleteProjectForm from './DeleteProjectForm';
import theme from '../../../theme';
import { FormIconButton } from '../../../components/Form/FormIconButton';
import { IBank } from '../../../Nexus/entities/IBank';
import { useEditableState } from '../../../components/EditableContext/EditableContext';

interface IProps {
  project: IBank;
}

const ProjectItem = ({ project }: IProps) => {
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
        className={css.Item}
        key={project.id}
        secondaryAction={
          <FormIconButton
            className={css.IconButton}
            hoverColor={theme.palette.errorRed.main}
            edge="end"
            aria-label="delete"
            onClick={() => enterDeleteMode(project)}
          >
            <DeleteIcon color="inherit" />
          </FormIconButton>
        }
      >
        <Link to={`/workbench/${project.id}/create`} className={css.Link}>
          <Card className={css.ItemCard}>
            <div className={css.CardContent}>
              <div className={css.TitleButton}>
                <Typography variant="mdBold">{project.title}</Typography>
              </div>
              <Divider className={css.Divider} />
              <Typography variant="sm">{project.description}</Typography>
            </div>
          </Card>
        </Link>
      </ListItem>
    </DeleteProjectForm>
  );
};

export default ProjectItem;
