import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';

import Utils from '../../common/Utils';
import { IRequirementAnswer } from '../../Nexus/entities/IRequirementAnswer';
import { IResponse } from '../../Nexus/entities/IResponse';
import { ModelType } from '../../Nexus/enums';
import { IResponseProduct } from '../../Nexus/entities/IResponseProduct';

const initialState: IResponse = {
  id: '',
  specification: {
    id: '',
    bank: {
      id: '',
      title: '',
      description: '',
      needs: [],
      tags: [],
      products: [],
      codelist: [],
      version: 0,
      type: ModelType.bank,
      publications: [],
      inheritedBanks: [],
      publishedDate: null,
      sourceOriginal: null,
      sourceRel: null,
      projectId: null,
      deletedDate: null,
    },
    title: '',
    organization: '',
    organizationNumber: '',
    products: [],
    requirements: [],
    requirementAnswers: [],
    currencyUnit: 'NOK',
  },
  supplier: '',
  products: [],
  requirementAnswers: [],
};

type Props = {
  children: React.ReactNode;
};

type ResponseContextType = {
  response: IResponse;
  setResponse: Dispatch<SetStateAction<IResponse>>;
  editResponseProduct: Dispatch<IResponseProduct>;
  addRequirementAnswer: Dispatch<IRequirementAnswer>;
  addProductAnswer: Dispatch<{ answer: IRequirementAnswer; productId: string }>;
};

const initialContext: ResponseContextType = {
  response: initialState,
  setResponse: () => {},
  editResponseProduct: () => {},
  addRequirementAnswer: () => {},
  addProductAnswer: () => {},
};

export const ResponseContext =
  createContext<ResponseContextType>(initialContext);

export const ResponseProvider = ({ children }: Props) => {
  const [response, setResponse] = useState<IResponse>(initialState);

  const editResponseProduct = (payload: IResponseProduct) => {
    if (response.products.find((product) => product.id === payload.id)) {
      const productIndex = response.products.findIndex(
        (product) => product.id === payload.id
      );
      response.products[productIndex] = payload;
    }
  };
  const addRequirementAnswer = (payload: IRequirementAnswer) => {
    if (
      response.requirementAnswers.find((answer) => answer.id === payload.id)
    ) {
      const oldSelectIndex = response.requirementAnswers.findIndex(
        (answer) => answer.id === payload.id
      );
      response.requirementAnswers.splice(oldSelectIndex, 1);
    }
    response.requirementAnswers.push(payload);
  };
  const addProductAnswer = (payload: {
    answer: IRequirementAnswer;
    productId: string;
  }) => {
    const index = Utils.ensure(
      response.products.findIndex((product) => product.id === payload.productId)
    );
    if (
      response.products[index].requirementAnswers.find(
        (answer) => answer.variantId === payload.answer.variantId
      )
    ) {
      const oldSelectIndex = response.products[
        index
      ].requirementAnswers.findIndex(
        (answer) => answer.variantId === payload.answer.variantId
      );
      response.products[index].requirementAnswers.splice(oldSelectIndex, 1);
    }
    response.products[index].requirementAnswers.push(payload.answer);
  };

  return (
    <ResponseContext.Provider
      value={{
        response,
        setResponse,
        editResponseProduct,
        addRequirementAnswer,
        addProductAnswer,
      }}
    >
      {children}
    </ResponseContext.Provider>
  );
};

export const useResponseState = (): ResponseContextType => {
  const context = useContext(ResponseContext);

  if (context === undefined) {
    throw new Error('useResponseState must be used within a ResponseProvider');
  }
  return context;
};
