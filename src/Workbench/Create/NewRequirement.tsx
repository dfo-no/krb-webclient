import Box from '@mui/material/Box/Box';
import Button from '@mui/material/Button/Button';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import LoaderSpinner from '../../common/LoaderSpinner';
import Dialog from '../../components/DFODialog/DFODialog';
import { Parentable } from '../../models/Parentable';
import { INeed } from '../../Nexus/entities/INeed';
import { useGetProjectQuery } from '../../store/api/bankApi';
import NewRequirementForm from './NewRequirementForm';
interface IProps {
  need: Parentable<INeed>;
}

interface IRouteParams {
  projectId: string;
}

const NewRequirement = ({ need }: IProps) => {
  const [isNewOpen, setNewOpen] = useState(false);
  const { projectId } = useParams<IRouteParams>();
  const { data: project } = useGetProjectQuery(projectId);

  if (!project) {
    return <LoaderSpinner />;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        m: 1,
        flexDirection: 'row-reverse'
      }}
    >
      <Button variant="primary" onClick={() => setNewOpen(true)}>
        Legg til nytt krav
      </Button>
      <Dialog
        title="Nytt krav til behovet"
        isOpen={isNewOpen}
        handleClose={() => setNewOpen(false)}
        children={
          <NewRequirementForm
            need={need}
            project={project}
            handleClose={() => setNewOpen(false)}
          />
        }
      />
    </Box>
  );
};

export default NewRequirement;
