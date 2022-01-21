import { Box, Button, ListItem, makeStyles } from '@material-ui/core';
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
import { QuestionType } from '../../models/QuestionType';
import { QuestionTypes } from '../../models/QuestionTypes';
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
  selectedRequirement: IRequirement | null;
}

const useStyles = makeStyles({
  h6: {
    color: theme.palette.lightBlue.main
  }
});

export default function VariantList({
  selectedRequirement
}: IProps): React.ReactElement {
  const classes = useStyles();

  const Questions = (questions: QuestionTypes) => {
    const questionList = questions.map((element: QuestionType) => {
      return (
        <ListItem>
          <h6>{element.type}</h6>
        </ListItem>
      );
    });
    return (
      <>
        <ListGroup className="ml-3 mt-3 mb-4">{questionList}</ListGroup>
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

          <AccordionDetails>
            <h6 className={classes.h6}>Kravtekst</h6>
            <p>{element.requirementText}</p>
            <h6 className={classes.h6}>Vedledning til oppdragsgiver</h6>
            <p>{element.instruction}</p>
            <h6 className={classes.h6}>
              Hvordan skal leverandør svare på spørsmål
            </h6>
            {Questions(element.questions)}
          </AccordionDetails>
        </Accordion>
      );
    });
    return <>{list}</>;
  };

  return <>{selectedRequirement && variants(selectedRequirement.variants)}</>;
}
