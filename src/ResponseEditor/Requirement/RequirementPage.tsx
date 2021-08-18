import React, { ReactElement } from 'react';
import Utils from '../../common/Utils';
import { Bank } from '../../models/Bank';
import { useAppSelector } from '../../store/hooks';
import NeedHierarchy from '../Components/NeedHierarchy';

export default function RequirementPage(): ReactElement {
  const { response } = useAppSelector((state) => state.response);
  const { list } = useAppSelector((state) => state.bank);
  const { id } = useAppSelector((state) => state.selectedBank);

  const selectedBank = Utils.ensure(list.find((bank: Bank) => bank.id === id));

  return (
    <NeedHierarchy
      needs={selectedBank.needs}
      searchList={response.spesification.requirements}
      specificationSearchList={response.spesification.requirementAnswers}
      responseSearchList={response.requirementAnswers}
    />
  );
}
