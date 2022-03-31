import React from 'react';
import Container from 'react-bootstrap/Container';
import { useAppSelector } from '../../store/hooks';
import RequirementSelectorList from './RequirementSelectorList';

export default function RequirementSpecEditor(): React.ReactElement {
  const { spec } = useAppSelector((state) => state.specification);

  return (
    <Container fluid>
      <RequirementSelectorList needList={spec.bank.needs} />
    </Container>
  );
}
