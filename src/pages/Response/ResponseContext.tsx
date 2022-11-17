import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import produce from 'immer';
import { createContainer } from 'unstated-next';

import Utils from '../../common/Utils';
import { IRequirementAnswer } from '../../Nexus/entities/IRequirementAnswer';
import { IResponse } from '../../Nexus/entities/IResponse';
import { IResponseProduct } from '../../Nexus/entities/IResponseProduct';
import Nexus from '../../Nexus/Nexus';
import { MatchParams } from './ResponseModule';
import { HeaderContainer } from '../../components/Header/HeaderContext';
import ResponseStoreService from '../../Nexus/services/ResponseStoreService';

const useResponse = () => {
  // const e = new Error(); //Bare til debugging
  // console.log(e.stack);

  console.log('useResponse in ResponseContext' + Date.now()); // Har brukt denne til å prøve å finne loopen

  const { setTitle } = HeaderContainer.useContainer();
  const params = useParams<MatchParams>();
  const responseId = params.responseId;

  const [response, setResponse] = useState<IResponse>(
    ResponseStoreService.defaultResponse()
  );

  console.log('2222222' + Date.now());
  setResponse(ResponseStoreService.defaultResponse());
  const nexus = Nexus.getInstance();

  useEffect(() => {
    console.log('======= testst ?????????');

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

  console.log('33333333' + Date.now());

  const editResponseProduct = (payload: IResponseProduct) => {
    console.log('editResponseProduct!!!' + Date.now());
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
    console.log('addRequirementAnswer' + Date.now());
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
    console.log('addProductAnswer' + Date.now());
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

  console.log('before return' + Date.now());

  return {
    response,
    editResponseProduct,
    addRequirementAnswer,
    addProductAnswer,
  };
};

export const ResponseContainer = createContainer(useResponse);
