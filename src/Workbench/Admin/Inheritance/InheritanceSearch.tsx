import React from 'react';
import { useGetAllBanksQuery } from '../../../store/api/bankApi';
import { useAppSelector } from '../../../store/hooks';
import InheritanceSearchBar from './InheritanceSearchBar';

export default function InheritanceSearch(): React.ReactElement {
  const { data: list } = useGetAllBanksQuery();
  const { project } = useAppSelector((state) => state.project);

  return (
    <>
      <h5 className="mt-5 mb-5">Finn kravbanker du vil arve fra </h5>
      {list && <InheritanceSearchBar list={list} project={project} />}
    </>
  );
}
