import React, { ReactElement } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import { IRequirementAnswer } from '../../../models/IRequirementAnswer';
import { IFileUploadQuestion } from '../../../models/IFileUploadQuestion';
import {
  editAnswer,
  editProductAnswer
} from '../../../store/reducers/spesification-reducer';
import { RootState } from '../../../store/store';
import ErrorSummary from '../../../Form/ErrorSummary';
import { FileUploadSchema } from '../../../Workbench/Requirement/RequirementEditor';

interface IProps {
  parentAnswer: IRequirementAnswer;
}

export default function FileInputForm({ parentAnswer }: IProps): ReactElement {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IFileUploadQuestion>({
    resolver: joiResolver(FileUploadSchema),
    defaultValues: {
      ...(parentAnswer.alternative as IFileUploadQuestion)
    }
  });
  const { productId } = useSelector(
    (state: RootState) => state.selectedSpecProduct
  );
  const item = parentAnswer.alternative as IFileUploadQuestion;
  const dispatch = useDispatch();
  const { t } = useTranslation();

  if (!productId && parentAnswer.type === 'product') {
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
    newAnswer.alternative = newAlt;

    if (newAnswer.type === 'requirement')
      dispatch(editAnswer({ answer: newAnswer }));
    if (newAnswer.type === 'product' && productId !== null)
      dispatch(editProductAnswer({ answer: newAnswer, productId }));
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <h6>Alternative: Value</h6>
        <Form onSubmit={handleSubmit(saveValues)}>
          <Form.Control
            as="input"
            type="hidden"
            {...register('id')}
            isInvalid={!!errors.id}
          />

          <Form.Control
            as="input"
            type="hidden"
            {...register('type')}
            isInvalid={!!errors.type}
          />
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
