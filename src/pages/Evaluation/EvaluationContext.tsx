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
import { ModelType } from '../../Nexus/enums';
import { ISpecification } from '../../Nexus/entities/ISpecification';

type IEvaluationContext = {
  tab: number;
  setTab: Dispatch<SetStateAction<number>>;
  evaluations: IEvaluatedResponse[];
  setEvaluations: Dispatch<SetStateAction<IEvaluatedResponse[]>>;
  files: IFile[];
  setFiles: Dispatch<SetStateAction<IFile[]>>;
  responses: IResponse[];
  setResponses: Dispatch<SetStateAction<IResponse[]>>;
  evaluationSpecification: ISpecification;
  setEvaluationSpecification: Dispatch<SetStateAction<ISpecification>>;
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
  files: [],
  setFiles: () => {},
  responses: [],
  setResponses: () => {},
  evaluationSpecification: {
    id: '',
    bank: {
      id: '',
      title: '',
      description: '',
      needs: [],
      products: [],
      codelist: [],
      tags: [],
      version: 0,
      type: ModelType.bank,
      publications: [],
      inheritedBanks: [],
      publishedDate: null,
      sourceOriginal: null,
      sourceRel: null,
      projectId: null,
      deletedDate: null
    },
    title: '',
    organization: '',
    organizationNumber: '',
    products: [],
    requirements: [],
    requirementAnswers: []
  },
  setEvaluationSpecification: () => {}
};

export const EvaluationContext =
  createContext<IEvaluationContext>(initialContext);

export const EvaluationProvider = ({ children }: IProps) => {
  const [tab, setTab] = useState(0);
  const [evaluations, setEvaluations] = useState<IEvaluatedResponse[]>([]);
  const [files, setFiles] = useState<IFile[]>([]);
  const [responses, setResponses] = useState<IResponse[]>([]);
  const [evaluationSpecification, setEvaluationSpecification] =
    useState<ISpecification>({
      id: '',
      bank: {
        id: '',
        title: '',
        description: '',
        needs: [],
        products: [],
        codelist: [],
        tags: [],
        version: 0,
        type: ModelType.bank,
        publications: [],
        inheritedBanks: [],
        publishedDate: null,
        sourceOriginal: null,
        sourceRel: null,
        projectId: null,
        deletedDate: null
      },
      title: '',
      organization: '',
      organizationNumber: '',
      products: [],
      requirements: [],
      requirementAnswers: []
    });

  return (
    <EvaluationContext.Provider
      value={{
        tab,
        setTab,
        evaluations,
        setEvaluations,
        files,
        setFiles,
        responses,
        setResponses,
        evaluationSpecification,
        setEvaluationSpecification
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
