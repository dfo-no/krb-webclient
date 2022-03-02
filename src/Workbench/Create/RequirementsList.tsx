import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useFieldArray } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import LoaderSpinner from '../../common/LoaderSpinner';
import { IBank } from '../../Nexus/entities/IBank';
import { IRequirement } from '../../Nexus/entities/IRequirement';
import { useGetProjectQuery } from '../../store/api/bankApi';
import Requirement from './Requirement';
import { useSelectState } from './SelectContext';

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

  if (!project || needIndex === null) {
    return <LoaderSpinner />;
  }

  /*   const { fields, append, remove } = useFieldArray({
    name: `variants.${variantIndex}.questions` as 'variants.0.questions'
  }); */

  const onDelete = async (p: IRequirement) => {
    console.log(p);
    /* await deleteProject(p).then(() => {
      const alert: IAlert = {
        id: uuidv4(),
        style: 'success',
        text: 'Successfully deleted project'
      };
      dispatch(addAlert({ alert }));
    }); */
  };

  return (
    <div>
      {requirements.map((r) => (
        <Accordion key={r.id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{r.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Requirement requirement={r} />
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );

  return (
    <List>
      {requirements.map((element) => (
        <ListItem key={element.id}>
          <ListItemButton
            onClick={(event) => {
              // handleListItemClick(event, index);
              // updateSelectedFunction(element);
              // setRequirement(element);
            }}
          >
            <ListItemText>{element.title}</ListItemText>
          </ListItemButton>
          <Button variant="warning" onClick={() => onDelete(element)}>
            <DeleteIcon />
          </Button>
        </ListItem>
      ))}
    </List>
  );
}
