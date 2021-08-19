import React, { ReactElement } from 'react';
import { useAppSelector } from '../../store/hooks';
import AnswerTypeSelector from '../Components/AnswerTypeSelector';

export default function ConfigureQuestion(): ReactElement {
  const { alternativeId } = useAppSelector(
    (state) => state.selectedAlternative
  );
  const { spec } = useAppSelector((state) => state.specification);

  if (!alternativeId) {
    return <p>No alternative selected</p>;
  }

  const itemIndex = spec.requirementAnswers.findIndex(
    (alt) => alt.id === alternativeId
  );

  const item = spec.requirementAnswers[itemIndex];
  return <AnswerTypeSelector answer={item} />;
}
