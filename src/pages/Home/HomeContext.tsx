import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState
} from 'react';

import { IBank } from '../../Nexus/entities/IBank';
import { ISpecification } from '../../Nexus/entities/ISpecification';
import { IResponse } from '../../models/IResponse';
import { IPrefilledResponse } from '../../models/IPrefilledResponse';

interface IHomeContext {
  selectedBank: IBank | null;
  setSelectedBank: Dispatch<SetStateAction<IBank | null>>;
  selectedSpecification: ISpecification | null;
  setSelectedSpecification: Dispatch<SetStateAction<ISpecification | null>>;
  selectedResponse: IResponse | null;
  setSelectedResponse: Dispatch<SetStateAction<IResponse | null>>;
  selectedPrefilledResponse: IPrefilledResponse | null;
  setSelectedPrefilledResponse: Dispatch<
    SetStateAction<IPrefilledResponse | null>
  >;
}

const initialContext: IHomeContext = {
  selectedBank: null,
  setSelectedBank: function (): void {
    throw new Error('Function not implemented.');
  },
  selectedSpecification: null,
  setSelectedSpecification: function (): void {
    throw new Error('Function not implemented.');
  },
  selectedResponse: null,
  setSelectedResponse: function (): void {
    throw new Error('Function not implemented.');
  },
  selectedPrefilledResponse: null,
  setSelectedPrefilledResponse: function (): void {
    throw new Error('Function not implemented.');
  }
};

export const HomeContext = createContext<IHomeContext>(initialContext);

interface IProps {
  children: React.ReactNode;
}

export const HomeProvider = ({ children }: IProps): React.ReactElement => {
  const [selectedBank, setSelectedBank] = useState<IBank | null>(null);
  const [selectedSpecification, setSelectedSpecification] =
    useState<ISpecification | null>(null);
  const [selectedResponse, setSelectedResponse] = useState<IResponse | null>(
    null
  );
  const [selectedPrefilledResponse, setSelectedPrefilledResponse] =
    useState<IPrefilledResponse | null>(null);

  return (
    <HomeContext.Provider
      value={{
        selectedBank,
        setSelectedBank,
        selectedSpecification,
        setSelectedSpecification,
        selectedResponse,
        setSelectedResponse,
        selectedPrefilledResponse,
        setSelectedPrefilledResponse
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

export const useHomeState = (): IHomeContext => {
  const context = useContext(HomeContext);

  if (context === undefined) {
    throw new Error('useHomeState must be used within a HomeProvider');
  }
  return context;
};
