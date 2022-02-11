import { ListItem, makeStyles } from '@material-ui/core';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { QuestionType } from '../../models/QuestionType';
import { QuestionTypes } from '../../models/QuestionTypes';
import { IVariant } from '../../Nexus/entities/IVariant';
import theme from '../../theme';
import { useSelectState } from './SelectContext';

const useStyles = makeStyles({
  h6: {
    color: theme.palette.lightBlue.main
  }
});

export default function VariantList(): React.ReactElement {
  const classes = useStyles();

  const renderQuestions = (questions: QuestionTypes) => {
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

  const { need, requirement, variant } = useSelectState();

  const renderVariants = (variantList: IVariant[]) => {
    const list = variantList.map((element) => {
      return (
        <Accordion key={element.id}>
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
            {/*  {renderQuestions(element.questions)} */}
          </AccordionDetails>
        </Accordion>
      );
    });
    return <>{list}</>;
  };

  return <>{need && requirement && renderVariants(requirement.variants)}</>;
}
