import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import LoaderSpinner from '../../../common/LoaderSpinner';
import Dialog from '../../../components/DFODialog/DFODialog';
import { INeed } from '../../../Nexus/entities/INeed';
import { useGetProjectQuery } from '../../../store/api/bankApi';
import DeleteNeedForm from './DeleteNeedForm';

interface IProps {
  need: INeed;
}

interface IRouteParams {
  projectId: string;
}

const DeleteNeed = ({ need }: IProps) => {
  const [isOpen, setOpen] = useState(false);
  const { projectId } = useParams<IRouteParams>();

  const { data: project } = useGetProjectQuery(projectId);

  if (!project) {
    return <LoaderSpinner />;
  }

  return (
    <span>
      <IconButton
        onClick={() => setOpen(true)}
        size="large"
        edge="start"
        color="inherit"
        aria-label="edit"
      >
        <DeleteIcon />
      </IconButton>
      <Dialog
        title="Slett behovet"
        isOpen={isOpen}
        handleClose={() => setOpen(false)}
        children={
          <DeleteNeedForm
            need={need}
            project={project}
            handleClose={() => setOpen(false)}
          />
        }
      />
    </span>
  );
};

export default DeleteNeed;
