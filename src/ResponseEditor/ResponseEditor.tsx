import React, { ReactElement, useState } from 'react';
import { Container, Row, Button, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { Requirement } from '../models/Requirement';
import { Need } from '../models/Need';
import { RootState } from '../store/rootReducer';
import { useForm } from 'react-hook-form';

export default function SpecEditor(): ReactElement {
  const { register, handleSubmit } = useForm();
  const [selectedNeedlist, setSelectedNeedList] = useState<Need[]>([]);
  const [fileUploaded, setFileUploaded] = useState(false);

  const onFileChange = (event: any) => {
    console.log(event.target.files[0] as Bank);
  };
  if (!fileUploaded) {
    return <input type="file" onChange={onFileChange} />;
  }

  /* const onSubmit = (data: any) => {
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
      id: selectedBank.id,
      title: selectedBank.title,
      description: selectedBank.description,
      needs: selectedNeedlist,
      codelist: selectedBank.codelist,
      version: selectedBank.version,
      publishedDate: selectedBank.publishedDate
    };
    const fileDownload = require('js-file-download');
    fileDownload(JSON.stringify(newBank), 'filename.json');
  };

  const needList = (needlist: Need[]) => {
    const needs = needlist.map((need: Need, index: number) => {
      return (
        <>
          <h5>{need.tittel}</h5>
          {need.requirements.map((c, i) => (
            <div className="ml-5">
              <label key={c.id}>
                <input
                  type="checkbox"
                  value={i}
                  name={need.tittel}
                  ref={register}
                />
                {c.title}
              </label>
            </div>
          ))}
        </>
      );
    });
    return <>{needs}</>;
  };
*/
  return (
    <Container fluid>
      {/*<Row >
        <Col>
          <h2>{selectedBank.title}</h2>
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
      </Row>*/}
    </Container>
  );
}
