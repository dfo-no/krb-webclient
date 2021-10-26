import React, { ReactElement } from 'react';
import { useAppSelector } from '../../store/hooks';
import AnswerTypeSelector from '../Components/AnswerTypeSelector';

export default function ConfigureQuestion(): ReactElement {
  const { questionId } = useAppSelector((state) => state.selectedQuestion);
  const { spec } = useAppSelector((state) => state.specification);

  if (!questionId) {
    return <p>No Question selected</p>;
  }

  const itemIndex = spec.requirementAnswers.findIndex(
    (question) => question.id === questionId
  );

  const item = spec.requirementAnswers[itemIndex];
  return <AnswerTypeSelector answer={item} />;
}
