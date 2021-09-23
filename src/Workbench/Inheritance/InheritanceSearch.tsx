import React, { ReactElement } from 'react';
import { useAppSelector } from '../../store/hooks';
import InheritanceSearchBar from './InheritanceSearchBar';

export default function InheritanceSearch(): ReactElement {
  const { list } = useAppSelector((state) => state.bank);
  return (
    <>
      <h5 className="mt-5 ml-2 mb-5">Søk og legg til avhengigheter</h5>
      <InheritanceSearchBar list={list} />
    </>
  );
}
