import { Button, makeStyles } from '@material-ui/core';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Utils from '../../common/Utils';
import { Levelable } from '../../models/Levelable';
import { Nestable } from '../../models/Nestable';
import { INeed } from '../../Nexus/entities/INeed';
import { IProduct } from '../../Nexus/entities/IProduct';
import { IRequirement } from '../../Nexus/entities/IRequirement';
import { useAppSelector } from '../../store/hooks';
import theme from '../../theme';

interface IProps {
  selectedProduct: Levelable<IProduct> | null;
  isRequirement: boolean;
  updateSelectedFunction: (item: IRequirement) => void;
}

const useStyles = makeStyles({
  requirementButton: {
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'space-between',
    border: `1px solid ${theme.palette.lightBlue.main}`,
    '&:hover': {
      background: theme.palette.lightBlue.main,
      color: theme.palette.dfoWhite.main,

      '& $sideBarListItemText': {
        color: theme.palette.dfoWhite.main
      }
    },

    [theme.breakpoints.down('sm')]: {
      backgroundColor: theme.palette.gray100.main
    }
  }
});

export default function RequirementsPerNeed({
  selectedProduct,
  updateSelectedFunction,
  isRequirement
}: IProps): React.ReactElement {
  const { project } = useAppSelector((state) => state.project);

  const classes = useStyles();

  const findAssociatedReqsAndNeeds = (): [
    { [key: string]: IRequirement[] },
    Nestable<INeed>[]
  ] => {
    let requirements: { [key: string]: IRequirement[] } = {};
    let needs: Nestable<INeed>[] = [];
    if (selectedProduct !== null) {
      const [associatedRequirements, associatedNeeds] =
        Utils.findAssociatedRequirements(selectedProduct, project);
      requirements = associatedRequirements;
      needs = associatedNeeds;
    }
    if (isRequirement) {
      needs = project.needs;
    }

    return [requirements, needs];
  };

  const associatedValues = findAssociatedReqsAndNeeds();
  const relatedRequirements = associatedValues[0];
  const relatedNeeds = associatedValues[1];

  const requirementList = (requirements: IRequirement[]) => {
    const reqList = requirements.map((element: IRequirement) => {
      return (
        <Button
          onClick={() => updateSelectedFunction(element)}
          className={classes.requirementButton}
        >
          {element.title}
        </Button>
      );
    });
    return (
      <>
        <ListGroup className="ml-3 mt-3 mb-4">{reqList}</ListGroup>
      </>
    );
  };

  const needHierarchy = (needsList: Nestable<INeed>[]) => {
    let requirements: IRequirement[] = [];
    const hierarchy = needsList.map((element) => {
      if (isRequirement) {
        requirements = element.requirements;
      }
      if (selectedProduct !== null && relatedRequirements !== {}) {
        if (element.id in relatedRequirements)
          requirements = relatedRequirements[element.id];
      }
      return (
        <>
          {requirements.length > 0 && (
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
                {requirements.length > 0 && requirementList(requirements)}
              </AccordionDetails>
            </Accordion>
          )}
        </>
      );
    });
    return <>{hierarchy}</>;
  };

  return needHierarchy(relatedNeeds);
}
