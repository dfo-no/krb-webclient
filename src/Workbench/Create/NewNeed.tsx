import Box from '@mui/material/Box/Box';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import LoaderSpinner from '../../common/LoaderSpinner';
import Dialog from '../../components/DFODialog/DFODialog';
import { useGetProjectQuery } from '../../store/api/bankApi';
import NewNeedForm from './NewNeedForm';

interface IRouteParams {
  projectId: string;
}

const NewNeed = () => {
  const [isOpen, setOpen] = useState(false);
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
      <Button variant="primary" onClick={() => setOpen(true)}>
        Legg til nytt behov
      </Button>
      <Dialog
        title="Nytt behov til kravet"
        isOpen={isOpen}
        handleClose={() => setOpen(false)}
        children={
          <NewNeedForm project={project} handleClose={() => setOpen(false)} />
        }
      />
    </Box>
  );
};

export default NewNeed;
