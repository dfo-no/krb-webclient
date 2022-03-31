import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState
} from 'react';
import { ISpecification } from '../Nexus/entities/ISpecification';

interface ISpecificationContext {
  specification: ISpecification | null;
  setSpecification: Dispatch<SetStateAction<ISpecification | null>>;
}

const initialContext: ISpecificationContext = {
  specification: null,
  setSpecification: function (): void {
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

  return (
    <SpecificationContext.Provider
      value={{
        specification,
        setSpecification
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
