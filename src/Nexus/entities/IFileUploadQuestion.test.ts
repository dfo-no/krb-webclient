import QuestionEnum from '../../models/QuestionEnum';
import {
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
});
