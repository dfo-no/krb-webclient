import { useState } from 'react';
import { createContainer } from 'unstated-next';

const useVariantContext = () => {
  const [openVariants, setOpenVariants] = useState<string[]>([]);

  return {
    openVariants,
    setOpenVariants,
  };
};

export const VariantContextContainer = createContainer(useVariantContext);
export const useVariantState = VariantContextContainer.useContainer;
export const VariantProvider = VariantContextContainer.Provider;
