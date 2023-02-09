import { useState } from 'react';
import { createContainer } from 'unstated-next';

import { ICodelist } from '../../../../Nexus/entities/ICodelist';

const useSelectContext = () => {
  const [selectedCodelist, setSelectedCodelist] = useState<ICodelist | null>(
    null
  );
  const [allCodelists, setAllCodelists] = useState<ICodelist[]>([]);

  return {
    selectedCodelist,
    setSelectedCodelist,
    allCodelists,
    setAllCodelists,
  };
};

export const SelectContextContainer = createContainer(useSelectContext);
export const useSelectState = SelectContextContainer.useContainer;
export const SelectProvider = SelectContextContainer.Provider;
