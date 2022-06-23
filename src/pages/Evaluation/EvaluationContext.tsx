import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState
} from 'react';

interface IEvaluationContext {
  tab: number;
  setTab: Dispatch<SetStateAction<number>>;
}

interface IProps {
  children: React.ReactNode;
}

const initialContext: IEvaluationContext = {
  tab: 0,
  setTab: (): void => {
    throw new Error('Function not implemented yet');
  }
};

export const EvaluationContext =
  createContext<IEvaluationContext>(initialContext);

export const EvaluationProvider = ({ children }: IProps) => {
  const [tab, setTab] = useState(0);

  return (
    <EvaluationContext.Provider value={{ tab, setTab }}>
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
