import React, { ReactElement, useState } from 'react';
import {
  Container,
  Row,
  Button,
  Col,
  InputGroup,
  FormControl
} from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { Requirement } from '../models/Requirement';
import { Need } from '../models/Need';
import { RootState } from '../store/rootReducer';
import { useForm } from 'react-hook-form';
import { FileDownLoad } from '../models/FileDownLoad';

export default function SpecEditor(): ReactElement {
  const { selectedBank } = useSelector((state: RootState) => state.kravbank);
  const { register, handleSubmit } = useForm();
  const [selectedNeedlist, setSelectedNeedList] = useState<Need[]>([]);
  const [name, setName] = useState('');

  if (!selectedBank) {
    return <p>No selected bank</p>;
  }

  const needs = selectedBank.needs;

  const onSubmit = (data: any) => {
    let selectedNeeds: Need[] = [];
    needs.forEach((need: Need) => {
      //Check if need.tittel is present to ensure need has any possible requirements to select.
      //React hook forms, sets the value of data.(need-title) to false if none are selected,
      // so we need to ensure data actually exist.
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

  const onDownLoad = () => {
    const bank = { ...selectedBank };
    bank.needs = selectedNeedlist;
    const newFile: FileDownLoad = {
      name: name,
      bank: bank
    };
    const fileDownload = require('js-file-download');
    fileDownload(
      JSON.stringify(newFile),
      `${name}-${selectedBank.publishedDate}.json`
    );
  };

  const handleNameChange = (event: any) => {
    setName(event.target.value);
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

  return (
    <Container fluid>
      <Row className="m-4">
        <Col>
          <label htmlFor="title">Name</label>
          <InputGroup className="mb-3 30vw">
            <FormControl name="name" onChange={handleNameChange} />
          </InputGroup>
        </Col>
        <Col>
          <Button onClick={onDownLoad}>Download</Button>
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
