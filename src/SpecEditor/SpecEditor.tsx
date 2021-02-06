/* eslint-disable jsx-a11y/label-has-associated-control */
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
import { useSelector } from 'react-redux';

import { useForm } from 'react-hook-form';
import { Requirement } from '../models/Requirement';
import { Need } from '../models/Need';
import { RootState } from '../store/rootReducer';
import { FileDownLoad } from '../models/FileDownLoad';
import styles from './SpecEditor.module.scss';
import { Bank } from '../models/Bank';
import Utils from '../common/Utils';

export default function SpecEditor(): ReactElement {
  const { id } = useSelector((state: RootState) => state.selectedBank);
  const { list } = useSelector((state: RootState) => state.bank);
  const { register, handleSubmit } = useForm();
  const [selectedNeedlist, setSelectedNeedList] = useState<Need[]>([]);
  const [name, setName] = useState('');

  if (!id) {
    return <p>No selected bank</p>;
  }

  const selectedBank = Utils.ensure(list.find((bank: Bank) => bank.id === id));

  const { needs } = selectedBank;

  const onSubmit = (data: any) => {
    const selectedNeeds: Need[] = [];
    needs.forEach((need: Need) => {
      // Check if need.tittel is present to ensure need has any possible requirements to select.
      // React hook forms, sets the value of data.(need-title) to false if none are selected,
      // so we need to ensure data actually exist.
      if (need.tittel in data && data[need.tittel] !== false) {
        let reqIndexes: string[];
        if (need.requirements.length <= 1) {
          reqIndexes = [data[need.tittel]];
        } else {
          reqIndexes = data[need.tittel];
        }
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
    const bank = { ...selectedBank };
    bank.needs = selectedNeedlist;
    /* const newFile: FileDownLoad = {
      name,
      bank
    };
     const fileDownload = require('js-file-download');
    fileDownload(
      JSON.stringify(newFile),
      `${name}-${selectedBank.publishedDate}.json`
    ); */
  };

  const handleNameChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setName(event.target.value);
  };

  const needList = (needlist: Need[]) => {
    const needsJsx = needlist.map((need: Need) => {
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
                &nbsp;{c.title}
              </label>
            </div>
          ))}
        </>
      );
    });
    return (
      <Card className="bg-light">
        <Card.Body>{needsJsx}</Card.Body>
      </Card>
    );
  };

  return (
    <Container fluid>
      <Row className="m-4">
        <Col>
          <label htmlFor="title">Name</label>
          <InputGroup className="mb-5">
            <FormControl name="name" onChange={(e) => handleNameChange(e)} />
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
          <form onSubmit={handleSubmit((e) => onSubmit(e))}>
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
