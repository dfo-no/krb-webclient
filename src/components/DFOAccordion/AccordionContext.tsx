import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState
} from 'react';

interface IAccordionContext {
  activeKey: string;
  setActiveKey: Dispatch<SetStateAction<string>>;
}

const initialContext: IAccordionContext = {
  activeKey: '',
  setActiveKey: function (): void {
    throw new Error('Function not implemented.');
  }
};

export const AccordionContext =
  createContext<IAccordionContext>(initialContext);

interface IProps {
  children: ReactNode;
}

export const AccordionProvider = ({ children }: IProps) => {
  const [activeKey, setActiveKey] = useState('');

  return (
    <AccordionContext.Provider
      value={{
        activeKey,
        setActiveKey
      }}
    >
      {children}
    </AccordionContext.Provider>
  );
};

export const useAccordionState = (): IAccordionContext => {
  const context = useContext(AccordionContext);

  if (context === undefined) {
    throw new Error(
      'useAccordionState must be used within a AccordionProvider'
    );
  }
  return context;
};
