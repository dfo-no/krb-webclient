import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { RouteComponentProps } from 'react-router-dom';

import Utils from '../../common/Utils';
import { IRequirementAnswer } from '../../Nexus/entities/IRequirementAnswer';
import { IResponse } from '../../Nexus/entities/IResponse';
import { IResponseProduct } from '../../Nexus/entities/IResponseProduct';
import Nexus from '../../Nexus/Nexus';
import { MatchParams } from './ResponseModule';
import { useHeaderState } from '../../components/Header/HeaderContext';
import ResponseStoreService from '../../Nexus/services/ResponseStoreService';

type Props = {
  children: React.ReactNode;
} & RouteComponentProps<MatchParams>;

type ResponseContextType = {
  response: IResponse;
  setResponse: Dispatch<SetStateAction<IResponse>>;
  editResponseProduct: Dispatch<IResponseProduct>;
  addRequirementAnswer: Dispatch<IRequirementAnswer>;
  addProductAnswer: Dispatch<{ answer: IRequirementAnswer; productId: string }>;
};

const initialContext: ResponseContextType = {
  response: ResponseStoreService.defaultResponse(),
  setResponse: () => {},
  editResponseProduct: () => {},
  addRequirementAnswer: () => {},
  addProductAnswer: () => {},
};

export const ResponseContext =
  createContext<ResponseContextType>(initialContext);

export const ResponseProvider = ({ children, match }: Props) => {
  // const routeMatch =
  //   useRouteMatch<IRouteSpecificationParams>(SpecificationPath);
  const responseId = match.params.responseId;
  const { setTitle } = useHeaderState();

  const [response, setResponse] = useState<IResponse>(
    ResponseStoreService.defaultResponse()
  );
  const nexus = Nexus.getInstance();

  useEffect(() => {
    if (responseId) {
      nexus.responseService.getResponse(responseId).then((storedResponse) => {
        setResponse(storedResponse);
        setTitle(storedResponse.specification.title);
      });
      return function cleanup() {
        setTitle('');
      };
    }
  }, [responseId, nexus, setTitle]);

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
