import produce from 'immer';
import { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { createContainer } from 'unstated-next';

import { HeaderContainer } from '../../components/Header/HeaderContext';
import {
  PrefilledResponsePath,
  PrefilledResponseRouteParams,
} from '../../models/PrefilledResponseRouteParams';
import { IPrefilledResponse } from '../../Nexus/entities/IPrefilledResponse';
import { IPrefilledResponseProduct } from '../../Nexus/entities/IPrefilledResponseProduct';
import { IRequirementAnswer } from '../../Nexus/entities/IRequirementAnswer';
import Nexus from '../../Nexus/Nexus';
import { PrefilledResponseStoreService } from '../../Nexus/services/PrefilledResponseStore';

const usePrefilledResponseContext = () => {
  const routeMatch = useRouteMatch<PrefilledResponseRouteParams>(
    PrefilledResponsePath
  );
  const prefilledResponseId = routeMatch?.params?.prefilledResponseId;
  const nexus = Nexus.getInstance();

  const { setTitle } = HeaderContainer.useContainer();

  const [prefilledResponse, setPrefilledResponse] =
    useState<IPrefilledResponse>(
      PrefilledResponseStoreService.defaultPrefilledResponse()
    );

  const [product, setProduct] = useState<
    IPrefilledResponseProduct | undefined
  >();

  const [openProductSelection, setOpenProductSelection] = useState(false);
  const [newProductCreate, setNewProductCreate] = useState(false);

  useEffect(() => {
    console.log('prefilledResponseId = ', prefilledResponseId);

    if (prefilledResponseId) {
      nexus.prefilledResponseService
        .getPrefilledResponse(prefilledResponseId)
        .then((foundPrefilledResponse) => {
          setPrefilledResponse(foundPrefilledResponse);
        });
      setTitle(prefilledResponse.bank.title);
      return function cleanup() {
        setTitle('');
      };
    }
  }, [
    nexus.prefilledResponseService,
    prefilledResponse.bank.title,
    prefilledResponseId,
    setTitle,
  ]);

  const setResponse = (payload: IPrefilledResponse) => {
    setPrefilledResponse(
      produce(prefilledResponse, (draft) => {
        // eslint-disable-next-line no-param-reassign, @typescript-eslint/no-unused-vars
        draft = payload;
      })
    );
  };

  const addAnswer = (payload: IRequirementAnswer) => {
    setPrefilledResponse(
      produce(prefilledResponse, (draft) => {
        if (
          draft.requirementAnswers.find((answer) => answer.id === payload.id)
        ) {
          const oldSelectIndex = draft.requirementAnswers.findIndex(
            (answer) => answer.id === payload.id
          );
          draft.requirementAnswers.splice(oldSelectIndex, 1);
        }
        draft.requirementAnswers.push(payload);
      })
    );
  };

  const addProduct = (payload: IPrefilledResponseProduct) => {
    setPrefilledResponse(
      produce(prefilledResponse, (draft) => {
        draft.products.push(payload);
      })
    );
  };

  const addProductAnswer = (answer: IRequirementAnswer, productId: string) => {
    setPrefilledResponse(
      produce(prefilledResponse, (draft) => {
        const index = draft.products.findIndex(
          (candidateProduct) => candidateProduct.id === productId
        );

        if (index !== -1) {
          const variantIndex = draft.products[
            index
          ].requirementAnswers.findIndex(
            (currentAnswer) =>
              currentAnswer.variantId === currentAnswer.variantId
          );
          if (variantIndex !== -1) {
            // variant exists already, remove it
            draft.products[index].requirementAnswers.splice(variantIndex, 1);
          }
          draft.products[index].requirementAnswers.push(answer);
        }
      })
    );
  };

  const editProduct = (
    productToEdit: IPrefilledResponseProduct,
    productId: string
  ) => {
    setPrefilledResponse(
      produce(prefilledResponse, (draft) => {
        const productIndex = draft.products.findIndex(
          (candidate) => candidate.id === productId
        );
        draft.products[productIndex] = productToEdit;
      })
    );
  };

  return {
    prefilledResponse,
    setResponse,
    addAnswer,
    addProduct,
    addProductAnswer,
    editProduct,
    openProductSelection,
    setOpenProductSelection,
    newProductCreate,
    setNewProductCreate,
    product,
    setProduct,
  };
};

export const PrefilledResponseContainer = createContainer(
  usePrefilledResponseContext
);
