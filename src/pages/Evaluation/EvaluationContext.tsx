import { useEffect, useState } from 'react';
import { createContainer } from 'unstated-next';

import { HeaderContainer } from '../../components/Header/HeaderContext';
import { IFile } from '../../models/IFile';
import { IEvaluatedResponse } from '../../Nexus/entities/IEvaluatedResponse';
import { IResponse } from '../../Nexus/entities/IResponse';
import { SpecificationFile } from '../../Nexus/entities/SpecificationFile';
import { getInvalidSpecificationFile } from '../../Nexus/services/EvaluationSpecificationStoreService';

const useEvaluationContext = () => {
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

  return {
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
  };
};

export const EvaluationContextContainer = createContainer(useEvaluationContext);
export const useEvaluationState = EvaluationContextContainer.useContainer;
export const EvaluationProvider = EvaluationContextContainer.Provider;
