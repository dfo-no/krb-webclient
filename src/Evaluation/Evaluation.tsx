import { AxiosResponse } from 'axios';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { httpPost } from '../api/http';
import { IResponse } from '../models/IResponse';
import { IEvaluation } from '../Nexus/entities/IEvaluation';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  setResponses,
  setSpecification
} from '../store/reducers/evaluation-reducer';

export default function Evaluation(): React.ReactElement {
  const dispatch = useAppDispatch();
  const { responses, specification, evaluations } = useAppSelector(
    (state) => state.evaluation
  );

  const readFileContents = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return new Promise((resolve, reject) => {
      httpPost<FormData, AxiosResponse>('/java/uploadPdf', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        responseType: 'json'
      })
        .then((response) => {
          return resolve(response.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const readAllFiles = async (AllFiles: File[]) => {
    const results = await Promise.all(
      AllFiles.map(async (file: File) => {
        const contents = await readFileContents(file).then((response) => {
          return response;
        });
        return contents;
      })
    );
    return results;
  };

  const handleResponseUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const allFiles: File[] = [];
    if (e.target.files) {
      for (let i = 0; i < e.target.files.length; i += 1) {
        const element: File = e.target.files[i];
        allFiles.push(element);
      }
      readAllFiles(allFiles)
        .then((result) => {
          const newResponses = [...responses, ...(result as IResponse[])];
          dispatch(setResponses(newResponses));
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

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

  const onDownLoad = () => {
    const evaluation: IEvaluation = {
      specification,
      responses: evaluations
    };
    httpPost<IEvaluation, AxiosResponse<File>>(
      '/java/generateResponse',
      evaluation,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/pdf'
        },
        responseType: 'blob'
      }
    ).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'evaluation.pdf');
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        window.URL.revokeObjectURL(link.toString());
      }, 200);
    });
  };

  const evaluationlist = (iResponses: IResponse[]) => {
    const list = iResponses.map((response: IResponse) => {
      return (
        <Row key={response.supplier}>
          <Col>
            <p> {response.supplier} </p>
          </Col>
          <Col>
            <p>{/* Calculate score with nexus */}</p>
          </Col>
        </Row>
      );
    });
    return (
      <Card className="bg-light">
        <Card.Body>
          <Row>
            <Col>
              <h6>Responders name </h6>
              <hr />
            </Col>
            <Col>
              <h6>Calculated score : </h6>
              <hr />
            </Col>
          </Row>
          {list}
        </Card.Body>
      </Card>
    );
  };

  return (
    <Container fluid>
      <Row className="m-4">
        <Col>
          <h6>Upload Responses</h6>
          <InputGroup className="mb-5">
            <form>
              <input
                type="file"
                onChange={(e) => handleResponseUpload(e)}
                name="responseFiles"
                multiple
                accept=".pdf"
              />
            </form>
          </InputGroup>
        </Col>
        <Col>
          <Button onClick={() => onDownLoad()}>Download</Button>
        </Col>
      </Row>

      <Row className="m-4">
        <Col>{responses.length !== 0 && evaluationlist(responses)}</Col>
      </Row>
    </Container>
  );
}
