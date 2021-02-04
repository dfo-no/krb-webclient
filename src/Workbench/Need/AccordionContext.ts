import { createContext } from 'react';

export type AccordionContextType = {
  onOpenClose: (e: any) => void;
};
export const AccordionContext = createContext<AccordionContextType>({
  onOpenClose: (e: any) => console.warn('no accordion provider')
});
