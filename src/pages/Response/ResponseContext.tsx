import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState
} from 'react';

interface IResponseContext {
  responseProductIndex: number;
  setResponseProductIndex: Dispatch<SetStateAction<number>>;
}

const initialContext: IResponseContext = {
  responseProductIndex: -1,
  setResponseProductIndex: function (): void {
    throw new Error('Function not implemented.');
  }
};

export const ResponseContext = createContext<IResponseContext>(initialContext);

interface IProps {
  children: React.ReactNode;
}

export const ResponseProvider = ({ children }: IProps): React.ReactElement => {
  const [responseProductIndex, setResponseProductIndex] = useState(-1);

  return (
    <ResponseContext.Provider
      value={{
        responseProductIndex,
        setResponseProductIndex
      }}
    >
      {children}
    </ResponseContext.Provider>
  );
};

export const useResponseState = (): IResponseContext => {
  const context = useContext(ResponseContext);

  if (context === undefined) {
    throw new Error('useResponseState must be used within a ResponseProvider');
  }
  return context;
};
