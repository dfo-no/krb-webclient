import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { produce } from 'immer';
import React from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import LoaderSpinner from '../../../common/LoaderSpinner';
import { IAlert } from '../../../models/IAlert';
import { IRequirement } from '../../../Nexus/entities/IRequirement';
import {
  useGetProjectQuery,
  usePutProjectMutation
} from '../../../store/api/bankApi';
import { useAppDispatch } from '../../../store/hooks';
import { addAlert } from '../../../store/reducers/alert-reducer';
import Requirement from './Requirement';
import { useSelectState } from '../SelectContext';
import { Box } from '@mui/material';
import theme from '../../../theme';
import RequirementToolbar from './RequirementToolbar';

interface IRouteParams {
  projectId: string;
}

interface IProps {
  requirements: IRequirement[];
}

export default function RequirementsList({
  requirements
}: IProps): React.ReactElement {
  const { needIndex } = useSelectState();
  const { projectId } = useParams<IRouteParams>();
  const { data: project } = useGetProjectQuery(projectId);
  const [putProject] = usePutProjectMutation();
  const dispatch = useAppDispatch();

  if (!project || needIndex === null) {
    return <LoaderSpinner />;
  }

  const onDelete = async (p: number) => {
    const nextState = produce(project, (draftState) => {
      draftState.needs[needIndex].requirements.splice(p, 1);
    });
    await putProject(nextState).then(() => {
      const alert: IAlert = {
        id: uuidv4(),
        style: 'success',
        text: 'Successfully deleted requirement'
      };
      dispatch(addAlert({ alert }));
    });
  };

  return (
    <Box sx={{ width: '100%' }}>
      {requirements.map((r) => (
        <Box sx={{ marginBottom: 4 }}>
          <RequirementToolbar requirement={r} />
          <Requirement requirement={r} />
        </Box>
      ))}
    </Box>
  );
}

/*

        <Accordion key={r.id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{r.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Requirement
              requirement={r}
              project={project}
              needIndex={needIndex}
            />
            <Button variant="warning" onClick={() => onDelete(index)}>
              <DeleteIcon />
            </Button>
          </AccordionDetails>
        </Accordion>
 */
