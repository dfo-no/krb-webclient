import { joiResolver } from '@hookform/resolvers/joi';
import Alert from '@mui/lab/Alert/Alert';
import Button from '@mui/material/Button/Button';
import React from 'react';
import Card from 'react-bootstrap/Card';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import ErrorSummary from '../../Form/ErrorSummary';
import FileUploadCtrl from '../../FormProvider/FileUploadCtrl';
import SwitchCtrl from '../../FormProvider/SwitchCtrl';
import { IRequirementAnswer } from '../../models/IRequirementAnswer';
import ModelType from '../../models/ModelType';
import {
  FileUploadWorkbenchSchema,
  IFileUploadQuestion
} from '../../Nexus/entities/IFileUploadQuestion';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  editAnswer,
  editProductAnswer
} from '../../store/reducers/spesification-reducer';

interface IProps {
  parentAnswer: IRequirementAnswer;
}

export default function FileUploadForm({
  parentAnswer
}: IProps): React.ReactElement {
  const question = parentAnswer.question as IFileUploadQuestion;

  const methods = useForm<IFileUploadQuestion>({
    resolver: joiResolver(FileUploadWorkbenchSchema),
    defaultValues: question
  });

  const { selectedSpecificationProduct } = useAppSelector(
    (state) => state.selectedSpecProduct
  );
  const item = parentAnswer.question as IFileUploadQuestion;
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  if (
    !selectedSpecificationProduct &&
    parentAnswer.type === ModelType.product
  ) {
    return <p>No product selected</p>;
  }

  const saveValues = (post: IFileUploadQuestion) => {
    const newAlt: IFileUploadQuestion = {
      ...item,
      config: post.config
    };
    const newAnswer = {
      ...parentAnswer
    };
    newAnswer.question = newAlt;

    if (newAnswer.type === ModelType.requirement)
      dispatch(editAnswer({ answer: newAnswer }));
    if (newAnswer.type === ModelType.product && selectedSpecificationProduct)
      dispatch(
        editProductAnswer({
          answer: newAnswer,
          productId: selectedSpecificationProduct.id
        })
      );
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <h6>Alternative: FileUpload</h6>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(saveValues)}>
            <FileUploadCtrl
              name="config.fileEndings"
              label="Tilatte filtyper"
            />
            {question.config.uploadInSpec && (
              <Alert>Upload not implemented</Alert>
            )}
            <SwitchCtrl
              name="config.allowMultipleFiles"
              label="Tillat flere vedlegg"
            />
            <Button type="submit" variant="contained">
              {t('Save')}
            </Button>
            <ErrorSummary errors={methods.formState.errors} />
          </form>
        </FormProvider>
      </Card.Body>
    </Card>
  );
}
