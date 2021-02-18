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
import { useForm } from 'react-hook-form';
import { Bank } from '../models/Bank';
import { FileDownLoad } from '../models/FileDownLoad';

export default function Evaluation(): ReactElement {
  const { register, handleSubmit } = useForm();

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

  const onSubmitResponses = (data: any) => {
    const ary: FileDownLoad[] = [];
    for (let i = 0; i < data.responseFiles.length; i += 1) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        if (evt.target?.result) {
          const content = JSON.parse(
            evt.target.result.toString()
          ) as FileDownLoad;
          ary.push(content);
          setResponses([...responses, content]);
        }
      };
      const file = data.responseFiles[i];
      reader.readAsText(file);
    }
  };

  if (!bankFileUploaded) {
    return (
      <Form>
        <Col>
          <h4>Upload a spesification to start the evaluation</h4>
          <InputGroup>
            <Form.File.Input
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
        <Row key={response.name}>
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
      <code>{JSON.stringify(responses)}</code>
      <Row className="m-4">
        <Col>
          <h4>{uploadedBank.title}</h4>
        </Col>
        <Col>
          <h6>Upload Responses</h6>
          <InputGroup className="mb-5">
            <form onSubmit={handleSubmit(onSubmitResponses)}>
              <input ref={register} type="file" name="responseFiles" multiple />
              <button type="submit">Submit</button>
            </form>
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
