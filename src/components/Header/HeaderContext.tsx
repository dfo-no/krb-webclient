import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState
} from 'react';

interface IHeaderContext {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
}

const initialContext: IHeaderContext = {
  title: '',
  setTitle: function (): void {
    throw new Error('Function not implemented.');
  }
};

export const HeaderContext = createContext<IHeaderContext>(initialContext);

interface IProps {
  children: React.ReactNode;
}

export const HeaderProvider = ({ children }: IProps): React.ReactElement => {
  const [title, setTitle] = useState('');

  return (
    <HeaderContext.Provider
      value={{
        title,
        setTitle
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeaderState = (): IHeaderContext => {
  const context = useContext(HeaderContext);

  if (context === undefined) {
    throw new Error('useHeaderState must be used within a HeaderProvider');
  }
  return context;
};
