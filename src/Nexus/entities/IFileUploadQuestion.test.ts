import QuestionEnum from '../../models/QuestionEnum';
import {
  FileUploadAnswerSchema,
  FileUploadWorkbenchSchema,
  IFileUploadQuestion
} from './IFileUploadQuestion';

describe('IFileUploadQuestion', () => {
  test('Valid WB form should validate', () => {
    const question: IFileUploadQuestion = {
      id: 'e56367af-d48d-422d-a4f6-ba52ee17af23',
      type: QuestionEnum.Q_FILEUPLOAD,
      answer: {
        files: [''],
        point: 2
      },
      config: {
        allowMultipleFiles: true,
        fileEndings: ['pdf', 'doc'],
        template: 'template string',
        uploadInSpec: true,
        defaultPoint: 1
      },
      sourceRel: null,
      sourceOriginal: null
    };

    const report = FileUploadWorkbenchSchema.validate(question);
    expect(report.error).toBeUndefined();
  });

  test('Invalid form should invalidate', () => {
    const question: IFileUploadQuestion = {
      id: 'e56367af-d48d-422d-a4f6-ba52ee17af23',
      type: QuestionEnum.Q_FILEUPLOAD,
      answer: {
        files: ['doc'],
        point: 2
      },
      config: {
        fileEndings: [],
        template: null,
        allowMultipleFiles: true,
        uploadInSpec: true,
        defaultPoint: 1
      },
      sourceRel: null,
      sourceOriginal: null
    };

    const report = FileUploadAnswerSchema.validate(question);
    expect(report.error?.details[0].type).toEqual('array.min');
  });
});
