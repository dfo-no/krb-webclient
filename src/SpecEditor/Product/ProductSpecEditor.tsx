import { joiResolver } from '@hookform/resolvers/joi';
import Slider from '@material-ui/core/Slider';
import Joi from 'joi';
import React, { ReactElement, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Utils from '../../common/Utils';
import ErrorSummary from '../../Form/ErrorSummary';
import InputRow from '../../Form/InputRow';
import { IOption } from '../../models/IOption';
import { SpecificationProduct } from '../../models/SpecificationProduct';
import { editSpecProduct } from '../../store/reducers/spesification-reducer';
import { RootState } from '../../store/store';
import ProductRequirementSelectorList from './ProductRequirementSelectorList';

type FormInput = {
  title: string;
  description: string;
  amount: number;
  weight: number;
};

const productSchema = Joi.object().keys({
  title: Joi.string().required(),
  description: Joi.string().allow(null, '').required(),
  amount: Joi.number().integer().min(1).required(),
  weight: Joi.number().integer().min(1).required()
});

export default function ProductSpecEditor(): ReactElement {
  const { id } = useSelector((state: RootState) => state.selectedBank);
  const { list } = useSelector((state: RootState) => state.bank);
  const { spec } = useSelector((state: RootState) => state.specification);
  const { t } = useTranslation();
  const { productId } = useSelector(
    (state: RootState) => state.selectedSpecProduct
  );
  const dispatch = useDispatch();
  const specProduct = Utils.ensure(
    spec.products.find(
      (product: SpecificationProduct) => product.id === productId
    )
  );
  const bankSelected = Utils.ensure(list.find((bank) => bank.id === id));

  const {
    control,
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<FormInput>({
    resolver: joiResolver(productSchema),
    defaultValues: {
      amount: specProduct.amount,
      title: specProduct.title,
      description: specProduct.description
    }
  });
  const checkWeightIsPredefined = (weight: number) => {
    const predefinedValues = [10, 30, 50, 70, 90];
    return predefinedValues.includes(weight);
  };
  const setWeightState = () => {
    if (checkWeightIsPredefined(specProduct.weight)) return 'standard';
    return 'egendefinert';
  };
  const [weightType, setWeightType] = useState(setWeightState());
  const addProductToSpecification = (post: FormInput) => {
    const newProduct: SpecificationProduct = {
      ...specProduct
    };
    const savedWeight =
      weightType === 'standard' && post.weight > 90 ? 90 : post.weight;
    newProduct.title = post.title;
    newProduct.description = post.description;
    newProduct.weight = savedWeight;
    newProduct.amount = post.amount;
    dispatch(editSpecProduct({ product: newProduct }));
  };

  const marks: IOption[] = [
    {
      value: 10,
      label: `Lav`
    },
    {
      value: 30,
      label: ``
    },
    {
      value: 50,
      label: `Middels`
    },
    {
      value: 70,
      label: ``
    },
    {
      value: 90,
      label: `Høy`
    }
  ];

  return (
    <Container fluid>
      <Row className="m-4">
        <h4>Nytt produkt</h4>
      </Row>
      <Card className="m-4">
        <Card.Body>
          <Form
            onSubmit={handleSubmit(addProductToSpecification)}
            autoComplete="off"
          >
            <InputRow
              control={control}
              errors={errors}
              name="amount"
              type="number"
              label="Amount"
            />
            <InputRow
              control={control}
              errors={errors}
              name="title"
              label={t('Title')}
            />
            <InputRow
              control={control}
              errors={errors}
              name="description"
              label={t('Description')}
            />
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Vekting
              </Form.Label>
              <Col sm={10}>
                <Row className="ml-1">
                  <Form.Check className="p-0" formNoValidate>
                    <input
                      type="radio"
                      name="standard"
                      id="standard"
                      checked={weightType === 'standard'}
                      onChange={() => setWeightType('standard')}
                    />
                  </Form.Check>
                  <p className="ml-1">Standard</p>
                  <Form.Check formNoValidate>
                    <input
                      type="radio"
                      name="egendefinert"
                      id="egendefinert"
                      checked={weightType === 'egendefinert'}
                      onChange={() => setWeightType('egendefinert')}
                    />
                  </Form.Check>
                  <p className="ml-1">Egendefinert</p>
                </Row>
                <Row className="ml-1">
                  {weightType === 'egendefinert' && (
                    <Form.Group>
                      <Form.Label>{t('weighting')}:</Form.Label>
                      <Form.Control
                        type="number"
                        defaultValue={specProduct.weight}
                        min={0}
                        {...register('weight' as const)}
                        isInvalid={!!errors.weight}
                      />
                      {errors.weight && (
                        <Form.Control.Feedback type="invalid">
                          {errors.weight?.message}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                  )}
                  {weightType === 'standard' && (
                    <Controller
                      control={control}
                      name={'weight' as const}
                      defaultValue={specProduct.weight}
                      render={({ field }) => (
                        <Slider
                          className="mt-4 w-50"
                          {...field}
                          onChange={(_, value) => {
                            field.onChange(value);
                          }}
                          step={20}
                          min={10}
                          max={90}
                          marks={marks}
                          valueLabelDisplay="auto"
                        />
                      )}
                    />
                  )}
                </Row>
              </Col>
            </Form.Group>
            <Col className="p-0 d-flex justify-content-end">
              <Button type="submit">{t('save')}</Button>
            </Col>
            <ErrorSummary errors={errors} />
          </Form>
        </Card.Body>
      </Card>
      <Row className="m-4">
        <ProductRequirementSelectorList
          product={specProduct}
          selectedBank={bankSelected}
        />
      </Row>
    </Container>
  );
}
