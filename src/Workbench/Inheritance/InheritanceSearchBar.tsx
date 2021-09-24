import React, { ReactElement, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import FormControl from 'react-bootstrap/FormControl';
import Row from 'react-bootstrap/Row';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { Bank } from '../../models/Bank';
import { useAppDispatch } from '../../store/hooks';
import {
  addInheritedBank,
  putSelectedProjectThunk
} from '../../store/reducers/project-reducer';

interface SearchBarProps {
  list: Bank[];
}

export default function InheritanceSearchBar({
  list
}: SearchBarProps): ReactElement {
  const [input, setInput] = useState('');
  const [searchList, setSearchList] = useState<Bank[]>([]);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const history = useHistory();

  const updateSearchText = async (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { value } = event.target;
    if (value === '' || value === ' ') {
      setSearchList([]);
    } else {
      const filtered = list.filter((element) => {
        return element.title.toLowerCase().includes(value.toLowerCase());
      });
      setSearchList(filtered.slice(0, 5));
    }
    setInput(value);
  };

  const selectInheritance = (bank: Bank) => {
    const newInheritance = {
      title: bank.title,
      description: bank.description,
      id: bank.id
    };
    dispatch(addInheritedBank(newInheritance));
    dispatch(putSelectedProjectThunk('dummy'));
    history.push('/workbench/:projectId/inheritance');
  };
  const displaylist = (bankList: Bank[]) => {
    const resultList = bankList.map((bank: Bank) => {
      return (
        <Row>
          <Col>
            <Row>
              <b>{bank.title}</b>
            </Row>
            <Row>
              <Col>{bank.description}</Col>{' '}
              <Col className="d-flex justify-content-end">
                <Button onClick={() => selectInheritance(bank)} className="m-2">
                  Velg
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      );
    });
    return <div className="mt-5">{resultList}</div>;
  };

  return (
    <>
      <FormControl
        value={input}
        type="text"
        placeholder={t('search banks')}
        onChange={(e) => updateSearchText(e)}
      />
      {displaylist(searchList)}
    </>
  );
}
