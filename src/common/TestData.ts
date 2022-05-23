import QuestionVariant from '../models/QuestionVariant';
import VariantType from '../Nexus/entities/VariantType';
import { IBank } from '../Nexus/entities/IBank';
import { IBaseModel } from '../Nexus/entities/IBaseModel';
import { INeed } from '../Nexus/entities/INeed';
import { ModelType } from '../enums';
import { Nestable } from '../models/Nestable';
import { Parentable } from '../models/Parentable';

interface ICar extends IBaseModel {
  id: string;
  title: string;
  type: ModelType.need;
}

export const parentableCarsTestData: Parentable<ICar>[] = [
  {
    id: 'aa28e225-7a76-4c57-bb22-ec87b3131762',
    title: 'A',
    parent: '',
    type: ModelType.need,
    sourceOriginal: null,
    sourceRel: null
  },
  {
    id: 'bb60be0f-44e9-4ea9-a755-476fbc6dd85d',
    title: 'B_1',
    parent: 'aa28e225-7a76-4c57-bb22-ec87b3131762',
    type: ModelType.need,
    sourceOriginal: null,
    sourceRel: null
  },
  {
    id: 'cc60be0f-44e9-4ea9-a755-476fbc6dd855',
    title: 'C_1',
    parent: 'aa28e225-7a76-4c57-bb22-ec87b3131762',
    type: ModelType.need,
    sourceOriginal: null,
    sourceRel: null
  },
  {
    id: 'dd029ba3-aa01-4150-bd43-8d754bcfd890',
    title: 'D_2',
    parent: 'cc60be0f-44e9-4ea9-a755-476fbc6dd855',
    type: ModelType.need,
    sourceOriginal: null,
    sourceRel: null
  },
  {
    id: '0e998bb7-bc0f-41d8-9199-800b46145ba9',
    title: 'F_4',
    parent: 'ee7d9375-aee7-42c2-a6d7-9fa1541d56ef',
    type: ModelType.need,
    sourceOriginal: null,
    sourceRel: null
  },
  {
    id: 'a85deb14-9549-465f-9183-fe9102c4f8e0',
    title: 'O_2',
    parent: 'ee7d9375-aee7-42c2-a6d7-9fa1541d56ef',
    type: ModelType.need,
    sourceOriginal: null,
    sourceRel: null
  },
  {
    id: 'ee7d9375-aee7-42c2-a6d7-9fa1541d56ef',
    title: 'E_3',
    parent: 'dd029ba3-aa01-4150-bd43-8d754bcfd890',
    type: ModelType.need,
    sourceOriginal: null,
    sourceRel: null
  },

  {
    id: 'ffb9bfe0-0b87-4e2d-95c8-9b703e655e61',
    title: 'K',
    parent: '',
    type: ModelType.need,
    sourceOriginal: null,
    sourceRel: null
  },
  {
    id: '1f22e20c-2777-4ff3-880d-20256f6cb931',
    title: 'K_1',
    parent: 'ffb9bfe0-0b87-4e2d-95c8-9b703e655e61',
    type: ModelType.need,
    sourceOriginal: null,
    sourceRel: null
  },
  {
    id: '293b2bc4-a5f5-4c61-9759-814bc68ee9bb',
    title: 'K_2',
    parent: '1f22e20c-2777-4ff3-880d-20256f6cb931',
    type: ModelType.need,
    sourceOriginal: null,
    sourceRel: null
  },
  {
    id: 'a85deb14-9549-465f-9183-fe9102c4f8e0',
    title: 'O_2',
    parent: '1f22e20c-2777-4ff3-880d-20256f6cb931',
    type: ModelType.need,
    sourceOriginal: null,
    sourceRel: null
  }
];

export const nestableCarsTestData: Nestable<ICar>[] = [
  {
    id: 'aa28e225-7a76-4c57-bb22-ec87b3131762',
    title: 'A',
    parent: '',
    type: ModelType.need,
    level: 1,
    sourceOriginal: null,
    sourceRel: null,
    children: [
      {
        id: 'bb60be0f-44e9-4ea9-a755-476fbc6dd85d',
        title: 'B_1',
        parent: 'aa28e225-7a76-4c57-bb22-ec87b3131762',
        type: ModelType.need,
        level: 2,
        sourceOriginal: null,
        sourceRel: null
      },
      {
        id: 'cc60be0f-44e9-4ea9-a755-476fbc6dd855',
        title: 'C_1',
        parent: 'aa28e225-7a76-4c57-bb22-ec87b3131762',
        type: ModelType.need,
        level: 2,
        sourceOriginal: null,
        sourceRel: null,
        children: [
          {
            id: 'dd029ba3-aa01-4150-bd43-8d754bcfd890',
            title: 'D_2',
            parent: 'cc60be0f-44e9-4ea9-a755-476fbc6dd855',
            type: ModelType.need,
            level: 3,
            sourceOriginal: null,
            sourceRel: null,
            children: [
              {
                id: 'ee7d9375-aee7-42c2-a6d7-9fa1541d56ef',
                title: 'E_3',
                parent: 'dd029ba3-aa01-4150-bd43-8d754bcfd890',
                type: ModelType.need,
                level: 4,
                children: [
                  {
                    id: '0e998bb7-bc0f-41d8-9199-800b46145ba9',
                    title: 'F_4',
                    parent: 'ee7d9375-aee7-42c2-a6d7-9fa1541d56ef',
                    type: ModelType.need,
                    level: 5,
                    sourceOriginal: null,
                    sourceRel: null
                  }
                ],
                sourceOriginal: null,
                sourceRel: null
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'ffb9bfe0-0b87-4e2d-95c8-9b703e655e61',
    title: 'K',
    parent: '',
    type: ModelType.need,
    level: 1,
    sourceOriginal: null,
    sourceRel: null
  }
];

export const productsTestData = [
  {
    id: 'ca701c0c-af4a-11ec-b909-0242ac120002',
    title: 'A Product',
    description: '',
    parent: '',
    type: ModelType.product,
    sourceOriginal: null,
    sourceRel: null,
    deletedDate: null
  },
  {
    id: 'fb55c57e-af4a-11ec-b909-0242ac120002',
    title: 'B Product',
    description: '',
    parent: '',
    type: ModelType.product,
    sourceOriginal: null,
    sourceRel: null,
    deletedDate: null
  },
  {
    id: '38c1b14e-b742-11ec-b909-0242ac120002',
    title: 'C Product',
    description: '',
    parent: '',
    type: ModelType.product,
    sourceOriginal: null,
    sourceRel: null,
    deletedDate: null
  }
];

export const codelistsTestData = [
  {
    id: '7aa1c0e8-d8f0-45f5-9bfc-3584ef3ba052',
    title: 'A Codelist',
    description: '',
    codes: [],
    type: ModelType.codelist,
    sourceOriginal: null,
    sourceRel: null
  },
  {
    id: 'c71f3e4a-baf9-4625-969f-58d206f9794b',
    title: 'B Codelist',
    description: '',
    codes: [],
    type: ModelType.codelist,
    sourceOriginal: null,
    sourceRel: null
  }
];

export const needHierarchyTestData: Parentable<INeed>[] = [
  {
    id: '100364dc-af4a-11ec-b909-0242ac120002',
    title: 'A Need',
    description: '',
    parent: '',
    type: ModelType.need,
    sourceOriginal: null,
    sourceRel: null,
    requirements: [
      {
        id: '289a2a44-af4a-11ec-b909-0242ac120002',
        title: 'A requirement',
        description: '',
        needId: '100364dc-af4a-11ec-b909-0242ac120002',
        type: ModelType.requirement,
        sourceOriginal: null,
        sourceRel: null,
        variants: [
          {
            id: '59326af4-af4a-11ec-b909-0242ac120002',
            description: 'A Variant',
            requirementText: '',
            instruction: '',
            useProduct: false,
            useSpesification: false,
            useQualification: false,
            products: [],
            questions: [],
            type: VariantType.requirement
          },
          {
            id: 'ebb0c61e-af4a-11ec-b909-0242ac120002',
            description: 'A2 Variant',
            requirementText: '',
            instruction: '',
            useProduct: true,
            useSpesification: false,
            useQualification: false,
            products: [
              'ca701c0c-af4a-11ec-b909-0242ac120002',
              'fb55c57e-af4a-11ec-b909-0242ac120002'
            ],
            questions: [],
            type: VariantType.requirement
          },
          {
            id: '157407d6-af4b-11ec-b909-0242ac120002',
            description: 'A3 Variant',
            requirementText: '',
            instruction: '',
            useProduct: false,
            useSpesification: true,
            useQualification: false,
            products: [],
            questions: [
              {
                id: '523acdad-95fa-4515-ac1f-f785f3000260',
                type: QuestionVariant.Q_CODELIST,
                config: {
                  mandatoryCodes: [],
                  optionalCodes: [],
                  codelist: '7aa1c0e8-d8f0-45f5-9bfc-3584ef3ba052',
                  defaultPoint: 1,
                  optionalCodeMinAmount: 0,
                  optionalCodeMaxAmount: 1
                },
                answer: {
                  point: 0,
                  codes: []
                },
                sourceRel: null,
                sourceOriginal: null
              }
            ],
            type: VariantType.requirement
          }
        ],
        tags: []
      }
    ]
  },
  {
    id: '2c01b5e8-af4b-11ec-b909-0242ac120002',
    title: 'B Need',
    description: '',
    parent: '',
    type: ModelType.need,
    sourceOriginal: null,
    sourceRel: null,
    requirements: [
      {
        id: '33c20e54-af4b-11ec-b909-0242ac120002',
        title: 'B requirement',
        description: '',
        needId: '2c01b5e8-af4b-11ec-b909-0242ac120002',
        type: ModelType.requirement,
        sourceOriginal: null,
        sourceRel: null,
        variants: [
          {
            id: '4249edd4-af4b-11ec-b909-0242ac120002',
            description: 'B Variant',
            requirementText: '',
            instruction: '',
            useProduct: true,
            useSpesification: false,
            useQualification: false,
            products: ['fb55c57e-af4a-11ec-b909-0242ac120002'],
            questions: [],
            type: VariantType.requirement
          }
        ],
        tags: []
      }
    ]
  }
];

export const projectTestData: IBank = {
  id: '97a90620-af4b-11ec-b909-0242ac120002',
  title: 'A Project',
  description: '',
  needs: [],
  codelist: [],
  products: [],
  version: 0,
  tags: [],
  publishedDate: null,
  deletedDate: null,
  projectId: null,
  publications: [],
  inheritedBanks: [],
  type: ModelType.bank,
  sourceOriginal: null,
  sourceRel: null
};
