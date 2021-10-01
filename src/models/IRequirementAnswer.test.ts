import { setRequirementAnswers } from '../store/reducers/PrefilledResponseReducer';
import { store } from '../store/store';
import {
  IRequirementAnswer,
  RequirementAnswersSchema
} from './IRequirementAnswer';
import { ITextQuestion } from './ITextQuestion';
import ModelType from './ModelType';
import QuestionEnum from './QuestionEnum';
import RequirementType from './RequirementType';

describe('Validation', () => {
  test('IRequirementAnswer should validate different objects', () => {
    const post = {
      cart: [
        {
          id: 'c2bae8e2-89da-48b0-895f-f11b2bfc2114',
          questionId: '89a251dc-de54-4012-a54b-8aa7170614b6',
          weight: 0,
          variantId: 'f7f87130-409f-4521-94d6-99924b21b858',
          question: {
            type: 'Q_CHECKBOX',
            config: {
              weightTrue: 100,
              weightFalse: 0
            },
            id: '89a251dc-de54-4012-a54b-8aa7170614b6',
            answer: {
              value: true,
              point: 11
            }
          },
          type: 'prefilledResponse',
          requirement: {
            title: 'Middag hver dag ',
            tags: [],
            needId: 'a4be5a10-effe-4843-a270-51eb772e0f60',
            variants: [
              {
                requirementText: '3 retter',
                instruction: '',
                useProduct: true,
                useSpesification: true,
                useQualification: false,
                products: ['cb306928-5f4d-4825-8d52-d6c8feff4a2c'],
                questions: [
                  {
                    type: 'Q_CHECKBOX',
                    config: {
                      weightTrue: 100,
                      weightFalse: 0
                    },
                    id: '89a251dc-de54-4012-a54b-8aa7170614b6'
                  }
                ],
                id: 'f7f87130-409f-4521-94d6-99924b21b858'
              }
            ],
            id: 'd7a5fbd1-e44e-4bb1-aea9-a64260a5af85',
            description: '',
            type: 'requirement',
            requirement_Type: 'requirement'
          }
        },
        {
          id: 'c2ac200b-e109-4df2-95a9-17d0ea720fbe',
          questionId: '30591f15-6b7f-4c1f-aeb5-784c647aaa19',
          weight: 0,
          variantId: 'e74fb538-e421-40a9-91bc-71a174a41e38',
          question: {
            type: 'Q_SLIDER',
            config: {
              min: 100,
              max: 500,
              step: 10,
              unit: 'Kr'
            },
            id: '30591f15-6b7f-4c1f-aeb5-784c647aaa19',
            answer: {
              value: 10,
              point: 11
            }
          },
          type: 'prefilledResponse',
          requirement: {
            title: '3 retters',
            tags: [],
            needId: 'a4be5a10-effe-4843-a270-51eb772e0f60',
            variants: [
              {
                requirementText: '3 retters innenfor rimelig pris',
                instruction: '',
                useProduct: false,
                useSpesification: true,
                useQualification: false,
                products: [],
                questions: [
                  {
                    type: 'Q_SLIDER',
                    config: {
                      min: 100,
                      max: 500,
                      step: 10,
                      unit: 'Kr'
                    },
                    id: '30591f15-6b7f-4c1f-aeb5-784c647aaa19'
                  }
                ],
                id: 'e74fb538-e421-40a9-91bc-71a174a41e38'
              }
            ],
            id: 'd39d79c5-42b8-4a0a-a57a-6253a374bf1a',
            description: 'middag hver kveld',
            type: 'requirement',
            requirement_Type: 'requirement'
          }
        },
        {
          id: '7a9dcd7c-9481-473a-a8a9-4cc5f38c1ba7',
          questionId: 'aa7e6a82-361a-4775-95e6-440ba9b60dbc',
          weight: 0,
          variantId: 'c0881bda-524f-4fc9-8b8b-64171deeeefe',
          question: {
            type: 'Q_PERIOD_DATE',
            config: {
              fromDate: '2021-09-20T08:03:57.0930000Z',
              toDate: '2021-09-30T08:03:00.0000000Z'
            },
            id: 'aa7e6a82-361a-4775-95e6-440ba9b60dbc',
            answer: {
              date: null,
              point: 0
            }
          },
          type: 'prefilledResponse',
          requirement: {
            title: 'Vegetar opsjon',
            tags: [],
            needId: 'a549f726-3882-4b97-ad64-ebb4e1545b24',
            variants: [
              {
                id: 'c0881bda-524f-4fc9-8b8b-64171deeeefe',
                requirementText: '',
                instruction: '',
                useQualification: true,
                useSpesification: true,
                useProduct: false,
                products: [],
                questions: [
                  {
                    type: 'Q_PERIOD_DATE',
                    config: {
                      fromDate: '2021-09-20T08:03:57.0930000Z',
                      toDate: '2021-09-30T08:03:00.0000000Z'
                    },
                    id: 'aa7e6a82-361a-4775-95e6-440ba9b60dbc'
                  }
                ]
              }
            ],
            id: 'c8424cae-9920-4bbc-891a-b3ee46d44966',
            description: '',
            type: 'requirement',
            requirement_Type: 'requirement'
          }
        },
        {
          id: '7fd741aa-742b-4f96-a24a-a6280ff389f4',
          questionId: 'e503a651-dde2-4d5b-87f0-342f3406fad6',
          weight: 0,
          variantId: '87bce9dd-4574-48d6-85f3-964c21f0cc98',
          question: {
            type: 'Q_CODELIST',
            config: {
              multipleSelect: true,
              codelist: 'dec9ffb5-70c3-4c3f-8250-dbd9e5b66cf2'
            },
            id: 'e503a651-dde2-4d5b-87f0-342f3406fad6',
            answer: {
              codes: 'e503a651-dde2-4d5b-87f0-342f3406fad6',
              point: 0
            }
          },
          type: 'prefilledResponse',
          requirement: {
            title: 'Enkeltrom til alle',
            tags: ['62998851-c43d-4569-825d-eef75f6d3894'],
            needId: '09f6b08c-d908-4072-8ed0-0c31128af258',
            variants: [
              {
                requirementText: 'Enkeltrom til alle ',
                instruction: '',
                useProduct: true,
                useSpesification: true,
                useQualification: false,
                products: ['73e7a8c9-7d40-4315-aa9d-4279825f7fac'],
                questions: [
                  {
                    type: 'Q_CODELIST',
                    config: {
                      multipleSelect: true,
                      codelist: 'dec9ffb5-70c3-4c3f-8250-dbd9e5b66cf2'
                    },
                    id: 'e503a651-dde2-4d5b-87f0-342f3406fad6'
                  }
                ],
                id: '87bce9dd-4574-48d6-85f3-964c21f0cc98'
              }
            ],
            id: '259d3430-5934-4459-b329-81e2cee8cc23',
            description: '',
            type: 'requirement',
            requirement_Type: 'requirement'
          }
        }
      ]
    };

    const report = RequirementAnswersSchema.validate(post);
    expect(report.error).toBeUndefined();
  });

  test('Updated a Requirement in the reducer', () => {
    const question: ITextQuestion = {
      id: 'questionId1',
      type: QuestionEnum.Q_TEXT,
      answer: { point: 0, text: 'answer' },
      config: { defaultPoint: 10, max: 500 },
      source_original: null,
      source_rel: null
    };

    const post: IRequirementAnswer[] = [
      {
        id: 'A',
        weight: 10,
        variantId: 'variantId',
        questionId: 'questionId',
        requirement: {
          id: 'requirementId',
          title: '',
          description: '',
          needId: 'needId',
          requirement_Type: RequirementType.requirement,
          variants: [],
          tags: [],
          type: ModelType.requirement,
          source_original: 'A',
          source_rel: null
        },
        question,
        type: ModelType.prefilledResponse
      }
    ];

    store.dispatch(setRequirementAnswers({ cart: post }));

    const state = store.getState().prefilledResponse;
    expect(state.prefilledResponse.requirementAnswers).toEqual(post);
  });
});
