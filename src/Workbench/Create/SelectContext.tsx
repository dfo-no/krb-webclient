import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState
} from 'react';
import { INeed } from '../../Nexus/entities/INeed';
import { IRequirement } from '../../Nexus/entities/IRequirement';
import { IVariant } from '../../Nexus/entities/IVariant';
import { Parentable } from '../../models/Parentable';

interface ISelectContext {
  need: Parentable<INeed> | null;
  setNeed: Dispatch<SetStateAction<Parentable<INeed> | null>>;
  requirement: IRequirement | null;
  setRequirement: Dispatch<SetStateAction<IRequirement | null>>;
  variant: IVariant | null;
  setVariant: Dispatch<SetStateAction<IVariant | null>>;
  needIndex: number | null;
  setNeedIndex: (value: number | null) => void;
  requirementIndex: number | null;
  setRequirementIndex: (value: number | null) => void;
  deleteMode: string;
  setDeleteMode: (value: string) => void;
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
  },
  requirementIndex: null,
  setRequirementIndex: function (): void {
    throw new Error('Function not implemented.');
  },
  deleteMode: '',
  setDeleteMode: function (): void {
    throw new Error('Function not implemented.');
  }
};

export const SelectContext = createContext<ISelectContext>(initialContext);

interface IProps {
  children: React.ReactNode;
}

export const SelectProvider = ({ children }: IProps) => {
  const [need, setNeed] = useState<Parentable<INeed> | null>(null);
  const [requirement, setRequirement] = useState<IRequirement | null>(null);
  const [variant, setVariant] = useState<IVariant | null>(null);
  const [needIndex, setNeedIndex] = useState<number | null>(null);
  const [requirementIndex, setRequirementIndex] = useState<number | null>(null);
  const [deleteMode, setDeleteMode] = useState('');

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
        setNeedIndex,
        requirementIndex,
        setRequirementIndex,
        deleteMode,
        setDeleteMode
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
