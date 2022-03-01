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
}

const initialContext: IEditableContext = {
  editMode: '',
  setEditMode: function (): void {
    throw new Error('Function not implemented.');
  },
  isCreating: false,
  setCreating: function (): void {
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

  useEffect(() => {
    if (editMode !== '') {
      setCreating(false);
    }
  }, [editMode]);

  useEffect(() => {
    if (isCreating) {
      setEditMode('');
    }
  }, [isCreating]);

  return (
    <EditableContext.Provider
      value={{
        editMode,
        setEditMode,
        isCreating,
        setCreating
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
