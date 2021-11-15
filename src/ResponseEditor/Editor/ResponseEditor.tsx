import { joiResolver } from '@hookform/resolvers/joi';
import { AxiosResponse } from 'axios';
import Joi from 'joi';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
import { httpPost } from '../../api/http';
import ErrorSummary from '../../Form/ErrorSummary';
import { IAlert } from '../../models/IAlert';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addAlert } from '../../store/reducers/alert-reducer';
import { editSupplier } from '../../store/reducers/response-reducer';

interface IResponseInfoForm {
  supplier: string;
}

const supplierSchema = Joi.object().keys({
  supplier: Joi.string().required()
});

export default function ResponseEditor(): React.ReactElement {
  const { response } = useAppSelector((state) => state.response);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IResponseInfoForm>({
    resolver: joiResolver(supplierSchema)
  });
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const history = useHistory();
  const saveSupplier = (post: IResponseInfoForm) => {
    dispatch(editSupplier(post.supplier));
  };

  const onUploadPrefilledResponse = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const formData = new FormData();
    const files = event.target.files as FileList;
    for (let index = 0; index < files.length; index += 1) {
      const file = files[index];
      formData.append('file', file);
    }
    httpPost<FormData, AxiosResponse>('/java/uploadPdf', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      responseType: 'json'
    }).then((result) => {
      if (result.data.bank.id !== response.spesification.bank.id) {
        const alert: IAlert = {
          id: uuidv4(),
          style: 'danger',
          text: ' bank used in prefilledResponse does not match the bank in the uploaded specification '
        };
        dispatch(addAlert({ alert }));
      } else {
        history.push(`/response/${response.spesification.bank.id}/requirement`);
      }
    });
  };

  return (
    <Container fluid>
      <Row className="m-4">
        <Col>
          <Row className="mt-4">
            <h3>Response </h3>
          </Row>
          <Row className="mt-4 mb-4">
            <Col sm={6}>
              <h5>Spesifikasjon :{response.spesification.title}</h5>
            </Col>
            <Col sm={4}>
              <h6>Last opp preutfylt besvarelse</h6>
              <InputGroup>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => onUploadPrefilledResponse(e)}
                />
              </InputGroup>
            </Col>
          </Row>
          <Row>
            <h6>Kravbank: {response.spesification.bank.title}</h6>
          </Row>
          <Form onSubmit={handleSubmit(saveSupplier)}>
            <Form.Group as={Row}>
              <Form.Label>Supplier</Form.Label>
              <Col sm={4}>
                <FormControl
                  {...register('supplier')}
                  defaultValue={response.supplier}
                  isInvalid={!!errors.supplier}
                />
                {errors.supplier && (
                  <Form.Control.Feedback type="invalid">
                    {errors.supplier?.message}
                  </Form.Control.Feedback>
                )}
              </Col>
              <Col sm={2}>
                <Button type="submit">{t('save')}</Button>
              </Col>
            </Form.Group>
            <ErrorSummary errors={errors} />
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
