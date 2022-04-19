import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState
} from 'react';
import { ISpecification } from '../Nexus/entities/ISpecification';
import { ISpecificationProduct } from '../models/ISpecificationProduct';

interface ISpecificationContext {
  specification: ISpecification | null;
  setSpecification: Dispatch<SetStateAction<ISpecification | null>>;
  specificationProduct: ISpecificationProduct | null;
  setSpecificationProduct: Dispatch<
    SetStateAction<ISpecificationProduct | null>
  >;
  create: boolean;
  setCreate: Dispatch<SetStateAction<boolean>>;
}

const initialContext: ISpecificationContext = {
  specification: null,
  setSpecification: function (): void {
    throw new Error('Function not implemented.');
  },
  specificationProduct: null,
  setSpecificationProduct: function (): void {
    throw new Error('Function not implemented.');
  },
  create: false,
  setCreate: function (): void {
    throw new Error('Function not implemented.');
  }
};

export const SpecificationContext =
  createContext<ISpecificationContext>(initialContext);

interface IProps {
  children: React.ReactNode;
}

export const SpecificationProvider = ({
  children
}: IProps): React.ReactElement => {
  const [specification, setSpecification] = useState<ISpecification | null>(
    null
  );
  const [specificationProduct, setSpecificationProduct] =
    useState<ISpecificationProduct | null>(null);
  const [create, setCreate] = useState(false);

  return (
    <SpecificationContext.Provider
      value={{
        specification,
        setSpecification,
        specificationProduct,
        setSpecificationProduct,
        create,
        setCreate
      }}
    >
      {children}
    </SpecificationContext.Provider>
  );
};

export const useSpecificationState = (): ISpecificationContext => {
  const context = useContext(SpecificationContext);

  if (context === undefined) {
    throw new Error(
      'useSpecificationState must be used within a SpecificationProvider'
    );
  }
  return context;
};
