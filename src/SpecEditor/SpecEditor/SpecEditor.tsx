import React, { ReactElement } from 'react';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import FormControl from 'react-bootstrap/FormControl';
import Row from 'react-bootstrap/Row';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';

import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { useTranslation } from 'react-i18next';
import { RootState } from '../../store/store';
import { Bank } from '../../models/Bank';
import Utils from '../../common/Utils';
import { editTitle, setBank } from '../../store/reducers/spesification-reducer';
import ErrorSummary from '../../Form/ErrorSummary';

type FormInput = {
  title: string;
};

const titleSchema = Joi.object().keys({
  title: Joi.string().required()
});

export default function SpecEditor(): ReactElement {
  const { id } = useSelector((state: RootState) => state.selectedBank);
  const { list } = useSelector((state: RootState) => state.bank);
  const { spec } = useSelector((state: RootState) => state.specification);
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormInput>({
    resolver: joiResolver(titleSchema),
    defaultValues: {
      title: spec.title
    }
  });
  const dispatch = useDispatch();

  if (!id) {
    return <p>No selected bank</p>;
  }

  const selectedBank = Utils.ensure(list.find((bank: Bank) => bank.id === id));

  dispatch(setBank(selectedBank));

  const saveTitle = (post: FormInput) => {
    dispatch(editTitle(post.title));
  };

  return (
    <Container fluid>
      <Row className="m-4">
        <Col>
          <Form onSubmit={handleSubmit(saveTitle)}>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Title
              </Form.Label>
              <Col sm={6}>
                <FormControl
                  {...register('title')}
                  defaultValue={spec.title}
                  isInvalid={!!errors.title}
                />
                {errors.title && (
                  <Form.Control.Feedback type="invalid">
                    {errors.title?.message}
                  </Form.Control.Feedback>
                )}
              </Col>
              <Col sm={4}>
                <Button type="submit">{t('save')}</Button>
              </Col>
            </Form.Group>
            <ErrorSummary errors={errors} />
          </Form>
        </Col>
      </Row>
      <Row className="m-4">
        <h4>Bank {selectedBank.title}</h4>
      </Row>
      <Row className=" m-4 d-flex justify-content-md-end">
        <Button>Update</Button>
      </Row>
    </Container>
  );
}
