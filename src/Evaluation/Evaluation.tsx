import fileDownload from 'js-file-download';
import React, { ReactElement, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { useForm } from 'react-hook-form';
import { Bank } from '../models/Bank';

export default function Evaluation(): ReactElement {
  /* 
  const [responses, setResponses] = useState<FileDownLoad[]>([]);

  const readFileContents = async (file: File) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = reject;
      fileReader.readAsText(file);
    });
  };

  const readAllFiles = async (AllFiles: File[]) => {
    const results = await Promise.all(
      AllFiles.map(async (file: File) => {
        const fileContents = await readFileContents(file);
        return JSON.parse(fileContents as string) as FileDownLoad;
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
          setResponses(result);
        })
        .catch((err) => {
          // TODO: handle error gracefully
          // eslint-disable-next-line no-alert
          alert(err);
        });
    }
  };

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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e)
              }
              accept=".json,application/json"
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
  }; */

  return (
    <Container fluid>
      <Row className="m-4">
        <Col>
          <h6>Upload Responses</h6>
          {/* 
          <InputGroup className="mb-5">
            <form>
              <input
                {...register('responseFiles')}
                type="file"
                onChange={(e) => handleResponseUpload(e)}
                name="responseFiles"
                multiple
                accept=".json,application/json"
              />
            </form>
          </InputGroup>
        </Col>
        <Col>
          <Button onClick={() => onDownLoad()}>Download</Button>
        </Col>
      </Row>
      <Row className="m-4">
        <Col>{responses.length !== 0 && evaluations(responses)}</Col>
          </Row> */}
        </Col>
      </Row>
    </Container>
  );
}
