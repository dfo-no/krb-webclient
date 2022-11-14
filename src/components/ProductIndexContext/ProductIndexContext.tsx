import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';

interface IIndexContext {
  productIndex: number;
  setProductIndex: Dispatch<SetStateAction<number>>;
  create: boolean;
  setCreate: Dispatch<SetStateAction<boolean>>;
  openProductSelection: boolean;
  setOpenProductSelection: Dispatch<SetStateAction<boolean>>;
}

const initialContext: IIndexContext = {
  productIndex: -1,
  setProductIndex: function (): void {
    throw new Error('Function not implemented.');
  },
  create: false,
  setCreate: function (): void {
    throw new Error('Function not implemented.');
  },
  openProductSelection: false,
  setOpenProductSelection: function (): void {
    throw new Error('Function not implemented.');
  },
};

export const IndexContext = createContext<IIndexContext>(initialContext);

interface IProps {
  children: React.ReactNode;
}

export const ProductIndexProvider = ({
  children,
}: IProps): React.ReactElement => {
  const [productIndex, setProductIndex] = useState(-2);
  const [create, setCreate] = useState(false);
  const [openProductSelection, setOpenProductSelection] = useState(false);

  useEffect(() => {
    if (create) {
      setProductIndex(-2);
    }
  }, [create]);

  useEffect(() => {
    if (productIndex !== -2) {
      setCreate(false);
    }
  }, [productIndex]);

  return (
    <IndexContext.Provider
      value={{
        productIndex,
        setProductIndex,
        create,
        setCreate,
        openProductSelection,
        setOpenProductSelection,
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
