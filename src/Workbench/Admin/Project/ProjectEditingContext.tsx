import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState
} from 'react';

interface IProjectEditingContext {
  isEditing: boolean;
  setEditing: Dispatch<SetStateAction<boolean>>;
}

const initialContext: IProjectEditingContext = {
  isEditing: false,
  setEditing: function (): void {
    throw new Error('Function not implemented.');
  }
};

export const ProjectEditingContext =
  createContext<IProjectEditingContext>(initialContext);

interface IProps {
  children: React.ReactNode;
}

export const ProjectEditingProvider = ({ children }: IProps) => {
  const [isEditing, setEditing] = useState(false);

  return (
    <ProjectEditingContext.Provider
      value={{
        isEditing,
        setEditing
      }}
    >
      {children}
    </ProjectEditingContext.Provider>
  );
};

export const useProjectEditingState = (): IProjectEditingContext => {
  const context = useContext(ProjectEditingContext);

  if (context === undefined) {
    throw new Error(
      'useProjectEditingState must be used within a ProjectEditingProvider'
    );
  }
  return context;
};
