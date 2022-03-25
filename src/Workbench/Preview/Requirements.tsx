import { ListItemText } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  DFOAccordionElement,
  DFOAccordionProvider
} from '../../components/DFOAccordion/DFOAccordion';
import { QuestionType } from '../../models/QuestionType';
import { QuestionTypes } from '../../models/QuestionTypes';
import { IBank } from '../../Nexus/entities/IBank';
import { IRequirement } from '../../Nexus/entities/IRequirement';
import { IVariant } from '../../Nexus/entities/IVariant';
import theme from '../../theme';
import { StandardContainer } from '../Components/StandardContainer';
import { usePreviewState } from './PreviewContext';

interface IProps {
  project: IBank;
}

const useStyles = makeStyles({
  h6: {
    color: theme.palette.lightBlue.main
  }
});

export default function Requirements({ project }: IProps): React.ReactElement {
  const classes = useStyles();
  const { t } = useTranslation();
  const { selected } = usePreviewState();

  const renderQuestions = (questions: QuestionTypes) => {
    const questionList = questions.map((element: QuestionType) => {
      return (
        <ListItem key={element.id} disableGutters>
          <ListItemText sx={{ backgroundColor: 'lightgray', p: 1 }}>
            <Typography variant="h6">{t(element.type)}</Typography>
          </ListItemText>
        </ListItem>
      );
    });
    return <List dense={true}>{questionList}</List>;
  };

  const renderVariants = (variantList: IVariant[]) => {
    return variantList.map((element) => {
      return (
        <div key={element.id} style={{ marginTop: '.5rem' }}>
          <DFOAccordionElement
            eventKey={element.id}
            header={
              <Typography sx={{ fontWeight: 'bold' }}>
                <b>{element.requirementText}</b>
              </Typography>
            }
            body={
              <div>
                <Typography variant="h6" className={classes.h6}>
                  Kravtekst
                </Typography>
                <Typography variant="body1">
                  {element.requirementText}
                </Typography>
                <Typography variant="h6" className={classes.h6}>
                  Vedledning til oppdragsgiver
                </Typography>
                <Typography variant="body1">{element.instruction}</Typography>
                <Typography variant="h6" className={classes.h6}>
                  Hvordan skal leverandør svare på spørsmål
                </Typography>
                {renderQuestions(element.questions)}
              </div>
            }
          />
        </div>
      );
    });
  };

  const renderRequirements = (requirements: IRequirement[]) => {
    return requirements.map((r) => (
      <div key={r.id} style={{ marginTop: '.5rem' }}>
        <div
          style={{
            backgroundColor: theme.palette.dfoBlue.main,
            color: theme.palette.common.white,
            padding: '.5rem'
          }}
        >
          <Typography sx={{ fontWeight: 'bold' }}>{r.title}</Typography>
        </div>
        {renderVariants(r.variants)}
      </div>
    ));
  };

  const renderNeeds = () => {
    if (selected === '') {
      return project.needs.map((need) => (
        <div key={need.id}>{renderRequirements(need.requirements)}</div>
      ));
    } else if (selected !== '' && selected.length === 36) {
      return <div>Vis alle kravene som tilhører dette produktet</div>;
    }
  };

  return (
    <StandardContainer>
      <DFOAccordionProvider body={<>{renderNeeds()}</>} />
    </StandardContainer>
  );
}
