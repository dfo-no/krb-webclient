import Card from '@mui/material/Card';
import DeleteIcon from '@mui/icons-material/Delete';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

import css from './Projects.module.scss';
import { FormIconButton } from '../../../components/Form/FormIconButton';
import { useEditableState } from '../../../components/EditableContext/EditableContext';
import { WORKBENCH } from '../../../common/PathConstants';
import { DeleteProjectForm } from './DeleteProjectFormNew';
import { ProjectForm } from '../../../api/openapi-fetch';

interface IProps {
  project: ProjectForm;
}

export const ProjectItem = ({ project }: IProps) => {
  const { setDeleteMode } = useEditableState();

  const handleCloseDelete = () => {
    setDeleteMode('');
  };

  const enterDeleteMode = (item: ProjectForm) => {
    if (item.ref) setDeleteMode(item.ref);
  };

  return (
    <DeleteProjectForm project={project} handleClose={handleCloseDelete}>
      <ListItem
        className={css.Item}
        key={project.ref}
        secondaryAction={
          <FormIconButton
            className={css.IconButton}
            hoverColor={'var(--error-color)'}
            edge="end"
            aria-label="delete"
            onClick={() => enterDeleteMode(project)}
          >
            <DeleteIcon color="inherit" />
          </FormIconButton>
        }
      >
        <Link to={`/${WORKBENCH}/${project.ref}/create`} className={css.Link}>
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
