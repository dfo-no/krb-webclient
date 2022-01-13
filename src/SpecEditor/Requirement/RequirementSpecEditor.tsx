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
  const { spec } = useAppSelector((state) => state.specification);

  return (
    <Container fluid>
      <RequirementSelectorList needList={spec.bank.needs} />
    </Container>
  );
}
