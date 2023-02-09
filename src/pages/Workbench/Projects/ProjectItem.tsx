import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

import { ProjectForm } from '../../../api/nexus2';
import { WORKBENCH } from '../../../common/PathConstants';
import { useEditableState } from '../../../components/EditableContext/EditableContext';
import { FormIconButton } from '../../../components/Form/FormIconButton';
import { DeleteProjectForm } from './DeleteProjectForm';
import css from './Projects.module.scss';

interface Props {
  project: ProjectForm;
}

export const ProjectItem = ({ project }: Props) => {
  const { setDeleteCandidateId } = useEditableState();

  const handleCloseDelete = () => {
    setDeleteCandidateId('');
  };

  const enterDeleteMode = (item: ProjectForm) => {
    if (item.ref) setDeleteCandidateId(item.ref);
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
