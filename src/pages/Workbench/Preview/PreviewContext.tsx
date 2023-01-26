import { useState } from 'react';
import { createContainer } from 'unstated-next';

import { Parentable } from '../../../models/Parentable';
import { IProduct } from '../../../Nexus/entities/IProduct';

const usePreviewContext = () => {
  const [selected, setSelected] = useState<Parentable<IProduct> | null>(null);

  return {
    selected,
    setSelected,
  };
};

export const PreviewContextContainer = createContainer(usePreviewContext);
export const usePreviewState = PreviewContextContainer.useContainer;
export const PreviewProvider = PreviewContextContainer.Provider;
