import Nexus from '../Nexus';
import { ICheckboxQuestion } from '../entities/ICheckboxQuestion';
import { INeed } from '../entities/INeed';
import { IPeriodDateQuestion } from '../entities/IPeriodDateQuestion';
import { IProduct } from '../entities/IProduct';
import { IResponse } from '../entities/IResponse';
import { ISliderQuestion } from '../entities/ISliderQuestion';
import { ISpecification } from '../entities/ISpecification';
import { ModelType, QuestionVariant, VariantType } from '../enums';
import { Parentable } from '../../models/Parentable';

describe('EvaluationService', () => {
  it('Can get EvaluateSlider', async () => {
    const questionSlider: ISliderQuestion = {
      type: QuestionVariant.Q_SLIDER,
      config: {
        min: 0,
        max: 50,
        step: 5,
        unit: 'TB',
        defaultDiscount: 1,
        discountsValue: [
          { id: 'd7f3cd3b-5428-470a-97fe-ce001ac096a6', value: 0, discount: 0 },
          {
            id: 'ec712301-4bf7-4d22-8d33-e96630ed0440',
            value: 10,
            discount: 100,
          },
        ],
        scoreValues: [],
      },
      answer: {
        discount: 0,
        value: 0,
      },
      sourceRel: null,
      sourceOriginal: null,
      id: '50bf8a0a-e435-4c8f-b7d3-0048810b4491',
    };

    const questionDate: IPeriodDateQuestion = {
      type: QuestionVariant.Q_PERIOD_DATE,
      config: {
        isPeriod: false,
        periodMax: 0,
        periodMin: 0,
        duration: 0,
        weekdays: [],
        defaultDiscount: 1,
        fromBoundary: '2021-10-01T00:00:00.0000000Z',
        toBoundary: '2021-12-30T00:00:00.0000000Z',
        dateDiscounts: [
          {
            id: '8175d0e1-de2c-4d5e-ae97-d1dc837d5f55',
            date: '2021-10-01T00:00:00.0000000Z',
            discount: 0,
          },
          {
            id: 'b6f872ed-3497-4622-bee5-8117c5fa5e51',
            date: '2021-12-30T00:00:00.0000000Z',
            discount: 100,
          },
        ],
        dateScores: [],
      },
      answer: {
        discount: 0,
        fromDate: null,
        toDate: null,
      },
      sourceRel: null,
      sourceOriginal: null,
      id: 'fa9ad612-2ab3-4877-8850-c65986347ece',
    };

    const questionCheckbox: ICheckboxQuestion = {
      type: QuestionVariant.Q_CHECKBOX,
      config: {
        defaultDiscount: 1,
        discountNonPrefered: 20,
        preferedAlternative: true,
      },
      answer: {
        discount: 0,
        value: false,
      },
      sourceRel: null,
      sourceOriginal: null,
      id: '14b047d9-20f1-4681-83c4-519904352027',
    };

    const product1: Parentable<IProduct> = {
      id: '73d216c3-1e40-4258-be26-5df47bc4fffa',
      title: 'Bil',
      description: '',
      type: ModelType.product,
      parent: '',
      sourceOriginal: '61cdf70d-9ef5-4ae1-a006-b2e2f5242273',
      sourceRel: null,
      deletedDate: null,
      unit: 'stk',
    };

    const product2: Parentable<IProduct> = {
      id: 'd9e879da-7a51-4738-80e9-991f5269f549',
      title: 'Båt',
      description: '',
      type: ModelType.product,
      parent: '',
      sourceOriginal: '61cdf70d-9ef5-4ae1-a006-b2e2f5242273',
      sourceRel: null,
      deletedDate: null,
      unit: 'stk',
    };

    const need1: Parentable<INeed> = {
      id: 'c16f5e18-85f7-4d5a-b0dd-2cdbb1fe17c9',
      title: 'Behov 1',
      description: '',
      requirements: [
        {
          id: 'df0d29e2-b77c-4509-a73a-170a791a9e95',
          title: 'Krav 1',
          description: '',
          needId: 'a63d26d1-4820-497c-ad5f-6113f6991c4e',
          tags: [],
          variants: [
            {
              requirementText: 'Krav tekst 1',
              instruction: 'Krav instruksjon 1',
              useProduct: false,
              useSpesification: true,
              useQualification: true,
              products: [],
              questions: [questionSlider],
              id: 'b2f218dc-d5e6-49b4-9a60-f906db1ec74e',
              type: VariantType.requirement,
              description: '',
            },
          ],
          type: ModelType.requirement,
          sourceOriginal: '61cdf70d-9ef5-4ae1-a006-b2e2f5242273',
          sourceRel: null,
        },
      ],
      type: ModelType.need,
      parent: '',
      sourceOriginal: '61cdf70d-9ef5-4ae1-a006-b2e2f5242273',
      sourceRel: null,
    };

    const need2: Parentable<INeed> = {
      id: 'a63d26d1-4820-497c-ad5f-6113f6991c4e',
      title: 'Behov 2',
      description: '',
      requirements: [
        {
          id: '3e50c934-d80a-4cbf-ac71-1d6973ebd59e',
          title: 'Krav 2',
          description: '',
          needId: 'c16f5e18-85f7-4d5a-b0dd-2cdbb1fe17c9',
          tags: [],
          variants: [
            {
              requirementText: 'Krav tekst 2',
              instruction: 'Krasv instruksjon 2',
              useProduct: true,
              useSpesification: true,
              useQualification: true,
              products: [product1.id],
              questions: [questionDate],
              id: '2fbd3495-b95e-473c-923c-6aec0a9e4305',
              type: VariantType.requirement,
              description: '',
            },
          ],
          type: ModelType.requirement,
          sourceOriginal: '61cdf70d-9ef5-4ae1-a006-b2e2f5242273',
          sourceRel: null,
        },
      ],
      type: ModelType.need,
      parent: '',
      sourceOriginal: '61cdf70d-9ef5-4ae1-a006-b2e2f5242273',
      sourceRel: null,
    };

    const need3: Parentable<INeed> = {
      id: 'd2f8124f-6b54-49db-92af-ea8a5b0e116e',
      title: 'Behov 3',
      description: '',
      requirements: [
        {
          id: '6bf55826-afe8-4774-9398-4d3f8c004a35',
          title: 'Krav 3',
          description: '',
          needId: 'c16f5e18-85f7-4d5a-b0dd-2cdbb1fe17c9',
          tags: [],
          variants: [
            {
              requirementText: 'Krav tekst 3',
              instruction: 'Krav instruksjon 3',
              useProduct: true,
              useSpesification: false,
              useQualification: true,
              products: [product1.id, product2.id],
              questions: [questionCheckbox],
              id: 'b8dadd61-3f16-462c-9eb7-a72c61732fbf',
              type: VariantType.requirement,
              description: '',
            },
          ],
          type: ModelType.requirement,
          sourceOriginal: '61cdf70d-9ef5-4ae1-a006-b2e2f5242273',
          sourceRel: null,
        },
      ],
      type: ModelType.need,
      parent: '',
      sourceOriginal: '61cdf70d-9ef5-4ae1-a006-b2e2f5242273',
      sourceRel: null,
    };

    const specProduct1 = {
      id: '3d94ddc0-f6cd-11ec-b939-0242ac120002',
      title: 'Spec product',
      description: '',
      originProduct: product1,
      amount: 1,
      requirements: [need2.requirements[0].id, need3.requirements[0].id],
      requirementAnswers: [
        {
          id: 'b09c8d5e-f6cd-11ec-b939-0242ac120002',
          questionId: 'fa9ad612-2ab3-4877-8850-c65986347ece',
          variantId: '2fbd3495-b95e-473c-923c-6aec0a9e4305',
          question: questionDate,
          requirement: need2.requirements[0],
          type: ModelType.requirementAnswer,
        },
        {
          id: 'b5773496-f6cd-11ec-b939-0242ac120002',
          questionId: '14b047d9-20f1-4681-83c4-519904352027',
          variantId: 'b8dadd61-3f16-462c-9eb7-a72c61732fbf',
          question: questionCheckbox,
          requirement: need3.requirements[0],
          type: ModelType.requirementAnswer,
        },
      ],
      type: ModelType.specificationProduct,
      sourceRel: null,
      sourceOriginal: null,
      unit: 'stk',
    };

    const specProduct2 = {
      id: 'd094439a-f6cd-11ec-b939-0242ac120002',
      title: 'Spec product 2',
      description: '',
      originProduct: product2,
      amount: 1,
      requirements: [need3.requirements[0].id],
      requirementAnswers: [
        {
          id: 'b5773496-f6cd-11ec-b939-0242ac120002',
          questionId: '14b047d9-20f1-4681-83c4-519904352027',
          variantId: 'b8dadd61-3f16-462c-9eb7-a72c61732fbf',
          question: questionCheckbox,
          requirement: need3.requirements[0],
          type: ModelType.requirementAnswer,
        },
      ],
      type: ModelType.specificationProduct,
      sourceRel: null,
      sourceOriginal: null,
      unit: 'stk',
    };

    const specification: ISpecification = {
      id: 'c1d0ee23-8f8b-ff22-aced-47ff93eb9fc8',
      bank: {
        id: 'a4d0ef8b-8e23-4ef2-9f30-eb9fc847ff93',
        title: 'Bank',
        description: '',
        needs: [need1, need2, need3],
        codelist: [],
        products: [product1, product2],
        publications: [],
        tags: [],
        version: 3,
        publishedDate: '2021-11-28T15:57:40.850Z',
        type: ModelType.bank,
        inheritedBanks: [],
        sourceOriginal: null,
        sourceRel: null,
        projectId: '61cdf70d-9ef5-4ae1-a006-b2e2f5242273',
        deletedDate: null,
      },
      title: 'Spesifikasjon test',
      organization: 'Evil Corp',
      organizationNumber: '987654321',
      products: [specProduct1, specProduct2],
      requirements: [
        need1.requirements[0].id,
        need2.requirements[0].id,
        need3.requirements[0].id,
      ],
      requirementAnswers: [
        {
          id: '4c4bd801-6070-4c88-91cc-b5ba36a6c6af',
          questionId: '50bf8a0a-e435-4c8f-b7d3-0048810b4491',
          variantId: 'b2f218dc-d5e6-49b4-9a60-f906db1ec74e',
          question: questionSlider,
          requirement: need1.requirements[0],
          type: ModelType.requirementAnswer,
        },
        {
          id: '1e506825-1dfe-4133-a6f5-16cb187fbd48',
          questionId: 'fa9ad612-2ab3-4877-8850-c65986347ece',
          variantId: '2fbd3495-b95e-473c-923c-6aec0a9e4305',
          question: questionDate,
          requirement: need2.requirements[0],
          type: ModelType.requirementAnswer,
        },
        {
          id: '92136690-d403-48f4-93b0-a3d3d80c8128',
          questionId: '14b047d9-20f1-4681-83c4-519904352027',
          variantId: 'b8dadd61-3f16-462c-9eb7-a72c61732fbf',
          question: questionCheckbox,
          requirement: need3.requirements[0],
          type: ModelType.requirementAnswer,
        },
      ],
      currencyUnit: 'NOK',
    };

    const response: IResponse = {
      id: '',
      specification: specification,
      supplier: 'Firma A',
      products: [
        {
          id: 'f5d68f10-f6cc-11ec-b939-0242ac120002',
          title: 'Product 1 answer',
          description: '',
          originProduct: specProduct1,
          price: 0,
          requirementAnswers: [
            {
              ...specProduct1.requirementAnswers[0],
              question: {
                ...questionDate,
                answer: {
                  ...questionDate.answer,
                  discount: 50, // 0.5 * 0.7 = 0.35
                },
              },
            },
            {
              ...specProduct1.requirementAnswers[1],
              question: {
                ...questionCheckbox,
                answer: {
                  ...questionCheckbox.answer,
                  discount: 100, // 1 * 0.5 = 0.5
                },
              },
            },
          ],
        },
        {
          id: '78f788e4-f6ce-11ec-b939-0242ac120002',
          title: 'Product 2 answer',
          description: '',
          originProduct: specProduct2,
          price: 0,
          requirementAnswers: [
            {
              ...specProduct2.requirementAnswers[0],
              question: {
                ...questionCheckbox,
                answer: {
                  ...questionCheckbox.answer,
                  discount: 10, // 0.1 * 0.7 = 0.07
                },
              },
            },
          ],
        },
      ],
      requirementAnswers: [
        {
          ...specification.requirementAnswers[0],
          question: {
            ...questionSlider,
            answer: {
              ...questionSlider.answer,
              discount: 20, // 0.2 * 0.9 = 0.18
            },
          },
        },
        {
          ...specification.requirementAnswers[1],
          question: {
            ...questionDate,
            answer: {
              ...questionDate.answer,
              discount: 100, // 1 * 0.7 = 0.7
            },
          },
        },
        {
          ...specification.requirementAnswers[2],
          question: {
            ...questionCheckbox,
            answer: {
              ...questionCheckbox.answer,
              discount: 40, // 0.4 * 0.5 = 0.2
            },
          },
        },
      ],
    };
    const nexus = Nexus.getInstance();
    const result = nexus.evaluationService.evaluateAll([response]);
    // TODO: Oppdaterer med mer realistiske dataSum: product1: (0.35 + 0.5) * 0.7 , product2: 0.07 * 0.5, general: 0.18 + 0.7 + 0.2 = 1,71
    expect(result[0].discount).toBe(320);
  });
});
