import React, { ReactElement, useState } from 'react';
import {
  Container,
  Row,
  Button,
  Col,
  InputGroup,
  Card,
  Form
} from 'react-bootstrap';
import fileDownload from 'js-file-download';
import { Bank } from '../models/Bank';
import { FileDownLoad } from '../models/FileDownLoad';

export default function Evaluation(): ReactElement {
  const [bankFileUploaded, setBankFileUploaded] = useState(false);
  const [uploadedBank, setUploadedBank] = useState<Bank | null>(null);
  const [responses, setResponses] = useState<FileDownLoad[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files as FileList;
    for (let index = 0; index < files.length; index += 1) {
      const file = files[index];
      const reader = new FileReader();
      reader.onload = (evt) => {
        if (evt.target?.result) {
          const typeFileDownload = JSON.parse(
            evt.target.result.toString()
          ) as FileDownLoad;
          setUploadedBank(typeFileDownload.bank);
        }
      };
      reader.readAsText(file);
      setBankFileUploaded(true);
    }
  };

  if (!bankFileUploaded) {
    return (
      <Form>
        <Col>
          <h4>Upload a spesification to start the evaluation</h4>
          <InputGroup>
            <Form.File.Input
              multiple
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e)
              }
            />
          </InputGroup>
        </Col>
      </Form>
    );
  }

  if (uploadedBank === null) {
    return <p>The spec uploaded does not have the correct format</p>;
  }

  const onDownLoad = () => {
    const newFile = {
      spec: uploadedBank,
      responses
    };
    fileDownload(
      JSON.stringify(newFile),
      `${uploadedBank.title}-evaluations.json`
    );
  };

  const calculateScore = (bank: Bank) => {
    let score = 0;
    bank.needs.forEach((need) => {
      score += need.requirements.length;
    });
    return score;
  };

  const maxScore: number = calculateScore(uploadedBank);

  const evaluations = (file: FileDownLoad[]) => {
    const sortedResponses = [...file].sort(
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
            {/* TODO: use handleChange here */}
            <input type="file" multiple onChange={() => {}} />
          </InputGroup>
        </Col>
        <Col>
          <p>Ondownload</p>
          <Button onClick={() => onDownLoad()}>Download</Button>
        </Col>
      </Row>
      <Row className="m-4">
        <Col>{responses.length !== 0 && evaluations(responses)}</Col>
      </Row>
    </Container>
  );
}
