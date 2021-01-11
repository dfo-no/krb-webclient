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
    console.log(list);
    return list;
  };

  const kravbankListe = maptoList(props.kravbanker);
  const history = useHistory();
  const handleCreateNew = () => (event: any) => {
    history.push(`/kravbank/ny`);
  };

  return (
    <Container fluid p-0>
      <Row>
        <Col id="sidebar-wrapper" className="col-2 p-0">
          <SideBar />
        </Col>
        <Col id="page-content-wrapper" className="col-15 ">
          <Button variant="primary" onClick={handleCreateNew()}>
            Opprett Kravbank
          </Button>{' '}
          <SearchBar list={kravbankListe}></SearchBar>
        </Col>
      </Row>
    </Container>
  );
}

//TODO: find better solution for edit-possibility in combination with search
const mapStateToProps = (store: State) => {
  return { kravbanker: store.kravbanker };
};

export default connect(mapStateToProps)(KravbankKatalogSide);
