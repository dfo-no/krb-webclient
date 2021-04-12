import React, { ReactElement, useState } from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/esm/Form';
import Row from 'react-bootstrap/esm/Row';
import { useForm } from 'react-hook-form';
import { BsPencil } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Utils from '../common/Utils';
import { Bank } from '../models/Bank';
import { Product } from '../models/Product';
import { SpecificationProduct } from '../models/SpecificationProduct';
import { selectBank } from '../store/reducers/selectedBank-reducer';
import { addProduct } from '../store/reducers/spesification-reducer';
import { RootState } from '../store/store';
import styles from './ProductSpecEditor.module.scss';
import MODELTYPE from '../models/ModelType';
import { selectSpecProduct } from '../store/reducers/selectedSpecProduct-reducer';
import RequirementView from './RequirementView';

type FormInput = {
  product: string;
};

interface RouteParams {
  bankId: string;
}

export default function RequirementSpecEditor(): ReactElement {
  const projectMatch = useRouteMatch<RouteParams>('/speceditor/:bankId');
  const { id } = useSelector((state: RootState) => state.selectedBank);
  const { list } = useSelector((state: RootState) => state.bank);
  const dispatch = useDispatch();

  if (projectMatch?.params.bankId && !id) {
    dispatch(selectBank(projectMatch?.params.bankId));
  }

  if (!id) {
    return <p>No selected bank</p>;
  }
  const bankSelected = Utils.ensure(list.find((bank: Bank) => bank.id === id));
  return (
    <Container fluid>
      <RequirementView needList={bankSelected.needs} />
    </Container>
  );
}
