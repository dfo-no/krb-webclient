import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import FormControl from 'react-bootstrap/FormControl';
import Row from 'react-bootstrap/Row';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import Utils from '../../common/Utils';
import { IBank } from '../../models/IBank';
import { useAppDispatch } from '../../store/hooks';
import { putProjectThunk } from '../../store/reducers/project-reducer';

interface SearchBarProps {
  list: IBank[];
  project: IBank;
}

export default function InheritanceSearchBar({
  list,
  project
}: SearchBarProps): React.ReactElement {
  const [input, setInput] = useState('');
  const [searchList, setSearchList] = useState<IBank[]>([]);
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

  const selectInheritance = (bank: IBank) => {
    const updatedProject = Utils.inheritBank(project, bank);
    dispatch(putProjectThunk(updatedProject));
    history.push('/workbench/:projectId/inheritance');
  };
  const displaylist = (bankList: IBank[]) => {
    const resultList = bankList.map((bank: IBank) => {
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
