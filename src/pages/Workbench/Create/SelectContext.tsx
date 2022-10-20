import { createContext, useContext, useState } from 'react';

interface ISelectContext {
  needIndex: number | null;
  setNeedIndex: (value: number | null) => void;
  needId: string | null;
  setNeedId: (value: string | null) => void;
  requirementIndex: number | null;
  setRequirementIndex: (value: number | null) => void;
  deleteMode: string;
  setDeleteMode: (value: string) => void;
  createVariant: string;
  setCreateVariant: (value: string) => void;
}

const initialContext: ISelectContext = {
  needIndex: null,
  setNeedIndex: function (): void {
    throw new Error('Function not implemented.');
  },
  needId: null,
  setNeedId: function (): void {
    throw new Error('Function not implemented.');
  },
  requirementIndex: null,
  setRequirementIndex: function (): void {
    throw new Error('Function not implemented.');
  },
  deleteMode: '',
  setDeleteMode: function (): void {
    throw new Error('Function not implemented.');
  },
  createVariant: '',
  setCreateVariant: function (): void {
    throw new Error('Function not implemented.');
  },
};

export const SelectContext = createContext<ISelectContext>(initialContext);

interface IProps {
  children: React.ReactNode;
}

export const SelectProvider = ({ children }: IProps) => {
  const [needIndex, setNeedIndex] = useState<number | null>(null);
  const [needId, setNeedId] = useState<string | null>(null);
  const [requirementIndex, setRequirementIndex] = useState<number | null>(null);
  const [deleteMode, setDeleteMode] = useState('');
  const [createVariant, setCreateVariant] = useState('');

  return (
    <SelectContext.Provider
      value={{
        needIndex,
        setNeedIndex,
        needId,
        setNeedId,
        requirementIndex,
        setRequirementIndex,
        deleteMode,
        setDeleteMode,
        createVariant,
        setCreateVariant,
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
