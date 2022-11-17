import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';

import { IEvaluatedResponse } from '../../Nexus/entities/IEvaluatedResponse';
import { IResponse } from '../../Nexus/entities/IResponse';
import { IFile } from '../../models/IFile';
import { SpecificationFile } from '../../Nexus/entities/SpecificationFile';
import { getInvalidSpecificationFile } from '../../Nexus/services/EvaluationSpecificationStoreService';
import { HeaderContainer } from '../../components/Header/HeaderContext';

type IEvaluationContext = {
  tab: number;
  setTab: Dispatch<SetStateAction<number>>;
  evaluations: IEvaluatedResponse[];
  setEvaluations: Dispatch<SetStateAction<IEvaluatedResponse[]>>;
  specificationUpload: SpecificationFile;
  setSpecificationUpload: Dispatch<SetStateAction<SpecificationFile>>;
  files: IFile[];
  setFiles: Dispatch<SetStateAction<IFile[]>>;
  responses: IResponse[];
  setResponses: Dispatch<SetStateAction<IResponse[]>>;
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
  specificationUpload: getInvalidSpecificationFile(),
  setSpecificationUpload: () => {},
  files: [],
  setFiles: () => {},
  responses: [],
  setResponses: () => {},
};

export const EvaluationContext =
  createContext<IEvaluationContext>(initialContext);

export const EvaluationProvider = ({ children }: IProps) => {
  const [tab, setTab] = useState(0);
  const [evaluations, setEvaluations] = useState<IEvaluatedResponse[]>([]);
  const [specificationFile, setSpecificationFile] = useState<SpecificationFile>(
    getInvalidSpecificationFile()
  );
  const [files, setFiles] = useState<IFile[]>([]);
  const [responses, setResponses] = useState<IResponse[]>([]);

  const { setTitle } = HeaderContainer.useContainer();
  useEffect(() => {
    const caseNumber = specificationFile.specification.caseNumber;
    setTitle(
      specificationFile.specification.title +
        (caseNumber ? ' - ' + caseNumber : '')
    );
    return function cleanup() {
      setTitle('');
    };
  }, [setTitle, specificationFile]);

  return (
    <EvaluationContext.Provider
      value={{
        tab,
        setTab,
        evaluations,
        setEvaluations,
        specificationUpload: specificationFile,
        setSpecificationUpload: setSpecificationFile,
        files,
        setFiles,
        responses,
        setResponses,
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
