/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ReactElement, useState } from 'react';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { useSelector } from 'react-redux';

import { useForm } from 'react-hook-form';
import fileDownload from 'js-file-download';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/esm/InputGroup';
import { Requirement } from '../models/Requirement';
import { Need } from '../models/Need';
import { RootState } from '../store/store';
import { FileDownLoad } from '../models/FileDownLoad';
import styles from './SpecEditor.module.scss';
import { Bank } from '../models/Bank';
import Utils from '../common/Utils';
import MODELTYPE from '../models/ModelType';

export default function SpecPage(): ReactElement {
  const { id } = useSelector((state: RootState) => state.selectedBank);
  const { list } = useSelector((state: RootState) => state.bank);
  const [uploadedBank, setUploadedBank] = useState<Bank | null>(null);

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
    }
  };

  if (!id) {
    return (
      <>
        <Form>
          <Col>
            <h4>Upload existing spesification</h4>
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
        <Link to="/">
          <Button>Select Bank from Hub</Button>
        </Link>
      </>
    );
  }

  return (
    <Container fluid>
      <Row className=" align-items-center">
        <Col className="m-4 md-12">
          <Row>
            <Link to={`/speceditor/${id}`}>
              <Button type="submit" className="mt-4">
                Opprett kravspec
              </Button>
            </Link>
            <Button type="submit" className="mt-4">
              Opprette kvalifakasjon
            </Button>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
