/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ReactElement, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

import Card from 'react-bootstrap/Card';

import { useForm } from 'react-hook-form';
import fileDownload from 'js-file-download';
import { Requirement } from '../models/Requirement';
import { Need } from '../models/Need';
import { Bank } from '../models/Bank';
import { FileDownLoad } from '../models/FileDownLoad';
import styles from './ResponseEditor.module.scss';
import MODELTYPE from '../models/ModelType';
import { Nestable } from '../models/Nestable';

export default function ResponseEditor(): ReactElement {
  const { register, handleSubmit } = useForm();
  const [fileUploaded, setFileUploaded] = useState(false);
  const [uploadedBank, setUploadedBank] = useState<Bank | null>(null);
  const [selectedNeedlist, setSelectedNeedList] = useState<Nestable<Need>[]>(
    []
  );
  const [name, setName] = useState('');

  const onLoad = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const reader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      reader.onload = async (event) => {
        if (event.target?.result) {
          const parsedText = JSON.parse(event.target.result.toString());
          const file = parsedText as FileDownLoad;
          setUploadedBank(file.bank as Bank);
        }
      };
      reader.readAsText(e.target.files[0]);
      setFileUploaded(true);
    }
  };

  const handleNameChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setName(event.target.value);
  };

  if (!fileUploaded) {
    return (
      <Col>
        <h4>Upload Spesification to create a response</h4>
        <InputGroup>
          <input type="file" onChange={(e) => onLoad(e)} />
        </InputGroup>
      </Col>
    );
  }

  if (uploadedBank === null) {
    return <p>A bank must be uploaded</p>;
  }

  const { needs } = uploadedBank;

  const onSubmit = (data: { [x: string]: any }) => {
    const selectedNeeds: Nestable<Need>[] = [];
    needs.forEach((need) => {
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
        const updatedBehov: Nestable<Need> = {
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
    // TODO: fix this with typings
    const bank = { ...uploadedBank };
    bank.needs = selectedNeedlist;
    const newFile: FileDownLoad = {
      name,
      bank
    };
    fileDownload(
      JSON.stringify(newFile),
      `${name}-${uploadedBank.publishedDate}.json`
    );
  };

  const needList = (needlist: Need[]) => {
    const needsJsx = needlist.map((need: Need) => {
      return (
        <>
          <h5>{need.title}</h5>
          {need.requirements.map((c, i) => (
            <div className="ml-5">
              <label key={c.id}>
                {c.title} &nbsp;
                <input
                  type="checkbox"
                  value={i}
                  {...register(need.title)}
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
        <Card.Body> {needsJsx}</Card.Body>
      </Card>
    );
  };

  return (
    <Container fluid>
      <Row className="m-4">
        <Col>
          <label htmlFor="title">Name</label>
          <InputGroup className="mb-3">
            <FormControl name="name" onChange={(e) => handleNameChange(e)} />
          </InputGroup>
        </Col>
        <Col>
          <Button
            className={styles.downLoadButton}
            onClick={() => onDownLoad()}
          >
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
