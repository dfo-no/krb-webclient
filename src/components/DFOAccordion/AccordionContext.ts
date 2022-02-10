import { createContext } from 'react';

export type AccordionContextType = {
  activeKey: string;
  onOpenClose: (e: string) => void;
};
export const AccordionContext = createContext<AccordionContextType>({
  activeKey: '',
  onOpenClose: (e: string) => new Error(`no accordion provider: ${e}`)
});
