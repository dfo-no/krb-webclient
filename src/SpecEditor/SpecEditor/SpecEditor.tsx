import { joiResolver } from '@hookform/resolvers/joi';
import Button from '@mui/material/Button';
import Joi from 'joi';
import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Row from 'react-bootstrap/Row';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import ErrorSummary from '../../Form/ErrorSummary';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { editTitle } from '../../store/reducers/spesification-reducer';

type FormInput = {
  title: string;
};

const titleSchema = Joi.object().keys({
  title: Joi.string().required()
});

export default function SpecEditor(): React.ReactElement {
  const { spec } = useAppSelector((state) => state.specification);
  const dispatch = useAppDispatch();

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

  const selectedBank = spec.bank;

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
                {t('Title')}
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
                <Button variant="primary" type="submit">
                  {t('save')}
                </Button>
              </Col>
            </Form.Group>
            <ErrorSummary errors={errors} />
          </Form>
        </Col>
      </Row>
      <Row className="m-4">
        <h4>
          {t('Bank')} {selectedBank.title}
        </h4>
      </Row>
    </Container>
  );
}
