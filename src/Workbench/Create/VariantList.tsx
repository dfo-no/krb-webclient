import { ListItem } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Typography from '@mui/material/Typography';
import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import {
  DFOAccordionElement,
  DFOAccordionProvider
} from '../../components/DFOAccordion/DFOAccordion';
import { QuestionType } from '../../models/QuestionType';
import { QuestionTypes } from '../../models/QuestionTypes';
import { IRequirement } from '../../Nexus/entities/IRequirement';
import { IVariant } from '../../Nexus/entities/IVariant';
import theme from '../../theme';

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

  /*
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
  */

  const variants = (variantList: IVariant[]) => {
    return variantList.map((element) => {
      return (
        <DFOAccordionElement
          key={element.id}
          eventKey={element.id}
          header={
            <Typography>
              <b>{element.requirementText}</b>
            </Typography>
          }
          body={
            <div>
              <h6 className={classes.h6}>Kravtekst</h6>
              <p>{element.requirementText}</p>
              <h6 className={classes.h6}>Vedledning til oppdragsgiver</h6>
              <p>{element.instruction}</p>
              <h6 className={classes.h6}>
                Hvordan skal leverandør svare på spørsmål
              </h6>
              {/*  {renderQuestions(element.questions)} */}
            </div>
          }
        />
      );
    });
  };

  return (
    <>
      {selectedRequirement && (
        <DFOAccordionProvider
          body={<>{variants(selectedRequirement.variants)}</>}
        />
      )}
    </>
  );
}
