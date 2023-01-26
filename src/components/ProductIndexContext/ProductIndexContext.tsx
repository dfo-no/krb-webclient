import { useEffect, useState } from 'react';
import { createContainer } from 'unstated-next';

const useProductIndexContext = () => {
  const [productIndex, setProductIndex] = useState(-2);
  const [create, setCreate] = useState(false);
  const [openProductSelection, setOpenProductSelection] = useState(false);

  useEffect(() => {
    if (create) {
      setProductIndex(-2);
    }
  }, [create]);

  useEffect(() => {
    if (productIndex !== -2) {
      setCreate(false);
    }
  }, [productIndex]);

  return {
    productIndex,
    setProductIndex,
    create,
    setCreate,
    openProductSelection,
    setOpenProductSelection,
  };
};

export const ProductIndexContainer = createContainer(useProductIndexContext);
export const useProductIndexState = ProductIndexContainer.useContainer;
export const ProductIndexProvider = ProductIndexContainer.Provider;
