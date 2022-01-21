import React from 'react';
import { useGetAllBanksQuery } from '../../../store/api/bankApi';
import { useAppSelector } from '../../../store/hooks';
import InheritanceSearchBar from './InheritanceSearchBar';

export default function InheritanceSearch(): React.ReactElement {
  const { data: list } = useGetAllBanksQuery();
  const { project } = useAppSelector((state) => state.project);

  return (
    <>
      <h5 className="mt-5 ml-2 mb-5">Søk og legg til avhengigheter</h5>
      {list && <InheritanceSearchBar list={list} project={project} />}
    </>
  );
}
