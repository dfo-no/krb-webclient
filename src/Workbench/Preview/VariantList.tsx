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
  selectedRequirement: IRequirement;
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

export default function VariantList({
  selectedRequirement
}: IProps): React.ReactElement {
  const { project } = useAppSelector((state) => state.project);

  const classes = useStyles();

  const List = (requirements: IRequirement[]) => {
    const reqList = requirements.map((element: IRequirement) => {
      return (
        <Button className={classes.requirementButton}>{element.title}</Button>
      );
    });
    return (
      <>
        <ListGroup className="ml-3 mt-3 mb-4">{reqList}</ListGroup>
      </>
    );
  };

  const variants = (variantList: IVariant[]) => {
    const list = variantList.map((element) => {
      return (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>
              <b>{element.requirementText}</b>
            </Typography>
          </AccordionSummary>

          <AccordionDetails></AccordionDetails>
        </Accordion>
      );
    });
    return <>{list}</>;
  };

  return variants(selectedRequirement.variants);
}
