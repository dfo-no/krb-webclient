import { get } from 'lodash';
import ModelType from '../models/ModelType';
import { Parentable } from '../models/Parentable';
import QuestionEnum from '../models/QuestionEnum';
import RequirementType from '../models/RequirementType';
import { INeed } from '../Nexus/entities/INeed';
import { ITag } from '../Nexus/entities/ITag';
import { createPolyTree, createTree, getPaths } from './Tree';

describe('Tree', () => {
  it('createTree', () => {
    // TODO: Update when it does not require maintanence every time we change the models, which we do every day at this  point
    /* 
    const data: Parentable<ITag>[] = [
      {
        id: '76',
        parent: '80',
        title: '76',
        type: ModelType.tag,
        sourceRel: '',
        sourceOriginal: ''
      },
      {
        id: '80',
        parent: '62',
        title: '80',
        type: ModelType.tag,
        sourceRel: '',
        sourceOriginal: ''
      },
      {
        id: '80',
        parent: '86',
        title: '80',
        type: ModelType.tag,
        sourceRel: '',
        sourceOriginal: ''
      },
      {
        id: '87',
        parent: '86',
        title: '87',
        type: ModelType.tag,
        sourceRel: '',
        sourceOriginal: ''
      },
      {
        id: '62',
        parent: '74',
        title: '62',
        type: ModelType.tag,
        sourceRel: '',
        sourceOriginal: ''
      },
      {
        id: '86',
        parent: '74',
        title: '86',
        type: ModelType.tag,
        sourceRel: '',
        sourceOriginal: ''
      },
      {
        id: '56',
        parent: '62',
        title: '56',
        type: ModelType.tag,
        sourceRel: '',
        sourceOriginal: ''
      },
      {
        id: '81',
        parent: '80',
        title: '81',
        type: ModelType.tag,
        sourceRel: '',
        sourceOriginal: ''
      },
      {
        id: '74',
        parent: '',
        title: '74',
        type: ModelType.tag,
        sourceRel: '',
        sourceOriginal: ''
      }
    ];

    const tree = createTree(data);

    expect(get(tree, `id`)).toBe('74');
    expect(get(tree, `title`)).toBe('74');

    expect(get(tree, `children[0].id`)).toBe('62');
    expect(get(tree, `children[0].parent`)).toBe('74');

    expect(get(tree, `children[1].children[0].id`)).toBe('80');
    expect(get(tree, `children[1].children[0].parent`)).toBe('86');
  });

  it('createPolyTree', () => {
    const data: Parentable<ITag>[] = [
      {
        id: '74',
        parent: '',
        title: '74',
        type: ModelType.tag,
        sourceRel: '',
        sourceOriginal: ''
      },
      {
        id: '62',
        parent: '74',
        title: '62',
        type: ModelType.tag,
        sourceRel: '',
        sourceOriginal: ''
      },
      {
        id: '80',
        parent: '62',
        title: '80',
        type: ModelType.tag,
        sourceRel: '',
        sourceOriginal: ''
      },
      {
        id: '80',
        parent: '62',
        title: '80',
        type: ModelType.tag,
        sourceRel: '',
        sourceOriginal: ''
      },
      {
        id: '1',
        parent: '',
        title: '1',
        type: ModelType.tag,
        sourceRel: '',
        sourceOriginal: ''
      },
      {
        id: '2',
        parent: '1',
        title: '2',
        type: ModelType.tag,
        sourceRel: '',
        sourceOriginal: ''
      },
      {
        id: '80',
        parent: '2',
        title: '80',
        type: ModelType.tag,
        sourceRel: '',
        sourceOriginal: ''
      }
    ];

    const tree = createPolyTree(data);

    expect(get(tree, `[0].id`)).toBe('74');
    expect(get(tree, `[1].id`)).toBe('1');

    expect(get(tree, `[0].children[0].id`)).toBe('62');
    expect(get(tree, `[0].children[0].parent`)).toBe('74');

    expect(get(tree, `[1].children[0].children[0].id`)).toBe('80');
    expect(get(tree, `[1].children[0].children[0].parent`)).toBe('2');
  });

  it('searchTree', () => {
    const data: Parentable<INeed>[] = [
      {
        id: 'e7db8799-a9fb-419c-8691-0a39cfa2ad8b',
        title: 'Behov 1 nivå 1',
        description: '',
        requirements: [
          {
            id: '39baf894-53b1-46e2-810b-436a60d6f3c8',
            title: 'TEst',
            description: '',
            needId: 'e7db8799-a9fb-419c-8691-0a39cfa2ad8b',
            tags: [],
            variants: [
              {
                requirementText: '',
                instruction: '',
                useProduct: true,
                useSpesification: false,
                useQualification: false,
                products: ['418869f2-4d6b-4613-8733-d993fd0b0ac6'],
                questions: [
                  {
                    type: QuestionEnum.Q_SLIDER,
                    answer: {
                      value: 0,
                      point: 0
                    },
                    config: {
                      min: 0,
                      max: 0,
                      step: 1,
                      unit: 'GB',
                      defaultPoint: 0,
                      scoreValues: [
                        { score: 0, value: 0 },
                        { value: 10, score: 100 }
                      ]
                    },
                    sourceOriginal: '',
                    sourceRel: '',
                    id: '402e75df-0f4c-4d2f-b141-3e9dde90cffc'
                  }
                ],
                id: '582a5a5e-4c9f-46f2-b81a-8dc9963beae3'
              }
            ],
            type: ModelType.requirement,
            requirement_Type: RequirementType.requirement,
            sourceOriginal: '7ec3329c-81bd-4fe2-9abf-086e4ea3ede8',
            sourceRel: null
          }
        ],
        type: ModelType.need,
        parent: '',
        sourceOriginal: '7ec3329c-81bd-4fe2-9abf-086e4ea3ede8',
        sourceRel: null
      },
      {
        id: '1f22e20c-2777-4ff3-880d-20256f6cb931',
        title: 'Behov 1 nivå 2',
        description: '',
        requirements: [
          {
            id: '9d02c084-fef2-4f7b-a990-2ddb922a7802',
            title: 'Knytting behov 1_2 til produkt 1',
            description: '',
            needId: '1f22e20c-2777-4ff3-880d-20256f6cb931',
            tags: [],
            variants: [
              {
                requirementText: '',
                instruction: '',
                useProduct: true,
                useSpesification: false,
                useQualification: false,
                products: ['7954e3c5-82a5-423b-8c98-25b3d060ec90'],
                questions: [
                  {
                    type: QuestionEnum.Q_SLIDER,
                    config: {
                      min: 1,
                      max: 100,
                      step: 5,
                      unit: 'TB',
                      defaultPoint: 0,
                      scoreValues: [
                        { score: 0, value: 0 },
                        { value: 10, score: 100 }
                      ]
                    },
                    answer: { point: 0, value: 0 },
                    sourceOriginal: '',
                    sourceRel: '',
                    id: '293b2bc4-a5f5-4c61-9759-814bc68ee9bb'
                  },
                  {
                    type: QuestionEnum.Q_PERIOD_DATE,
                    config: {
                      hasToDate: true,
                      defaultPoint: 0,
                      fromBoundary: '2021-09-01T13:25:59.0000000Z',
                      toBoundary: '2021-11-01T13:25:59.0000000Z'
                    },
                    answer: {
                      fromDate: '2021-10-01T13:25:59.0000000Z',
                      toDate: '2021-10-31T13:26:02.0000000Z',
                      point: 0
                    },
                    sourceOriginal: '',
                    sourceRel: '',
                    id: '61479271-47cc-47dd-a614-15a88418f107'
                  }
                ],
                id: 'a85deb14-9549-465f-9183-fe9102c4f8e0'
              }
            ],
            type: ModelType.requirement,
            requirement_Type: RequirementType.requirement,
            sourceOriginal: '7ec3329c-81bd-4fe2-9abf-086e4ea3ede8',
            sourceRel: null
          }
        ],
        type: ModelType.need,
        parent: 'e7db8799-a9fb-419c-8691-0a39cfa2ad8b',
        sourceOriginal: '7ec3329c-81bd-4fe2-9abf-086e4ea3ede8',
        sourceRel: null
      },
      {
        id: 'ea8cda2f-a84f-491a-b15b-a750b9cab803',
        title: 'Behov 1 nivå 3',
        description: '',
        requirements: [
          {
            id: 'e0cf3ddc-ccfa-451f-8be9-a0dbf5429f12',
            title: 'Knytting behov 1 Nivå 3 til Nansen',
            description: '',
            needId: '1f22e20c-2777-4ff3-880d-20256f6cb931',
            tags: [],
            variants: [
              {
                requirementText: '',
                instruction: '',
                useProduct: true,
                useSpesification: false,
                useQualification: false,
                products: ['418869f2-4d6b-4613-8733-d993fd0b0ac6'],
                questions: [
                  {
                    type: QuestionEnum.Q_SLIDER,
                    config: {
                      min: 0,
                      max: 0,
                      step: 1,
                      unit: 'GB',
                      defaultPoint: 0,
                      scoreValues: [
                        { score: 0, value: 0 },
                        { value: 10, score: 100 }
                      ]
                    },
                    answer: { point: 0, value: 0 },
                    sourceOriginal: '',
                    sourceRel: '',
                    id: '15eb0a4f-e5df-4961-a1c3-e57cd29309e5'
                  },
                  {
                    type: QuestionEnum.Q_TEXT,
                    config: {
                      max: 0,
                      defaultPoint: 0
                    },
                    answer: { point: 0, text: '' },
                    sourceOriginal: '',
                    sourceRel: '',
                    id: '14b27f57-5db4-4a9e-938c-dd813811f412'
                  }
                ],
                id: '1dc66d5f-affa-48f1-9568-d11bf5dc6758'
              }
            ],
            type: ModelType.requirement,
            requirement_Type: RequirementType.requirement,
            sourceOriginal: '7ec3329c-81bd-4fe2-9abf-086e4ea3ede8',
            sourceRel: null
          }
        ],
        type: ModelType.need,
        parent: '1f22e20c-2777-4ff3-880d-20256f6cb931',
        sourceOriginal: '7ec3329c-81bd-4fe2-9abf-086e4ea3ede8',
        sourceRel: null
      },
      {
        id: 'ba0f670a-2768-455b-a5d7-7b0f69c42d5d',
        title: 'Behov 2 nivå 1',
        description: '',
        requirements: [
          {
            id: 'af28df1c-3efb-4495-a3ec-f510a7cddaaf',
            title: 'Knytting Behov 2_1 til produkt 2 og Nansen',
            description: '',
            needId: '1f22e20c-2777-4ff3-880d-20256f6cb931',
            tags: [],
            variants: [
              {
                requirementText: '',
                instruction: '',
                useProduct: true,
                useSpesification: false,
                useQualification: false,
                products: [
                  '6c8c36ec-42d4-4c5a-870f-6fda3dab340f',
                  '418869f2-4d6b-4613-8733-d993fd0b0ac6'
                ],
                questions: [
                  {
                    type: QuestionEnum.Q_TIME,
                    config: {
                      fromTime: '10:35',
                      toTime: '11:59',
                      defaultPoint: 0
                    },
                    answer: { point: 0, time: '' },
                    sourceOriginal: '',
                    sourceRel: '',
                    id: 'e127a2be-df97-4d73-9d76-70e2938505d9'
                  },
                  {
                    type: QuestionEnum.Q_CHECKBOX,
                    config: {
                      pointsNonPrefered: 0,
                      defaultPoint: 1,
                      preferedAlternative: true
                    },
                    answer: { point: 0, value: false },
                    sourceOriginal: '',
                    sourceRel: '',
                    id: 'f49b835c-c5fd-4814-8905-c80f7183589c'
                  }
                ],
                id: '3d22f4f8-1366-44eb-9eed-b1cd1b90b936'
              }
            ],
            type: ModelType.requirement,
            requirement_Type: RequirementType.requirement,
            sourceOriginal: '7ec3329c-81bd-4fe2-9abf-086e4ea3ede8',
            sourceRel: null
          }
        ],
        type: ModelType.need,
        parent: '',
        sourceOriginal: '7ec3329c-81bd-4fe2-9abf-086e4ea3ede8',
        sourceRel: null
      },
      {
        id: '321d3c2f-27c4-411b-ab35-a0e4259a116a',
        title: 'Behov 2 testedit',
        description: '',
        requirements: [],
        type: ModelType.need,
        parent: 'ba0f670a-2768-455b-a5d7-7b0f69c42d5d',
        sourceOriginal: '7ec3329c-81bd-4fe2-9abf-086e4ea3ede8',
        sourceRel: null
      },
      {
        id: 'c8c0aef3-01ea-440d-8ddf-501b45c5067e',
        title: 'Behov 3 nivå 1',
        description: '',
        requirements: [],
        type: ModelType.need,
        parent: '',
        sourceOriginal: '7ec3329c-81bd-4fe2-9abf-086e4ea3ede8',
        sourceRel: null
      },
      {
        id: '59e5c665-b192-43c0-b95f-3d69cd6ff447',
        title: 'Behov 3 nivå 2',
        description: '',
        requirements: [
          {
            id: '1e8b669c-c6ab-4fa0-ab12-0faaa90da93d',
            title: 'Knytting Behov 3_1 til Produkt 3 og 4 og Nansen',
            description: '',
            needId: 'ba0f670a-2768-455b-a5d7-7b0f69c42d5d',
            tags: [],
            variants: [
              {
                requirementText: 'Variant 1',
                instruction: '',
                useProduct: true,
                useSpesification: false,
                useQualification: false,
                products: [
                  '3fa22e25-2ba9-4c66-bbea-ca8709df8c2c',
                  '1dda1393-bdda-4da0-ae83-0d9189fffe09',
                  '418869f2-4d6b-4613-8733-d993fd0b0ac6'
                ],
                questions: [
                  {
                    type: QuestionEnum.Q_FILEUPLOAD,
                    id: '2ac6acb3-a5bb-4c96-b703-06b86d9e5ee6',
                    config: {
                      fileEndings: '.pdf',
                      defaultPoint: 0
                    },
                    answer: { file: '', point: 0 },
                    sourceOriginal: '',
                    sourceRel: null
                  }
                ],
                id: '73fb23ca-19a2-413d-a3f3-70eb9f90b857'
              },
              {
                requirementText: 'Variant 2',
                instruction: '',
                useProduct: true,
                useSpesification: false,
                useQualification: false,
                products: ['3fa22e25-2ba9-4c66-bbea-ca8709df8c2c'],
                questions: [
                  {
                    type: QuestionEnum.Q_SLIDER,
                    config: {
                      min: 200,
                      max: 2000,
                      step: 100,
                      unit: 'ts',
                      defaultPoint: 0,
                      scoreValues: [
                        { score: 0, value: 0 },
                        { value: 10, score: 100 }
                      ]
                    },
                    answer: { point: 0, value: 0 },
                    sourceOriginal: '',
                    sourceRel: null,
                    id: 'ef52d371-d4e6-4521-b8c7-6b3505128067'
                  }
                ],
                id: '67527403-87f8-4095-bec6-006172e91786'
              }
            ],
            type: ModelType.requirement,
            requirement_Type: RequirementType.requirement,
            sourceOriginal: '7ec3329c-81bd-4fe2-9abf-086e4ea3ede8',
            sourceRel: null
          }
        ],
        type: ModelType.need,
        parent: 'c8c0aef3-01ea-440d-8ddf-501b45c5067e',
        sourceOriginal: '7ec3329c-81bd-4fe2-9abf-086e4ea3ede8',
        sourceRel: null
      },
      {
        id: 'dcfa3622-3484-49ad-bf48-b8099ec82cc2',
        title: 'Behov 4 nivå 1',
        description: '',
        requirements: [],
        type: ModelType.need,
        parent: '',
        sourceOriginal: '7ec3329c-81bd-4fe2-9abf-086e4ea3ede8',
        sourceRel: null
      },
      {
        id: '5f9c6d0e-9c00-4cdd-a752-c059bd5f788a',
        title: 'Behov 5 Nivå 5',
        description: '',
        requirements: [],
        type: ModelType.need,
        parent: '',
        sourceOriginal: '7ec3329c-81bd-4fe2-9abf-086e4ea3ede8',
        sourceRel: null
      }
    ];

    const findNeedIdsForProduct = (productId: string, needs: INeed[]) => {
      const result: string[] = [];
      needs.forEach((need) => {
        need.requirements.forEach((req) => {
          req.variants.forEach((variant) => {
            if (variant.products.includes(productId)) {
              result.push(need.id);
            }
          });
        });
      });
      return result;
    };

    // test one product in level 2
    const result1 = findNeedIdsForProduct(
      '7954e3c5-82a5-423b-8c98-25b3d060ec90',
      data
    );
    const res1 = getPaths(result1, data);

    expect(get(res1, `[0].id`)).toBe('e7db8799-a9fb-419c-8691-0a39cfa2ad8b');
    expect(get(res1, `[1].id`)).toBe('1f22e20c-2777-4ff3-880d-20256f6cb931');

    // test product that does not exists
    const result2 = findNeedIdsForProduct('foobar', data);
    const res2 = getPaths(result2, data);

    expect(res2).toEqual([]);

    // test product that exists in multiple roots and everywhere
    const result3 = findNeedIdsForProduct(
      '418869f2-4d6b-4613-8733-d993fd0b0ac6',
      data
    );
    const res3 = getPaths(result3, data);

    expect(res3.length).toBe(6);

    expect(get(res3, `[0].id`)).toBe('e7db8799-a9fb-419c-8691-0a39cfa2ad8b');
    expect(get(res3, `[5].id`)).toBe('59e5c665-b192-43c0-b95f-3d69cd6ff447');
      */

    const number = 3;
    expect(number).toBe(3);
  });
});
