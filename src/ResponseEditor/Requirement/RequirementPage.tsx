import React, { ReactElement } from 'react';
import { useAppSelector } from '../../store/hooks';
import NeedHierarchy from '../Components/NeedHierarchy';

export default function RequirementPage(): ReactElement {
  const { response } = useAppSelector((state) => state.response);

  const selectedBank = response.spesification.bank;

  return (
    <NeedHierarchy
      key={selectedBank.id}
      needs={selectedBank.needs}
      searchList={response.spesification.requirements}
      specificationSearchList={response.spesification.requirementAnswers}
      responseSearchList={response.requirementAnswers}
    />
  );
}
