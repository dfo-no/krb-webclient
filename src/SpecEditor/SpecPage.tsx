import { AxiosResponse } from 'axios';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';
import { httpPost } from '../api/http';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectBank } from '../store/reducers/selectedBank-reducer';
import { setSpecification } from '../store/reducers/spesification-reducer';

export default function SpecPage(): React.ReactElement {
  const { id } = useAppSelector((state) => state.selectedBank);
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { t } = useTranslation();

  const onUploadSpecification = (
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
    }).then((response) => {
      dispatch(selectBank(response.data.bank.id));
      dispatch(setSpecification(response.data));
      history.push(`/specification/${response.data.bank.id}`);
      return response;
    });
  };

  if (!id) {
    return (
      <Row className="mt-4">
        <Col sm={3} />
        <Col sm={3}>
          <Form>
            <h4>Upload specification</h4>
            <InputGroup>
              <Form.Control
                type="file"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onUploadSpecification(e)
                }
                accept="application/pdf"
              />
            </InputGroup>
          </Form>
        </Col>

        <Col sm={3}>
          <h4>Select Bank from Hub</h4>
          <Link to="/">
            <Button>Go to Hub</Button>
          </Link>
        </Col>
        <Col />

        <Col sm={3} />
      </Row>
    );
  }

  return (
    <Row className="mt-4">
      <Col sm={3} />
      <Col sm={3}>
        <Link to={`/specification/${id}`}>
          <Button type="submit" className="mt-4">
            {t('create specification')}
          </Button>
        </Link>
      </Col>

      <Col sm={3}>
        <Button type="submit" className="mt-4">
          {t('create qualification')}
        </Button>
      </Col>
      <Col sm={3} />
    </Row>
  );
}
