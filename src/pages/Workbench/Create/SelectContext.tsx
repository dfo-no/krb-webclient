import { useState } from 'react';
import { createContainer } from 'unstated-next';

const useSelectContext = () => {
  const [needIndex, setNeedIndex] = useState<number | null>(null);
  const [needId, setNeedId] = useState<string | null>();
  const [deleteCandidateId, setDeleteCandidateId] = useState('');
  const [createVariant, setCreateVariant] = useState('');

  return {
    needIndex,
    setNeedIndex,
    needId,
    setNeedId,
    deleteCandidateId,
    setDeleteCandidateId,
    createVariant,
    setCreateVariant,
  };
};

export const SelectContextContainer = createContainer(useSelectContext);
export const useSelectState = SelectContextContainer.useContainer;
export const SelectProvider = SelectContextContainer.Provider;
