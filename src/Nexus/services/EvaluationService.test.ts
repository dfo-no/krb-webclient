import { IResponse } from '../../models/IResponse';
import ModelType from '../../models/ModelType';
import QuestionEnum from '../../models/QuestionEnum';
import VariantType from '../entities/VariantType';
import Nexus from '../Nexus';

describe('EvaluationService', () => {
  it('Can get EvauateSlider', async () => {
    const response: IResponse = {
      spesification: {
        bank: {
          id: 'a4d0ef8b-8e23-4ef2-9f30-eb9fc847ff93',
          title: 'Trond 2',
          description: '',
          needs: [
            {
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
                      questions: [
                        {
                          type: QuestionEnum.Q_SLIDER,
                          config: {
                            min: 0,
                            max: 50,
                            step: 5,
                            unit: 'TB',
                            defaultPoint: 1,
                            scoreValues: [
                              { score: 0, value: 0 },
                              { value: 10, score: 100 }
                            ]
                          },
                          answer: {
                            point: 0,
                            value: 0
                          },
                          sourceRel: null,
                          sourceOriginal: null,
                          id: '50bf8a0a-e435-4c8f-b7d3-0048810b4491'
                        }
                      ],
                      id: 'b2f218dc-d5e6-49b4-9a60-f906db1ec74e',
                      type: VariantType.requirement,
                      description: ''
                    }
                  ],
                  type: ModelType.requirement,
                  sourceOriginal: '61cdf70d-9ef5-4ae1-a006-b2e2f5242273',
                  sourceRel: null
                }
              ],
              type: ModelType.need,
              parent: '',
              sourceOriginal: '61cdf70d-9ef5-4ae1-a006-b2e2f5242273',
              sourceRel: null
            },
            {
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
                      useProduct: false,
                      useSpesification: true,
                      useQualification: true,
                      products: [],
                      questions: [
                        {
                          type: QuestionEnum.Q_PERIOD_DATE,
                          config: {
                            isPeriod: false,
                            periodMax: 0,
                            periodMin: 0,
                            defaultPoint: 1,
                            fromBoundary: '2021-10-01T15:09:05.0000000Z',
                            toBoundary: '2021-12-30T15:09:09.0000000Z',
                            dateScores: []
                          },
                          answer: {
                            point: 0,
                            fromDate: '2021-11-01T15:09:05.0000000Z',
                            toDate: '2021-11-30T15:09:09.0000000Z'
                          },
                          sourceRel: null,
                          sourceOriginal: null,
                          id: 'fa9ad612-2ab3-4877-8850-c65986347ece'
                        }
                      ],
                      id: '2fbd3495-b95e-473c-923c-6aec0a9e4305',
                      type: VariantType.requirement,
                      description: ''
                    }
                  ],
                  type: ModelType.requirement,
                  sourceOriginal: '61cdf70d-9ef5-4ae1-a006-b2e2f5242273',
                  sourceRel: null
                }
              ],
              type: ModelType.need,
              parent: '',
              sourceOriginal: '61cdf70d-9ef5-4ae1-a006-b2e2f5242273',
              sourceRel: null
            },
            {
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
                      useProduct: false,
                      useSpesification: true,
                      useQualification: true,
                      products: [],
                      questions: [
                        {
                          type: QuestionEnum.Q_CHECKBOX,
                          config: {
                            pointsNonPrefered: 0,
                            defaultPoint: 1,
                            preferedAlternative: true
                          },
                          answer: {
                            point: 0,
                            value: false
                          },
                          sourceRel: null,
                          sourceOriginal: null,
                          id: '14b047d9-20f1-4681-83c4-519904352027'
                        }
                      ],
                      id: 'b8dadd61-3f16-462c-9eb7-a72c61732fbf',
                      type: VariantType.requirement,
                      description: ''
                    }
                  ],
                  type: ModelType.requirement,
                  sourceOriginal: '61cdf70d-9ef5-4ae1-a006-b2e2f5242273',
                  sourceRel: null
                }
              ],
              type: ModelType.need,
              parent: '',
              sourceOriginal: '61cdf70d-9ef5-4ae1-a006-b2e2f5242273',
              sourceRel: null
            },
            {
              id: 'e280e27d-2232-473f-85d7-89c6dc654534',
              title: 'Behov 4',
              description: '',
              requirements: [
                {
                  id: '363c76d8-aafd-4f36-b905-09c09d92ea59',
                  title: 'Krav 4',
                  description: '',
                  needId: 'd2f8124f-6b54-49db-92af-ea8a5b0e116e',
                  tags: [],
                  variants: [
                    {
                      requirementText: 'Krav 4 tekst',
                      instruction: 'Krav 4 instruksjon',
                      useProduct: false,
                      useSpesification: true,
                      useQualification: true,
                      products: [],
                      questions: [
                        {
                          type: QuestionEnum.Q_CODELIST,
                          config: {
                            mandatoryCodes: [],
                            optionalCodes: [],
                            codelist: 'dedfefcc-6839-4b44-abb1-ced9759a375d',
                            defaultPoint: 1,
                            optionalCodeMinAmount: 0,
                            optionalCodeMaxAmount: 1
                          },
                          answer: {
                            point: 0,
                            codes: []
                          },
                          sourceRel: null,
                          sourceOriginal: null,
                          id: '01c570c3-f591-47f3-9d0b-6cc6bb881509'
                        }
                      ],
                      id: 'd9c55f57-d22f-4ebc-a53e-9133ce7885d2',
                      type: VariantType.requirement,
                      description: ''
                    }
                  ],
                  type: ModelType.requirement,
                  sourceOriginal: '61cdf70d-9ef5-4ae1-a006-b2e2f5242273',
                  sourceRel: null
                }
              ],
              type: ModelType.need,
              parent: '',
              sourceOriginal: '61cdf70d-9ef5-4ae1-a006-b2e2f5242273',
              sourceRel: null
            },
            {
              id: '98ad9e14-dcf6-423e-b4fb-b2367a23b756',
              title: 'Behov 5',
              description: '',
              requirements: [
                {
                  id: '72c0cc62-59e4-4fe2-90e5-1b049c76429b',
                  title: 'Krav 5',
                  description: '',
                  needId: 'c16f5e18-85f7-4d5a-b0dd-2cdbb1fe17c9',
                  tags: [],
                  variants: [
                    {
                      requirementText: 'Krav tekst 5',
                      instruction: 'Krav instruksjon 5',
                      useProduct: false,
                      useSpesification: true,
                      useQualification: true,
                      products: [],
                      questions: [
                        {
                          type: QuestionEnum.Q_TEXT,
                          config: {
                            max: 1000,
                            defaultPoint: 1
                          },
                          answer: {
                            point: 0,
                            text: ''
                          },
                          sourceRel: null,
                          sourceOriginal: null,
                          id: '087fd637-2ae9-4ccf-87e5-f61599078255'
                        }
                      ],
                      id: 'ccb83429-07f0-4142-a120-c5b384185177',
                      type: VariantType.requirement,
                      description: ''
                    }
                  ],
                  type: ModelType.requirement,
                  sourceOriginal: '61cdf70d-9ef5-4ae1-a006-b2e2f5242273',
                  sourceRel: null
                }
              ],
              type: ModelType.need,
              parent: '',
              sourceOriginal: '61cdf70d-9ef5-4ae1-a006-b2e2f5242273',
              sourceRel: null
            }
          ],
          codelist: [
            {
              id: 'dedfefcc-6839-4b44-abb1-ced9759a375d',
              title: 'Kodeliste 1',
              description: '',
              codes: [
                {
                  id: 'e3854253-6fda-4a9c-b9f8-2d4a4739950a',
                  title: 'Kode 1',
                  description: '',
                  type: ModelType.code,
                  sourceOriginal: '61cdf70d-9ef5-4ae1-a006-b2e2f5242273',
                  sourceRel: null,
                  parent: ''
                },
                {
                  id: '675ec74a-9443-4539-afbc-78ab3d946c7c',
                  title: 'Kode 2',
                  description: '',
                  type: ModelType.code,
                  sourceOriginal: '61cdf70d-9ef5-4ae1-a006-b2e2f5242273',
                  sourceRel: null,
                  parent: ''
                }
              ],
              type: ModelType.codelist,
              sourceOriginal: '61cdf70d-9ef5-4ae1-a006-b2e2f5242273',
              sourceRel: null
            }
          ],
          products: [
            {
              id: '73d216c3-1e40-4258-be26-5df47bc4fffa',
              title: 'Bil',
              description: '',
              type: ModelType.product,
              parent: '',
              sourceOriginal: '61cdf70d-9ef5-4ae1-a006-b2e2f5242273',
              sourceRel: null
            },
            {
              id: 'd9e879da-7a51-4738-80e9-991f5269f549',
              title: 'Båt',
              description: '',
              type: ModelType.product,
              parent: '',
              sourceOriginal: '61cdf70d-9ef5-4ae1-a006-b2e2f5242273',
              sourceRel: null
            },
            {
              id: 'c7edb0ea-b097-4e03-b5f2-6fe46d5c3291',
              title: 'Sykkel',
              description: '',
              type: ModelType.product,
              parent: '',
              sourceOriginal: '61cdf70d-9ef5-4ae1-a006-b2e2f5242273',
              sourceRel: null
            }
          ],
          publications: [],
          tags: [
            {
              id: '7d3bff61-4fcf-4b8c-b558-60aa3104361b',
              title: 'Merkelapp 1',
              type: ModelType.tag,
              parent: '',
              sourceOriginal: '61cdf70d-9ef5-4ae1-a006-b2e2f5242273',
              sourceRel: null
            },
            {
              id: '38b4c7a4-b4c8-4971-8903-b38793952c9b',
              title: 'Merkelapp 2',
              type: ModelType.tag,
              parent: '',
              sourceOriginal: '61cdf70d-9ef5-4ae1-a006-b2e2f5242273',
              sourceRel: null
            }
          ],
          version: 3,
          publishedDate: '2021-11-28T15:57:40.850Z',
          type: ModelType.bank,
          inheritedBanks: [],
          sourceOriginal: null,
          sourceRel: null,
          projectId: '61cdf70d-9ef5-4ae1-a006-b2e2f5242273'
        },
        title: 'Spesifikasjon test',
        organization: 'Evil Corp',
        organizationNumber: '987654321',
        products: [],
        requirements: [
          'df0d29e2-b77c-4509-a73a-170a791a9e95',
          '3e50c934-d80a-4cbf-ac71-1d6973ebd59e',
          '6bf55826-afe8-4774-9398-4d3f8c004a35',
          '363c76d8-aafd-4f36-b905-09c09d92ea59',
          '72c0cc62-59e4-4fe2-90e5-1b049c76429b'
        ],
        requirementAnswers: [
          {
            id: '4c4bd801-6070-4c88-91cc-b5ba36a6c6af',
            questionId: '50bf8a0a-e435-4c8f-b7d3-0048810b4491',
            weight: 90,
            variantId: 'b2f218dc-d5e6-49b4-9a60-f906db1ec74e',
            question: {
              type: QuestionEnum.Q_SLIDER,
              config: {
                min: 0,
                max: 50,
                step: 5,
                unit: 'TB',
                defaultPoint: 1,
                scoreValues: [
                  { score: 0, value: 0 },
                  { value: 10, score: 100 }
                ]
              },
              answer: {
                point: 0,
                value: 0
              },
              sourceRel: null,
              sourceOriginal: null,
              id: '50bf8a0a-e435-4c8f-b7d3-0048810b4491'
            },
            requirement: {
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
                  questions: [
                    {
                      type: QuestionEnum.Q_SLIDER,
                      config: {
                        min: 0,
                        max: 50,
                        step: 5,
                        unit: 'TB',
                        defaultPoint: 1,
                        scoreValues: [
                          { score: 0, value: 0 },
                          { value: 10, score: 100 }
                        ]
                      },
                      answer: {
                        point: 0,
                        value: 0
                      },
                      sourceRel: null,
                      sourceOriginal: null,
                      id: '50bf8a0a-e435-4c8f-b7d3-0048810b4491'
                    }
                  ],
                  id: 'b2f218dc-d5e6-49b4-9a60-f906db1ec74e',
                  type: VariantType.requirement,
                  description: ''
                }
              ],
              type: ModelType.requirement,
              sourceOriginal: '61cdf70d-9ef5-4ae1-a006-b2e2f5242273',
              sourceRel: null
            },
            type: ModelType.requirement
          },
          {
            id: '1e506825-1dfe-4133-a6f5-16cb187fbd48',
            questionId: 'fa9ad612-2ab3-4877-8850-c65986347ece',
            weight: 70,
            variantId: '2fbd3495-b95e-473c-923c-6aec0a9e4305',
            question: {
              type: QuestionEnum.Q_PERIOD_DATE,
              config: {
                isPeriod: false,
                periodMax: 0,
                periodMin: 0,
                defaultPoint: 1,
                fromBoundary: '2021-10-01T15:09:05.0000000Z',
                toBoundary: '2021-12-30T15:09:09.0000000Z',
                dateScores: []
              },
              answer: {
                point: 0,
                fromDate: '2021-11-01T15:09:05.0000000Z',
                toDate: '2021-11-30T15:09:09.0000000Z'
              },
              sourceRel: null,
              sourceOriginal: null,
              id: 'fa9ad612-2ab3-4877-8850-c65986347ece'
            },
            requirement: {
              id: '3e50c934-d80a-4cbf-ac71-1d6973ebd59e',
              title: 'Krav 2',
              description: '',
              needId: 'c16f5e18-85f7-4d5a-b0dd-2cdbb1fe17c9',
              tags: [],
              variants: [
                {
                  requirementText: 'Krav tekst 2',
                  instruction: 'Krasv instruksjon 2',
                  useProduct: false,
                  useSpesification: true,
                  useQualification: true,
                  products: [],
                  questions: [
                    {
                      type: QuestionEnum.Q_PERIOD_DATE,
                      config: {
                        isPeriod: false,
                        periodMax: 0,
                        periodMin: 0,
                        defaultPoint: 1,
                        fromBoundary: '2021-10-01T15:09:05.0000000Z',
                        toBoundary: '2021-12-30T15:09:09.0000000Z',
                        dateScores: []
                      },
                      answer: {
                        point: 0,
                        fromDate: '2021-11-01T15:09:05.0000000Z',
                        toDate: '2021-11-30T15:09:09.0000000Z'
                      },
                      sourceRel: null,
                      sourceOriginal: null,
                      id: 'fa9ad612-2ab3-4877-8850-c65986347ece'
                    }
                  ],
                  id: '2fbd3495-b95e-473c-923c-6aec0a9e4305',
                  type: VariantType.requirement,
                  description: ''
                }
              ],
              type: ModelType.requirement,
              sourceOriginal: '61cdf70d-9ef5-4ae1-a006-b2e2f5242273',
              sourceRel: null
            },
            type: ModelType.requirement
          },
          {
            id: '92136690-d403-48f4-93b0-a3d3d80c8128',
            questionId: '14b047d9-20f1-4681-83c4-519904352027',
            weight: 50,
            variantId: 'b8dadd61-3f16-462c-9eb7-a72c61732fbf',
            question: {
              type: QuestionEnum.Q_CHECKBOX,
              config: {
                pointsNonPrefered: 0,
                defaultPoint: 1,
                preferedAlternative: true
              },
              answer: {
                point: 0,
                value: false
              },
              sourceRel: null,
              sourceOriginal: null,
              id: '14b047d9-20f1-4681-83c4-519904352027'
            },
            requirement: {
              id: '6bf55826-afe8-4774-9398-4d3f8c004a35',
              title: 'Krav 3',
              description: '',
              needId: 'c16f5e18-85f7-4d5a-b0dd-2cdbb1fe17c9',
              tags: [],
              variants: [
                {
                  requirementText: 'Krav tekst 3',
                  instruction: 'Krav instruksjon 3',
                  useProduct: false,
                  useSpesification: true,
                  useQualification: true,
                  products: [],
                  questions: [
                    {
                      type: QuestionEnum.Q_CHECKBOX,
                      config: {
                        pointsNonPrefered: 0,
                        defaultPoint: 1,
                        preferedAlternative: true
                      },
                      answer: {
                        point: 0,
                        value: false
                      },
                      sourceRel: null,
                      sourceOriginal: null,
                      id: '14b047d9-20f1-4681-83c4-519904352027'
                    }
                  ],
                  id: 'b8dadd61-3f16-462c-9eb7-a72c61732fbf',
                  type: VariantType.requirement,
                  description: ''
                }
              ],
              type: ModelType.requirement,
              sourceOriginal: '61cdf70d-9ef5-4ae1-a006-b2e2f5242273',
              sourceRel: null
            },
            type: ModelType.requirement
          },
          {
            id: '243047ab-5a0a-40e2-adcc-356af101d5e9',
            questionId: '01c570c3-f591-47f3-9d0b-6cc6bb881509',
            weight: 30,
            variantId: 'd9c55f57-d22f-4ebc-a53e-9133ce7885d2',
            question: {
              type: QuestionEnum.Q_CODELIST,
              config: {
                mandatoryCodes: [],
                optionalCodes: [],
                codelist: 'dedfefcc-6839-4b44-abb1-ced9759a375d',
                defaultPoint: 1,
                optionalCodeMinAmount: 0,
                optionalCodeMaxAmount: 1
              },
              answer: {
                point: 0,
                codes: []
              },
              sourceRel: null,
              sourceOriginal: null,
              id: '01c570c3-f591-47f3-9d0b-6cc6bb881509'
            },
            requirement: {
              id: '363c76d8-aafd-4f36-b905-09c09d92ea59',
              title: 'Krav 4',
              description: '',
              needId: 'd2f8124f-6b54-49db-92af-ea8a5b0e116e',
              tags: [],
              variants: [
                {
                  requirementText: 'Krav 4 tekst',
                  instruction: 'Krav 4 instruksjon',
                  useProduct: false,
                  useSpesification: true,
                  useQualification: true,
                  products: [],
                  questions: [
                    {
                      type: QuestionEnum.Q_CODELIST,
                      config: {
                        mandatoryCodes: [],
                        optionalCodes: [],
                        codelist: 'dedfefcc-6839-4b44-abb1-ced9759a375d',
                        defaultPoint: 1,
                        optionalCodeMinAmount: 0,
                        optionalCodeMaxAmount: 1
                      },
                      answer: {
                        point: 0,
                        codes: []
                      },
                      sourceRel: null,
                      sourceOriginal: null,
                      id: '01c570c3-f591-47f3-9d0b-6cc6bb881509'
                    }
                  ],
                  id: 'd9c55f57-d22f-4ebc-a53e-9133ce7885d2',
                  type: VariantType.requirement,
                  description: ''
                }
              ],
              type: ModelType.requirement,
              sourceOriginal: '61cdf70d-9ef5-4ae1-a006-b2e2f5242273',
              sourceRel: null
            },
            type: ModelType.requirement
          },
          {
            id: '172fa436-2e6d-44e5-931c-0890a9471b25',
            questionId: '087fd637-2ae9-4ccf-87e5-f61599078255',
            weight: 10,
            variantId: 'ccb83429-07f0-4142-a120-c5b384185177',
            question: {
              type: QuestionEnum.Q_TEXT,
              config: {
                max: 1000,
                defaultPoint: 1
              },
              answer: {
                point: 0,
                text: ''
              },
              sourceRel: null,
              sourceOriginal: null,
              id: '087fd637-2ae9-4ccf-87e5-f61599078255'
            },
            requirement: {
              id: '72c0cc62-59e4-4fe2-90e5-1b049c76429b',
              title: 'Krav 5',
              description: '',
              needId: 'c16f5e18-85f7-4d5a-b0dd-2cdbb1fe17c9',
              tags: [],
              variants: [
                {
                  requirementText: 'Krav tekst 5',
                  instruction: 'Krav instruksjon 5',
                  useProduct: false,
                  useSpesification: true,
                  useQualification: true,
                  products: [],
                  questions: [
                    {
                      type: QuestionEnum.Q_TEXT,
                      config: {
                        max: 1000,
                        defaultPoint: 1
                      },
                      answer: {
                        point: 0,
                        text: ''
                      },
                      sourceRel: null,
                      sourceOriginal: null,
                      id: '087fd637-2ae9-4ccf-87e5-f61599078255'
                    }
                  ],
                  id: 'ccb83429-07f0-4142-a120-c5b384185177',
                  type: VariantType.requirement,
                  description: ''
                }
              ],
              type: ModelType.requirement,
              sourceOriginal: '61cdf70d-9ef5-4ae1-a006-b2e2f5242273',
              sourceRel: null
            },
            type: ModelType.requirement
          }
        ]
      },
      supplier: 'Firma A',
      products: [],
      requirementAnswers: [
        {
          id: '4c4bd801-6070-4c88-91cc-b5ba36a6c6af',
          questionId: '50bf8a0a-e435-4c8f-b7d3-0048810b4491',
          weight: 90,
          variantId: 'b2f218dc-d5e6-49b4-9a60-f906db1ec74e',
          question: {
            type: QuestionEnum.Q_SLIDER,
            config: {
              min: 0,
              max: 50,
              step: 5,
              unit: 'TB',
              defaultPoint: 1,
              scoreValues: [
                { score: 0, value: 0 },
                { value: 10, score: 100 }
              ]
            },
            answer: {
              point: 0,
              value: 5
            },
            sourceRel: null,
            sourceOriginal: null,
            id: '50bf8a0a-e435-4c8f-b7d3-0048810b4491'
          },
          requirement: {
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
                questions: [
                  {
                    type: QuestionEnum.Q_SLIDER,
                    config: {
                      min: 0,
                      max: 10,
                      step: 5,
                      unit: 'TB',
                      defaultPoint: 1,
                      scoreValues: [
                        { score: 0, value: 0 },
                        { value: 10, score: 100 }
                      ]
                    },
                    answer: {
                      point: 0,
                      value: 6
                    },
                    sourceRel: null,
                    sourceOriginal: null,
                    id: '50bf8a0a-e435-4c8f-b7d3-0048810b4491'
                  }
                ],
                id: 'b2f218dc-d5e6-49b4-9a60-f906db1ec74e',
                type: VariantType.requirement,
                description: ''
              }
            ],
            type: ModelType.requirement,
            sourceOriginal: '61cdf70d-9ef5-4ae1-a006-b2e2f5242273',
            sourceRel: null
          },
          type: ModelType.requirement
        }
      ]
    };
    const nexus = Nexus.getInstance();
    const result = await nexus.evaluationService.evaluateAll([response]);
    expect(result[0].points).toBe(0.5);
  });
});
