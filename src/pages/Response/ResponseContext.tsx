import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { RouteComponentProps } from 'react-router-dom';
import produce from 'immer';

import Utils from '../../common/Utils';
import { IRequirementAnswer } from '../../Nexus/entities/IRequirementAnswer';
import { IResponse } from '../../Nexus/entities/IResponse';
import { IResponseProduct } from '../../Nexus/entities/IResponseProduct';
import Nexus from '../../Nexus/Nexus';
import { MatchParams } from './ResponseModule';
import { HeaderContainer } from '../../components/Header/HeaderContext';
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

  const { setTitle } = HeaderContainer.useContainer();

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
    const updatedResponse = produce(response, (draft) => {
      if (draft.products.find((product) => product.id === payload.id)) {
        const productIndex = draft.products.findIndex(
          (product) => product.id === payload.id
        );
        draft.products[productIndex] = payload;
      }
    });
    nexus.responseStore
      .setResponse(updatedResponse)
      .then(() => setResponse(updatedResponse));
  };

  const addRequirementAnswer = (payload: IRequirementAnswer) => {
    const updatedResponse = produce(response, (draft) => {
      if (draft.requirementAnswers.find((answer) => answer.id === payload.id)) {
        const oldSelectIndex = draft.requirementAnswers.findIndex(
          (answer) => answer.id === payload.id
        );
        draft.requirementAnswers.splice(oldSelectIndex, 1);
      }
      draft.requirementAnswers.push(payload);
    });

    nexus.responseStore
      .setResponse(updatedResponse)
      .then(() => setResponse(updatedResponse));
  };

  const addProductAnswer = (payload: {
    answer: IRequirementAnswer;
    productId: string;
  }) => {
    const updatedResponse = produce(response, (draft) => {
      const index = Utils.ensure(
        draft.products.findIndex((product) => product.id === payload.productId)
      );
      if (
        draft.products[index].requirementAnswers.find(
          (answer) => answer.variantId === payload.answer.variantId
        )
      ) {
        const oldSelectIndex = draft.products[
          index
        ].requirementAnswers.findIndex(
          (answer) => answer.variantId === payload.answer.variantId
        );
        draft.products[index].requirementAnswers.splice(oldSelectIndex, 1);
      }
      draft.products[index].requirementAnswers.push(payload.answer);
    });
    nexus.responseStore
      .setResponse(updatedResponse)
      .then(() => setResponse(updatedResponse));
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
