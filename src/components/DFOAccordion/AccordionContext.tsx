import { useState } from 'react';
import { createContainer } from 'unstated-next';

const useAccordionContext = () => {
  const [activeKey, setActiveKey] = useState('');

  return {
    activeKey,
    setActiveKey,
  };
};

export const AccordionContextContainer = createContainer(useAccordionContext);
export const useAccordionState = AccordionContextContainer.useContainer;
export const AccordionProvider = AccordionContextContainer.Provider;
