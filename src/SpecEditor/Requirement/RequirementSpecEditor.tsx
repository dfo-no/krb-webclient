import React from 'react';
import Container from 'react-bootstrap/Container';
import { useParams } from 'react-router-dom';
import LoaderSpinner from '../../common/LoaderSpinner';
import { useGetBankQuery } from '../../store/api/bankApi';
import RequirementSelectorList from './RequirementSelectorList';

interface IRouteParams {
  id: string;
}

export default function RequirementSpecEditor(): React.ReactElement {
  const { id } = useParams<IRouteParams>();
  const { data: selectedBank, isLoading } = useGetBankQuery(id ?? '');

  if (isLoading) {
    return <LoaderSpinner />;
  }

  return (
    <Container fluid>
      <p>RequirementSpecEditor</p>
      {selectedBank && (
        <RequirementSelectorList needList={selectedBank.needs} />
      )}
    </Container>
  );
}
