import { joiResolver } from '@hookform/resolvers/joi';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AccordionActions } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import produce from 'immer';
import { FormProvider, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import ErrorSummary from '../../../Form/ErrorSummary';
import { IAlert } from '../../../models/IAlert';
import { IBank } from '../../../Nexus/entities/IBank';
import {
  BaseRequirementSchema,
  IRequirement
} from '../../../Nexus/entities/IRequirement';
import { usePutProjectMutation } from '../../../store/api/bankApi';
import { useAppDispatch } from '../../../store/hooks';
import { addAlert } from '../../../store/reducers/alert-reducer';
import DeleteRequirement from './DeleteRequirement';
import VariantsList from '../Variants/VariantsList';

interface IProps {
  requirementIndex: number;
  project: IBank;
  needIndex: number;
}

const Requirement = ({ requirementIndex, needIndex, project }: IProps) => {
  const [putProject] = usePutProjectMutation();
  const dispatch = useAppDispatch();

  const methods = useForm<IRequirement>({
    resolver: joiResolver(BaseRequirementSchema),
    defaultValues: project.needs[needIndex].requirements[requirementIndex]
  });

  const onSubmit = async (post: IRequirement) => {
    const nextState = produce(project, (draftState) => {
      const index = project.needs[needIndex].requirements.findIndex(
        (r) => r.id === post.id
      );
      if (index !== -1) {
        draftState.needs[needIndex].requirements.splice(index, 1, post);
      }
    });

    await putProject(nextState).then(() => {
      const alert: IAlert = {
        id: uuidv4(),
        style: 'success',
        text: 'successfully updated requirement'
      };
      dispatch(addAlert({ alert }));
    });
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        autoComplete="off"
        noValidate
      >
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>
              {project.needs[needIndex].requirements[requirementIndex].title}
            </Typography>
            <Box sx={{ flex: '1 1 auto' }} />

            <DeleteRequirement
              needIndex={needIndex}
              requirementIndex={requirementIndex}
            />
            <IconButton>
              <EditIcon />
            </IconButton>
          </AccordionSummary>
          <AccordionDetails>
            <VariantsList
              project={project}
              needIndex={needIndex}
              requirementIndex={requirementIndex}
            />
          </AccordionDetails>
          <AccordionActions>
            <Button variant="contained" type="submit">
              Save
            </Button>
          </AccordionActions>
        </Accordion>
      </form>
      <ErrorSummary errors={methods.formState.errors} />
    </FormProvider>
  );
};

export default Requirement;
