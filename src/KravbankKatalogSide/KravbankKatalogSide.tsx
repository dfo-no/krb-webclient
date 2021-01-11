import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';

import Button from 'react-bootstrap/Button';

import { Kravbank } from '../models/Kravbank';
import { Katalog } from '../models/Katalog';
import { State } from '../store/index';
import SearchBar from '../SearchBar/SearchBar';
import SideBar from '../SideBar/SideBar';
import styles from './KravbankKatalogSide.module.scss';

interface IProps {
  kravbanker: Katalog<Kravbank>;
}

function KravbankKatalogSide(props: IProps): ReactElement {
  const maptoList = (katalog: Katalog<Kravbank>) => {
    let list = [];
    for (let key in katalog) {
      let value = katalog[key];
      list.push(value);
    }
    return list;
  };

  const kravbankListe = maptoList(props.kravbanker);
  const history = useHistory();
  const handleCreateNew = () => (event: any) => {
    history.push(`/kravbank/ny`);
  };

  return (
    <Container fluid>
      <Col id="sidebar-wrapper">
        <SideBar />
      </Col>
      <Col id="page-content-wrapper">
        <Button variant="primary">Primary</Button>{' '}
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleCreateNew()}
        >
          Opprett Kravbank
        </button>
        <SearchBar list={kravbankListe}></SearchBar>
      </Col>
    </Container>
  );
}

//TODO: find better solution for edit-possibility in combination with search
const mapStateToProps = (store: State) => {
  return { kravbanker: store.kravbanker };
};

export default connect(mapStateToProps)(KravbankKatalogSide);
