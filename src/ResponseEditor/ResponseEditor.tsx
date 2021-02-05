import React, { ReactElement, useState } from 'react';
import {
  Container,
  Row,
  Button,
  Col,
  InputGroup,
  FormControl,
  Card
} from 'react-bootstrap';

import { useForm } from 'react-hook-form';
import { Requirement } from '../models/Requirement';
import { Need } from '../models/Need';
import { Bank } from '../models/Bank';
import { FileDownLoad } from '../models/FileDownLoad';
import styles from './ResponseEditor.module.scss';

export default function ResponseEditor(): ReactElement {
  const { register, handleSubmit } = useForm();
  const [fileUploaded, setFileUploaded] = useState(false);
  const [uploadedBank, setUploadedBank] = useState<Bank | null>(null);
  const [selectedNeedlist, setSelectedNeedList] = useState<Need[]>([]);
  const [name, setName] = useState('');

  const onLoad = async (e: any) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async (e: any) => {
      const text = e.target.result;
      const parsedText = JSON.parse(text);
      const file = parsedText as FileDownLoad;
      setUploadedBank(file.bank as Bank);
    };
    reader.readAsText(e.target.files[0]);
    setFileUploaded(true);
  };

  const handleNameChange = (event: any) => {
    setName(event.target.value);
  };

  if (!fileUploaded) {
    return (
      <Col>
        <h4>Upload Spesification to create a response</h4>
        <InputGroup>
          <input type="file" onChange={onLoad} />
        </InputGroup>
      </Col>
    );
  }

  if (uploadedBank === null) {
    return <p>A bank must be uploaded</p>;
  }

  const { needs } = uploadedBank;

  const onSubmit = (data: any) => {
    const selectedNeeds: Need[] = [];
    needs.forEach((need: Need) => {
      if (need.tittel in data && data[need.tittel] !== false) {
        let reqIndexes: string[];
        need.requirements.length <= 1
          ? (reqIndexes = [data[need.tittel]])
          : (reqIndexes = data[need.tittel]);
        const newRequirementList: Requirement[] = [];
        for (let i = 0; i < reqIndexes.length; i += 1) {
          newRequirementList.push(need.requirements[Number(reqIndexes[i])]);
        }
        const updatedBehov = {
          id: need.id,
          tittel: need.tittel,
          beskrivelse: need.beskrivelse,
          needs: need.needs,
          requirements: newRequirementList
        };
        selectedNeeds.push(updatedBehov);
      }
    });
    setSelectedNeedList(selectedNeeds);
  };

  const onDownLoad = () => {
    const bank = { ...uploadedBank };
    bank.needs = selectedNeedlist;
    const newFile: FileDownLoad = {
      name,
      bank
    };
    const fileDownload = require('js-file-download');
    fileDownload(
      JSON.stringify(newFile),
      `${name}-${uploadedBank.publishedDate}.json`
    );
  };

  const needList = (needlist: Need[]) => {
    const needs = needlist.map((need: Need) => {
      return (
        <>
          <h5>{need.tittel}</h5>
          {need.requirements.map((c, i) => (
            <div className="ml-5">
              <label key={c.id}>
                {c.title} &nbsp;
                <input
                  type="checkbox"
                  value={i}
                  name={need.tittel}
                  ref={register}
                  className="ml-2"
                />
              </label>
            </div>
          ))}
        </>
      );
    });
    return (
      <Card className="bg-light">
        <Card.Body> {needs}</Card.Body>
      </Card>
    );
  };

  return (
    <Container fluid>
      <Row className="m-4">
        <Col>
          <label htmlFor="title">Name</label>
          <InputGroup className="mb-3">
            <FormControl name="name" onChange={handleNameChange} />
          </InputGroup>
        </Col>
        <Col>
          <Button className={styles.downLoadButton} onClick={onDownLoad}>
            Download
          </Button>
        </Col>
      </Row>
      <Row className="m-4">
        <Col>
          <form onSubmit={handleSubmit(onSubmit)}>
            {needList(needs)}
            <Button type="submit" className="mt-4">
              Select
            </Button>
          </form>
        </Col>
      </Row>
    </Container>
  );
}
