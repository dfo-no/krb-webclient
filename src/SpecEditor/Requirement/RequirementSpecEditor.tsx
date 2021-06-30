import React, { ReactElement } from 'react';
import Container from 'react-bootstrap/Container';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import Utils from '../../common/Utils';
import { Bank } from '../../models/Bank';
import { selectBank } from '../../store/reducers/selectedBank-reducer';
import { RootState } from '../../store/store';
import RequirementSelectorList from './RequirementSelectorList';

interface RouteParams {
  bankId: string;
}

export default function RequirementSpecEditor(): ReactElement {
  const projectMatch = useRouteMatch<RouteParams>('/speceditor/:bankId');
  const { id } = useSelector((state: RootState) => state.selectedBank);
  const { list } = useSelector((state: RootState) => state.bank);
  const dispatch = useDispatch();

  if (projectMatch?.params.bankId && !id) {
    dispatch(selectBank(projectMatch?.params.bankId));
  }

  if (!id) {
    return <p>No selected bank</p>;
  }
  const bankSelected = Utils.ensure(list.find((bank: Bank) => bank.id === id));
  return (
    <Container fluid>
      <RequirementSelectorList needList={bankSelected.needs} />
    </Container>
  );
}
