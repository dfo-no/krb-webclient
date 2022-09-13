import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState
} from 'react';
import { IEvaluatedResponse } from '../../Nexus/entities/IEvaluatedResponse';

type IEvaluationContext = {
  tab: number;
  setTab: Dispatch<SetStateAction<number>>;
  evaluations: IEvaluatedResponse[];
  setEvaluations: Dispatch<SetStateAction<IEvaluatedResponse[]>>;
};

interface IProps {
  children: React.ReactNode;
}

const initialContext: IEvaluationContext = {
  tab: 0,
  setTab: (): void => {
    throw new Error('Function not implemented yet');
  },
  evaluations: [],
  setEvaluations: () => {}
};

export const EvaluationContext =
  createContext<IEvaluationContext>(initialContext);

export const EvaluationProvider = ({ children }: IProps) => {
  const [tab, setTab] = useState(0);
  const [evaluations, setEvaluations] = useState<IEvaluatedResponse[]>([]);

  return (
    <EvaluationContext.Provider
      value={{ tab, setTab, evaluations, setEvaluations }}
    >
      {children}
    </EvaluationContext.Provider>
  );
};

export const useEvaluationState = (): IEvaluationContext => {
  const context = useContext(EvaluationContext);

  if (context === undefined) {
    throw new Error(
      'useEvaluationState must be used within a EvaluationProvider'
    );
  }
  return context;
};
