import React, { ReactElement, useState } from 'react';
import { Container, Row, Button, Col, InputGroup, Card } from 'react-bootstrap';

import { Bank } from '../models/Bank';
import { FileDownLoad } from '../models/FileDownLoad';

export default function Evaluation(): ReactElement {
  const [bankFileUploaded, setBankFileUploaded] = useState(false);
  const [uploadedBank, setUploadedBank] = useState<Bank | null>(null);
  const [responses, setResponses] = useState<FileDownLoad[]>([]);

  const onLoad = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    /* const reader = new FileReader();
    reader.onload = async (ev) => {
      const text = e.target.result;
      const parsedText = JSON.parse(text);
      const file = parsedText as FileDownLoad;
      setUploadedBank(file.bank as Bank);
    };
    reader.readAsText(e.target.files[0]);
    setBankFileUploaded(true); */
  };

  /* const onMultipleLoad = async (e: any) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async (e: any) => {
      const text = e.target.result;
      const parsedText = JSON.parse(text);
      const file = parsedText as FileDownLoad;
      const responseArray = [...responses];
      responseArray.push(file);
      setResponses(responseArray);
    };
    Array.from(e.target.files).forEach((element: any) => {
      reader.readAsText(element);
    });
  }; */

  if (!bankFileUploaded) {
    return (
      <Col>
        <h4>Upload a spesification to start the evaluation</h4>
        <InputGroup>
          <input type="file" onChange={(e) => onLoad(e)} />
        </InputGroup>
      </Col>
    );
  }

  if (uploadedBank === null) {
    return <p>The spec uploaded does not have the correct format</p>;
  }

  /* const onDownLoad = () => {
    const newFile = {
      spec: uploadedBank,
      responses
    };
    const fileDownload = require('js-file-download');
    fileDownload(
      JSON.stringify(newFile),
      `${uploadedBank.title}-evaluations.json`
    );
  }; */

  const calculateScore = (bank: Bank) => {
    let score = 0;
    bank.needs.forEach((need) => {
      score += need.requirements.length;
    });
    return score;
  };

  const maxScore: number = calculateScore(uploadedBank);

  const evaluations = (fileDownload: FileDownLoad[]) => {
    const sortedResponses = [...fileDownload].sort(
      (a, b) => calculateScore(b.bank) - calculateScore(a.bank)
    );
    const list = sortedResponses.map((response: FileDownLoad) => {
      return (
        <Row>
          <Col>
            <p> {response.name} </p>
          </Col>
          <Col>
            <p>
              {calculateScore(response.bank)} /{maxScore} p
            </p>
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
              <h6>Calculated score | Maximal score : {maxScore} </h6>
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
          <h4>{uploadedBank.title}</h4>
        </Col>
        <Col>
          <h6>Upload Responses</h6>
          <InputGroup className="mb-5">
            <p>onMultipleLoad</p>
            {/* <input type="file" onChange={onMultipleLoad} /> */}
          </InputGroup>
        </Col>
        <Col>
          <p>Ondownload</p>
          {/* <Button onClick={onDownLoad}>Download</Button> */}
        </Col>
      </Row>
      <Row className="m-4">
        <Col>{responses.length !== 0 && evaluations(responses)}</Col>
      </Row>
    </Container>
  );
}
