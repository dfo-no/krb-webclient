import produce from 'immer';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { createContainer } from 'unstated-next';

import Utils from '../../common/Utils';
import { HeaderContainer } from '../../components/Header/HeaderContext';
import { IPrefilledResponse } from '../../Nexus/entities/IPrefilledResponse';
import { IPrefilledResponseProduct } from '../../Nexus/entities/IPrefilledResponseProduct';
import { IRequirementAnswer } from '../../Nexus/entities/IRequirementAnswer';
import { ModelType } from '../../Nexus/enums';

const usePrefilledResponseContext = () => {
  const { t } = useTranslation();
  const { setTitle } = HeaderContainer.useContainer();

  const [prefilledResponse, setPrefilledResponse] =
    useState<IPrefilledResponse>({
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
      supplier: '',
      products: [],
      answeredVariants: [],
      requirementAnswers: [],
    });

  //   const [selectedProduct, setSelectedProduct] =
  //     useState<IPrefilledResponseProduct>({
  //       id: '',
  //       title: '',
  //       description: '',
  //       originProduct: {
  //         id: '',
  //         title: '',
  //         description: '',
  //         parent: '',
  //         children: [],
  //         type: ModelType.product,
  //         sourceOriginal: null,
  //         sourceRel: null,
  //         deletedDate: null,
  //         unit: '',
  //       },
  //       answeredVariants: [],
  //       requirementAnswers: [],
  //       relatedProducts: [],
  //     });

  useEffect(() => {
    // const caseNumber = specificationFile.specification.caseNumber;
    setTitle(prefilledResponse.bank.title);
    return function cleanup() {
      setTitle('');
    };
  }, [prefilledResponse.bank.title, setTitle, t]);

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
  const removeAnswer = (payload: string) => {
    setPrefilledResponse(
      produce(prefilledResponse, (draft) => {
        const index = draft.requirementAnswers.findIndex(
          (element) => element.id === payload
        );
        if (index !== -1) {
          draft.requirementAnswers.splice(index, 1);
        }
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
  const removeProduct = (payload: string) => {
    setPrefilledResponse(
      produce(prefilledResponse, (draft) => {
        const index = draft.products.findIndex(
          (product) => product.id === payload
        );
        if (index !== -1) {
          draft.products.splice(index, 1);
        }
      })
    );
  };
  const addProductAnswer = (payload: {
    answer: IRequirementAnswer;
    productId: string;
  }) => {
    setPrefilledResponse(
      produce(prefilledResponse, (draft) => {
        const index = draft.products.findIndex(
          (product) => product.id === payload.productId
        );

        if (index !== -1) {
          const variantIndex = draft.products[
            index
          ].requirementAnswers.findIndex(
            (answer) => answer.variantId === payload.answer.variantId
          );
          if (variantIndex !== -1) {
            // variant exists already, remove it
            draft.products[index].requirementAnswers.splice(variantIndex, 1);
          }
          draft.products[index].requirementAnswers.push(payload.answer);
        }
      })
    );
  };
  const removeProductAnswer = (payload: {
    answerId: string;
    productId: string;
  }) => {
    setPrefilledResponse(
      produce(prefilledResponse, (draft) => {
        const index = draft.products.findIndex(
          (product) => product.id === payload.productId
        );
        if (index !== -1) {
          const reqAnswerIndex = draft.products[
            index
          ].requirementAnswers.findIndex(
            (element) => element.id === payload.answerId
          );
          if (reqAnswerIndex !== -1) {
            draft.products[index].requirementAnswers.splice(reqAnswerIndex, 1);
          }
        }
      })
    );
  };
  const addProductVariant = (payload: {
    requirement: string;
    productId: string;
  }) => {
    setPrefilledResponse(
      produce(prefilledResponse, (draft) => {
        const index = Utils.ensure(
          draft.products.findIndex(
            (product) => product.id === payload.productId
          )
        );
        draft.products[index].answeredVariants.push(payload.requirement);
      })
    );
  };
  const editProduct = (payload: {
    product: IPrefilledResponseProduct;
    productIndex: number;
  }) => {
    setPrefilledResponse(
      produce(prefilledResponse, (draft) => {
        draft.products[payload.productIndex] = payload.product;
      })
    );
  };

  return {
    prefilledResponse,
    setResponse,
    addAnswer,
    removeAnswer, // TODO: Remove or start using?
    addProduct,
    removeProduct, // TODO: Remove or start using?
    addProductAnswer,
    removeProductAnswer, // TODO: Remove or start using?
    addProductVariant, // TODO: Remove or start using?
    editProduct,
  };
};

export const PrefilledResponseContainer = createContainer(
  usePrefilledResponseContext
);
