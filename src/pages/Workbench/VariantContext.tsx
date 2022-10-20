import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';

interface IVariantContext {
  openVariants: string[];
  setOpenVariants: Dispatch<SetStateAction<string[]>>;
}

const initialContext: IVariantContext = {
  openVariants: [],
  setOpenVariants: function (): void {
    throw new Error('Function not implemented.');
  },
};

export const VariantContext = createContext<IVariantContext>(initialContext);

interface IProps {
  children: React.ReactNode;
}

export const VariantProvider = ({ children }: IProps) => {
  const [openVariants, setOpenVariants] = useState<string[]>([]);

  return (
    <VariantContext.Provider
      value={{
        openVariants,
        setOpenVariants,
      }}
    >
      {children}
    </VariantContext.Provider>
  );
};

export const useVariantState = (): IVariantContext => {
  const context = useContext(VariantContext);

  if (context === undefined) {
    throw new Error('useVariantState must be used within a VariantProvider');
  }
  return context;
};
