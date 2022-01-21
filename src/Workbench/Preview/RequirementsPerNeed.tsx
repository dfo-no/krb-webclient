import { Box, Button, makeStyles } from '@material-ui/core';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import { BsArrowReturnRight, BsPencil } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Utils from '../../common/Utils';
import { Levelable } from '../../models/Levelable';
import { Nestable } from '../../models/Nestable';
import { INeed } from '../../Nexus/entities/INeed';
import { IProduct } from '../../Nexus/entities/IProduct';
import { IRequirement } from '../../Nexus/entities/IRequirement';
import { IVariant } from '../../Nexus/entities/IVariant';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectNeed } from '../../store/reducers/selectedNeed-reducer';
import { selectRequirement } from '../../store/reducers/selectedRequirement-reducer';
import theme from '../../theme';
import ParentableSideBar from '../Components/ParentableSideBar';

interface IProps {
  selectedProduct: Levelable<IProduct> | null;
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
  updateSelectedFunction
}: IProps): React.ReactElement {
  const { project } = useAppSelector((state) => state.project);

  const classes = useStyles();

  const [associatedRequirements, associatedNeeds] =
    selectedProduct !== null
      ? Utils.findAssociatedRequirements(selectedProduct, project)
      : [{}, []];

  const requirementList = (requirements: IRequirement[], need: INeed) => {
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
            {requirements.length > 0 && requirementList(requirements, element)}
          </AccordionDetails>
        </Accordion>
      );
    });
    return <>{hierarchy}</>;
  };

  return needHierarchy(associatedNeeds);
}
