import { joiResolver } from '@hookform/resolvers/joi';
import React, { ReactElement, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import ErrorSummary from '../../Form/ErrorSummary';
import InputRow from '../../Form/InputRow';
import ModelType from '../../models/ModelType';
import { PostProductSchema, Product } from '../../models/Product';
import { useAppDispatch } from '../../store/hooks';
import {
  addProduct,
  putSelectedProjectThunk
} from '../../store/reducers/project-reducer';

function NewProductForm(): ReactElement {
  const dispatch = useAppDispatch();
  const [validated] = useState(false);
  const { t } = useTranslation();

  const [show, setShow] = useState(false);

  const product: Product = {
    id: '',
    title: '',
    description: '',
    parent: '',
    type: ModelType.product
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: joiResolver(PostProductSchema),
    defaultValues: product
  });

  const onSubmit = async (post: Product) => {
    const newProduct = { ...post };
    newProduct.id = uuidv4();
    dispatch(addProduct(newProduct));
    dispatch(putSelectedProjectThunk('dummy')).then(() => {
      setShow(false);
      reset();
    });
  };

  return (
    <>
      <Button
        onClick={() => {
          setShow(true);
        }}
        className="mb-4"
      >
        {t('new product')}
      </Button>
      {show && (
        <Card className="mb-4">
          <Card.Body>
            <Form
              onSubmit={handleSubmit(onSubmit)}
              autoComplete="off"
              noValidate
              validated={validated}
            >
              <InputRow
                control={control}
                name="title"
                errors={errors}
                label={t('Title')}
              />
              <InputRow
                control={control}
                name="description"
                errors={errors}
                label={t('Description')}
              />
              <Button className="mt-2  ml-3" type="submit">
                {t('save')}
              </Button>
              <Button
                className="mt-2 ml-3 btn-warning"
                onClick={() => setShow(false)}
              >
                {t('cancel')}
              </Button>
            </Form>
            <ErrorSummary errors={errors} />
          </Card.Body>
        </Card>
      )}
    </>
  );
}

export default NewProductForm;
