/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ReactElement, useState } from 'react';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import { useSelector } from 'react-redux';

import { useForm } from 'react-hook-form';
import fileDownload from 'js-file-download';
import { Form } from 'react-bootstrap';
import { Requirement } from '../models/Requirement';
import { Need } from '../models/Need';
import { RootState } from '../store/store';
import { FileDownLoad } from '../models/FileDownLoad';
import styles from './SpecEditor.module.scss';
import { Bank } from '../models/Bank';
import Utils from '../common/Utils';
import MODELTYPE from '../models/ModelType';

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
      if (need.title in data && data[need.title] !== false) {
        let reqIndexes: string[];
        if (need.requirements.length <= 1) {
          reqIndexes = [data[need.title]];
        } else {
          reqIndexes = data[need.title];
        }
        const newRequirementList: Requirement[] = [];
        for (let i = 0; i < reqIndexes.length; i += 1) {
          newRequirementList.push(need.requirements[Number(reqIndexes[i])]);
        }
        const updatedBehov: Need = {
          id: need.id,
          title: need.title,
          description: need.description,
          requirements: newRequirementList,
          type: MODELTYPE.need,
          parent: need.parent
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
      name,
      bank
    };
    fileDownload(
      JSON.stringify(newFile),
      `${name}-${selectedBank.publishedDate}.json`
    );
  };

  const handleNameChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setName(event.target.value);
  };

  return (
    <Container fluid>
      <Row className="m-4">
        <Col>
          <Form.Group as={Row}>
            <Form.Label>Title</Form.Label>
            <Col sm={10}>
              <FormControl name="name" onChange={(e) => handleNameChange(e)} />
            </Col>
          </Form.Group>
        </Col>
      </Row>
      <Row className="m-4">
        <h4>Bank {selectedBank.title}</h4>
      </Row>
      <Row className=" m-4 d-flex justify-content-md-end">
        <Button className={styles.downLoadButton} onClick={onDownLoad}>
          Update
        </Button>
      </Row>
    </Container>
  );
}
