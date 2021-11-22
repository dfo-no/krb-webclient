import React from 'react';
import Container from 'react-bootstrap/Container';
import { useRouteMatch } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectBank } from '../../store/reducers/selectedBank-reducer';
import RequirementSelectorList from './RequirementSelectorList';

interface IRouteParams {
  bankId: string;
}

export default function RequirementSpecEditor(): React.ReactElement {
  const projectMatch = useRouteMatch<IRouteParams>('/specification/:bankId');
  const { id } = useAppSelector((state) => state.selectedBank);
  const { normalizedList } = useAppSelector((state) => state.bank);
  const dispatch = useAppDispatch();

  if (projectMatch?.params.bankId && !id) {
    dispatch(selectBank(projectMatch?.params.bankId));
  }

  if (!id) {
    return <p>No selected bank</p>;
  }
  const bankSelected = normalizedList[id];
  return (
    <Container fluid>
      <RequirementSelectorList needList={bankSelected.needs} />
    </Container>
  );
}
