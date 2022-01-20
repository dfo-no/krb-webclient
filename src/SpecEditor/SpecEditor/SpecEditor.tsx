import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Row from 'react-bootstrap/Row';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import LoaderSpinner from '../../common/LoaderSpinner';
import ErrorSummary from '../../Form/ErrorSummary';
import { useGetBankQuery } from '../../store/api/bankApi';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectBank } from '../../store/reducers/selectedBank-reducer';
import { editTitle, setBank } from '../../store/reducers/spesification-reducer';

type FormInput = {
  title: string;
};

interface IRouteParams {
  id: string;
}

const titleSchema = Joi.object().keys({
  title: Joi.string().required()
});

export default function SpecEditor(): React.ReactElement {
  const { id } = useParams<IRouteParams>();
  const { spec } = useAppSelector((state) => state.specification);
  const dispatch = useAppDispatch();

  const { data: selectedBank, isLoading } = useGetBankQuery(id ?? '');

  useEffect(() => {
    if (id) {
      dispatch(selectBank(id));
    }
    if (selectedBank) {
      dispatch(setBank(selectedBank));
    }
  }, [dispatch, id, selectedBank]);

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

  if (!id) {
    return <p>No selected bank</p>;
  }

  if (isLoading || !selectedBank) {
    return <LoaderSpinner />;
  }

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
                <Button type="submit">{t('save')}</Button>
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
