import { useState } from 'react';
import { createContainer } from 'unstated-next';

import { ICodelist } from '../../../../Nexus/entities/ICodelist';

const useSelectContext = () => {
  const [codelist, setCodelist] = useState<ICodelist | null>(null);
  const [codelists, setCodelists] = useState<ICodelist[]>([]);

  return {
    codelist,
    setCodelist,
    codelists,
    setCodelists,
  };
};

export const SelectContextContainer = createContainer(useSelectContext);
export const useSelectState = SelectContextContainer.useContainer;
export const SelectProvider = SelectContextContainer.Provider;
