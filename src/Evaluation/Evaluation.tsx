import { AxiosResponse } from 'axios';
import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { httpPost } from '../api/http';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setSpecification } from '../store/reducers/evaluation-reducer';
import DownLoad from './DownLoad';
import EvaluationList from './EvaluationList';
import UploadResponses from './UploadResponses';

export default function Evaluation(): React.ReactElement {
  const dispatch = useAppDispatch();
  const { responses, specification } = useAppSelector(
    (state) => state.evaluation
  );

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
      dispatch(setSpecification(response.data));
      return response;
    });
  };

  if (specification.bank.id === '') {
    return (
      <Col>
        <h4>Upload a spesification to start the evaluation</h4>
        <InputGroup className="mb-5">
          <form>
            <input
              type="file"
              onChange={(e) => onUploadSpecification(e)}
              name="responseFiles"
              multiple
              accept=".pdf"
            />
          </form>
        </InputGroup>
      </Col>
    );
  }

  return (
    <Container fluid>
      <Row className="m-4">
        <UploadResponses />
        <Col>
          <DownLoad />
        </Col>
      </Row>
      <Row className="m-4">
        <Col>
          {responses.length !== 0 && <EvaluationList responses={responses} />}
        </Col>
      </Row>
    </Container>
  );
}
