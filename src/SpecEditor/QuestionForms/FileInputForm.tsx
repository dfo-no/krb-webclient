import { joiResolver } from '@hookform/resolvers/joi';
import React, { ReactElement } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import ErrorSummary from '../../Form/ErrorSummary';
import {
  FileUploadQuestionSchema,
  IFileUploadQuestion
} from '../../models/IFileUploadQuestion';
import { IRequirementAnswer } from '../../models/IRequirementAnswer';
import ModelType from '../../models/ModelType';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  editAnswer,
  editProductAnswer
} from '../../store/reducers/spesification-reducer';

interface IProps {
  parentAnswer: IRequirementAnswer;
}

export default function FileInputForm({ parentAnswer }: IProps): ReactElement {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IFileUploadQuestion>({
    resolver: joiResolver(FileUploadQuestionSchema),
    defaultValues: {
      ...(parentAnswer.question as IFileUploadQuestion)
    }
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
    const newAlt = {
      ...item,
      fileEndings: post.config.fileEndings
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
        <h6>Alternative: Value</h6>
        <Form onSubmit={handleSubmit(saveValues)}>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Text
            </Form.Label>
            <Col sm="4">
              <Form.Control
                type="input"
                {...register('config.fileEndings')}
                isInvalid={!!errors?.config?.fileEndings}
              />
              {errors?.config?.fileEndings && (
                <Form.Control.Feedback type="invalid">
                  {errors.config.fileEndings.message}
                </Form.Control.Feedback>
              )}
            </Col>
          </Form.Group>

          <Button type="submit">{t('save')}</Button>
          <ErrorSummary errors={errors} />
        </Form>
      </Card.Body>
    </Card>
  );
}
