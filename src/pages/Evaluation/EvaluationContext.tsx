import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState
} from 'react';
import { IEvaluatedResponse } from '../../Nexus/entities/IEvaluatedResponse';
import { IResponse } from '../../Nexus/entities/IResponse';
import { IFile } from '../../models/IFile';
import { ISpecification } from '../../Nexus/entities/ISpecification';
import SpecificationService from '../../Nexus/services/SpecificationService';

type IEvaluationContext = {
  tab: number;
  setTab: Dispatch<SetStateAction<number>>;
  evaluations: IEvaluatedResponse[];
  setEvaluations: Dispatch<SetStateAction<IEvaluatedResponse[]>>;
  specification: ISpecification;
  setEvaluationSpecification: Dispatch<SetStateAction<ISpecification>>;
  files: IFile[];
  setFiles: Dispatch<SetStateAction<IFile[]>>;
  responses: IResponse[];
  setResponses: Dispatch<SetStateAction<IResponse[]>>;
  specFile: IFile | null;
  setSpecFile: Dispatch<SetStateAction<IFile | null>>;
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
  setEvaluations: () => {},
  specification: SpecificationService.defaultSpecification(),
  setEvaluationSpecification: () => {},
  files: [],
  setFiles: () => {},
  responses: [],
  setResponses: () => {},
  specFile: null,
  setSpecFile: () => {}
};

export const EvaluationContext =
  createContext<IEvaluationContext>(initialContext);

export const EvaluationProvider = ({ children }: IProps) => {
  const [tab, setTab] = useState(0);
  const [evaluations, setEvaluations] = useState<IEvaluatedResponse[]>([]);
  const [evaluationSpecification, setEvaluationSpecification] =
    useState<ISpecification>(SpecificationService.defaultSpecification());
  const [files, setFiles] = useState<IFile[]>([]);
  const [responses, setResponses] = useState<IResponse[]>([]);
  const [specFile, setSpecFile] = useState<IFile | null>(null);

  return (
    <EvaluationContext.Provider
      value={{
        tab,
        setTab,
        evaluations,
        setEvaluations,
        specification: evaluationSpecification,
        setEvaluationSpecification,
        files,
        setFiles,
        responses,
        setResponses,
        specFile,
        setSpecFile
      }}
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
