import { createContext } from 'react';

export type AccordionContextType = {
  onOpenClose: (e: string) => void;
};
export const AccordionContext = createContext<AccordionContextType>({
  onOpenClose: (e: string) => new Error(`no accordion provider: ${e}`)
});
