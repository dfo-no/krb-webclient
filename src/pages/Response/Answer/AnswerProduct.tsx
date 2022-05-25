import { Box } from '@mui/material';
import React, { ReactElement } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import theme from '../../../theme';
import { useAppSelector } from '../../../store/hooks';
import { useResponseState } from '../ResponseContext';
import { ScrollableContainer } from '../../../Workbench/Components/ScrollableContainer';
import ProductNeed from './ProductNeed';
import ProductHeader from './ProductHeader';
import ProductRequirementAnswer from './ProductRequirementAnswer';
import { INeed } from '../../../Nexus/entities/INeed';
import { IRequirementAnswer } from '../../../models/IRequirementAnswer';

const useStyles = makeStyles({
  newProduct: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.gray200.main
  }
});

export default function AnswerProduct(): React.ReactElement {
  const classes = useStyles();
  const { response } = useAppSelector((state) => state.response);
  const { responseProductIndex } = useResponseState();
  const existingNeeds = new Set<INeed>();

  const renderRequirementAnswer = (
    requirementAnswer: IRequirementAnswer
  ): ReactElement => {
    const requirementNeed = response.spesification.bank.needs.find(
      (need) => need.id === requirementAnswer.requirement.needId
    );
    if (requirementNeed && !existingNeeds.has(requirementNeed)) {
      existingNeeds.add(requirementNeed);
      return (
        <Box>
          <ProductNeed need={requirementNeed} />
          <ProductRequirementAnswer
            key={requirementAnswer.id}
            requirementAnswer={requirementAnswer}
          />
        </Box>
      );
    } else {
      return (
        <ProductRequirementAnswer
          key={requirementAnswer.id}
          requirementAnswer={requirementAnswer}
        />
      );
    }
  };

  const renderRequirements = (): (ReactElement | undefined)[] => {
    if (responseProductIndex === -1) {
      return response.spesification.requirements.map((requirementId) => {
        const requirementAnswer =
          response.spesification.requirementAnswers.find(
            (reqAns) => reqAns.requirement.id === requirementId
          );
        if (requirementAnswer) {
          return renderRequirementAnswer(requirementAnswer);
        }
      });
    } else {
      return response.spesification.products[
        responseProductIndex
      ].requirements.map((requirementId) => {
        const requirementAnswer =
          response.spesification.requirementAnswers.find(
            (reqAns) => reqAns.requirement.id === requirementId
          );
        if (requirementAnswer) {
          return renderRequirementAnswer(requirementAnswer);
        }
      });
    }
  };

  return (
    <Box className={classes.newProduct}>
      <ProductHeader />
      <ScrollableContainer sx={{ marginBottom: 0 }}>
        {renderRequirements()}
      </ScrollableContainer>
    </Box>
  );
}
