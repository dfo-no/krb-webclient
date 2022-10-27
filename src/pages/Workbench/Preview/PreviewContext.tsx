import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';

import { IProduct } from '../../../Nexus/entities/IProduct';
import { Parentable } from '../../../models/Parentable';

interface IPreviewContext {
  selected: Parentable<IProduct> | null;
  setSelected: Dispatch<SetStateAction<Parentable<IProduct> | null>>;
}

const initialContext: IPreviewContext = {
  selected: null,
  setSelected: function (): void {
    throw new Error('Function not implemented.');
  },
};

export const PreviewContext = createContext<IPreviewContext>(initialContext);

interface IProps {
  children: React.ReactNode;
}

export const PreviewProvider = ({ children }: IProps) => {
  const [selected, setSelected] = useState<Parentable<IProduct> | null>(null);

  return (
    <PreviewContext.Provider
      value={{
        selected,
        setSelected,
      }}
    >
      {children}
    </PreviewContext.Provider>
  );
};

export const usePreviewState = (): IPreviewContext => {
  const context = useContext(PreviewContext);

  if (context === undefined) {
    throw new Error('usePreviewState must be used within a PreviewProvider');
  }
  return context;
};
