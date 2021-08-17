import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import Utils from '../../common/Utils';
import { Bank } from '../../models/Bank';
import { RootState } from '../../store/store';
import NeedHierarchy from '../Components/NeedHierarchy';

export default function RequirementPage(): ReactElement {
  const { response } = useSelector((state: RootState) => state.response);
  const { list } = useSelector((state: RootState) => state.bank);
  const { id } = useSelector((state: RootState) => state.selectedBank);

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
