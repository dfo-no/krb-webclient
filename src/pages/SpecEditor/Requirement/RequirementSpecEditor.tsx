import Container from 'react-bootstrap/Container';
import React from 'react';

import RequirementSelectorList from './RequirementSelectorList';
import { useAppSelector } from '../../../store/hooks';

export default function RequirementSpecEditor(): React.ReactElement {
  const { spec } = useAppSelector((state) => state.specification);

  return (
    <Container fluid>
      <RequirementSelectorList needList={spec.bank.needs} />
    </Container>
  );
}
