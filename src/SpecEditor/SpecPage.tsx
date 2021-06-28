import { AxiosResponse } from 'axios';
import React, { ReactElement } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { httpPost } from '../api/http';
import { selectBank } from '../store/reducers/selectedBank-reducer';
import { setSpecification } from '../store/reducers/spesification-reducer';
import { RootState } from '../store/store';

export default function SpecPage(): ReactElement {
  const { id } = useSelector((state: RootState) => state.selectedBank);
  const dispatch = useDispatch();
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
    httpPost<FormData, AxiosResponse>(
      `${process.env.REACT_APP_JAVA_API_URL}/uploadPdf`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        responseType: 'json'
      }
    ).then((response) => {
      dispatch(selectBank(response.data.bank.id));
      dispatch(setSpecification(response.data));
      history.push(`/speceditor/${response.data.bank.id}`);
      return response;
    });
  };

  if (!id) {
    return (
      <Row className="mt-4">
        <Col sm={6}>
          <Form>
            <h4>Upload specification</h4>
            <InputGroup>
              <Form.File.Input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onUploadSpecification(e)
                }
                accept="application/pdf"
              />
            </InputGroup>
          </Form>
        </Col>

        <Col sm={6}>
          <h4>Select Bank from Hub</h4>
          <Link to="/">
            <Button>Go to Hub</Button>
          </Link>
        </Col>
      </Row>
    );
  }

  return (
    <Row className="mt-4">
      <Col sm={4}>
        <Link to={`/speceditor/${id}`}>
          <Button type="submit" className="mt-4">
            {t('create specification')}
          </Button>
        </Link>
      </Col>

      <Col sm={4}>
        <Button type="submit" className="mt-4">
          {t('create qualification')}
        </Button>
      </Col>
    </Row>
  );
}
