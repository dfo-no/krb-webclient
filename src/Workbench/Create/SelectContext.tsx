import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState
} from 'react';
import { Levelable } from '../../models/Levelable';
import { INeed } from '../../Nexus/entities/INeed';
import { IRequirement } from '../../Nexus/entities/IRequirement';
import { IVariant } from '../../Nexus/entities/IVariant';

interface ISelectContext {
  need: INeed | null;
  setNeed: Dispatch<SetStateAction<Levelable<INeed> | null>>;
  requirement: IRequirement | null;
  setRequirement: Dispatch<SetStateAction<IRequirement | null>>;
  variant: IVariant | null;
  setVariant: Dispatch<SetStateAction<IVariant | null>>;
  needIndex: number | null;
  setNeedIndex: (value: number | null) => void;
}

const initialContext: ISelectContext = {
  need: null,
  setNeed: function (): void {
    throw new Error('Function not implemented.');
  },
  requirement: null,
  setRequirement: function (): void {
    throw new Error('Function not implemented.');
  },
  variant: null,
  setVariant: function (): void {
    throw new Error('Function not implemented.');
  },
  needIndex: null,
  setNeedIndex: function (): void {
    throw new Error('Function not implemented.');
  }
};

export const SelectContext = createContext<ISelectContext>(initialContext);

interface IProps {
  children: React.ReactNode;
}

export const SelectProvider = ({ children }: IProps) => {
  const [need, setNeed] = useState<Levelable<INeed> | null>(null);
  const [requirement, setRequirement] = useState<IRequirement | null>(null);
  const [variant, setVariant] = useState<IVariant | null>(null);
  const [needIndex, setNeedIndex] = useState<number | null>(null);

  return (
    <SelectContext.Provider
      value={{
        need,
        setNeed,
        requirement,
        setRequirement,
        variant,
        setVariant,
        needIndex,
        setNeedIndex
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
