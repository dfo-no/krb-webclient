import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';

interface IEditableContext {
  currentlyEditedItemId: string;
  setCurrentlyEditedItemId: Dispatch<SetStateAction<string>>;
  isCreating: boolean;
  setCreating: Dispatch<SetStateAction<boolean>>;
  deleteCandidateId: string;
  setDeleteCandidateId: Dispatch<SetStateAction<string>>;
}

const initialContext: IEditableContext = {
  currentlyEditedItemId: '',
  setCurrentlyEditedItemId: function (): void {
    throw new Error('Function not implemented.');
  },
  isCreating: false,
  setCreating: function (): void {
    throw new Error('Function not implemented.');
  },
  deleteCandidateId: '',
  setDeleteCandidateId: function (): void {
    throw new Error('Function not implemented.');
  },
};

export const EditableContext = createContext<IEditableContext>(initialContext);

interface IProps {
  children: React.ReactNode;
}

export const EditableProvider = ({ children }: IProps) => {
  const [currentlyEditedItemId, setCurrentlyEditedItemId] = useState('');
  const [isCreating, setCreating] = useState(false);
  const [deleteCandidateId, setDeleteCandidateId] = useState('');

  useEffect(() => {
    if (currentlyEditedItemId !== '') {
      setCreating(false);
      setDeleteCandidateId('');
    }
  }, [currentlyEditedItemId]);

  useEffect(() => {
    if (isCreating) {
      setCurrentlyEditedItemId('');
      setDeleteCandidateId('');
    }
  }, [isCreating]);

  useEffect(() => {
    if (deleteCandidateId !== '') {
      setCreating(false);
      setCurrentlyEditedItemId('');
    }
  }, [deleteCandidateId]);

  return (
    <EditableContext.Provider
      value={{
        currentlyEditedItemId,
        setCurrentlyEditedItemId,
        isCreating,
        setCreating,
        deleteCandidateId,
        setDeleteCandidateId,
      }}
    >
      {children}
    </EditableContext.Provider>
  );
};

export const useEditableState = (): IEditableContext => {
  const context = useContext(EditableContext);

  if (context === undefined) {
    throw new Error('useEditableState must be used within a EditableProvider');
  }
  return context;
};
