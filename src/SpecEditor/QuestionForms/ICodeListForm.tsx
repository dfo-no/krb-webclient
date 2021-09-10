import { joiResolver } from '@hookform/resolvers/joi';
import Switch from '@material-ui/core/Switch';
import React, { ReactElement } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import ErrorSummary from '../../Form/ErrorSummary';
import { Codelist } from '../../models/Codelist';
import {
  CodelistQuestionSchema,
  ICodelistQuestion
} from '../../models/ICodelistQuestion';
import { IRequirementAnswer } from '../../models/IRequirementAnswer';
import ModelType from '../../models/ModelType';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  addAnswer,
  addProductAnswer
} from '../../store/reducers/spesification-reducer';

interface IProps {
  parentAnswer: IRequirementAnswer;
}

export default function CodelistForm({ parentAnswer }: IProps): ReactElement {
  const { spec } = useAppSelector((state) => state.specification);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<ICodelistQuestion>({
    resolver: joiResolver(CodelistQuestionSchema),
    defaultValues: {
      ...(parentAnswer.question as ICodelistQuestion)
    }
  });
  const { selectedSpecificationProduct } = useAppSelector(
    (state) => state.selectedSpecProduct
  );
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  if (!selectedSpecificationProduct && parentAnswer.type === 'product') {
    return <p>No product selected</p>;
  }

  const saveValues = (post: ICodelistQuestion) => {
    const newAnswer = {
      ...parentAnswer
    };
    const newAlt = post;
    newAnswer.question = newAlt;
    if (newAnswer.type === ModelType.requirement)
      dispatch(addAnswer({ answer: newAnswer }));
    if (newAnswer.type === ModelType.product && selectedSpecificationProduct)
      dispatch(
        addProductAnswer({
          answer: newAnswer,
          productId: selectedSpecificationProduct.id
        })
      );
  };

  const codelistOptions = () => {
    return spec.bank.codelist.map((codelist: Codelist) => {
      return (
        <option value={codelist.id} key={codelist.id}>
          {codelist.title}
        </option>
      );
    });
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <h6>Alternative: Codelist</h6>
        <Form onSubmit={handleSubmit(saveValues)}>
          <Form.Control as="select" {...register('config.codelist')}>
            {codelistOptions()}
          </Form.Control>
          <Form.Label>Allow multiple selected Codes</Form.Label>
          <Controller
            control={control}
            name={`config.multipleSelect` as const}
            render={({ field }) => (
              <Switch
                {...field}
                checked={field.value}
                onChange={(_, value) => {
                  field.onChange(value);
                }}
              />
            )}
          />
          <Button type="submit">{t('save')}</Button>
          <ErrorSummary errors={errors} />
        </Form>
      </Card.Body>
    </Card>
  );
}
