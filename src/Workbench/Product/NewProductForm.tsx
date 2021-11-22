import { joiResolver } from '@hookform/resolvers/joi';
import { get } from 'lodash';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { FieldError, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import ControlledTextInput from '../../Form/ControlledTextInput';
import ErrorSummary from '../../Form/ErrorSummary';
import { IAlert } from '../../models/IAlert';
import { IProduct, PostProductSchema } from '../../Nexus/entities/IProduct';
import Nexus from '../../Nexus/Nexus';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addAlert } from '../../store/reducers/alert-reducer';
import {
  addProduct,
  putSelectedProjectThunk
} from '../../store/reducers/project-reducer';

function NewProductForm(): React.ReactElement {
  const dispatch = useAppDispatch();
  const { project } = useAppSelector((state) => state.project);
  const [validated] = useState(false);
  const { t } = useTranslation();
  const nexus = Nexus.getInstance();

  const [show, setShow] = useState(false);

  const product: IProduct = nexus.productService.generateDefaultProductValues(
    project.id
  );

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<IProduct>({
    resolver: joiResolver(PostProductSchema),
    defaultValues: product
  });

  const onSubmit = async (post: IProduct) => {
    const newProduct = nexus.productService.createProductWithId(post);
    const alert: IAlert = {
      id: uuidv4(),
      style: 'success',
      text: 'successfully added a new product'
    };
    dispatch(addProduct(newProduct));
    dispatch(putSelectedProjectThunk('dummy')).then(() => {
      dispatch(addAlert({ alert }));
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
              <ControlledTextInput
                control={control}
                name="title"
                error={get(errors, `title`) as FieldError}
                label={t('Title')}
              />
              <ControlledTextInput
                control={control}
                name="description"
                error={get(errors, `description`) as FieldError}
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
