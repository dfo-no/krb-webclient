import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState
} from 'react';

interface IPreviewContext {
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
}

const initialContext: IPreviewContext = {
  selected: '',
  setSelected: function (): void {
    throw new Error('Function not implemented.');
  }
};

export const PreviewContext = createContext<IPreviewContext>(initialContext);

interface IProps {
  children: React.ReactNode;
}

export const PreviewProvider = ({ children }: IProps) => {
  const [selected, setSelected] = useState<string>('');

  return (
    <PreviewContext.Provider
      value={{
        selected,
        setSelected
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
