import ModelType from '../../models/ModelType';
import QuestionEnum from '../../models/QuestionEnum';
import RequirementType from '../../models/RequirementType';
import { IFileUploadQuestion } from './IFileUploadQuestion';
import { IRequirement, PostRequirementSchema } from './IRequirement';
import { IVariant } from './IVariant';

describe('IRequirement', () => {
  test('Validates as a info field', () => {
    const question: IFileUploadQuestion = {
      type: QuestionEnum.Q_FILEUPLOAD,
      id: 'cd1dfae4-5646-4c57-a081-7044a052d7e9',
      answer: { files: [], point: 1 },
      config: {
        allowMultipleFiles: true,
        defaultPoint: 1,
        fileEndings: ['doc'],
        template: 'test',
        uploadInSpec: true
      },
      sourceRel: null,
      sourceOriginal: null
    };

    const variant1: IVariant = {
      id: 'cce1f434-f71b-40a8-8203-547edc35d215',
      requirementText: 'RequirementText',
      instruction: 'Instuction',
      useProduct: false,
      useSpesification: false,
      useQualification: false,
      products: [],
      questions: [question]
    };

    const req: IRequirement = {
      id: '',
      title: 'Title',
      description: 'Desc',
      needId: 'abea4419-3e99-4040-b667-9d1191b1d87a',
      variants: [variant1],
      requirement_Type: RequirementType.info,
      tags: [],
      type: ModelType.requirement,
      sourceRel: null,
      sourceOriginal: 'abea4419-3e99-4040-b667-9d1191b1d87a'
    };

    // setting requirement to 'info' should fail on "'uploadInSpec' should be false"
    const report1 = PostRequirementSchema.validate(req);
    expect(report1.error?.details[0].type).toEqual('any.only');

    // when setting requirement back to 'requirement it should not fail
    req.requirement_Type = RequirementType.requirement;
    const report2 = PostRequirementSchema.validate(req);
    expect(report2.error).toBeUndefined();
  });
});
