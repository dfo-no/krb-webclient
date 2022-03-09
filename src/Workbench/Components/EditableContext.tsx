import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from 'react';

interface IEditableContext {
  editMode: string;
  setEditMode: Dispatch<SetStateAction<string>>;
  isCreating: boolean;
  setCreating: Dispatch<SetStateAction<boolean>>;
  deleteMode: string;
  setDeleteMode: Dispatch<SetStateAction<string>>;
}

const initialContext: IEditableContext = {
  editMode: '',
  setEditMode: function (): void {
    throw new Error('Function not implemented.');
  },
  isCreating: false,
  setCreating: function (): void {
    throw new Error('Function not implemented.');
  },
  deleteMode: '',
  setDeleteMode: function (): void {
    throw new Error('Function not implemented.');
  }
};

export const EditableContext = createContext<IEditableContext>(initialContext);

interface IProps {
  children: React.ReactNode;
}

export const EditableProvider = ({ children }: IProps) => {
  const [editMode, setEditMode] = useState('');
  const [isCreating, setCreating] = useState(false);
  const [deleteMode, setDeleteMode] = useState('');

  useEffect(() => {
    if (editMode !== '') {
      setCreating(false);
      setDeleteMode('');
    }
  }, [editMode]);

  useEffect(() => {
    if (isCreating) {
      setEditMode('');
      setDeleteMode('');
    }
  }, [isCreating]);

  useEffect(() => {
    if (deleteMode) {
      setCreating(false);
      setEditMode('');
    }
  }, [deleteMode]);

  return (
    <EditableContext.Provider
      value={{
        editMode,
        setEditMode,
        isCreating,
        setCreating,
        deleteMode,
        setDeleteMode
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
