import React, { ReactElement } from 'react';
import fileDownload from 'js-file-download';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export default function SpecPage(): ReactElement {
  const { spec } = useSelector((state: RootState) => state.specification);

  const onDownLoad = () => {
    fileDownload(JSON.stringify(spec), `${spec.title}-specfication.json`);
  };

  return (
    <Row className="justify-content-md-center">
      <Button type="submit" className="mt-4" onClick={onDownLoad}>
        Download Specification
      </Button>
    </Row>
  );
}
