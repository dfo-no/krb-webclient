import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState
} from 'react';
import { IBank } from '../../Nexus/entities/IBank';

interface IBankContext {
  selectedBank: IBank | null;
  setSelectedBank: Dispatch<SetStateAction<IBank | null>>;
}

const initialContext: IBankContext = {
  selectedBank: null,
  setSelectedBank: function (): void {
    throw new Error('Function not implemented.');
  }
};

export const BankContext = createContext<IBankContext>(initialContext);

interface IProps {
  children: React.ReactNode;
}

export const BankProvider = ({ children }: IProps): React.ReactElement => {
  const [selectedBank, setSelectedBank] = useState<IBank | null>(null);

  return (
    <BankContext.Provider
      value={{
        selectedBank,
        setSelectedBank
      }}
    >
      {children}
    </BankContext.Provider>
  );
};

export const useBankState = (): IBankContext => {
  const context = useContext(BankContext);

  if (context === undefined) {
    throw new Error(
      'useProjectSpecificationState must be used within a ProjectSpecificationProvider'
    );
  }
  return context;
};
