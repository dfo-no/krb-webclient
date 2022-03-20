import { DevTool } from '@hookform/devtools';
import { joiResolver } from '@hookform/resolvers/joi';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { produce } from 'immer';
import React, { useEffect } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import VerticalTextCtrl from '../../FormProvider/VerticalTextCtrl';
import { IAlert } from '../../models/IAlert';
import { Parentable } from '../../models/Parentable';
import { BaseNeedSchema, INeed } from '../../Nexus/entities/INeed';
import { IRequirement } from '../../Nexus/entities/IRequirement';
import {
  useGetProjectQuery,
  usePutProjectMutation
} from '../../store/api/bankApi';
import { useAppDispatch } from '../../store/hooks';
import { addAlert } from '../../store/reducers/alert-reducer';
import { IRouteParams } from '../Models/IRouteParams';
import Requirement from './Requirement';
import { useSelectState } from './SelectContext';
import VariantsList from './VariantsList';

interface IProps {
  need: Parentable<INeed>;
}

export default function RequirementsList({ need }: IProps): React.ReactElement {
  const { needIndex } = useSelectState();
  // console.log(needIndex);
  /* const { projectId } = useParams<IRouteParams>();
  const { data: project } = useGetProjectQuery(projectId);
  const [putProject] = usePutProjectMutation();
  const dispatch = useAppDispatch(); */

  const methods = useForm<INeed>({
    resolver: joiResolver(BaseNeedSchema),
    defaultValues: need
  });

  /* const { fields, remove, append } = useFieldArray({
    control: methods.control,
    name: `requirements`
  }); */

  /* const [expanded, setExpanded] = React.useState<string | false>(false);
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    }; */

  const onDelete = async (p: number) => {
    /* const nextState = produce(project, (draftState) => {
      draftState.needs[needIndex].requirements.splice(p, 1);
    });
    await putProject(nextState).then(() => {
      const alert: IAlert = {
        id: uuidv4(),
        style: 'success',
        text: 'Successfully deleted requirement'
      };
      dispatch(addAlert({ alert }));
    }); */
  };

  return (
    <FormProvider {...methods}>
      {need.requirements.map((r, index) => (
        <Card key={index} sx={{ mt: 2, mr: 2 }}>
          <VerticalTextCtrl
            name={`requirements.${index}.title`}
            label="Foo"
            placeholder=""
          />
          <CardHeader
            title={r.title}
            action={
              <>
                <Tooltip title="Slett krav">
                  <DeleteIcon
                    color="error"
                    sx={{ mr: 1 }}
                    onClick={() => onDelete(index)}
                  />
                </Tooltip>
                <Tooltip title="">
                  <EditIcon />
                </Tooltip>
              </>
            }
          />
          <Divider />
          <CardContent>
            <VariantsList
              needIndex={needIndex ? needIndex : 0}
              requirementIndex={index}
            />
          </CardContent>
        </Card>
      ))}
      {/* <DevTool control={methods.control} /> */}
    </FormProvider>
  );
  /*
  return (
    <div>
      {requirements.map((r, index) => (
        <Accordion key={r.id} onChange={handleChange(`panel-${index}`)}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id={`panel-${index}`}
          >
            <Typography>{r.title}</Typography>
            <Box sx={{ flex: '1 1 auto' }} />

            <Tooltip title="Slett krav">
              <DeleteIcon
                color="error"
                sx={{ mr: 1 }}
                onClick={() => onDelete(index)}
              />
            </Tooltip>
            <EditIcon sx={{ mr: 2 }} />
          </AccordionSummary>
          <AccordionDetails>
            <Divider sx={{ mb: 1 }} />
            <Requirement
              requirement={r}
              project={project}
              needIndex={needIndex}
            />
          </AccordionDetails>
          <AccordionActions></AccordionActions>
        </Accordion>
      ))}
    </div>
  ); */
}
