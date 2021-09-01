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
import Utils from '../../common/Utils';
import ErrorSummary from '../../Form/ErrorSummary';
import InputRow from '../../Form/InputRow';
import { IOption } from '../../models/IOption';
import {
  SpecificationProduct,
  SpecificationProductSchema
} from '../../models/SpecificationProduct';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { editSpecProduct } from '../../store/reducers/spesification-reducer';
import ProductRequirementSelectorList from './ProductRequirementSelectorList';

export default function ProductSpecEditor(): ReactElement {
  const { id } = useAppSelector((state) => state.selectedBank);
  const { list } = useAppSelector((state) => state.bank);
  const { t } = useTranslation();
  const { selectedSpecificationProduct } = useAppSelector(
    (state) => state.selectedSpecProduct
  );
  const dispatch = useAppDispatch();
  const bankSelected = Utils.ensure(list.find((bank) => bank.id === id));

  const {
    control,
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<SpecificationProduct>({
    resolver: joiResolver(SpecificationProductSchema),
    defaultValues: {
      ...selectedSpecificationProduct
    }
  });
  const checkWeightIsPredefined = (weight: number) => {
    const predefinedValues = [10, 30, 50, 70, 90];
    return predefinedValues.includes(weight);
  };
  const setWeightState = () => {
    if (checkWeightIsPredefined(selectedSpecificationProduct.weight))
      return 'standard';
    return 'egendefinert';
  };
  const [weightType, setWeightType] = useState(setWeightState());
  const addProductToSpecification = (post: SpecificationProduct) => {
    const newProduct: SpecificationProduct = {
      ...post
    };
    const savedWeight =
      weightType === 'standard' && post.weight > 90 ? 90 : post.weight;
    newProduct.weight = savedWeight;
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
                        defaultValue={selectedSpecificationProduct.weight}
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
                      defaultValue={selectedSpecificationProduct.weight}
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
          product={selectedSpecificationProduct}
          selectedBank={bankSelected}
        />
      </Row>
    </Container>
  );
}
