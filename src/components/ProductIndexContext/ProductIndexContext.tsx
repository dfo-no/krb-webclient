import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState
} from 'react';

interface IIndexContext {
  productIndex: number;
  setProductIndex: Dispatch<SetStateAction<number>>;
  create: boolean;
  setCreate: Dispatch<SetStateAction<boolean>>;
}

const initialContext: IIndexContext = {
  productIndex: -1,
  setProductIndex: function (): void {
    throw new Error('Function not implemented.');
  },
  create: false,
  setCreate: function (): void {
    throw new Error('Function not implemented.');
  }
};

export const IndexContext = createContext<IIndexContext>(initialContext);

interface IProps {
  children: React.ReactNode;
}

export const ProductIndexProvider = ({
  children
}: IProps): React.ReactElement => {
  const [productIndex, setProductIndex] = useState(-1);
  const [create, setCreate] = useState(false);

  return (
    <IndexContext.Provider
      value={{
        productIndex,
        setProductIndex,
        create,
        setCreate
      }}
    >
      {children}
    </IndexContext.Provider>
  );
};

export const useProductIndexState = (): IIndexContext => {
  const context = useContext(IndexContext);

  if (context === undefined) {
    throw new Error('useIndexState must be used within a IndexProvider');
  }
  return context;
};
