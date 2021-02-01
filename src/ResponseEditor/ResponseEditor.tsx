import React, { ReactElement, useState } from 'react';
import { Container, Row, Button, Col } from 'react-bootstrap';

import { Requirement } from '../models/Requirement';
import { Need } from '../models/Need';
import { useForm } from 'react-hook-form';
import { Bank } from '../models/Bank';
import styles from './ResponseEditor.module.scss';

export default function ResponseEditor(): ReactElement {
  const { register, handleSubmit } = useForm();
  const [fileUploaded, setFileUploaded] = useState(false);
  const [uploadedBank, setUploadedBank] = useState<Bank | null>(null);
  const [selectedNeedlist, setSelectedNeedList] = useState<Need[]>([]);

  const onLoad = async (e: any) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async (e: any) => {
      const text = e.target.result;
      let parsedText = JSON.parse(text);
      setUploadedBank(parsedText as Bank);
    };
    reader.readAsText(e.target.files[0]);
    setFileUploaded(true);
  };

  if (!fileUploaded) {
    return <input type="file" onChange={onLoad} />;
  }

  if (uploadedBank === null) {
    return <p>A bank must be uploaded</p>;
  }

  const needs = uploadedBank.needs;

  const onSubmit = (data: any) => {
    let selectedNeeds: Need[] = [];
    needs.forEach((need: Need) => {
      if (need.tittel in data && data[need.tittel] !== false) {
        let reqIndexes: string[];
        need.requirements.length <= 1
          ? (reqIndexes = [data[need.tittel]])
          : (reqIndexes = data[need.tittel]);
        let newRequirementList: Requirement[] = [];
        for (var i = 0; i < reqIndexes.length; i++) {
          newRequirementList.push(need.requirements[Number(reqIndexes[i])]);
        }
        let updatedBehov = {
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

  const OnDownload = () => {
    const newBank = {
      id: uploadedBank.id,
      title: uploadedBank.title,
      description: uploadedBank.description,
      needs: selectedNeedlist,
      codelist: uploadedBank.codelist,
      version: uploadedBank.version,
      publishedDate: uploadedBank.publishedDate
    };
    const fileDownload = require('js-file-download');
    fileDownload(
      JSON.stringify(newBank),
      `${uploadedBank.title}-${uploadedBank.publishedDate}.json`
    );
  };

  const needList = (needlist: Need[]) => {
    const needs = needlist.map((need: Need, index: number) => {
      return (
        <>
          <h5>{need.tittel}</h5>
          {need.requirements.map((c, i) => (
            <div className={`ml-5`}>
              <label key={c.id}>
                {c.title}
                <input
                  type="checkbox"
                  value={i}
                  name={need.tittel}
                  ref={register}
                  className={`ml-2`}
                />
              </label>
            </div>
          ))}
        </>
      );
    });
    return <>{needs}</>;
  };

  return (
    <Container fluid>
      <Row className="m-4">
        <Col>
          <h2>{uploadedBank.title}</h2>
        </Col>
        <Col>
          <Button onClick={OnDownload}>Download</Button>
        </Col>
      </Row>
      <Row className="m-5">
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
