import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState
} from 'react';
import { ICodelist } from '../../../Nexus/entities/ICodelist';

interface ISelectContext {
  codelist: ICodelist | null;
  setCodelist: Dispatch<SetStateAction<ICodelist | null>>;
  codelists: ICodelist[];
  setCodelists: Dispatch<SetStateAction<ICodelist[]>>;
}

const initialContext: ISelectContext = {
  codelist: null,
  setCodelist: function (): void {
    throw new Error('Function not implemented.');
  },
  codelists: [],
  setCodelists: function (): void {
    throw new Error('Function not implemented.');
  }
};

export const SelectContext = createContext<ISelectContext>(initialContext);

interface IProps {
  children: React.ReactNode;
}

export const SelectProvider = ({ children }: IProps) => {
  const [codelist, setCodelist] = useState<ICodelist | null>(null);
  const [codelists, setCodelists] = useState<ICodelist[]>([]);

  return (
    <SelectContext.Provider
      value={{
        codelist,
        setCodelist,
        codelists,
        setCodelists
      }}
    >
      {children}
    </SelectContext.Provider>
  );
};

export const useSelectState = (): ISelectContext => {
  const context = useContext(SelectContext);

  if (context === undefined) {
    throw new Error('useSelectState must be used within a SelectProvider');
  }
  return context;
};
