import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import AnswerTypeSelector from '../Components/AnswerTypeSelector';

export default function ConfigureQuestion(): ReactElement {
  const { alternativeId } = useSelector(
    (state: RootState) => state.selectedAlternative
  );
  const { spec } = useSelector((state: RootState) => state.specification);

  if (!alternativeId) {
    return <p>No alternative selected</p>;
  }

  const itemIndex = spec.requirementAnswers.findIndex(
    (alt) => alt.id === alternativeId
  );

  const item = spec.requirementAnswers[itemIndex];
  return <AnswerTypeSelector answer={item} />;
}
