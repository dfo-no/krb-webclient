import React from 'react';
import { useAppSelector } from '../../../store/hooks';
import InheritanceSearchBar from './InheritanceSearchBar';

export default function InheritanceSearch(): React.ReactElement {
  const { list } = useAppSelector((state) => state.bank);
  const { project } = useAppSelector((state) => state.project);
  return (
    <>
      <h5 className="mt-5 ml-2 mb-5">Søk og legg til avhengigheter</h5>
      <InheritanceSearchBar list={list} project={project} />
    </>
  );
}
