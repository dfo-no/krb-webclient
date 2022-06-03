import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState
} from 'react';

interface ISpecificationContext {
  specificationProductIndex: number;
  setSpecificationProductIndex: Dispatch<SetStateAction<number>>;
  genericRequirement: boolean;
  setGenericRequirement: Dispatch<SetStateAction<boolean>>;
  create: boolean;
  setCreate: Dispatch<SetStateAction<boolean>>;
}

const initialContext: ISpecificationContext = {
  specificationProductIndex: -1,
  setSpecificationProductIndex: function (): void {
    throw new Error('Function not implemented.');
  },
  genericRequirement: false,
  setGenericRequirement: function (): void {
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
  const [specificationProductIndex, setSpecificationProductIndex] =
    useState(-1);
  const [genericRequirement, setGenericRequirement] = useState(false);
  const [create, setCreate] = useState(false);

  return (
    <SpecificationContext.Provider
      value={{
        specificationProductIndex,
        setSpecificationProductIndex,
        genericRequirement,
        setGenericRequirement,
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
