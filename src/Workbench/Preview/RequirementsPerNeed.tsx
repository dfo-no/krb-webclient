import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import React from 'react';
import Utils from '../../common/Utils';
import { Levelable } from '../../models/Levelable';
import { Nestable } from '../../models/Nestable';
import { INeed } from '../../Nexus/entities/INeed';
import { IProduct } from '../../Nexus/entities/IProduct';
import { IRequirement } from '../../Nexus/entities/IRequirement';
import { useAppSelector } from '../../store/hooks';
import RequirementList from './RequirementList';

interface IProps {
  selectedProduct: Levelable<IProduct> | null;
  updateSelectedFunction: (item: IRequirement) => void;
}

export default function RequirementsPerNeed({
  selectedProduct,
  updateSelectedFunction
}: IProps): React.ReactElement {
  const { project } = useAppSelector((state) => state.project);

  const [associatedRequirements, associatedNeeds] =
    selectedProduct !== null
      ? Utils.findAssociatedRequirements(selectedProduct, project)
      : [{}, []];

  const needHierarchy = (needsList: Nestable<INeed>[]) => {
    let requirements: IRequirement[] = [];
    const hierarchy = needsList.map((element) => {
      if (
        element.id in associatedRequirements &&
        associatedRequirements[element.id].length > 0
      )
        requirements = associatedRequirements[element.id];

      return (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>
              <b>{element.title}</b>
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            {requirements.length > 0 && (
              <RequirementList
                requirements={requirements}
                updateSelectedFunction={updateSelectedFunction}
              />
            )}
          </AccordionDetails>
        </Accordion>
      );
    });
    return <>{hierarchy}</>;
  };

  return needHierarchy(associatedNeeds);
}
