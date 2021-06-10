import React, { ReactElement } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { joiResolver } from '@hookform/resolvers/joi';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import Switch from '@material-ui/core/Switch';
import { IRequirementAnswer } from '../../../models/IRequirementAnswer';
import {
  addAnswer,
  addProductAnswer
} from '../../../store/reducers/spesification-reducer';
import { RootState } from '../../../store/store';
import ErrorSummary from '../../../Form/ErrorSummary';
import { CodelistSchema } from '../../../Workbench/Requirement/RequirementEditor';
import { ICodelistQuestion } from '../../../models/ICodelistQuestion';
import { Codelist } from '../../../models/Codelist';

interface IProps {
  parentAnswer: IRequirementAnswer;
}

export default function CodelistForm({ parentAnswer }: IProps): ReactElement {
  const { spec } = useSelector((state: RootState) => state.specification);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<ICodelistQuestion>({
    resolver: joiResolver(CodelistSchema),
    defaultValues: {
      ...(parentAnswer.alternative as ICodelistQuestion)
    }
  });
  const { productId } = useSelector(
    (state: RootState) => state.selectedSpecProduct
  );
  const item = parentAnswer.alternative as ICodelistQuestion;
  const dispatch = useDispatch();
  const { t } = useTranslation();

  if (!productId && parentAnswer.type === 'product') {
    return <p>No product selected</p>;
  }

  const saveValues = (post: ICodelistQuestion) => {
    let newAlt = {
      ...item
    };
    const newAnswer = {
      ...parentAnswer
    };
    newAlt = post;
    newAnswer.alternative = newAlt;
    if (newAnswer.type === 'requirement')
      dispatch(addAnswer({ answer: newAnswer }));
    if (newAnswer.type === 'product' && productId !== null)
      dispatch(addProductAnswer({ answer: newAnswer, productId }));
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
          <Form.Control
            as="input"
            type="hidden"
            {...register('id')}
            defaultValue={item.id}
          />
          <Form.Control
            as="input"
            type="hidden"
            {...register('type')}
            defaultValue={item.type}
          />
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
