import React, { ReactElement } from 'react';
import { useAppSelector } from '../../store/hooks';
import AnswerTypeSelector from '../Components/AnswerTypeSelector';

export default function ConfigureQuestion(): ReactElement {
  const { questionId } = useAppSelector((state) => state.selectedQuestion);
  const { spec } = useAppSelector((state) => state.specification);

  if (!questionId) {
    return <p>No alternative selected</p>;
  }

  const itemIndex = spec.requirementAnswers.findIndex(
    (alt) => alt.id === questionId
  );

  const item = spec.requirementAnswers[itemIndex];
  return <AnswerTypeSelector answer={item} />;
}
