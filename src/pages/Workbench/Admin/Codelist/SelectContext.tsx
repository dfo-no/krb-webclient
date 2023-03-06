import { useState } from 'react';
import { createContainer } from 'unstated-next';

import { CodelistForm } from '../../../../api/nexus2';

const useSelectContext = () => {
  const [selectedCodelist, setSelectedCodelist] = useState<CodelistForm | null>(
    null
  );
  const [allCodelists, setAllCodelists] = useState<CodelistForm[]>([]);

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
